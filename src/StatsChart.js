import React from 'react';
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory';
import './StatsChart.css';

const StatsChart = ({
  data,
  tickCount,
  tickFormat,
  x,
  y
}) => {
  return (
    <div className="StatsChart">
      <VictoryChart
        domainPadding={20}
        height={150}
        padding={{
          bottom: 34,
          left: 0,
          right: 0,
          top: 0
        }}
      >
        <VictoryBar
          data={data}
          style={{ data: { fill: "#4db546" } }}
          x={x}
          y={y}
        />
        <VictoryAxis
          tickCount={tickCount}
          tickFormat={tickFormat}
          style={{
            axis: {stroke: "#ddd"},
            tickLabels: {
              fontFamily: 'inherit',
              fontWeight: 500
            }
          }}
        />
      </VictoryChart>
    </div>
  )
};

export default StatsChart;
