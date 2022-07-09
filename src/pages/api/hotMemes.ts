import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;

// let current_memes: any[] = [];
let last_updated_timestamp = 0;

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {

    const { last, max_tweets } = req.query;

    try {
        const resp = await fetch("https://api.lmfao.tech/hot_memes")
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