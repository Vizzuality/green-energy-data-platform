import { useQuery } from 'react-query';
import { useMemo } from 'react';

// services
import { fetchIndicators, fetchIndicator } from 'services/indicators';

export function useIndicators(group_id, subgroup_id) {
  const query = useQuery('fetch-indicators',
    () => fetchIndicators(group_id, subgroup_id)
      .then((data) => data));

  const {
    data, status, error, isSuccess, isLoading,
  } = query;

  const relatedIndicators = useMemo(() => data, [data]);

  return {
    status,
    error,
    isSuccess,
    isLoading,
    data,
    relatedIndicators,
  };
}

interface OptionProps {
  year: number,
  region: string,
}

export function useIndicator(groupId, subgroupId, indicatorId, active, options: OptionProps) {
  const query = useQuery(['fetch-indicator', groupId, subgroupId, indicatorId],
    () => fetchIndicator(groupId, subgroupId, indicatorId).then((data) => data),
    {
      placeholderData: {
        records: [],
      },
    });
  const { data } = query;

  return useMemo(() => {
    const { records } = data;
    const parsedData = records.filter(
      ({ visualizationTypes }) => visualizationTypes.includes(active),
    );

    const { year, region } = options;

    const years = (parsedData?.map((d) => d.year))?.reduce(
      (acc, item) => (acc.includes(item) ? acc : [...acc, item]), [],
    );

    if (!years) return null;
    const defaultYear = years[0];

    const regions = (parsedData?.map((d) => d.region.name))?.reduce(
      (acc, item) => (acc.includes(item) ? acc : [...acc, item]), [],
    );

    if (!regions) return null;
    const defaultRegion = regions.includes('China') ? 'China' : regions[0];

    const widgetData = parsedData?.map((d) => {
      if (active === 'bar') {
        if (year === d.year) {
          return {
            province: d.region.name,
            value: d.value,
          };
        }
      }
      if (active === 'line') {
        return {
          label: d.year,
          value: d.value,
        };
      }

      if (active === 'pie') {
        if (region === d.region.name && year === d.year) {
          return {
            label: d.category_1,
            value: d.value,
          };
        }
      }
    }).filter((p) => p);

    return {
      ...query,
      data,
      years,
      defaultYear,
      regions,
      defaultRegion,
      widgetData,
    };
  }, [data, query, active, options]);
}

export function useDefaultIndicator(group) {
  if (!group) return null;
  const { default_subgroup: defaultSubgroup, subgroups } = group;
  return subgroups.find((subgroup) => subgroup.slug === defaultSubgroup);
}

export default {
  useDefaultIndicator,
  useIndicators,
  useIndicator,
};
