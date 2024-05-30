import * as xlsx from "xlsx";
import { ScoreWithCity, type Score } from "../dtos/score";

interface ParkScoreBuffer {
  blob: ArrayBuffer | string;
}

type ParkScore = {
  도시명: string;
  "접근 점수": number;
  "면적 점수": number;
  "투자 점수": number;
  "공평 점수": number;
  "시설 점수": number;
  "총 점수": number;
  순위: number;
};

export function parkScoreParser({ blob }: ParkScoreBuffer) {
  const data = xlsx.read(blob);
  return xlsx.utils
    .sheet_to_json<ParkScore>(data.Sheets[data.SheetNames[0]])
    .map(
      (pasredScore) =>
        new ScoreWithCity({
          city: pasredScore.도시명,
          score: {
            access: Math.round(pasredScore["접근 점수"]),
            acreage: Math.round(pasredScore["면적 점수"]),
            amentities: Math.round(pasredScore["투자 점수"]),
            equity: Math.round(pasredScore["공평 점수"]),
            investment: Math.round(pasredScore["시설 점수"]),
          },
        })
    );
}
