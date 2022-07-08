import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;

// let current_memes: any[] = [];
let last_updated_timestamp = 0;

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {

    const { last, max_tweets } = req.query;

    // if (Date.now() - last_updated_timestamp < 120000) {
    //   console.log("Returning current memes");

    //   // Return current memes [last: last+max_tweets]
    //   res.status(200).json(current_memes.slice(Number(last), Number(last) + Number(max_tweets)));

    // } else {
    try {
        const resp = await fetch("https://api.lmfao.tech/get_memes?last=" + last + "&max_tweets=" + max_tweets)
        const data = await resp.json();
        last_updated_timestamp = Date.now();
        res.status(200).json(data);
    } catch (e : any) {
        res.status(500).json({
            success: false,
            message: e.message,
        });
    }

}
// }
