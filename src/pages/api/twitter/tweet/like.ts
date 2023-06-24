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

    // TODO: like in database
    try {
        res.status(200).json({
            success: Status.Success,
            data: "Liked"
        })

    } catch (e: any) {
        res.status(500).json({
            success: Status.Failure,
            error: e.message
        })
    }
    

}