import type { NextApiRequest, NextApiResponse } from "next";
import { Resp, Status } from "~/types/Request";
import { prisma } from '~/db/client';
import { getSession } from "next-auth/react";

interface Req extends NextApiRequest {
  query: {
    id: string;
  }
}

export default async function handler(
  req: Req,
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

  const { id } = req.query;

  if (id === null) {
    res.status(400).json({
      success: Status.Failure,
      error: "Invalid query",
    })
  }

  const mod = await prisma.mods.findFirst({
    where: {
      id: session.twitter.twitterHandle
    }
  })

  if (mod === null) {
    return res.status(403).json({
      success: Status.Failure,
      error: "Forbidden Acess: Mod privelages are needed to access this endpoint",
    })
  }

  await fetch(
    `https://api.lmfao.tech/remove_meme?id=${id}&by=${session.twitter.twitterHandle}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.AUTH || "",
      },
    }
  );
  
  res.status(200).json({
    success: Status.Success,
    data: "done"
  })
    
}