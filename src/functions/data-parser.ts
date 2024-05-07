import * as xlsx from "xlsx";
import { ScoreWithCity, type Score } from "../dtos/score";

interface ParkScoreBuffer {
  blob: ArrayBuffer | string;
}

type ParkScore = Score & {
  city: string;
};

export function parkScoreParser({ blob }: ParkScoreBuffer) {
  const data = xlsx.read(blob);
  return xlsx.utils
    .sheet_to_json<ParkScore>(data.Sheets[data.SheetNames[0]])
    .map(({ city, ...score }) => new ScoreWithCity({ city, score }));
}
