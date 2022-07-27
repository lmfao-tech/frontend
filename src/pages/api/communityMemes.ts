import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;

export default async function response(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { last, max_tweets } = req.query;

  try {
    const resp = await fetch(
      "https://api.lmfao.tech/community_memes?last=" +
        last +
        "&max_tweets=" +
        max_tweets, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": process.env.AUTH || "",
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
