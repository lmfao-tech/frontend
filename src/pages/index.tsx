import type { NextPage } from "next";
import Head from "next/head";
import MainPage from "~/components/MainPage";
import Profile from "~/components/ProfileBar/Profile";
import Sidebar from "../components/Sidebar/Sidebar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>LMFAO.tech</title>
        <meta name="description" content="LMFAO.tech | Home" />
      </Head>

      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="flex w-full col-span-3">
          <Sidebar />
          <MainPage />
        </div>

        <div className="hidden md:block md:col-span-1">
          <Profile />
        </div>
      </div>
    </>
  );
};

export default Home;
