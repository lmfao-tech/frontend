import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Resp, Status } from "~/types/Request";

type Data = any;

type Request = NextApiRequest & {
  query: {
    word?: string;
    url?: string;
    users?: string;
    action: string;
  };
};

export default async function response(
  req: Request,
  res: NextApiResponse<Data>
) {
  let { word, url, users, action } = req.query;

  console.log(word, url, users, action);

  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({
      success: Status.Failure,
      error: "Unauthorized",
    });
    return;
  }
  if (
    !(
      session.twitter.twitterHandle.toLowerCase() == "dhravyashah" ||
      session.twitter.twitterHandle.toLowerCase() == "yash72274544"
    )
  ) {
    res.status(401).json({
      success: Status.Failure,
      error: "Unauthorized",
    });
    return;
  }

  const url_ = `http://localhost:8000/supermod?password=yousussybaka&word=${word}&url=${url}&users=${users}&action=${action?action: "add"}`;

  console.log(url_);

  const resp = await fetch(url_, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.AUTH || "",
    },
  });

  const data = await resp.json();
  res.status(200).json(data);
}
