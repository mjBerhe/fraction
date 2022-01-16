import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, gameMode, score } = req.body;

  try {
    const submittedScore = await prisma.scores.create({
      data: {
        username,
        gameMode,
        score,
      },
    });
    res.status(200).json({ message: "Successfully submitted score" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export default handler;
