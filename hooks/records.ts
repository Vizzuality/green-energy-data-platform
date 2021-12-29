import { useMemo } from 'react';

import { flatten } from 'lodash';

import { IndicatorData } from './types.js';

export function useSankeyData(data: IndicatorData, year: number) {
  const nodes = useMemo<{ name: string }[]>(
    () => data?.nodes.map(({ name_en }) => ({ name: name_en })), [data],
  );
  const links = useMemo(() => flatten(data.data
    .filter((d) => d.year === year)
    .map((l) => l.links)), [data, year]);

  return {
    nodes,
    links,
  };
}

export default useSankeyData;
