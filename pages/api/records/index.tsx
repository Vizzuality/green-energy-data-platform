import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json([
    {
      id: 1,
      title: 'Balance',
      visualizationTypes: ['line', 'table', 'pie', 'bar'],
      categories: ['Coal', 'Coke', 'Crude Oil', 'Diesel Oil', 'Fuel Oil', 'Kerosene', 'LPG'],
      categories_filters: {
        coal: ['coal1', 'coal2'],
        Coke: ['coke1', 'coke2'],
        'Crude Oil': ['crude1', 'crude2'],
        'Diesel Oil': ['diesel1', 'diesel2'],
        'Fuel Oil': ['fuel1', 'fuel1'],
        Kerosene: ['kerosene1', 'kerosene2'],
        LPG: ['lgp1', 'lgp2'],
      },
      startDate: 1980,
      endDate: 2015,
      range: 10,
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
            {
              type: 'monotone',
              dataKey: 'value2',
            },
            {
              type: 'monotone',
              dataKey: 'value3',
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
            dataKey: 'label',
          },
          yAxis: {

          },
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
              dataKey: 'value1',
              stackId: 'a',
            },
            {
              dataKey: 'value2',
              stackId: 'a',
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
            tick: 'Tick',
            label: {
              content: 'LabelContent',
            },
          },
        },
        pie: {
          margin: {
            top: 20, right: 0, left: 0, bottom: 0,
          },
          pies: [
            {
              dataKey: 'value',
              cx: '50%',
              cy: '50%',
              outerRadius: 80,
            },
          ],
        },
      },
    },
  ]);
};
