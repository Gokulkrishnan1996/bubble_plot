import { axisBottom, select } from "d3";
import { useEffect, useRef } from "react";

export const XAxis = ({ xScale, innerHeight }) => {
  const ref = useRef();

  useEffect(() => {
    const xAxisG = select(ref.current);
    const xAxis = axisBottom(xScale).tickSize(10);
    xAxisG.call(xAxis);
  }, [xScale]);
  return <g ref={ref} transform={`translate(0,${innerHeight / 2})`} />;
};
