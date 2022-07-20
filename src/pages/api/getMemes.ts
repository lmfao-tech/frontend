import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;

export default async function response(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { last, max_tweets } = req.query;
  try {
    const top_memes = await fetch(
      "https://api.lmfao.tech/top_memes?last=" +
        last +
        "&max_tweets" +
        max_tweets
    );
    const resp = await fetch(
      "https://api.lmfao.tech/get_memes?last=" +
        last +
        "&max_tweets=" +
        max_tweets
    );
    const data = await resp.json();
    const topMemes = await top_memes.json();

    const random = Math.floor(Math.random() * Number(Number(max_tweets)/2));

    const returnedList = [
      ...topMemes.slice(0, random),
      ...data.slice(0, Number(max_tweets) - random),
    ];

    res.status(200).json(returnedList);
  } catch (e: any) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
}
