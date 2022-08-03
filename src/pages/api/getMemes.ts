import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;

type Request = NextApiRequest & {
  query: {
    last:number;
    max_tweets:number;
  }
}

export default async function response(
  req: Request,
  res: NextApiResponse<Data>
) {
  let { last, max_tweets } = req.query;
  if (!last) {
    last = 0;
  }

  try {
    const resp = await fetch(
      "https://api.lmfao.tech/get_memes?last=" +
        last +
        "&max_tweets=" +
        max_tweets,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.AUTH || "",
        },
      }
    );
    const data = await resp.json();

    res.status(200).json(data);
  } catch (e: any) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
}
