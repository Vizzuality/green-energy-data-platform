const widgetsData = [
  {
    type: 'line',
    title: {
      main: 'Energy Balance of China',
      subtitle1: '(Physical Quantity) - 2017',
      subtitle2: 'Electricity consumption (exajoules)',
    },
    data: [
      {
        value: 0,
        label: 1995,
      },
      {
        value: 50,
        label: 2000,
      },
      {
        value: 100,
        label: 2005,
      },
      {
        value: 150,
        label: 2010,
      },
      {
        value: 250,
        label: 2015,
      },
    ],
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
    title: {
      main: 'Energy Balance of energy Type',
      subtitle2: 'energy balance by type (btu,quadrillons)',
    },
    data: [
      {
        date: 1995,
        value1: 199,
        value2: 123,
      },
      {
        date: 2000,
        value1: 20,
        value2: 34,
      },
      {
        date: 2005,
        value1: 505,
        value2: 355,
      },
      {
        date: 2010,
        value1: 327,
        value2: 35,
      },
    ],
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
          fill: '#8884d8',
          stackId: 'a',
        },
        {
          dataKey: 'value2',
          fill: '#0094d8',
          stackId: 'a',
        },
      ],
      xAxis: {
        dataKey: 'date',
      },
    },
  },
];

export default widgetsData;
