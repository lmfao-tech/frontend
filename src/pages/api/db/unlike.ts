// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Resp, Status } from '~/types/Request'
import { getSession } from "next-auth/react";
import { prisma } from '~/db/client';
import { disconnect } from 'process';

interface Request extends NextApiRequest {
    query: {
        id: string;
        authorId: string;
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

    const { id, authorId } = req.query;

    if (!id || !authorId) {
        res.status(400).json({
            success: Status.Failure,
            error: "Invalid query"
        })
        return
    }

    let user = await prisma.user.findFirst({
        where: {
            name: session.twitter.twitterHandle
        },
        include: {
            likes: true
        }
    })

    if (user === null) {
        user = await prisma.user.create({
            data: {
                id: `${session.twitter.userID}`,
                name: session.twitter.twitterHandle,
                email: session.user.email,
                hahaCoins: 100,
                lmfaoCoins: 0
            },
            include: {
                likes: true
            }
        })
    }

    if (user.likes.find(
        (like) => like.id === id
    ) === null) {
        return res.status(424).json({
            success: Status.Failure,
            error: "You dont have this post liked!"
        })
    }

    const moreHaha = user.hahaCoins > 99 ? true : false;

    await prisma.like.update({
        where: {
            id: id
        },
        data: {
            user: {
                disconnect: [{id: `${session.twitter.userID}`}]
            }
        }
    })
    
    await prisma.user.update({
        where: {
            name: session.twitter.twitterHandle
        },
        data: {
            hahaCoins: {
                increment: moreHaha ? 0 : 1
            },
            likes: {
                disconnect: {
                    id: id
                }
            }
        }
    })

    try {        
        await prisma.user.update({
            where: {
                name: `${authorId}`
            },
            data: {
                lmfaoCoins: {
                    decrement: moreHaha ? 0 : 1
                }
            }
        })
    } catch {}

    const likes = await prisma.like.findFirst({
        where: {
            id: id
        },
        include: {
            user: true
        }
    })

    const daUser = await prisma.user.findFirst({
        where: {
            name: session.twitter.twitterHandle
        },
        include: {
            likes: true
        }
    })

    return res.status(200).json({
        success: Status.Success,
        data: { 
            likes, user: daUser 
        }
    })

}