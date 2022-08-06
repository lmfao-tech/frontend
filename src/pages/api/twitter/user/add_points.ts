import type { NextApiRequest, NextApiResponse } from "next";
import { Resp, Status } from "~/types/Request";
import { prisma } from "~/db/client";

type Request = NextApiRequest & {
  query: {
    secret: string;
    user: string;
    points: number;
  };
};
export default async function handler(
  req: Request,
  res: NextApiResponse<Resp>
) {
  const { secret, user, points } = req.query;

  if (secret !== process.env.AUTH) {
    res.status(401).json({
      success: Status.Failure,
      error: "Unauthorized",
    });
    return;
  }

  const updated = await prisma.user.updateMany({
    where: {
      name: user,
    },
    data: {
      lmfaoCoins: {
        increment: Number(points),
      },
    },
  });
  if (updated.count === 0) {
    res.status(404).json({
      success: Status.Failure,
      error: "User does not exist",
    });
    return;
  }
  res.status(200).json({
    success: Status.Success,
    data: {
      message: "Points added successfully",
    },
  });
}
