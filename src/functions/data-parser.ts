import * as xlsx from "xlsx";
import { Score, ScoreWithCity } from "../dtos/score";

interface ParkScoreBuffer {
  blob: ArrayBuffer | string;
}

interface ParkScore extends Score {
  city: string;
}

export function parkScoreParser({ blob }: ParkScoreBuffer) {
  const data = xlsx.read(blob);
  return xlsx.utils
    .sheet_to_json<ParkScore>(data.Sheets[data.SheetNames[0]])
    .map(({ city, ...score }) => new ScoreWithCity({ city, score }));
}
