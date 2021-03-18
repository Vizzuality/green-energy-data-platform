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
  {
    type: 'bar',
    title: {
      main: 'Energy Balance of energy Type',
      subtitle2: 'energy balance by type (btu,quadrillons)',
    },
    data: [
      {
        province: 'Anhui',
        value1: 199,
        value2: 123,
      },
      {
        province: 'Fujian',
        value1: 20,
        value2: 34,
      },
      {
        province: 'Gansu',
        value1: 505,
        value2: 355,
      },
      {
        province: 'Guangdong',
        value1: 327,
        value2: 35,
      },
      {
        province: 'Guizhou',
        value1: 199,
        value2: 123,
      },
      {
        province: 'Hebei',
        value1: 20,
        value2: 34,
      },
      {
        province: 'Heilongjiang',
        value1: 505,
        value2: 355,
      },
      {
        province: 'Henan',
        value1: 327,
        value2: 35,
      },
      {
        province: 'Hubei',
        value1: 199,
        value2: 123,
      },
      {
        province: 'Hunan',
        value1: 20,
        value2: 34,
      },
      {
        province: 'Jiangsu',
        value1: 505,
        value2: 355,
      },
      {
        province: 'Jiangxi',
        value1: 327,
        value2: 35,
      },
      {
        province: 'Jilin',
        value1: 199,
        value2: 123,
      },
      {
        province: 'Liaoning',
        value1: 20,
        value2: 34,
      },
      {
        province: 'Qinghai',
        value1: 505,
        value2: 355,
      },
      {
        province: 'Shaanxi',
        value1: 327,
        value2: 35,
      },
      {
        province: 'Shandong',
        value1: 327,
        value2: 35,
      },
      {
        province: 'Shanxi',
        value1: 199,
        value2: 123,
      },
      {
        province: 'Sichuan',
        value1: 20,
        value2: 34,
      },
      {
        province: 'Yunnan',
        value1: 505,
        value2: 355,
      },
      {
        province: 'Zhejiang',
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
          fill: 'red',
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
    title: {
      main: 'Cost&Benefits',
      subtitle2: 'cost-benefit analysis of coal-fired power plant regulations',
    },
    data: [
      {
        label: 'General system charges',
        value: 8.0,
      },
      {
        label: 'Taxes',
        value: 14.2,
      },
      {
        label: 'Network and size costs',
        value: 15.4,
      },
      {
        label: 'Supplying costs',
        value: 62.4,
      },
    ],
    config: {
      margin: {
        top: 20, right: 0, left: 0, bottom: 0,
      },
      cartesianGrid: {
        vertical: false,
      },
      pies: [
        {
          dataKey: 'value',
          cx: '50%',
          cy: '50%',
          fill: '#8884d8',
          outerRadius: 90,
          innerRadius: 70,
        },
      ],
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
