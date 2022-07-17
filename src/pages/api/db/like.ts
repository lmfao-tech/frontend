// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Resp, Status } from '~/types/Request'
import { getSession } from "next-auth/react";
import { prisma } from '~/db/client';

interface Request extends NextApiRequest {
    query: {
        id: string
    }
}

export default async function handler(
  req: Request,
  res: NextApiResponse<Resp>
) {
    
    const session = await getSession({ req });

    if (!session) {
        res.status(401).json({
            success: Status.Failure,
            error: "Unauthorized"
        })
        return
    }

    const { id } = req.query;

    if (!id) {
        res.status(400).json({
            success: Status.Failure,
            error: "Invalid query"
        })
        return
    }

    await prisma.like.create({
        data: {
            id: id,
            user: {
                connectOrCreate: {
                    where: {
                        id: `${session.twitter.userID}`
                    },
                    create: {
                        id: `${session.twitter.userID}`,
                        name: session.user.name,
                        email: session.user.email,
                        hahaCoins: 100,
                        lmfaoCoins: 0,
                    }
                }
            }
        }
    })

    const likes = await prisma.like.findMany({
        where: {
            id: id
        },
        include: {
            user: true
        }
    })

    return res.status(200).json({
        success: Status.Success,
        data: likes
    })

}