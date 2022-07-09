// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Resp, Status } from '~/types/Request'
import { getSession } from "next-auth/react";
import { TwitterApi } from 'twitter-api-v2';

interface Request extends NextApiRequest {
    query: {
        id: string;
    }
}

export default async function handler(
  req: Request,
  res: NextApiResponse<Resp>
) {
    const session = await getSession({ req });

    const { id } = req.query;

    if (!session) {
        res.status(401).json({
            success: Status.Failure,
            error: "Unauthorized"
        })
        return
    }

    if (!id) {
        res.status(400).json({
            success: Status.Failure,
            error: "Missing id"
        })
        return
    }

    const client = new TwitterApi({
        // @ts-ignore
        appKey: process.env.TWITTER_API_KEY!,
        appSecret: process.env.TWITTER_API_SECRET!,
        // @ts-ignore
        accessToken: session.tokens.authToken,
        // @ts-ignore
        accessSecret: session.tokens.authSecret,
    })

    try {
        // @ts-ignore
        const data = await client.v2.like(session.tokens.authToken.split("-")[0], id);

        res.status(200).json({
            success: Status.Success,
            data: data
        })

    } catch (e: any) {
        res.status(500).json({
            success: Status.Failure,
            error: e.message
        })
    }
    

}