import { useEffect, useRef, useState } from "react";
import { useScore } from "../../stores/scores";
import * as d3 from "d3";
import style from "./index.module.scss";
import { scoreColors } from "../../constants/color";
import { maxListRow } from "../../constants/scores";
import { cn, getKeys } from "../../functions/utils";

const lineHight = 40;
const drawHeight = 20;
const leftPadding = 8 * 16;

export const ScoreList = () => {
  const scores = useScore((state) => state.scores);
  const scorePercent = useScore((state) => state.scorePercent);
  const wapperRef = useRef<HTMLDivElement | null>(null);
  const [selectedCityIndex, setSelectedCityIndex] = useState(0);
  const [hoverCityIndex, setHoverCityIndex] = useState(-1);

  const maxScore = scores.reduce((acc, cur) => {
    const curMax = Object.values(cur.score).reduce((acc, cur) => cur + acc, 0);
    return acc > curMax ? acc : curMax;
  }, 0);
  const cities = scores.map((score) => score.city);

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
      scores
        .map((score) => {
          const maxWidth = (wapperRef.current?.clientWidth || 0) - leftPadding;
          return scoreKeys.reduce((cur, key) => {
            const width =
              ((score.score[key] / maxScore) * maxWidth * scorePercent[key]) /
              20;
            cur[key] = Math.round(width);
            return cur;
          }, {} as Record<string, number>);
        })
        .sort((a, b) => b.score - a.score)
    );

    chart
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
            .attr("width", (d) => d[1] - d[0])
            .attr("class", (_, i) =>
              cn(
                `${i}` === `${selectedCityIndex}` ? "" : style.nonSelected,
                `${i}` === `${hoverCityIndex}` ? style.hover : ""
              )
            )
            .attr("data-index", (_, i) => i)
            .on("click", (e) => {
              setSelectedCityIndex(e.target.getAttribute("data-index"));
            })
            .on("mouseover", (e) => {
              setHoverCityIndex(e.target.getAttribute("data-index"));
            })
            .on("mouseout", () => {
              setHoverCityIndex(-1);
            }),
        (update) => update.attr("x", (d) => d[0] + leftPadding),
        (exit) => exit.remove()
      )
      .transition();

    const yAxis = d3.axisLeft(
      d3
        .scaleBand()
        .domain(cities)
        .range([0, Math.min(scores.length, maxListRow) * lineHight])
    );

    // append city name
    chart
      .insert("g")
      .attr("class", cn(style.bcYAxis, style.bcAxis))
      .call(yAxis)
      .transition()
      .duration(300);

    // append score number circle
    d3.select("svg")
      .append("g")
      .selectAll("circle")
      .data(cities)
      .enter()
      .append("circle")
      .attr("cx", leftPadding - 20)
      .attr("cy", (_, i) => i * lineHight + 10)
      .attr("r", 8)
      .attr("fill", (_, i) =>
        `${i}` === `${selectedCityIndex}` ? "black" : "#eeeeee"
      )
      .transition();
    // append score number
    d3.select("svg")
      .append("g")
      .selectAll("text")
      .data(cities)
      .enter()
      .append("text")
      .attr("x", leftPadding - 20)
      .attr("y", (_, i) => i * lineHight + 12)
      .attr("font-size", "12px")
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .attr("fill", (_, i) =>
        `${i}` === `${selectedCityIndex}` ? "white" : "#4a4a4a"
      )
      .text((_, i) => i + 1)
      .transition();

    return () => {
      chart.remove();
    };
  }, [scores, scorePercent, selectedCityIndex, hoverCityIndex]);

  return <div ref={wapperRef}></div>;
};
