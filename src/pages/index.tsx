import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { NextPageContext } from "next";

function Index() {
  return <div>LMFAO</div>;
}

export async function getServerSideProps(context: NextPageContext) {
  // TODO: redirect to website if user is not logged in

  return {
    redirect: {
      destination: "/home",
      permanent: false,
    },
  };
}

export default Index;
