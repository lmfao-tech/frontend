import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { ReactElement, useState } from "react";
import toast from "react-hot-toast";
import Dropzone from "~/components/Dropzone";
import NotFeedPage from "~/components/layouts/NotFeedPage";
import Tabs from "~/components/Tabs";
import NextPageWithLayout from "~/types/NextPageWithLayout";
import Create from "~/components/Create";
import { Status } from "~/types/Request";
import Head from "next/head";

const CreatePage: NextPageWithLayout = () => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState(0);

  const [status, setStatus] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  let av = session?.user?.image;
  if (av) {
    av = av.replace(/_normal./, ".");
  } else {
    av = "";
  }

  async function publish(image:File | null) {
    if (image === null) {
      toast.error("Please upload an image", {
        style: {
          background: "#292929",
          color: "white",
        },
      });
      return;
    }

    // Convert image to base64
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = async () => {
      const base64 = reader.result as string;
      const response = await fetch(
        `/api/twitter/user/publish_meme?${
          status.length < 1 ? "" : `status=${status}`
        }`,
        {
          method: "POST",
          body: base64,
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.status === Status.Success) {
            toast.success("Meme published successfully", {
              style: {
                background: "#292929",
                color: "white",
              },
            });
          } else if (res.status === Status.Failure) {
            toast.error("An error occured while posting the meme...", {
              style: {
                background: "#292929",
                color: "white",
              },
            });
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error("An error occured while posting the meme...", {
            style: {
              background: "#292929",
              color: "white",
            },
          });
        });
    };
    setImage(null);
    setStatus("");
  }

  return (
    <>
      <Head>
        <title>Create | LMFAO.tech</title>
      </Head>
      <div className="pb-20">
        <div className="flex flex-col items-center px-3 pt-10 dark:bg-[#242424] md:pt-28 dark:text-white">
          <h1 className="text-2xl font-bold text-center md:text-3xl">
            Upload your own meme
          </h1>
          <div className="mt-10 bg-slate-100 h-36 resize flex max-h-96 p-4 focus-within:border-blue-500 border-transparent border-2 dark:bg-[#141414] shadow-2xl drop-shadow-2xl dark:text-white rounded-md w-full md:w-[600px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={av} className="h-16 rounded-full" alt="avatar" />
            <textarea
              maxLength={280}
              id="haha"
              className="w-full p-5 bg-transparent border-none resize haha"
              placeholder="Say something like ... THIS MEME IS SO FUNNY LMFAO"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            />
          </div>
          <Tabs
            items={[
              {
                name: "Upload",
                component: (
                  <Dropzone
                    onFileDrop={(file: File[]) => {
                      setImage(file[0]!);
                    }}
                    maxFiles={1}
                    image={image}
                    setImage={setImage}
                    publish={publish}
                  />
                ),
              },
              {
                name: "Meme Maker",
                component: (
                  <div className="w-full">
                    <Create
                      publish={publish}
                    />
                  </div>
                ),
              },
            ]}
            extendTailwind={{
              parent: "mt-10 w-full md:px-3",
              tabButtons: {
                list: "justify-center",
              },
              tabContent: " mt-2 w-full",
            }}
            activeTab={setActiveTab}
          />
        </div>
      </div>
    </>
  );
};

CreatePage.getLayout = (page: ReactElement) => {
  return <NotFeedPage>{page}</NotFeedPage>;
};

export default CreatePage;
