import type { Score } from "../../dtos/score";
import { getKeys } from "../../functions/utils";
import style from "./index.module.scss";
import { useScore } from "../../stores/scores";
import { ScorePercentMarker } from "./marker";
import { useEffect, useRef, useState } from "react";

const colors: Record<keyof Score, string> = {
  access: "#34b233",
  acreage: "#bed600",
  amentities: "#0073cf",
  equity: "#009fda",
  investment: "#a44dc4",
};

export const ScorePercentItem = () => {
  const scorePercent = useScore((state) => state.scorePercent);
  const scoreBarRef = useRef<HTMLDivElement>(null);
  const [selfWidth, setSelfWidth] = useState(1);

  useEffect(() => {
    setSelfWidth(scoreBarRef.current?.offsetWidth || 1);
    const onResize = () => {
      setSelfWidth(scoreBarRef.current?.offsetWidth || 1);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <div className={style.scoreBar}>
        {getKeys(scorePercent).map((key) => (
          <div
            key={key}
            style={{
              width: `${scorePercent[key]}%`,
              color: colors[key],
            }}
          >
            <div className={style.title}>{key}</div>
            <div className={style.scoreNumber}>{scorePercent[key]}%</div>
          </div>
        ))}
      </div>
      <div ref={scoreBarRef} className={style.scoreBar}>
        {getKeys(scorePercent).map((key, index) => (
          <div
            className={style.weightPer}
            key={key}
            style={{ width: `${scorePercent[key]}%` }}
          >
            <div
              className={style.h8}
              style={{
                backgroundColor: colors[key],
              }}
            ></div>
            {index !== getKeys(scorePercent).length - 1 && (
              <ScorePercentMarker
                keys={getKeys(scorePercent)}
                index={index}
                selfWidth={selfWidth}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};
