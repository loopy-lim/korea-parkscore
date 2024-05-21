import { useScore } from "../../stores/scores";
import { CityDescription } from "./CityDescription";

export const CityStatus = () => {
  const selectedCityIndex = useScore((state) => state.selectedCityIndex);
  const scores = useScore((state) => state.scores);

  return (
    <>
      <CityDescription
        selectedCityScore={scores[selectedCityIndex]}
        rank={selectedCityIndex}
      />
    </>
  );
};
