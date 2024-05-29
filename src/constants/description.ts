import type { Score } from "../dtos/score";

export const scoreWeight =
  "지표(접근, 면적, 투자, 공평, 시설)의 가중치를 화살표로 이동시켜 도시의 ParkScore 순위에 어떤 영향을 미치는지 확인할 수 있습니다.";

export const scoreDescription: Record<keyof Score, string> = {
  access: "도시공원 반경 0.75km 거주 인구 비율을 통한 점수화",
  acreage: "평균 도시공원 크기와 도시 공원 부지 비율을 통한 점수화",
  amentities: "3개년 지자체별 도시공원 예산안 비율을 통한 점수화",
  equity: "Gini 계수를 활용한 도시에 존재하는 도시공원 평향성을 통한 점수화",
  investment: "도시공원 내 시설물 총 함계 비율을 통한 점수화",
};
