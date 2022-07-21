// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Resp, Status } from "~/types/Request";
import { getSession } from "next-auth/react";
import { TwitterApi } from "twitter-api-v2";
import fs from "fs";

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

  const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY!,
    appSecret: process.env.TWITTER_API_SECRET!,
    accessToken: session.tokens.authToken,
    accessSecret: session.tokens.authSecret,
  });

  try {
    // Get image from the post request
    const imageBase64 = req.body;
    const buff = Buffer.from(
      imageBase64.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const mediaId = await client.v1.uploadMedia(buff   , {
      type: "png",
      target: "tweet",
    });
    const data = await client.v2.tweet(status ? `${status} #LMFAOtech` : "#LMFAOtech", {
      media: {media_ids: [mediaId]},
    });

    res.status(200).json({
      success: Status.Success,
      //   data: data,
    });
  } catch (e: any) {
    res.status(500).json({
      success: Status.Failure,
      error: e.message,
    });
  }
}
