import { Score } from "../../dtos/score";
import { cn, getKeys } from "../../functions/utils";
import { useScore } from "../../stores/scores";
import { Button } from "../common/Button";
import { FileGetter } from "../FileGetter";
import style from "./index.module.scss";

const colors: Record<keyof Score, string> = {
  access: "#34b233",
  acreage: "#bed600",
  amentities: "#0073cf",
  equity: "#009fda",
  investment: "#a44dc4",
};

export const ScorePercent = () => {
  const resetScore = useScore((state) => state.resetScore);
  const scorePercent = useScore((state) => state.scorePercent);

  const onReset = () => {
    resetScore();
  };

  return (
    <div className={style.scorePercentWapper}>
      <div className={style.scoreWeightTitle}>
        <span>PARKSCORE WEIGHT</span>
        <div className={style.buttonGroup}>
          <FileGetter />
          <Button onClick={onReset}>Reset</Button>
        </div>
      </div>
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
      <div className={cn(style.scoreBar, style.withHeight4)}>
        {getKeys(scorePercent).map((key) => (
          <div
            key={key}
            style={{
              width: `${scorePercent[key]}%`,
              backgroundColor: colors[key],
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};
