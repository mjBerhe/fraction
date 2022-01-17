import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { GetStaticProps } from "next";
import Link from "next/link";

import { prisma } from "../lib/prisma";
import { Scores } from "@prisma/client";

interface Props {
  scores?: Scores[];
}

const Highscores: React.FC<Props> = (props) => {
  const { scores } = props;

  const headingClass = "w-1/3 text-lg font-bold bg-gray-400 text-black";

  return (
    <div className="flex flex-col h-screen">
      <div className="flex p-4 space-x-6">
        <Link href="/">Home</Link>
        <Link href="/highscores">Highscores</Link>
      </div>
      <div className="flex flex-col items-center">
        <div className="max-w-2xl w-full mx-auto text-center border-2 border-white">
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold p-2 bg-gray-300 text-black">
              Speed Test
            </h2>
            <div className="flex w-full py-2 bg-gray-300">
              <span className={headingClass}>Rank</span>
              <span className={headingClass}>Name</span>
              <span className={headingClass}>Score</span>
            </div>
            {scores
              ?.sort((a, b) => b.score - a.score)
              ?.map((score, i) => (
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

export const getServerSideProps: GetServerSideProps = async () => {
  const scores = await prisma.scores.findMany({
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
