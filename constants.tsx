import React, { FC } from 'react';

type PayloadObject = {
  value: number,
};

interface TickProps {
  x: number,
  y: number,
  payload: PayloadObject
}

const Tick: FC<TickProps> = (({ x, y, payload }: TickProps) => {
  const { value } = payload;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={-10}
        dy={14}
        textAnchor="end"
        fill="#C4C4C4"
        transform="rotate(270)"
        fontSize="14px"
      >
        {value}
      </text>
    </g>
  );
});

const LabelContent = () => (
  <g>
    <text x="50%" y={480} textAnchor="middle" fill="#C4C4C4" fontSize="14px">
      Region
    </text>
  </g>
);

export const layers = [
  { id: 'layer1', label: 'layer1' },
  { id: 'layer2', label: 'layer2' },
  { id: 'layer3', label: 'layer3' },
  { id: 'layer4', label: 'layer4' },
];

export const selectedIndicator = {
  id: 1,
  type: 'pie',
  title: 'Balance',
  description: 'Metadata lorem ipsum sit amet. Donec ullamcorper nulla non metus auctor fringilla. Donec ullamcorper nulla non metus auctor fringilla. Vivamus sagittis lacus vel augue laoreet rutrum faucibus.',
  visualizationTypes: ['line', 'table', 'pie', 'bar', 'map'],
  categories: [
    {
      id: 1,
      name: 'Coal',
      active: false,
    },
    {
      id: 2,
      name: 'Coke',
      active: false,
    },
    {
      id: 3,
      name: 'Crude Oil',
      active: true,
    },
    {
      id: 4,
      name: 'Diesel Oil',
      active: false,
    },
    {
      id: 5,
      name: 'Fuel Oil',
      active: false,
    },
    {
      id: 6,
      name: 'Kerosene',
      active: false,
    },
    {
      id: 7,
      name: 'LPG',
      active: false,
    },
  ],
  categories_filters: {
    coal: ['coal1', 'coal2'],
    Coke: ['coke1', 'coke2'],
    'Crude Oil': ['crude1', 'crude2'],
    'Diesel Oil': ['diesel1', 'disel2'],
    'Fuel Oil': ['fuel1', 'fuel1'],
    Kerosene: ['kerosene1', 'kerosene2'],
    LPG: ['lgp1', 'lgp2'],
  },
  startDate: 1980,
  endDate: 2015,
  data: {
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
    line: [
      {
        value: 0,
        value2: 67,
        value3: 78,
        label: 1995,
      },
      {
        value: 50,
        value2: 45,
        value3: 89,
        label: 2000,
      },
      {
        value: 100,
        value2: 67,
        value3: 98,
        label: 2005,
      },
      {
        value: 150,
        value2: 67,
        value3: 127,
        label: 2010,
      },
      {
        value: 250,
        value2: 677,
        value3: 798,
        label: 2015,
      },
    ],
  },
  config: {
    line: {
      height: 400,
      width: '100%',
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
        dataKey: 'province',
        interval: 0,
        tick: Tick,
        label: {
          content: LabelContent,
        },
      },
    },
    pie: {
      margin: {
        // top: 20, right: 0, left: 0, bottom: 0,
      },
      pies: [
        {
          // dataKey: 'value',
          // cx: '50%',
          // cy: '50%',
          // outerRadius: 80,
        },
      ],
    },
  },
};

export const indicatorsList = [
  { id: 1, name: 'indicator1' },
  { id: 2, name: 'indicator2' },
  { id: 3, name: 'indicator3' },
  { id: 4, name: 'indicator4' },
  { id: 5, name: 'indicator5' },
  { id: 6, name: 'indicator6' },
  { id: 7, name: 'indicator7' },
  { id: 8, name: 'indicator8' },
];
export const datesList = [
  { id: 1, name: '1990' },
  { id: 2, name: '2000' },
  { id: 3, name: '2010' },
  { id: 4, name: '2020' },
];

export const colors = [
  '#1B5183',
  '#1E6D86',
  '#2A8FAF',
  '#C9E6E8',
  '#929292',
  '#766964',
  '#F8981C',
  '#760015',
];

export const filtersList = ['Total Energy Consumption', 'Total Energy Available for consumption'];
export default {
  indicatorsList,
  datesList,
  layers,
  colors,
  selectedIndicator,
  filtersList,
};
