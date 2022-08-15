import type { NextApiRequest, NextApiResponse } from "next";

export default async function response(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {

    const resp = await fetch(`${process.env.NODE_ENV === "production" ? "https://lmfao.tech/" : "http://localhost:"+(process.env.PORT ?? "3000")}/getMemeTemplates.json`);
    const data = await resp.json();

    res.status(200).json(data.pageProps.memes)

}
