// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Resp, Status } from "~/types/Request";
import { getSession } from "next-auth/react";
import { prisma } from "~/db/client";
// import { Novu } from "@novu/node";

type Request = NextApiRequest & {
  query: {
    username?: string;
  };
};

export default async function handler(
  req: Request,
  res: NextApiResponse<Resp>
) {
  const session = await getSession({ req });
  const { username } = req.query;

  if (!username && !session) {
    res.status(401).json({
      success: Status.Failure,
      error: "Unauthorized",
    });
    return;
  }

  const user = await prisma.user.findFirst({
    where: {
      OR: {
        username: username ? username : session?.user.username,
        email: session?.user.email,
      }
    },
    include: {
      likes: true,
    },
  });

  if (!user && !username) {
    const newUser = await prisma.user.create({
      data: {
        id: `${session?.user.id}`,
        name: session?.user.name!,
        pfp:  session?.user.image!,
        username: session?.user.username!,
        email: session?.user!.email!,
        hahaCoins: 50,
        lmfaoCoins: 0,
      },
      include: {
        likes: true,
      },
    });
    
    // const novu = new Novu(process.env.NOVU!);

    // novu.subscribers.identify(session?.user.id!, {
    //   firstName: session?.user.name,
    // })

    return res.status(200).json({
      success: Status.Success,
      data: newUser,
    });
  } else if (!user && username) {
    res.status(404).json({
      success: Status.Failure,
      error: "User not found",
    });
    return;
  }

  if (!user) {
    res.status(404).json({
      success: Status.Failure,
      error: "User not found",
    });
    return;
  }

  const isMod = await prisma.mods.findFirst({
    where: {
      id: username ? username : session?.user.username,
    },
  });

  // Get the user's ranking in the leaderboard
  const rank =
    (await prisma.user.count({
      where: {
        OR: [
          {
            lmfaoCoins: {
              gt: user.lmfaoCoins,
            },
          },
        ],
      },
    })) + 1;

  return res.status(200).json({
    success: Status.Success,
    data: {
      ...user,
      ...{
        mod: isMod !== null,
        rank,
      },
    },
  });
}
