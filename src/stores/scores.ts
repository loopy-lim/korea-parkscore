import { create } from "zustand";
import type { Score, ScoreWithCity } from "../dtos/score";
import { subscribeWithSelector } from "zustand/middleware";
import { defaultScores } from "../constants/scores";
import { devtools } from "zustand/middleware";

interface ScoreStore {
  realScores: Array<ScoreWithCity>;
  setScores: (by: Array<ScoreWithCity>) => void;
  scorePercent: Score;
  realScorePercent: Score;
  setScorePercent: (by: Score) => void;
  setRealScorePercent: (by: Score) => void;
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

export const useScore = create<ScoreStore>()(
  devtools(
    subscribeWithSelector((set) => ({
      realScores: defaultScores,
      setScores: (by) => set({ realScores: by }),
      scorePercent: defaultScore,
      realScorePercent: defaultScore,
      setRealScorePercent: (by) => set({ realScorePercent: by }),
      setScorePercent: (by) => set({ scorePercent: by }),
      selectedCityIndex: 0,
      setSelectedCityIndex: (by) => set({ selectedCityIndex: by }),
    }))
  )
);
