// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Resp, Status } from '~/types/Request'
import { getSession } from "next-auth/react";
import { prisma } from '~/db/client';

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
            id: `${session.twitter.userID}`
        },
        include: {
            likes: true
        }
    })

    if (user === null) {
        user = await prisma.user.create({
            data: {
                id: `${session.twitter.userID}`,
                name: session.user.name,
                email: session.user.email,
                hahaCoins: 100,
                lmfaoCoins: 0
            },
            include: {
                likes: true
            }
        })
    }

    const lessHaha = user.hahaCoins < 1 ? true : false;

    if (user.likes.find((like) => like.id === id)) {
        return res.status(424).json({
            success: Status.Failure,
            error: "You have already liked this post!"
        })
    }

    await prisma.like.upsert({
        where: {
            id: id
        },
        update: {
            user: {
                connectOrCreate: {
                    where: {
                        id: `${session.twitter.userID}`
                    },
                    create: {
                        id: `${session.twitter.userID}`,
                        name: session.twitter.twitterHandle,
                        email: session.user.email,
                        hahaCoins: 99,
                        lmfaoCoins: 0,
                    }
                }
            }
        },
        create: {
            id: id,
            user: {
                connectOrCreate: {
                    where: {
                        id: `${session.twitter.userID}`
                    },
                    create: {
                        id: `${session.twitter.userID}`,
                        name: session.twitter.twitterHandle,
                        email: session.user.email,
                        hahaCoins: 99,
                        lmfaoCoins: 0,
                    }
                }
            }
        }
    })
    
    await prisma.user.update({
        where: {
            id: `${session.twitter.userID}`
        },
        data: {
            hahaCoins: {
                decrement: lessHaha ? 0 : 1
            },
            likes: {
                connect: {
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
                    increment: lessHaha ? 0 : 1
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
            id: `${session.twitter.userID}`
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