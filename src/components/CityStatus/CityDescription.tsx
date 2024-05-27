import type { ScoreWithCity } from "../../dtos/score";
import { nth } from "../../functions/utils";
import { CitySearch } from "./CitySearch";

const tempText = `아래의 검색창을 통해 지역의 순위와 접근, 면적, 투자, 공평, 시설 지표의 점수를 확인할 수 있습니다`;

interface CityDescriptionProps {
  selectedCityScore: ScoreWithCity;
  rank: number;
}

export const CityDescription = ({
  selectedCityScore,
  rank,
}: CityDescriptionProps) => {
  return (
    <div className="flex gap-4">
      <img src="https://placehold.co/200" alt="tmp city" />
      <div className="flex flex-col gap-2">
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
              <span className="text-3xl">{+rank + 1}</span>
              <span className="text-xl">{nth(+rank + 1)}</span>
            </h3>
          </div>
        </div>
        <div className="text-lg py-4">{tempText}</div>
        <CitySearch />
      </div>
    </div>
  );
};
