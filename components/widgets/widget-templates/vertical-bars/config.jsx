import React from 'react';
import WidgetTooltip from 'components/widgets/widget-tooltip';

export const CONFIG = {
  parse: (data) => ({
    chartData: data,
    chartConfig: {
      height: 500,
      margin: {
        top: 20,
        right: 0,
        left: 0,
        bottom: 20,
      },
      cartesianGrid: {
        vertical: true,
        horizontal: false,
        strokeDasharray: '5 20',
      },
      xKey: 'name',
      yKeys: {
        bars: {
          uv: {
            barSize: 20,
            fill: 'grey',
          },
        },
      },
      referenceLines: [{
        y: 0,
        stroke: 'black',
        strokeDasharray: 'solid',
        fill: 'black',
        opacity: '1',
        label: null,
      }],
      xAxis: {
        dataKey: 'name',
        tick: {
          fontSize: 12,
          fill: 'rgba(0, 0, 0, 0.54)',
        },
        tickCount: 6,
      },
      yAxis: {
        dataKey: 'uv',
        tick: {
          fontSize: 10,
          fill: 'rgba(0,0,0,0.54)',
        },
        tickFormatter: (value) => Math.round(value),
        interval: 0,
        width: 100,
      },
      tooltip: {
        cursor: false,
        // eslint-disable-next-line react/prop-types
        content: ({ payload }) => (
          <WidgetTooltip
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'column',
              alignItems: 'center',
              alignContent: 'center',
            }}
            payload={payload}
            title="Title"
            // eslint-disable-next-line react/prop-types
            settings={payload.map((bar) => ({
              label: bar.dataKey,
              color: bar.color,
              key: bar.dataKey,
              format: (value) => value,
            }))}
          />
        ),
      },
    },
  }),
};

export default CONFIG;
