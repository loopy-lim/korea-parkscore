import { getKeys } from "../../functions/utils";
import { useScore } from "../../stores/scores";
import { ScorePercentMarker } from "./marker";
import { useEffect, useRef, useState } from "react";
import { FileGetter } from "../FileGetter";
import { Button } from "../common/Button";
import { scoreColors } from "../../constants/color";
import { scoreNames } from "../../constants/scores";
import { TooltipWithIcon } from "../Tooltip";
import { scoreWeight } from "../../constants/description";
import { clacPercent } from "../../functions/scores";

export const ScorePercentItem = () => {
  const scorePercent = useScore((state) => state.scorePercent);
  const realScorePercent = useScore((state) => state.realScorePercent);
  const setScorePercent = useScore((state) => state.setScorePercent);
  const setRealScorePercent = useScore((state) => state.setRealScorePercent);
  const scoreBarRef = useRef<HTMLDivElement>(null);
  const [selfWidth, setSelfWidth] = useState(1);
  const [draggingMarkId, setDraggingMarkId] = useState("");
  const realWidth = () => scoreBarRef.current?.offsetWidth || 100;

  const onPointerUp = () => {
    setDraggingMarkId("");
  };

  const onReset = () => {
    const percent = {
      access: realWidth() / 5,
      acreage: realWidth() / 5,
      amentities: realWidth() / 5,
      equity: realWidth() / 5,
      investment: realWidth() / 5,
    };
    setRealScorePercent(percent);
    setScorePercent(clacPercent(percent));
  };

  useEffect(() => {
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  useEffect(() => {
    const percent = {
      access: (realWidth() * scorePercent.access) / 100,
      acreage: (realWidth() * scorePercent.acreage) / 100,
      amentities: (realWidth() * scorePercent.amentities) / 100,
      equity: (realWidth() * scorePercent.equity) / 100,
      investment: (realWidth() * scorePercent.investment) / 100,
    };
    setRealScorePercent(percent);
    setScorePercent(clacPercent(percent));
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
      <div className="w-full flex justify-between items-center mx-8">
        <div className="flex items-center gap-2">
          <span className="text-lg">PARKSCORE WEIGHT</span>
          <TooltipWithIcon className="w-80 bg-[#F4F4F4] shadow-none translate-x-36">
            {scoreWeight}
          </TooltipWithIcon>
        </div>
        <div className="flex gap-4">
          <FileGetter />
          <Button onClick={onReset}>Reset</Button>
        </div>
      </div>
      <div ref={scoreBarRef} className="flex py-10">
        {getKeys(scorePercent).map((key, index) => (
          <div
            key={key}
            className="relative mt-4"
            style={{ width: `${realScorePercent[key]}px` }}
          >
            <div
              className="absolute -top-12 w-[80px]"
              style={{
                color: scoreColors[key],
              }}
            >
              <div className="font-semibold text-sm uppercase">
                {scoreNames[key]}
              </div>
              <div className="text-xl font-bold">{scorePercent[key]}%</div>
            </div>
            <div
              className="h-8"
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
