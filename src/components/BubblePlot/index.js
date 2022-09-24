import { scaleLinear, extent, scaleSqrt } from "d3";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { CircleMarks } from "./CircleMarks";
import { XAxis } from "./XAxis";
import { YAxis } from "./YAxis";

const width = 960;
const height = 500;
const margin = { top: 30, right: 30, bottom: 70, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;

const minRadius = 35;
const maxRadius = 55;

function padExtent(e) {
  return [e[0] - e[0] * 0.3, e[1] + e[1] * 0.3];
}

const BubblePlot = ({
  data,
  xField,
  yField,
  sizeField,
  textField,
  xAxisLabel,
  yAxisLabel,
}) => {
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xScale = useMemo(
    () =>
      scaleLinear()
        .domain(padExtent(extent(data, (d) => +d[xField])))
        .range([0, innerWidth]),
    [data, xField, innerWidth]
  );

  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain(padExtent(extent(data, (d) => +d[yField])))
        .range([innerHeight, 0]),
    [data, yField, innerHeight]
  );

  const sizeScale = useMemo(
    () =>
      scaleSqrt()
        .domain(extent(data, (d) => +d[sizeField]))
        .range([minRadius, maxRadius]),
    [data, sizeField]
  );

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <YAxis yScale={yScale} innerWidth={innerWidth} />
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset},${
            innerHeight / 2
          }) rotate(-90)`}
        >
          {yAxisLabel}
        </text>

        <XAxis xScale={xScale} innerHeight={innerHeight} />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>

        <CircleMarks
          data={data}
          xScale={xScale}
          yScale={yScale}
          sizeScale={sizeScale}
          xField={xField}
          yField={yField}
          sizeField={sizeField}
          textField={textField}
        />
      </g>
    </svg>
  );
};

BubblePlot.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  xField: PropTypes.string.isRequired,
  yField: PropTypes.string.isRequired,
  sizeField: PropTypes.string.isRequired,
  textField: PropTypes.string.isRequired,
  xAxisLabel: PropTypes.string.isRequired,
  yAxisLabel: PropTypes.string.isRequired,
};

BubblePlot.defaultProps = {
  data: [],
};

export default BubblePlot;
