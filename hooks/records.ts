import { useMemo } from 'react';

import { flatten } from 'lodash';

import { IndicatorSankeyData, SankeyChartData } from './types';

export function useSankeyData(data: IndicatorSankeyData, year: number) {
  return useMemo<SankeyChartData>(() => ({
    nodes: data.nodes.map((n) => ({ name: n.name_en })),
    links: flatten(data.data.filter((node) => node.year === year).map((d) => d.links)),
  }), [data, year]);
}

export default useSankeyData;
