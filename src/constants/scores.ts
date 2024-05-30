import type { Score, ScoreWithCity } from "../dtos/score";

export const MAX_LIST_ROW = 20;

export const scoreNames: Record<keyof Score, string> = {
  access: "접근",
  acreage: "면적",
  amentities: "투자",
  equity: "공평",
  investment: "시설",
};

export const defaultScores: Array<ScoreWithCity> = [
  {
    city: "서울특별시",
    score: {
      access: 100,
      acreage: 100,
      amentities: 100,
      equity: 100,
      investment: 100,
    },
  },
  {
    city: "부산광역시",
    score: {
      access: 95,
      acreage: 95,
      amentities: 95,
      equity: 95,
      investment: 95,
    },
  },
  {
    city: "대구광역시",
    score: {
      access: 90,
      acreage: 90,
      amentities: 90,
      equity: 90,
      investment: 90,
    },
  },
  {
    city: "인천광역시",
    score: {
      access: 85,
      acreage: 85,
      amentities: 85,
      equity: 85,
      investment: 85,
    },
  },
  {
    city: "광주광역시",
    score: {
      access: 80,
      acreage: 80,
      amentities: 80,
      equity: 80,
      investment: 80,
    },
  },
  {
    city: "대전광역시",
    score: {
      access: 75,
      acreage: 75,
      amentities: 75,
      equity: 75,
      investment: 75,
    },
  },
  {
    city: "울산광역시",
    score: {
      access: 60,
      acreage: 60,
      amentities: 60,
      equity: 60,
      investment: 60,
    },
  },
];
