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
  const realScorePercent = useScore((state) => state.realScorePercent);
  const setScorePercent = useScore((state) => state.setScorePercent);
  const scoreBarRef = useRef<HTMLDivElement>(null);
  const [selfWidth, setSelfWidth] = useState(1);
  const [draggingMarkId, setDraggingMarkId] = useState("");

  const onPointerUp = () => {
    setDraggingMarkId("");
  };

  useEffect(() => {
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  useEffect(() => {
    const realWidth = () => scoreBarRef.current?.offsetWidth || 100;
    setScorePercent({
      access: (realWidth() * scorePercent.access) / 100,
      acreage: (realWidth() * scorePercent.acreage) / 100,
      amentities: (realWidth() * scorePercent.amentities) / 100,
      equity: (realWidth() * scorePercent.equity) / 100,
      investment: (realWidth() * scorePercent.investment) / 100,
    });
  }, [selfWidth]);

  useEffect(() => {
    setSelfWidth(scoreBarRef.current?.offsetWidth || 100);
    const onResize = () => {
      setSelfWidth(scoreBarRef.current?.offsetWidth || 100);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <div ref={scoreBarRef} className={style.scoreBar}>
        {getKeys(scorePercent).map((key, index) => (
          <div
            className={style.weightPer}
            key={key}
            style={{ width: `${realScorePercent[key]}px` }}
          >
            <div
              key={key}
              className={style.scoreText}
              style={{
                left: Math.min(realScorePercent[key] - 80, 0),
                color: colors[key],
              }}
            >
              <div className={style.title}>{key}</div>
              <div className={style.scoreNumber}>{scorePercent[key]}%</div>
            </div>
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
                draggingMarkId={draggingMarkId}
                setDraggingMarkId={setDraggingMarkId}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};
