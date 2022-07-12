import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { ReactElement } from "react";
import Dropzone from "~/components/Dropzone";
import CreatePage from "~/components/layouts/CreatePage";

const Create: NextPage = () => {

    const { data: session } = useSession();

    // @ts-ignore
    let av = session?.user?.image;
    if (av) {
        av = av.replace(/_normal./, ".");
    } else {
        av = "";
    }

    return (
        <div className="dark:bg-gray-700 pt-10 flex flex-col items-center dark:text-white box-border min-h-[89.8vh]">
            <h1 className="text-3xl font-bold text-center">Upload your own meme</h1>
            <style></style>
            <div className="mt-10 bg-slate-100 h-36 resize flex max-h-96 p-4 focus-within:border-blue-500 border-transparent border-2 dark:bg-gray-600 shadow-2xl drop-shadow-2xl dark:text-white rounded-md lg:w-[600px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={av} className="rounded-full h-16" alt="avatar" />
                <textarea maxLength={280} id="haha" className="w-full p-5 resize bg-transparent border-none haha" placeholder="Tweet" required />
            </div>
            <h1 className="my-5 text-2xl font-bold">Upload the Meme</h1>
            <Dropzone maxFiles={1} />
        </div>
    )
}

// @ts-ignore
Create.getLayout = (page: ReactElement) => {
    return <CreatePage>{page}</CreatePage>;
};

export default Create;