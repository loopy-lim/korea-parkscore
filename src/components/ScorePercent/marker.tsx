import { useEffect, useState, type MouseEvent } from "react";
import style from "./index.module.scss";
import type { Score } from "../../dtos/score";
import { useScore } from "../../stores/scores";

interface ScorePercentMarkerProps {
  keys: (keyof Score)[];
  index: number;
  selfWidth: number;
}

export const ScorePercentMarker = ({
  keys,
  index,
  selfWidth,
}: ScorePercentMarkerProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const setScorePercent = useScore((state) => state.setScorePercent);
  const scorePercent = useScore((state) => state.scorePercent);

  const onPointerDown = () => {
    setIsDragging(true);
  };
  const onPointerUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  const onSliderMove = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isDragging) return;
    const next = scorePercent[keys[index + 1]];
    const curent = scorePercent[keys[index]];

    console.log(e.screenX, e.pageX, e.clientX, selfWidth);

    const percent = e.movementX;
    const nextPercent = next - percent;
    const currentPercent = curent + percent;
    if (nextPercent < 0 || currentPercent < 0) return;

    setScorePercent({
      ...scorePercent,
      [keys[index]]: currentPercent,
      [keys[index + 1]]: nextPercent,
    });
  };

  return (
    <button
      onPointerMove={onSliderMove}
      onPointerDown={onPointerDown}
      className={style.scoreSlider}
      // style={{
      //   transform: `translateX(${translate - 2}px)`,
      // }}
    >
      <img src="marker-slider.svg" alt={`${keys[index]} mark`} />
    </button>
  );
};
