import { useMemo } from 'react';

const tooltipRestricted = [
  'region_type',
  'cluster',
  'cluster_id',
  'point_count',
  'point_count_abbreviated',
];

export function useCoalPowerPlantTooltip(info) {
  console.log({info})
  const tooltipInfo = useMemo(() => info || [], [info]);
  const tooltipInfoHeaders = useMemo(
    () => Object.keys(tooltipInfo).filter(
      (tooltip) => !tooltipRestricted.includes(tooltip),
    ), [tooltipInfo],
  );

  return {
    tooltipInfo,
    tooltipInfoHeaders,
  };
}

export default {
  useCoalPowerPlantTooltip,
};
