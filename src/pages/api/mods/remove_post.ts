import type { NextApiRequest, NextApiResponse } from "next";
import { Resp, Status } from "~/types/Request";
import { getSession } from "next-auth/react";

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

}
