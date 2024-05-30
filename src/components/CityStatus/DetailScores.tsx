import { useEffect, useRef, useState } from "react";
import { scoreColors } from "../../constants/color";
import { getKeys } from "../../functions/utils";
import { scoreNames } from "../../constants/scores";
import { TooltipWithIcon } from "../Tooltip";
import { scoreDescription } from "../../constants/description";
import { useScore } from "../../stores/scores";

const textWidth = 10 * 8;
const textPadding = 1 * 16;

export const DetailScores = () => {
  const ref = useRef<HTMLUListElement>(null);
  const [width, setWidth] = useState(100);
  const scoreIndex = useScore((state) => state.selectedCityIndex);
  const realScores = useScore((state) => state.realScores)[scoreIndex].score;

  const onResize = () => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth - (textWidth + textPadding));
    }
  };

  useEffect(() => {
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [ref.current]);

  return (
    <ul className="flex flex-col gap-4 my-12" ref={ref}>
      <div className="uppercase font-bold text-3xl">scores</div>
      {getKeys(realScores).map((key) => (
        <li className="flex justify-center items-center" key={key}>
          <div
            className="w-16 pr-4"
            style={{
              color: scoreColors[key],
            }}
          >
            <div className="text-lg font-semibold flex gap-2 w-32">
              {scoreNames[key]}
              <TooltipWithIcon className="w-48 bg-[#E2E2E2] shadow-none translate-x-28 translate-y-16">
                <div className="text-black">{scoreDescription[key]}</div>
              </TooltipWithIcon>
            </div>
            <div className="text-3xl font-bold">{realScores[key]}</div>
          </div>
          <div className="w-8"></div>
          <div className="flex-1">
            <div
              className="h-6 rounded-full"
              style={{
                backgroundColor: scoreColors[key],
                width: `${(width * realScores[key]) / 100}px`,
              }}
            ></div>
          </div>
        </li>
      ))}
    </ul>
  );
};
