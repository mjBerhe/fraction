import type { NextPage } from "next";
import { GetStaticProps } from "next";
import Link from "next/link";

import { prisma } from "../lib/prisma";
import { Scores } from "@prisma/client";

interface Props {
  scores: Scores[];
}

const Highscores: NextPage<Props> = (props: Props) => {
  const { scores } = props;
  return (
    <div className="flex flex-col h-screen">
      <div className="flex p-4 space-x-6">
        <Link href="/">Home</Link>
        <Link href="/highscores">Highscores</Link>
      </div>
      <div className="flex flex-col items-center">
        <div className="max-w-2xl w-full mx-auto text-center border border-white">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold p-2">Speed Test</h2>
            <div className="flex w-full py-2">
              <span className="w-1/3 text-lg">Rank</span>
              <span className="w-1/3 text-lg">Name</span>
              <span className="w-1/3 text-lg">Score</span>
            </div>
            {scores
              .sort((a, b) => b.score - a.score)
              .map((score, i) => (
                <div key={score.id} className="flex w-full py-2">
                  <span className="w-1/3 text-lg">{i + 1}</span>
                  <span className="w-1/3 text-lg">{score.username}</span>
                  <span className="w-1/3 text-lg">{score.score}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const scores = await prisma?.scores.findMany({
    select: {
      username: true,
      score: true,
      gameMode: true,
    },
  });

  return {
    props: { scores },
  };
};

export default Highscores;
