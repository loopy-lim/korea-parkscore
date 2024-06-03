import { useRef, type MouseEvent } from "react";
import type { Score } from "../../dtos/score";
import { useScore } from "../../stores/scores";
import { clacPercent } from "../../functions/scores";

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
  const setRealScorePercent = useScore((state) => state.setRealScorePercent);
  const realScorePercent = useScore((state) => state.realScorePercent);
  const mouseRef = useRef<number>(0);

  const onPointerDown = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { clientX } = e;
    mouseRef.current = clientX;
    setDraggingMarkId(keys[index] as string);
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

    const percent = {
      ...realScorePercent,
      [keys[index]]: currentPercent,
      [keys[index + 1]]: nextPercent,
    };
    setScorePercent(clacPercent(percent));
    setRealScorePercent(percent);
  };

  return (
    <button
      onPointerMove={onSliderMove}
      onPointerDown={onPointerDown}
      className="absolute top-0 right-0 z-[2] translate-x-5 hover:z-[3] hover:translate-x-[84px] hover:px-16"
    >
      <img
        className="h-[2.6rem] min-h-[2.6rem] w-[2.6rem] min-w-[2.6rem]"
        src="marker-slider.svg"
        alt={`${keys[index]} mark`}
      />
    </button>
  );
};
