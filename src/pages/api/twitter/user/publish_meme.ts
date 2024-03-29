import type { NextApiRequest, NextApiResponse } from "next";
import { Resp, Status } from "~/types/Request";
import { getSession } from "next-auth/react";
import { TwitterApi } from "twitter-api-v2";
import { prisma } from "~/db/client";

interface Request extends NextApiRequest {
  files: any;
  query: {
    status?: string;
  };
}

export default async function handler(
  req: Request,
  res: NextApiResponse<Resp>
) {
  const session = await getSession({ req });

  const { status } = req.query;

  if (!session) {
    res.status(401).json({
      success: Status.Failure,
      error: "Unauthorized",
    });
    return;
  }

  try {
    // Get image from the post request
    const imageBase64 = req.body;

    

    const user = prisma.user
      .findFirst({
        where: {
          username: session.user.username,
        },
      })
      .then(async (user) => {
        if (!user) {
          return;
        }
        const isNewLongestStreak =
          user.longest_streak < user.current_streak + 1;
        // Check if last_updated was one day ago
        const lastUpdated = new Date(user.last_updated);
        const now = new Date();
        const diff = now.getTime() - lastUpdated.getTime();
        const diffDays = diff / (1000 * 3600 * 24);
        if (diffDays > 1 && diffDays < 2) {
          await prisma.user.update({
            where: {
              username: session.user.username,
            },
            data: {
              longest_streak: isNewLongestStreak
                ? user.current_streak + 1
                : user.longest_streak,
              current_streak: user.current_streak + 1,
              last_updated: new Date(),
            },
          });
        } else if (diffDays > 2) {
          await prisma.user.update({
            where: {
              username: session.user.username,
            },
            data: {
              current_streak: 1,
              last_updated: new Date(),
            },
          });
        }
      });

    res.status(200).json({
      success: Status.Success,
      // data: data,
    });
  } catch (e: any) {
    res.status(500).json({
      success: Status.Failure,
      error: e.message,
    });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
