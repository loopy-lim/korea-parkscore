import { sum } from "lodash";
import type { Score, ScoreWithCity } from "../dtos/score";
import { getKeys, getValues } from "./utils";
import { MAX_LIST_ROW } from "../constants/scores";

export const clacScores = (
  realScores: Array<ScoreWithCity>,
  scorePercent: Score,
  row = MAX_LIST_ROW
) => {
  return realScores
    .map((score) => ({
      city: score.city,
      score: getKeys(score.score).reduce((acc, cur) => {
        acc[cur] = score.score[cur] * scorePercent[cur];
        return acc;
      }, {} as Score),
    }))
    .sort((a, b) => {
      const aMax = sum(getValues(a.score));
      const bMax = sum(getValues(b.score));
      return bMax - aMax;
    })
    .slice(0, row);
};

export const clacPercent = (score: Score) => {
  return Object.fromEntries(
    Object.entries(score).map(([key, value]) => [
      key,
      Math.round((value / sum(getValues(score))) * 100),
    ])
  ) as Score;
};
