import style from "./index.module.scss";
import { ScorePercentItem } from "./Item";

export const ScorePercent = () => {
  return (
    <div className={style.scorePercentWapper}>
      <ScorePercentItem />
    </div>
  );
};
