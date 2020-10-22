import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'components/recharts';

import config from './config';

import data from './constants';

const Bars = () => {

  const { chartConfig, chartData, zeros } = config.parse(data);

  return (
    <div>
      <div className="c-widget">
        {/* {zeros.length
          ?
          <Chart
            data={chartData}
            config={chartConfig}
          />
          : <div className="widget-text">No data found matching filter criteria</div>
        } */}
      </div>
    </div>
  );
};

Bars.propTypes = {
  data: PropTypes.array.isRequired,
  id: PropTypes.array.isRequired
};

export default Bars;
