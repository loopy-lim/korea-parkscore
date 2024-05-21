import { create } from "zustand";
import type { Score, ScoreWithCity } from "../dtos/score";
import { subscribeWithSelector } from "zustand/middleware";
import { defaultScores } from "../constants/scores";

interface ScoreStore {
  scores: Array<ScoreWithCity>;
  setScores: (by: Array<ScoreWithCity>) => void;
  scorePercent: Score;
  realScorePercent: Score;
  setScorePercent: (by: Score) => void;
  resetScore: () => void;
  selectedCityIndex: number;
  setSelectedCityIndex: (by: number) => void;
}

const defaultScore: Score = {
  access: 20,
  acreage: 20,
  amentities: 20,
  equity: 20,
  investment: 20,
};

const clacPercent = (score: Score) => {
  const sum = Object.values(score).reduce((acc, cur) => acc + cur, 0);
  return Object.fromEntries(
    Object.entries(score).map(([key, value]) => [
      key,
      Math.round((value / sum) * 100),
    ])
  ) as unknown as Score;
};

export const useScore = create<ScoreStore>()(
  subscribeWithSelector((set) => ({
    scores: defaultScores,
    setScores: (by) => set({ scores: by }),
    scorePercent: defaultScore,
    realScorePercent: defaultScore,
    setScorePercent: (by) => {
      set({ realScorePercent: by, scorePercent: clacPercent(by) });
    },
    resetScore: () =>
      set({
        scorePercent: defaultScore,
        realScorePercent: defaultScore,
      }),
    selectedCityIndex: 0,
    setSelectedCityIndex: (by) => set({ selectedCityIndex: by }),
  }))
);
