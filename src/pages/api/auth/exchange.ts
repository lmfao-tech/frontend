// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Resp, Status } from '~/types/Request';

interface Request extends NextApiRequest {
    query: {
        code: string;
    }
}

export default async function handler(
  req: Request,
  res: NextApiResponse<Resp>
) {
    if (req.method !== 'POST') {
        res.status(405).send({
            success : Status.Failure,
            error : 'Invalid Method'
        })
        return;
    }

    if (!req.query.code) {
        res.status(400).send({
            success : Status.Failure,
            error : 'Invalid Query'
        })
        return;
    }

    const { code } = req.query;

    const CLIENT_ID = process.env.TWITTER_ID!;

    await fetch(
        `https://api.twitter.com/2/oauth2/token?code=${code}&grant_type=authorization_code&client_id=${CLIENT_ID}`, {
            method: 'POST'
        }
    )

}