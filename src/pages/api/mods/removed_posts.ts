import type { NextApiRequest, NextApiResponse } from "next";
import { Resp, Status } from "~/types/Request";
import { prisma } from "~/db/client";
import { getSession } from "next-auth/react";

interface Req extends NextApiRequest {
  query: {
    last: string;
    max_tweets: string;
  };
}

export default async function handler(req: Req, res: NextApiResponse<Resp>) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({
      success: Status.Failure,
      error: "Unauthorized",
    });
    return;
  }

  const mod = await prisma.mods.findFirst({
    where: {
      id: session.user.id,
    },
  });

  if (mod === null) {
    return res.status(403).json({
      success: Status.Failure,
      error:
        "Forbidden access: Mod privileges are needed to access this endpoint",
    });
  }

  const { last, max_tweets } = req.query;
  const resp = await fetch(
    `https://api.lmfao.tech/removed_memes?last=${last}&max_tweets=${max_tweets}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.AUTH || "",
      },
    }
  );
  const data = await resp.json();

  res.status(200).json(data);
}
