import { getProviders, signIn } from "next-auth/react";
import { useEffect } from "react";

export default function SignIn({ providers }: any) {

    useEffect(() => {
        signIn(providers[0].id)
    },[providers])

    return null
}

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: { providers },
    }

}