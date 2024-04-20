import { create } from "zustand";
import type { Score, ScoreWithCity } from "../dtos/score";
import { subscribeWithSelector } from "zustand/middleware";

interface ScoreStore {
  scores: ScoreWithCity[];
  setScores: (by: ScoreWithCity[]) => void;
  scorePercent: Score;
  setScorePercent: (by: Score) => void;
  resetScore: () => void;
}

export const useScore = create<ScoreStore>()(
  subscribeWithSelector((set) => ({
    scores: [],
    setScores: (by) => set({ scores: by }),
    scorePercent: {
      access: 20,
      acreage: 20,
      amentities: 20,
      equity: 20,
      investment: 20,
    },
    setScorePercent: (by) => set({ scorePercent: by }),
    resetScore: () =>
      set({
        scorePercent: {
          access: 20,
          acreage: 20,
          amentities: 20,
          equity: 20,
          investment: 20,
        },
      }),
  }))
);
