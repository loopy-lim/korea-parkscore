import type { ScoreWithCity } from "../../dtos/score";
import { nth } from "../../functions/utils";
import { CitySearch } from "./CitySearch";

const tempText = `
국가는 여자의 복지와 권익의 향상을 위하여 노력하여야 한다. 비상계엄이 선포된 때에는 법률이 정하는 바에 의하여 영장제도, 언론·출판·집회·결사의 자유, 정부나 법원의 권한에 관하여 특별한 조치를 할 수 있다.
재판의 심리와 판결은 공개한다. 다만, 심리는 국가의 안전보장 또는 안녕질서를 방해하거나 선량한 풍속을 해할 염려가 있을 때에는 법원의 결정으로 공개하지 아니할 수 있다.`;

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
              <span className="text-3xl">{rank + 1}</span>
              <span className="text-xl">{nth(rank + 1)}</span>
            </h3>
          </div>
        </div>
        <div className="text-sm text-gray-500">{tempText}</div>
        <CitySearch />
      </div>
    </div>
  );
};
