export const groups = [
  {
    id: 'energy',
    name: 'Energy',
    status: 'active',
    color: 'color1',
  },
  {
    id: 'socio-economic',
    name: 'Socio-economic',
    status: 'disabled',
    color: 'color1',
  },
  {
    id: 'coal-power-plant',
    name: 'Coal power plant',
    status: 'disabled',
    color: 'color1',
  },
];

export const groupsLanding = [
  {
    id: 'energy',
    title: 'Energy',
    subtitle: 'Global Energy Investment.',
    description: 'Metadata lorem ipsum sit amet. Donec ullamcorper nulla non metus auctor fringilla. Donec ullamcorper nulla non metus auctor fringilla. Vivamus sagittis lacus vel augue laoreet rutrum faucibus.',
    href: '/energy',
    src: 'images/landing/energy.png',
  },
  {
    id: 'socio-economic',
    title: 'Socio economic',
    subtitle: 'Agriculture.',
    description: 'Metadata lorem ipsum sit amet. Donec ullamcorper nulla non metus auctor fringilla. Donec ullamcorper nulla non metus auctor fringilla. Vivamus sagittis lacus vel augue laoreet rutrum faucibus.',
    href: '/socio-economic',
    src: 'images/landing/socio-economic.png',
  },
  {
    id: 'coal-power-plant',
    title: 'Coal power plants',
    subtitle: 'Capacity power plants in China.',
    description: 'Metadata lorem ipsum sit amet. Donec ullamcorper nulla non metus auctor fringilla. Donec ullamcorper nulla non metus auctor fringilla. Vivamus sagittis lacus vel augue laoreet rutrum faucibus.',
    href: '/coal-power-plants',
    src: 'images/landing/coal-power-plants.png',
  },
];

export const layers = [
  { id: 'layer1', label: 'layer1' },
  { id: 'layer2', label: 'layer2' },
  { id: 'layer3', label: 'layer3' },
  { id: 'layer4', label: 'layer4' },
];

export const relatedIndicators = ['widget1', 'widget2', 'widget3', 'widget4', 'widget5'];
export const selectedIndicator = {
  id: 1,
  type: 'area',
  title: 'Energy Balance of China',
  visualizationTypes: ['line', 'table'],
  categories: ['Total energy consumption', 'Total energy available for consumption'],
  startDate: 1980,
  endDate: 2015,
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
      height: '1px',
      strokeDasharray: '10 5',
    },
    areas: [
      {
        type: 'monotone',
        dataKey: 'value',
        stroke: '#8884d8',
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
};

export const indicatorsList = ['indicator1', 'indicator2', 'indicator3', 'indicator4'];
export const datesList = ['1990', '2000', '2010', '2020'];
export const colors = ['#1B5183', '#1E6D86', '#2A8FAF', '#C9E6E8', '#929292', '#766964', '#F8981C', '#760015'];

export const filtersList = ['Total Energy Consumption', 'Total Energy Available for consumption'];
export default {
  groups,
  relatedIndicators,
  indicatorsList,
  datesList,
  layers,
  colors,
  selectedIndicator,
  filtersList,
};
