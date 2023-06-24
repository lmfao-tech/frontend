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
      session.user.email.toLowerCase() == "dhravyashah@gmail.com"
    )
  ) {
    res.status(401).json({
      success: Status.Failure,
      error: "Unauthorized",
    });
    return;
  }

  const url_ = `https://api.lmfao.tech/supermod?password=yousussybaka&word=${word}&url=${url}&users=${users}&action=${action?action: "add"}`;


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
