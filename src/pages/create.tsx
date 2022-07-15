import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { ReactElement, useState } from "react";
import Dropzone from "~/components/Dropzone";
import CreatePage from "~/components/layouts/CreatePage";
import Tabs from "~/components/Tabs";

const Create: NextPage = () => {

    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState(0);

    // @ts-ignore
    let av = session?.user?.image;
    if (av) {
        av = av.replace(/_normal./, ".");
    } else {
        av = "";
    }

    return (
        <div className="dark:bg-gray-700 md:pt-10 pt-28 flex flex-col items-center dark:text-white box-border">
            <h1 className="md:text-3xl text-6xl font-bold text-center">Upload your own meme</h1>
            <div className="mt-10 -z-[0] bg-slate-100 h-36 resize flex max-h-96 p-4 focus-within:border-blue-500 border-transparent border-2 dark:bg-gray-600 shadow-2xl drop-shadow-2xl dark:text-white rounded-md w-[600px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={av} className="rounded-full h-16" alt="avatar" />
                <textarea 
                    maxLength={280} 
                    id="haha" 
                    className="w-full p-5 resize bg-transparent border-none haha" 
                    placeholder="Whats happening?" 
                />
            </div>
            
            <Tabs
                items={[
                    {
                        name: "Upload",
                        component: (<Dropzone maxFiles={1} />),
                    },
                    {
                        name: "Meme Maker",
                        component: (
                            <div className="flex bg-gray-500 h-96 w-full justify-center items-center">
                                In Progress
                            </div>
                        ),
                    }
                ]}
                extendTailwind={{
                    parent: "mt-10 w-full px-72",
                    tabButtons: {
                        list: 'justify-center'
                    },
                    tabContent: " mt-2 w-full"
                }}
                activeTab={setActiveTab}
            />
            <button className="bg-blue-500 px-5 py-3 my-10 rounded text-white">Publish</button>
        </div>
    )
}

// @ts-ignore
Create.getLayout = (page: ReactElement) => {
    return <CreatePage>{page}</CreatePage>;
};

export default Create;