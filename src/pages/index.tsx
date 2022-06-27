import type { NextPage } from "next";
import Head from "next/head";
import Sidebar from "../components/Sidebar/Sidebar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>LMFAO.tech</title>
        <meta name="description" content="LMFAO.tech | Home" />
      </Head>

      <div>
        {/* Sidebar */}
        <Sidebar/>

        {/* Top Bar */}

        {/* Feed */}

        {/* Profile bar */}
      </div>
    </>
  );
};

export default Home;
