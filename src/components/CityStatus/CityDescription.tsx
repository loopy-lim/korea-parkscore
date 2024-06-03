import { clacScores } from "../../functions/scores";
import { nth } from "../../functions/utils";
import { useScore } from "../../stores/scores";
import { CitySearch } from "./CitySearch";

const description =
  "아래의 검색창을 통해 지역의 순위와 접근, 면적, 투자, 공평, 시설 지표의 점수를 확인할 수 있습니다";

export const CityDescription = () => {
  const selectedCityIndex = useScore((state) => state.selectedCityIndex);
  const realScores = useScore((state) => state.realScores);
  const scorePercent = useScore((state) => state.scorePercent);
  const scores = clacScores(realScores, scorePercent, Infinity);
  const cityName = scores[selectedCityIndex].city;
  const selectedCityScore =
    realScores.find((score) => score.city === cityName) || realScores[0];

  return (
    <div className="flex gap-8 items-center">
      <img
        className="min-w-36 min-h-36 rounded-2xl w-40 h-40"
        src={`/city-logo/${selectedCityScore.city}.png`}
        alt={`${selectedCityScore.city} 로고`}
      />
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-400">CITY</h2>
            <h3 className="text-2xl font-extrabold">
              {selectedCityScore.city}
            </h3>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold text-gray-400">RANKING</h2>
            <h3 className="font-extrabold flex justify-start">
              <span className="text-3xl">{+selectedCityIndex + 1}</span>
              <span className="text-xl">{nth(+selectedCityIndex + 1)}</span>
            </h3>
          </div>
        </div>
        <div className="text-lg py-4">{description}</div>
        <CitySearch />
      </div>
    </div>
  );
};
