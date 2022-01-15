import type { NextPage } from "next";
import { InferGetStaticPropsType, GetStaticProps } from "next";
import Link from "next/link";

import { prisma } from "../lib/prisma";
import { Scores } from "@prisma/client";

interface Props {
  scores: Scores[];
}

const Highscores = (props: Props) => {
  const { scores } = props;
  return (
    <div className="flex flex-col h-screen">
      <div className="flex p-4 space-x-6">
        <Link href="/">Home</Link>
        <Link href="/highscores">Highscores</Link>
      </div>
      <div className="flex flex-col">
        {scores.map((score) => (
          <div key={score.id} className="flex space-x-4">
            <span>Score: {score.score}</span>
            <span>Name: {score.username}</span>
          </div>
        ))}
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
