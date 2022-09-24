import { schemePaired } from "d3";

export const CircleMarks = ({
  data,
  xScale,
  yScale,
  sizeScale,
  xField,
  yField,
  sizeField,
  textField,
}) => {
  return (
    <>
      {data?.map((each, i) => (
        <g
          key={each[textField]}
          transform={`translate(${xScale(+each[xField])},${yScale(
            +each[yField]
          )})`}
          className="circle-marks"
        >
          <circle
            fill={schemePaired[i]}
            opacity={0.85}
            r={sizeScale(+each[sizeField])}
          >
            <title>{each[textField]}</title>
          </circle>
          <text className="data-label" textAnchor="middle">
            {each[textField]}
          </text>
        </g>
      ))}
    </>
  );
};

// cx={xScale(+each[xField])}
// cy={yScale(+each[yField])}
