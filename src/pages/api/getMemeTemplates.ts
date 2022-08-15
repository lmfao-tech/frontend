import type { NextApiRequest, NextApiResponse } from "next";

export default async function response(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {

    const resp = await fetch(`https://www.drmemes.com/_next/data/7Zt_61K4LX-XJVg5YONpn/index.json`);
    const data = await resp.json();

    res.status(200).json(data.pageProps.memes)

}
