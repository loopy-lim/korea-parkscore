import { useRef, type MouseEvent } from "react";
import style from "./index.module.scss";
import type { Score } from "../../dtos/score";
import { useScore } from "../../stores/scores";

interface ScorePercentMarkerProps {
  keys: (keyof Score)[];
  index: number;
  draggingMarkId: string;
  setDraggingMarkId: (value: string) => void;
}

export const ScorePercentMarker = ({
  keys,
  index,
  draggingMarkId,
  setDraggingMarkId,
}: ScorePercentMarkerProps) => {
  const setScorePercent = useScore((state) => state.setScorePercent);
  const realScorePercent = useScore((state) => state.realScorePercent);
  const mouseRef = useRef<number>(0);

  const onPointerDown = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { clientX } = e;
    mouseRef.current = clientX;
    setDraggingMarkId(keys[index]);
  };

  const onSliderMove = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (draggingMarkId !== keys[index]) return;
    const next = realScorePercent[keys[index + 1]];
    const curent = realScorePercent[keys[index]];
    const delta = e.clientX - mouseRef.current;
    mouseRef.current = e.clientX;

    const nextPercent = next - delta;
    const currentPercent = curent + delta;
    if (nextPercent < 0 || currentPercent < 0) return;

    setScorePercent({
      ...realScorePercent,
      [keys[index]]: currentPercent,
      [keys[index + 1]]: nextPercent,
    });
  };

  return (
    <button
      onPointerMove={onSliderMove}
      onPointerDown={onPointerDown}
      className={style.scoreSlider}
    >
      <img src="marker-slider.svg" alt={`${keys[index]} mark`} />
    </button>
  );
};