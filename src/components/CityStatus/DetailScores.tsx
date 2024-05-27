import { useEffect, useRef, useState } from "react";
import { scoreColors } from "../../constants/color";
import type { Score } from "../../dtos/score";
import { getKeys } from "../../functions/utils";

interface DetailScoresProps {
  scores: Score;
}

const textWidth = 8 * 16;
const textPadding = 1 * 16;

export const DetailScores = ({ scores }: DetailScoresProps) => {
  const ref = useRef<HTMLUListElement>(null);
  const [width, setWidth] = useState(100);

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
      {getKeys(scores).map((key) => (
        <li className="flex justify-center" key={key}>
          <div
            className="w-32 text-right pr-4 uppercase text-xl"
            style={{
              color: scoreColors[key],
            }}
          >
            {key}
          </div>
          <div className="flex-1">
            <div
              className="h-6"
              style={{
                backgroundColor: scoreColors[key],
                width: `${(width * scores[key]) / 100}px`,
              }}
            ></div>
          </div>
        </li>
      ))}
    </ul>
  );
};
