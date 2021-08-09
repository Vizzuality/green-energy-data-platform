import React from 'react';

const widgetsData = [
  {
    type: 'line',
    config: {
      margin: {
        top: 20, right: 0, left: 0, bottom: 0,
      },
      cartesianGrid: {
        vertical: false,
      },
      lines: [
        {
          type: 'monotone',
          dataKey: 'value',
          stroke: '#8884d8',
        },
      ],
      xAxis: {
        dataKey: 'date',
      },
    },
  },
  {
    type: 'bar',
    config: {
      margin: {
        top: 20, right: 0, left: 0, bottom: 0,
      },
      cartesianGrid: {
        vertical: false,
      },
      bars: [
        {
          dataKey: 'value',
          fill: '#8884d8',
        },
      ],
      xAxis: {
        dataKey: 'province',
      },
    },
  },
  {
    type: 'stacked_bar',
    title: {
      main: 'Energy Balance of energy Type',
      subtitle2: 'energy balance by type (btu,quadrillons)',
    },
    config: {
      margin: {
        top: 20, right: 0, left: 0, bottom: 0,
      },
      cartesianGrid: {
        vertical: false,
      },
      bars: [
        {
          dataKey: 'value1',
          stackId: 'a',
        },
        {
          dataKey: 'value2',
          stackId: 'a',
        },
      ],
      xAxis: {
        dataKey: 'province',
      },
    },
  },
  {
    type: 'pie',
    config: {
      margin: {
        top: 20, right: 0, left: 0, bottom: 0,
      },
      cartesianGrid: {
        vertical: false,
      },
      pies: [
        {
          nameKey: 'label',
          dataKey: 'value',
          cx: '50%',
          cy: '50%',
          outerRadius: 90,
          innerRadius: 70,
        },
      ],
      tooltip: {
        content: (payload) => (
          <div />
        ),
      },
    },
  },
  {
    type: 'table',
    title: {
      main: 'Cost&Energy balance table by region',
      subtitle2: 'electricity consumption (exajoules)',
    },
    data: {
      headers: ['Region name', 1995, 2000, 2005, 2010, 2015],
      items: [
        {
          label: 'Beijing',
          value: [
            {
              label: 1995,
              value: 50,
            },
            {
              label: 2000,
              value: 70,
            },
            {
              label: 2005,
              value: 84,
            },
            {
              label: 2010,
              value: 88,
            },
            {
              label: 2015,
              value: 90,
            },
          ],
        },
        {
          label: 'Chengdu',
          value: [
            {
              label: 1995,
              value: 60,
            },
            {
              label: 2000,
              value: 64,
            },
            {
              label: 2005,
              value: 60,
            },
            {
              label: 2010,
              value: 72,
            },
            {
              label: 2015,
              value: 84,
            },
          ],
        },
        {
          label: 'Guizhou',
          value: [
            {
              label: 1995,
              value: 70,
            },
            {
              label: 2000,
              value: 74,
            },
            {
              label: 2005,
              value: 60,
            },
            {
              label: 2010,
              value: 82,
            },
            {
              label: 2015,
              value: 20,
            },
          ],
        },
        {
          label: 'Shanghai',
          value: [
            {
              label: 1995,
              value: 60,
            },
            {
              label: 2000,
              value: 65,
            },
            {
              label: 2005,
              value: 72,
            },
            {
              label: 2010,
              value: 90,
            },
            {
              label: 2015,
              value: 50,
            },
          ],
        },
        {
          label: 'Shenyang',
          value: [
            {
              label: 1995,
              value: 54,
            },
            {
              label: 2000,
              value: 64,
            },
            {
              label: 2005,
              value: 74,
            },
            {
              label: 2010,
              value: 84,
            },
            {
              label: 2015,
              value: 94,
            },
          ],
        },
        {
          label: 'Wuhan',
          value: [
            {
              label: 1995,
              value: 54,
            },
            {
              label: 2000,
              value: 59,
            },
            {
              label: 2005,
              value: 54,
            },
            {
              label: 2010,
              value: 60,
            },
            {
              label: 2015,
              value: 63,
            },
          ],
        },
      ],
    },
  },
];

export default widgetsData;
