import {
  useQuery,
  useQueryClient,
} from 'react-query';
import { useMemo } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

import {
  orderBy, uniq, flatten,
} from 'lodash';

import {
  IndicatorFilters,
} from 'store/slices/indicator';

// services
import {
  fetchIndicators,
  fetchIndicator,
  fetchIndicatorRecords,
  fetchIndicatorMetadata,
  fetchSankeyData,
} from 'services/indicators';

import {
  useRegions,
} from 'hooks/regions';
import { getCategoriesFromRecords } from 'utils';

import ID_CHINA from 'utils/constants';

// types
import {
  IndicatorProps,
  IndicatorMetadata,
  Record,
} from 'types/data';

import { SankeyData } from 'components/indicator-visualizations/sankey/types';
import { Sankey } from './types';

export function useIndicators(group_id, subgroup_id, queryConfig = {}) {
  const {
    current,
  } = useSelector(
    (state: RootState) => (state.language),
  );
  const query = useQuery(['fetch-indicators', current],
    () => fetchIndicators(group_id, subgroup_id, { locale: current }), { ...queryConfig });

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

export function useIndicator(
  groupId,
  subgroupId,
  indicatorId,
  queryOptions = {},
) {
  const {
    current,
  } = useSelector(
    (state: RootState) => (state.language),
  );
  return useQuery<IndicatorProps, Error>(['indicator', indicatorId, current],
    () => fetchIndicator(groupId, subgroupId, indicatorId, { locale: current }), {
      placeholderData: {
        records: [],
        categories: [],
        category_filters: {},
        data_source: null,
        default_visualization: null,
        description: null,
        end_date: null,
        id: null,
        slug: null,
        name: null,
        published: false,
        start_date: null,
        visualization_types: [],
        group: null,
        subgroup: null,
      },
      ...queryOptions,
    });
}

export function useIndicatorMetadata(
  id: string,
  visualization: string,
  records: Record[] | Sankey,
  params = {},
  queryOptions = {},
) {
  const {
    current,
  } = useSelector(
    (state: RootState) => (state.language),
  );
  const queryClient = useQueryClient();

  const query = useQuery<IndicatorMetadata, Error>(['indicator-metadata', id, visualization, current],
    () => fetchIndicatorMetadata(id, { locale: current, ...params }), {
      placeholderData: {},
      ...queryOptions,
    });

  const {
    data, isFetching, isFetched, isSuccess,
  } = query;

  const years = useMemo<{ label: number, value: number }[] | []>(
    () => orderBy(data[visualization]?.year.map((y) => ({
      label: y,
      value: y,
    })), ['value'], ['desc']) || [], [data, visualization],
  );

  const defaultYear = useMemo<{ label: number, value: number }>(() => years?.[0], [years]);

  const regions = useMemo<{ label: string, value: string }[] | []>(
    () => data[visualization]?.regions.map((reg) => ({
      label: reg.name,
      value: reg.id,
    })) || [], [data, visualization],
  );

  const defaultRegion = useMemo<{ label: string, value: string }>(
    () => regions.find(({ value }) => value === ID_CHINA || regions[0]),
    [regions],
  );

  const units = useMemo<{ label: string, value: string }[]>(
    () => data[visualization]?.units.map((u) => ({
      label: u.name,
      value: u.id,
    })) || [], [data, visualization],
  );

  const defaultUnit = useMemo<{ label: string, value: string }>(
    () => units?.[0], [units],
  );

  const { data: regionsGeometries } = useRegions({}, {
    refetchOnWindowFocus: false,
    placeholderData: queryClient.getQueryData(['fetch-regions', current]) || [],
  });

  const scenarios = useMemo<{ label: string, value: string }[]>(
    () => (uniq(data[visualization]?.scenarios)).map((s: { name: string, id: string }) => ({
      label: s.name,
      value: s.id,
    })), [data, visualization],
  );

  const defaultScenario = useMemo<{ label: string, value: string }>(
    () => scenarios?.[0],
    [scenarios],
  );

  const categories = useMemo(
    () => {
      if (visualization !== 'sankey') return [];
      return getCategoriesFromRecords(records as Record[], visualization) || [];
    }, [records, visualization],
  );

  const defaultCategory = useMemo(() => ({ label: 'category_1' }), []);

  return useMemo(() => ({
    isFetching,
    isFetched,
    isSuccess,
    id,
    years,
    defaultYear,
    regions,
    defaultRegion,
    regionsGeometries,
    units,
    defaultUnit,
    scenarios,
    defaultScenario,
    categories,
    defaultCategory,
  }), [
    isFetching,
    isFetched,
    isSuccess,
    id,
    years,
    defaultYear,
    regions,
    defaultRegion,
    regionsGeometries,
    units,
    defaultUnit,
    scenarios,
    defaultScenario,
    categories,
    defaultCategory,
  ]);
}

export function useDefaultIndicator(group) {
  if (!group) return null;
  const { default_subgroup: defaultSubgroup, subgroups } = group;
  const defaultSub = subgroups.find((subgroup) => subgroup.slug === defaultSubgroup);
  return defaultSub || subgroups[0];
}

export function useIndicatorRecords(
  groupId,
  subgroupId,
  indicatorId,
  params,
  queryOptions = {},
) {
  const {
    current,
  } = useSelector(
    (state: RootState) => (state.language),
  );
  const queryClient = useQueryClient();

  const { visualization } = params;

  const { data: regions } = useRegions({}, {
    refetchOnWindowsFocus: false,
    placeholderData: queryClient.getQueryData(['fetch-regions', current]) || [],
  });

  const {
    category,
    ...restParams
  } = params as IndicatorFilters;

  // adapt filters to different visulizations
  // all should filter by unit and visulization
  // choropleth and bar should filter also by year
  // pie, line and table should filter also by region
  const {
    year,
    ...restParamsRegion
  } = restParams as IndicatorFilters;

  const {
    region,
    ...restParamsYear
  } = restParams as IndicatorFilters;

  const filters = (visualization === 'choropleth' || visualization === 'bars') ? restParamsYear : restParamsRegion;

  const filterValueKeys = Object.values(filters).filter((filter) => Boolean(filter));

  const query = useQuery<Record[], Error>(['indicator-records', groupId, subgroupId, indicatorId, current, ...filterValueKeys],
    () => fetchIndicatorRecords(
      groupId, subgroupId, indicatorId, { locale: current, ...filters },
    ),
    {
      placeholderData: queryClient.getQueryData(['indicator-records', groupId, subgroupId, indicatorId, current, ...filterValueKeys]) || [],
      ...queryOptions,
    });

  const { data } = query;

  return useMemo(() => ({
    ...query,
    data: data?.map((d) => ({
      ...d,
      category_1: d.category_1 === null ? 'Total' : d.category_1,
      category_2: d.category_2 === null ? 'Total' : d.category_2,
      region: {
        id: d.region_id,
        name: (regions.find(({ id }) => d.region_id === id) || {}).name || '-',
      },
    })),
  }), [data, regions, query]);
}

export function useSankeyData(
  id: string,
  params = {
    year: null,
    region: null,
    unit: null,
  },
  queryOptions = {},
) {
  const {
    current,
  } = useSelector(
    (state: RootState) => (state.language),
  );

  const { year, region, unit } = params;

  const query = useQuery<SankeyData, Error>(['sankey-data', id, current],
    () => fetchSankeyData(id, { locale: current, ...params }), {
      placeholderData: {
        nodes: [],
        data: [],
      },
      ...queryOptions,
    });

  const {
    data, isFetching, isFetched, isSuccess,
  } = query;

  const widgetData = useMemo(() => {
    // TODO - change to id when API adds it
    const mockedUnit = '10000tce';
    const nodes = data?.nodes.map(({ name_en }) => ({ name: name_en }));
    const links = flatten(data?.data
      .filter((d) => d.year === year
      // TODO - change to id when API adds it
      && d.region_en === region
      && d.units_en === mockedUnit)
      .map((l) => l.links));
    return ({
      nodes,
      links,
      year,
      region,
    });
  }, [data, year, region]);

  return useMemo(() => ({
    isFetching,
    isFetched,
    isSuccess,
    data: widgetData,
  }), [
    isFetching,
    isFetched,
    isSuccess,
    widgetData,
  ]);
}
