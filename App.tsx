import React, { useState } from "react";
import Landing from "./components/Landing";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import { AppStage, ParsedResult, CosmicDetails } from "./types";
import { analyzeArchetype } from "./services/geminiService";

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.LANDING);
  const [result, setResult] = useState<ParsedResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lastAnswers, setLastAnswers] = useState<Record<number, string> | null>(
    null
  );
  const [lastCosmicDetails, setLastCosmicDetails] =
    useState<CosmicDetails | null>(null);

  const handleStart = () => {
    setStage(AppStage.QUIZ);
  };

  const handleQuizComplete = async (
    answers: Record<number, string>,
    cosmicDetails: CosmicDetails
  ) => {
    // Store the answers and cosmic details for retry
    setLastAnswers(answers);
    setLastCosmicDetails(cosmicDetails);

    setStage(AppStage.ANALYZING);

    // Calculate counts for A, B, C, D, E
    const counts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
    Object.values(answers).forEach((val) => {
      if (counts[val] !== undefined) {
        counts[val]++;
      }
    });

    try {
      const analysisResult = await analyzeArchetype(counts, cosmicDetails);
      setResult(analysisResult);
      setStage(AppStage.RESULTS);
    } catch (error) {
      console.error(error);
      setErrorMsg(
        "The spirits are overwhelmed (API Overloaded). Please try again in a moment."
      );
      setStage(AppStage.ERROR);
    }
  };

  const handleRetake = () => {
    setResult(null);
    setStage(AppStage.LANDING);
    setErrorMsg(null);
    setLastAnswers(null);
    setLastCosmicDetails(null);
  };

  const handleRetryFromError = async () => {
    if (lastAnswers && lastCosmicDetails) {
      setErrorMsg(null);
      await handleQuizComplete(lastAnswers, lastCosmicDetails);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-rose-900 selection:text-white">
      {stage === AppStage.LANDING && <Landing onStart={handleStart} />}

      {stage === AppStage.QUIZ && <Quiz onComplete={handleQuizComplete} />}

      {stage === AppStage.ANALYZING && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-t-2 border-rose-600 rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-r-2 border-purple-600 rounded-full animate-spin animation-delay-200"></div>
            <div className="absolute inset-4 border-b-2 border-zinc-600 rounded-full animate-spin animation-delay-500"></div>
          </div>
          <p className="mt-8 text-zinc-400 text-sm uppercase tracking-[0.3em] animate-pulse">
            Consulting the Stars...
          </p>
        </div>
      )}

      {stage === AppStage.RESULTS && result && (
        <Results result={result} onRetake={handleRetake} />
      )}

      {stage === AppStage.ERROR && (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-8">
          <h2 className="text-2xl font-display text-rose-500 mb-4">
            Analysis Failed
          </h2>
          <p className="text-zinc-400 max-w-md mb-6">{errorMsg}</p>

          <div className="max-w-md mb-8 p-4 border border-zinc-800 bg-zinc-900/30 rounded-sm">
            <p className="text-xs text-zinc-500 leading-relaxed mb-3">
              This project is open-source and relies on free tiers. Consider
              supporting the developer to help expand capacity and create more
              software like this.
            </p>
            <a
              href="https://github.com/RafayYousafzai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-zinc-300 hover:text-rose-500 transition-colors uppercase tracking-widest"
            >
              Support on GitHub
            </a>
          </div>

          <button
            onClick={handleRetryFromError}
            className="px-6 py-2 border border-zinc-700 hover:bg-zinc-900 transition-colors uppercase text-xs tracking-widest"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
