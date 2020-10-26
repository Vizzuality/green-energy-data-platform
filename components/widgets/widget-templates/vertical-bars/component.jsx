import React from 'react';
import Chart from 'components/recharts';

import config from './config';

import data from './constants';

const Bars = () => {
  const { chartConfig, chartData } = config.parse(data);

  return (
    <div>
      <div className="c-widget">
        <Chart
          data={chartData}
          config={chartConfig}
        />
      </div>
    </div>
  );
};

export default Bars;
