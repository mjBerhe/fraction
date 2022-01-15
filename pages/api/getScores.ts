import { SubmitScore } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

type Data = {
  name?: string;
  error?: string;
  scores?: SubmitScore[] | undefined;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;

  if (method === "GET") {
    try {
      const scores: SubmitScore[] = await prisma.submitScore.findMany();
      res.status(200).json({ scores });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "error" });
    }
  }

  // res.status(200).json({ name: "John Doe" });
}
