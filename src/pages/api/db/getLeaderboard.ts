import type { NextApiRequest, NextApiResponse } from "next";
import { Resp, Status } from "~/types/Request";
import { getSession } from "next-auth/react";
import { prisma } from "~/db/client";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Resp>
) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({
      success: Status.Failure,
      error: "Unauthorized",
    });
    return;
  }

    const users = await prisma.user.findMany({
        orderBy: {
            lmfaoCoins: "desc"
        },
        take: 10
    });

    // Remove email from every user
    const usersWithoutEmail = users.map(user => {
        const { email, ...userWithoutEmail } = user;
        return userWithoutEmail;
    });

    res.status(200).json({
        success: Status.Success,
        data: usersWithoutEmail
    });

}
