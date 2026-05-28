import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { name = "world" } = req.query;
        res.status(200).json({ message: `Hello, ${name}!` });
    }
}
