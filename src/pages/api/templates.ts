import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;

export default async function response(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const resp = await fetch(`https://api.lmfao.tech/templates`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.AUTH || "",
      },
    });
    const data = await resp.json();

    res.status(200).json(data);
  } catch (e: any) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
}
