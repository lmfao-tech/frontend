import { NextPageContext } from "next";

function Index() {
  return <div>LMFAO</div>;
}

export async function getServerSideProps(context: NextPageContext) {
  return {
    redirect: {
      destination: "/home",
      permanent: false,
    },
  };
}

export default Index;
