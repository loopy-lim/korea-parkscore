import { chosungIncludes, hangulIncludes } from "es-hangul";
import { useScore } from "../../stores/scores";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { cn } from "../../functions/utils";
import { clacScores } from "../../functions/scores";

export const CitySearch = () => {
  const realScores = useScore((state) => state.realScores);
  const cityNames = realScores.map((score) => score.city);
  const setSelectedCityIndex = useScore((state) => state.setSelectedCityIndex);
  const scorePercent = useScore((state) => state.scorePercent);
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const [isOnFocus, setIsOnFocus] = useState(false);
  const [searchWord, setSearchWord] = useState("");

  const onInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchWord = e.target.value;
    setSearchWord(searchWord);
    const chosungResult = cityNames.filter((city) =>
      chosungIncludes(city, searchWord)
    );

    if (chosungResult.length === 0) {
      const hangulResult = cityNames.filter((city) =>
        hangulIncludes(city, searchWord)
      );
      if (hangulResult.length === 0) {
        setSearchResult(
          cityNames.filter((city) => city.includes(searchWord)).slice(0, 5)
        );
        return;
      }
      setSearchResult(hangulResult.slice(0, 5));
      return;
    }
    setSearchResult(chosungResult.slice(0, 5));
    if (searchWord === "") setSearchResult([]);
  };

  const onSearchResultClick = (searchKeyword: string) => () => {
    setIsOnFocus(false);
    showResult(searchKeyword);
  };

  const showResult = (city: string) => {
    setSearchWord("");
    setSearchResult([]);
    if (city === undefined || city.length === 0) return;
    const scores = clacScores(realScores, scorePercent, Infinity);
    const index = scores.findIndex((score) => score.city === city);
    if (index === -1) return;
    setSelectedCityIndex(index);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const city = searchResult[0] || searchWord;
    showResult(city);
  };

  const onOutSideClick = (e: MouseEvent) => {
    if (e.target instanceof HTMLElement) {
      if (e.target.closest("form") === null) {
        setIsOnFocus(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("click", onOutSideClick);
    return () => window.removeEventListener("click", onOutSideClick);
  }, []);

  return (
    <div className="relative">
      <form className="flex relative" onSubmit={onSubmit}>
        <input
          onFocus={() => setIsOnFocus(true)}
          onChange={onInputSearch}
          value={searchWord}
          type="text"
          placeholder="City Name"
          className="bg-transparent border p-2 w-full"
        />
        <button className="p-2 cursor-pointer bg-black text-gray-300 px-8">
          Search
        </button>
      </form>
      {isOnFocus && searchResult.length !== 0 && (
        <div className="absolute top-10 p-3 border bg-white rounded-md w-full">
          {searchResult.map((city, index) => (
            <button
              key={city}
              className={cn(
                "p-2 hover:bg-slate-200 block w-full text-left cursor-pointer",
                index !== 0 && "text-gray-500"
              )}
              onClick={onSearchResultClick(city)}
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
