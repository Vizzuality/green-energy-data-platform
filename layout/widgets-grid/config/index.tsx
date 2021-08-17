const widgetData = {
  pie: [
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
  bar: [
    {
      label: 'Anhui',
      value: 199,
    },
    {
      label: 'Fujian',
      value: 20,
    },
    {
      label: 'Gansu',
      value: 505,

    },
    {
      label: 'Guangdong',
      value: 327,
    },
    {
      label: 'Guizhou',
      value: 199,

    },
    {
      label: 'Hebei',
      value: 20,
    },
    {
      label: 'Heilongjiang',
      value: 505,

    },
    {
      label: 'Henan',
      value: 327,
    },
    {
      label: 'Hubei',
      value: 199,

    },
    {
      label: 'Hunan',
      value: 20,
    },
    {
      label: 'Jiangsu',
      value: 505,

    },
    {
      label: 'Jiangxi',
      value: 327,
    },
    {
      label: 'Jilin',
      value: 199,

    },
    {
      label: 'Liaoning',
      value: 20,
    },
    {
      label: 'Qinghai',
      value: 505,

    },
    {
      label: 'Shaanxi',
      value: 327,
    },
    {
      label: 'Shandong',
      value: 327,
    },
    {
      label: 'Shanxi',
      value: 199,

    },
    {
      label: 'Sichuan',
      value: 20,
    },
    {
      label: 'Yunnan',
      value: 505,

    },
    {
      label: 'Zhejiang',
      value: 327,
    },
  ],
  line: [
    {
      value: 0,
      year: 1995,
    },
    {
      value: 50,
      year: 2000,
    },
    {
      value: 100,
      year: 2005,
    },
    {
      value: 150,
      year: 2010,
    },
    {
      value: 250,
      year: 2015,
    },
  ],
};

const widgetsConfig = {
  line: {
    height: 190,
    width: 300,
    margin: {
      top: 20, right: 0, left: 0, bottom: 0,
    },
    cartesianGrid: {
      vertical: false,
      height: '1px',
      strokeDasharray: '10 5',
    },
    lines: [
      {
        type: 'monotone',
        dataKey: 'value',
      },
    ],
    gradients: [
      {
        offset: '7.05%',
        stopColor: 'rgba(0, 107, 254, 0.64)',
        stopOpacity: 1,
      },
      {
        offset: '100%',
        stopColor: 'rgba(0, 107, 254, 0.1)',
        stopOpacity: 1,
      },
      {
        offset: '100%',
        stopColor: 'rgba(0, 107, 254, 0)',
        stopOpacity: 1,
      },
    ],
    xAxis: {
      dataKey: 'year',
    },
    yAxis: {},
    tooltip: {

    },
  },
  table: {
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
  bar: {
    height: 190,
    width: 300,
    margin: {
      top: 20, right: 0, left: 0, bottom: 100,
    },
    cartesianGrid: {
      vertical: false,
    },
    bars: [
      {
        dataKey: 'value',
      },
    ],
    yAxis: {
      tick: {
        fill: '#C4C4C4',
        fontSize: '14px',
      },
    },
    xAxis: {
      type: 'category',
      dataKey: 'label',
      interval: 0,
    },
  },
  pie: {
    height: 190,
    width: 300,
    margin: {
      top: 20, right: 0, left: 0, bottom: 0,
    },
    pies: [
      {
        dataKey: 'value',
        outerRadius: 100,
        innerRadius: 0,
      },
    ],
  },
};

export { widgetData, widgetsConfig };
