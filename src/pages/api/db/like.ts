// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Resp, Status } from '~/types/Request'
import { getSession } from "next-auth/react";
import { prisma } from '~/db/client';
import { Novu } from '@novu/node';

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
            email: session.user.email
        },
        include: {
            likes: true
        }
    })

    if (user === null) {
        user = await prisma.user.create({
            data: {
                id: `${session.user.id}`,
                name: session.user.name,
                email: session.user.email,
                pfp:  session?.user.image!,
                username: session.user.username,
                hahaCoins: 50,
                lmfaoCoins: 0
            },
            include: {
                likes: true
            }
        })
        
        const novu = new Novu(process.env.NOVU!);

        await novu.subscribers.identify(session.user.id!, {
            firstName: session?.user.name,
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
                        email : session.user.email
                    },
                    create: {
                        id: `${session.user.id}`,
                        name: session.user.name,
                        email: session.user.email,
                        username: session.user.username,
                        pfp:  session?.user.image!,
                        hahaCoins: 49,
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
                        email: session.user.email
                    },
                    create: {
                        id: `${session.user.id}`,
                        name: session.user.name,
                        email: session.user.email,
                        username: session.user.username,
                        pfp:  session?.user.image!,
                        hahaCoins: 49,
                        lmfaoCoins: 0,
                    }
                }
            }
        }
    })
    
    await prisma.user.update({
        where: {
            email: session.user.email
        },
        data: {
            hahaCoins: {
                decrement: lessHaha ? 0 : 1
            },
            likes: {
                connect: {
                    id: id
                }
            },
            lmfaoCoins: {
                increment: lessHaha ? 0 : 1
            }
        }
    })

    try {        
        await prisma.user.update({
            where: {
                id: `${authorId}`
            },
            data: {
                lmfaoCoins: {
                    increment: lessHaha ? 0 : 5
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
            email: session.user.email
        },
        include: {
            likes: true
        }
    })

    const novu = new Novu(process.env.NOVU!);

    await novu.trigger('likedyourpost', {
        to: { 
          subscriberId: authorId
        },
        payload: {
          who: `${session.user.id}`,
          id: id
        }
    });

    return res.status(200).json({
        success: Status.Success,
        data: {
             likes, user: daUser
        }
    })

}