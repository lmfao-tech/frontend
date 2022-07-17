// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Resp, Status } from '~/types/Request'
import { getSession } from "next-auth/react";
import { prisma } from '~/db/client';

export default async function handler(
  req: NextApiRequest,
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

    const user = await prisma.user.findFirst({
        where: {
            id: `${session.twitter.userID}` 
        },
        include: {
            likes: true
        }
    })

    if (!user) {
        const newUser = await prisma.user.create({
            data: {
                id: `${session.twitter.userID}`,
                name: session.user!.name!,
                email: session.user!.email!,
                hahaCoins: 100,
                lmfaoCoins: 0
            },
            include: {
                likes: true
            }
        })
        return res.status(200).json({
            success: Status.Success,
            data: newUser
        })
    }

    return res.status(200).json({
        success: Status.Success,
        data: user
    })

}