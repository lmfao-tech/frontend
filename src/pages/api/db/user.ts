// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Resp, Status } from "~/types/Request";
import { getSession } from "next-auth/react";
import { prisma } from "~/db/client";
import { Novu } from "@novu/node";

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
      OR: [
        {
          username: {
            equals: username ?? session?.user.username
          }
        },
        {
          email: {
            equals: session?.user.email
          }
        }
      ]
    },
    include: {
      likes: true,
    },
  });

  if (!user && !username) {
    const newUser = await prisma.user.create({
      data: {
        id: `${session?.user.id}`,
        username: session?.user.username!,
        name: session!.user.name!,
        email: session?.user!.email!,
        pfp: session?.user.image!,
        hahaCoins: 100,
        lmfaoCoins: 0,
      },
      include: {
        likes: true,
      },
    });

    const novu = new Novu(process.env.NOVU!);

    await novu.subscribers.identify(session?.user.username!, {
      firstName: session?.user.name,
    })

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
