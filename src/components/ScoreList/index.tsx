import { useEffect, useRef } from "react";
import { useScore } from "../../stores/scores";
import * as d3 from "d3";
import { scoreColors } from "../../constants/color";
import { maxListRow } from "../../constants/scores";
import { getKeys } from "../../functions/utils";

const lineHight = 30;
const drawHeight = 15;
const leftPadding = 8 * 16;

export const ScoreList = () => {
  const scores = useScore((state) => state.scores);
  const scorePercent = useScore((state) => state.scorePercent);
  const wapperRef = useRef<HTMLDivElement | null>(null);

  const maxScore = scores.reduce((acc, cur) => {
    const curMax = Object.values(cur.score).reduce((acc, cur) => cur + acc, 0);
    return acc > curMax ? acc : curMax;
  }, 0);

  useEffect(() => {
    const chart = d3
      .select(wapperRef.current)
      .append("svg")
      .attr("width", wapperRef.current?.clientWidth || 0)
      .attr("height", Math.min(scores.length, maxListRow) * lineHight)
      .attr("viewBox", [
        0,
        0,
        wapperRef.current?.clientWidth || 0,
        Math.min(scores.length, maxListRow) * lineHight,
      ])
      .attr("style", "max-width:100%; height:auto;");

    const scoreKeys = getKeys(scores[0].score) as string[];
    const layers = d3.stack().keys(scoreKeys)(
      scores.map((score) => {
        const maxWidth = (wapperRef.current?.clientWidth || 0) - leftPadding;
        return scoreKeys.reduce((cur, key) => {
          const width =
            ((score.score[key] / maxScore) * maxWidth * scorePercent[key]) / 20;
          cur[key] = Math.round(width);
          return cur;
        }, {} as Record<string, number>);
      })
    );

    chart
      .append("g")
      .selectAll("g")
      .data(layers)
      .enter()
      .append("g")
      .attr("fill", (_, i) => scoreColors[scoreKeys[i]]) //  row
      .selectAll("rect")
      .data((d) => d)
      .join(
        (enter) =>
          enter
            .append("rect")
            .attr("x", (d) => d[0] + leftPadding)
            .attr("y", (_, i) => i * lineHight)
            .attr("height", drawHeight)
            .attr("width", (d) => d[1] - d[0]),
        (update) => update.attr("x", (d) => d[0] + leftPadding),
        (exit) => exit.remove()
      )
      .transition();

    return () => {
      chart.remove();
    };
  }, [scores, scorePercent]);

  return <div ref={wapperRef}></div>;
};
