import React from "react";

interface BarChartProps {
  bars: number[];
  titleId: string;
}

const BarChart: React.FC<BarChartProps> = ({ bars, titleId }) => {
  const getColorBasedOnValue = (value: number): string => {
    if (value <= 25) {
      return "#C83042";
    } else if (value > 25 && value <= 40) {
      return "#bf4c20";
    } else if (value > 40 && value <= 65) {
      return "#f28729";
    } else {
      return "#16732d";
    }
  };

  return (
    <div className="flex flex-col items-end w-full text-dark chart-info-box">
      {!titleId && (
        <select name="recent" id={titleId}>
          <option value="5">Last 5</option>
          <option value="next">Upper 5</option>
        </select>
      )}
      <div className="relative w-full simple-bar-chart">
        {bars.map((barValue, index) => (
          <div
            key={index}
            className="item"
            style={
              {
                "--clr": getColorBasedOnValue(barValue),
                "--val": `${barValue}`,
              } as React.CSSProperties
            }
          >
            <div className="label">{index + 1}</div>
            <div className="value">{barValue}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;
