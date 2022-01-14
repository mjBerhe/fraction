import { useState } from "react";
import type { NextPage } from "next";

import MinuteMode from "../components/MinuteMode";

type Modes = "MinuteMode" | "Test" | null;

const Home: NextPage = () => {
  const [mode, setMode] = useState<Modes>(null);

  const resetMode = () => {
    setMode(null);
  };

  return (
    <div className="min-h-screen">
      {!mode && (
        <div className="flex flex-col h-screen items-center justify-center">
          {/* <h1 className="text-3xl font-bold mb-24">Fraction</h1> */}
          <div className="flex flex-col">
            <div>
              <button
                type="button"
                onClick={() => setMode("MinuteMode")}
                className="bg-gray-800 py-4 px-12 rounded-xl shadow-lg text-3xl hover:bg-opacity-80"
              >
                Speed Test
              </button>
            </div>
          </div>
        </div>
      )}
      {mode === "MinuteMode" && <MinuteMode resetMode={resetMode} />}
    </div>
  );
};

export default Home;
