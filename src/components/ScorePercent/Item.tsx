import { getKeys } from "../../functions/utils";
import style from "./index.module.scss";
import { useScore } from "../../stores/scores";
import { ScorePercentMarker } from "./marker";
import { useEffect, useRef, useState } from "react";
import { FileGetter } from "../FileGetter";
import { Button } from "../common/Button";
import { scoreColors } from "../../constants/color";

export const ScorePercentItem = () => {
  const scorePercent = useScore((state) => state.scorePercent);
  const realScorePercent = useScore((state) => state.realScorePercent);
  const setScorePercent = useScore((state) => state.setScorePercent);
  const scoreBarRef = useRef<HTMLDivElement>(null);
  const [selfWidth, setSelfWidth] = useState(1);
  const [draggingMarkId, setDraggingMarkId] = useState("");
  const realWidth = () => scoreBarRef.current?.offsetWidth || 100;

  const onPointerUp = () => {
    setDraggingMarkId("");
  };

  const onReset = () => {
    setScorePercent({
      access: realWidth() / 5,
      acreage: realWidth() / 5,
      amentities: realWidth() / 5,
      equity: realWidth() / 5,
      investment: realWidth() / 5,
    });
  };

  useEffect(() => {
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  useEffect(() => {
    setScorePercent({
      access: (realWidth() * scorePercent.access) / 100,
      acreage: (realWidth() * scorePercent.acreage) / 100,
      amentities: (realWidth() * scorePercent.amentities) / 100,
      equity: (realWidth() * scorePercent.equity) / 100,
      investment: (realWidth() * scorePercent.investment) / 100,
    });
  }, [selfWidth]);

  useEffect(() => {
    setSelfWidth(realWidth);
    const onResize = () => {
      setSelfWidth(realWidth);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <div className={style.scoreWeightTitle}>
        <span>PARKSCORE WEIGHT</span>
        <div className={style.buttonGroup}>
          <FileGetter />
          <Button onClick={onReset}>Reset</Button>
        </div>
      </div>
      <div ref={scoreBarRef} className={style.scoreBar}>
        {getKeys(scorePercent).map((key, index) => (
          <div
            className={style.weightPer}
            key={key}
            style={{ width: `${realScorePercent[key]}px` }}
          >
            <div
              className={style.scoreText}
              style={{
                left: Math.min(realScorePercent[key] - 85, 0),
                right: Math.max(realScorePercent[key] - 85, 0),
                color: scoreColors[key],
              }}
            >
              <div className={style.title}>{key}</div>
              <div className={style.scoreNumber}>{scorePercent[key]}%</div>
            </div>
            <div
              className={style.h8}
              style={{
                backgroundColor: scoreColors[key],
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
