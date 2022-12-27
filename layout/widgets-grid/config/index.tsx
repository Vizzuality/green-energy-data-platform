import { format } from 'd3-format';

const numberFormat = format('.2s');

const DefaultTick = {
  fill: '#3A3F59',
  opacity: 0.5,
  fontSize: '12px',
};

const DefaultLayout = {
  height: 200,
  width: 300,
};

const CONFIG = (categories, language) => {
  const KEY = language === 'cn' ? '总量' : 'Total';
  const getLines = () => {
    if (categories.length) {
      return categories.map((category) => ({
        type: 'monotone',
        dataKey: category,
        dot: false,
      }));
    }
    return ([{
      type: 'monotone',
      dataKey: KEY,
      dot: false,
    }]);
  };

  const getBars = () => {
    if (categories.length) {
      return categories.map((category) => ({
        stackId: 'a',
        dataKey: category,
      }));
    }
    return ([{
      stackId: 'a',
      dataKey: KEY,
    }]);
  };
  return ({
    line: {
      ...DefaultLayout,
      margin: {
        top: 30,
        left: -10,
        right: 10,
      },
      cartesianGrid: {
        vertical: false,
        height: '1px',
        strokeDasharray: '10 5',
      },
      lines: getLines(),
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
        tick: DefaultTick,
        interval: 'preserveStartEnd',
      },
      yAxis: {
        tick: DefaultTick,
        tickFormatter: (value) => numberFormat(value),
      },
    },
    bar: {
      ...DefaultLayout,
      margin: {
        top: 30,
        left: -10,
        right: 10,
      },

      cartesianGrid: {
        vertical: false,
      },
      bars: getBars(),
      yAxis: {
        tick: DefaultTick,
      },
      xAxis: {
        type: 'category',
        dataKey: 'label',
        interval: 0,
        tick: DefaultTick,
      },
    },
    pie: {
      height: 200,
      width: 200,
      margin: 'auto',
      pies: [
        {
          dataKey: 'value',
          outerRadius: 100,
          innerRadius: 0,
        },
      ],
    },
    choropleth: {
      hadLegend: false,
      margin: {
        top: 30,
      },
    },
  });
};

export default CONFIG;
