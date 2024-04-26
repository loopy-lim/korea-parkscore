import { useScore } from "../../stores/scores";
import { Button } from "../common/Button";
import { FileGetter } from "../FileGetter";
import style from "./index.module.scss";
import { ScorePercentItem } from "./Item";

export const ScorePercent = () => {
  const resetScore = useScore((state) => state.resetScore);

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
      <ScorePercentItem />
    </div>
  );
};
