import {
  useQuery,
  useQueryClient,
} from 'react-query';

import { useRouter } from 'next/router';
import { useMemo } from 'react';

import {
  orderBy, uniq,
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

import type { SankeyData } from 'components/indicator-visualizations/sankey/types';

export function useIndicators(group_id, subgroup_id, queryConfig = {}, params = {}) {
  const query = useQuery(['fetch-indicators', params],
    () => fetchIndicators(group_id, subgroup_id, params), { ...queryConfig });
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
  params = {},
) {
  return useQuery<IndicatorProps, Error>(['indicator', groupId, subgroupId, indicatorId, params],
    () => fetchIndicator(groupId, subgroupId, indicatorId, params), {
      placeholderData: {
        records: [],
        categories: [],
        category_filters: {},
        data_source: null,
        only_admins_can_download: true,
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
  records: Record[] | SankeyData,
  params: { locale: string | string[] },
  queryOptions = {},
) {
  const queryClient = useQueryClient();
  const query = useQuery<IndicatorMetadata, Error>(['indicator-metadata', id, visualization, params],
    () => fetchIndicatorMetadata(id, {}, { ...params }), {
      placeholderData: {},
      ...queryOptions,
    });

  const {
    data, isFetching, isFetched, isSuccess,
  } = query;

  const years = useMemo<{ label: number, value: number }[] | []>(
    () => orderBy(data?.[visualization]?.year?.map((y) => ({
      label: y,
      value: y,
    })), ['value'], ['desc']) || [], [data, visualization],
  );

  const defaultYear = useMemo<{ label: number, value: number }>(() => years?.[0], [years]);

  const regions = useMemo<{ label: string, value: string }[] | []>(
    () => data[visualization]?.regions?.map((reg) => ({
      label: reg.name,
      value: reg.id,
    })) || [], [data, visualization],
  );

  const defaultRegion = useMemo<{ label: string, value: string }>(
    () => regions?.find(({ value }) => value === ID_CHINA || regions[0]),
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

  const { data: regionsGeometries } = useRegions({ ...params }, {
    refetchOnWindowFocus: false,
    placeholderData: queryClient.getQueryData(['fetch-regions', params]) || [],
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
      return getCategoriesFromRecords(records as Record[], visualization, params.locale) || [];
    }, [records, visualization, params.locale],
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

export function useSankeyIndicatorMetadata(
  id: string,
  visualization: string,
  params = {},
  queryOptions = {},
) {
  const query = useQuery<IndicatorMetadata, Error>(['indicator-metadata', id, visualization, params],
    () => fetchIndicatorMetadata(id, {}, { ...params }), {
      placeholderData: {},
      ...queryOptions,
    });

  const {
    data, isFetching, isFetched, isSuccess,
  } = query;

  const years = useMemo<{ label: number, value: number }[] | []>(
    () => orderBy(data?.[visualization]?.year?.map((y) => ({
      label: y,
      value: y,
    })), ['value'], ['desc']) || [], [data, visualization],
  );

  const defaultYear = useMemo<{ label: number, value: number }>(() => years?.[0], [years]);

  const regions = useMemo<{ label: string, value: string }[] | []>(
    () => data[visualization]?.regions?.map((reg) => ({
      label: reg.name,
      value: reg.id,
    })) || [], [data, visualization],
  );

  const defaultRegion = useMemo<{ label: string, value: string }>(
    () => regions?.find(({ value }) => value === ID_CHINA || regions[0]),
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

  return useMemo(() => ({
    isFetching,
    isFetched,
    isSuccess,
    id,
    years,
    defaultYear,
    regions,
    defaultRegion,
    units,
    defaultUnit,
  }), [
    isFetching,
    isFetched,
    isSuccess,
    id,
    years,
    defaultYear,
    regions,
    defaultRegion,
    units,
    defaultUnit,
  ]);
}

export function useDefaultIndicator(group) {
  if (!group) return null;
  const { default_subgroup: defSub, subgroups } = group;
  const defaultSubgroup = defSub || group?.subgroups[0].slug;
  const defaultSub = subgroups.find(({ slug }) => slug === defaultSubgroup);
  return defaultSub || subgroups[0];
}

export function useIndicatorRecords(
  groupId,
  subgroupId,
  indicatorId,
  params,
  queryOptions = {},
) {
  const queryClient = useQueryClient();

  const { visualization, locale } = params;

  const { data: regions } = useRegions({}, {
    refetchOnWindowsFocus: false,
    keepPreviousData: true,
    placeholderData: queryClient.getQueryData(['fetch-regions', locale]) || [],
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
  const query = useQuery<Record[], Error>(['indicator-records', groupId, subgroupId, indicatorId, locale, ...filterValueKeys],
    () => fetchIndicatorRecords(
      groupId, subgroupId, indicatorId, { locale, ...filters },
    ),
    {
      refetchOnWindowFocus: false,
      placeholderData: queryClient.getQueryData(['indicator-records', groupId, subgroupId, indicatorId, locale, ...filterValueKeys]) || [],
      keepPreviousData: true,
      ...queryOptions,
    });

  const { data } = query;

  const KEY = locale === 'cn' ? '总量' : 'Total';

  return useMemo(() => ({
    ...query,
    data: data?.map((d) => ({
      ...d,
      category_1: d.category_1 === null ? KEY : d.category_1,
      category_2: d.category_2 === null ? KEY : d.category_2,
      region: {
        id: d.region_id,
        name: (regions?.find(({ id }) => d.region_id === id) || {}).name || '-',
      },
    })),
  }), [data, regions, query, KEY]);
}

export function useSankeyData(
  id: string,
  params,
  queryOptions = {},
) {
  const {
    visualization,
    region,
    unit,
    category,
    scenario,
    uiCategory,
    ...restParams
  } = params;
  const router = useRouter();
  const { query: { locale } } = router;

  const query = useQuery<SankeyData, Error>(['sankey-data', id, restParams, locale],
    () => fetchSankeyData(id, { locale, ...restParams }), {
      placeholderData: {
        links: [],
        nodes: [],
        units: '',
      },
      ...queryOptions,
    });

  const {
    data,
    isFetching, isFetched, isSuccess,
  } = query;

  const widgetData = useMemo(() => {
    const nodes = data?.nodes;
    const links = data?.links;
    const units = data?.units;
    return ({
      nodes,
      links,
      units,
    });
  }, [data]);

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
