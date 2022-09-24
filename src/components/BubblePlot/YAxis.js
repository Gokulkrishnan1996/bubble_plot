import { axisLeft, select } from "d3";
import { useEffect, useRef } from "react";

export const YAxis = ({ yScale, innerWidth }) => {
  const ref = useRef();

  useEffect(() => {
    const yAxisG = select(ref.current);
    const yAxis = axisLeft(yScale).ticks(6).tickSize(10);
    yAxisG.call(yAxis);
  }, [yScale]);
  return <g ref={ref} transform={`translate(${innerWidth / 2},0)`} />;
};
