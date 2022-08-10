import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Resp, Status } from "~/types/Request";

type Request = NextApiRequest & {
    query: {
        id: string;
    }
}

export default async function response(
    req: Request,
    res: NextApiResponse<Resp>
) {

    const session = await getSession({ req });

    if (!session) {
        res.status(401).json({
            success: Status.Failure,
            error: "Unauthorized"
        })
        return
    }

    const { id } = req.query;

    if (!id) {
        res.status(400).json({
            success: Status.Failure,
            error: "Invalid query"
        })
        return
    }


    try {
        const resp = await fetch(
            "https://api.lmfao.tech/meme?id=" + id,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: process.env.AUTH || "",
                },
            }
        );
        const data = await resp.json();

        res.status(200).json(data);
    } catch (e: any) {
        res.status(500).json({
            success: Status.Failure,
            error: e,
        });
    }
}
