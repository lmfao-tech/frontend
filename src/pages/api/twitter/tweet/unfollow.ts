// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Resp, Status } from '~/types/Request';
import { getSession } from "next-auth/react";
// import { TwitterApi } from 'twitter-api-v2';
// import { Novu } from '@novu/node';

interface Request extends NextApiRequest {
    query: {
        id: string;
        username: string;
    }
}

export default async function handler(
  req: Request,
  res: NextApiResponse<Resp>
) {
    const session = await getSession({ req });

    const { id, username } = req.query;

    if (!session) {
        res.status(401).json({
            success: Status.Failure,
            error: "Unauthorized"
        })
        return
    }

    if (!id || !username) {
        res.status(400).json({
            success: Status.Failure,
            error: "Invalid query"
        })
        return
    }

    // TODO: Unfollow in database here
    try {
        // const novu = new Novu(process.env.NOVU!);
        // await novu.trigger("followedyou", {
        //     to: {
        //         subscriberId: username,
        //     },
        //     payload: {
        //         who: `${session.user.id}`,
        //         what: "unfollowed"
        //     }
        // })

        res.status(200).json({
            success: Status.Success,
            data: "Unfollowed"
        })

    } catch (e: any) {
        res.status(500).json({
            success: Status.Failure,
            error: e.message
        })
    }
    

}