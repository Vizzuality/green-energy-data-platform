import { useQuery } from 'react-query';
import {
  flatten, uniq, compact, uniqBy, groupBy,
} from 'lodash';

// services
import { fetchGroups, fetchGroup } from 'services/groups';
import { GroupProps } from 'types/data';

export const useGroups = (params = {}, queryConfig = {}) => useQuery(['fetch-groups', params],
  () => fetchGroups('', params).then(({ data }) => data), {
    // keepPreviousData: true
    ...queryConfig,
  });

export const useGroup = (id: string | string[], queryConfig = {}, params = {}) => useQuery(['fetch-group', id, params],
  () => fetchGroup(id, params)
    .then((data) => data),
  {
    enabled: !!id,
    ...queryConfig,
  });

export const useEnergyBalanceGroupData = (data) => data?.reduce((acc, v) => ({
  subgroups: compact(uniqBy(flatten([
    acc.subgroups,
    {
      name: v.subgroup_en,
      slug: v.subgroup_en.toLowerCase().replaceAll(' ', '-'),
    },
  ]), 'slug')),
  indicators: compact(uniq(flatten([acc.indicators,
    {
      indicator: v.indicator_en,
    }]))),
  categories: compact(uniq(flatten([acc.categories, v.category_1_en]))),
}), []);

export const useEnergyBalanceSelectedSubgroup = (data, subgroups, slug) => {
  const subgroupName = subgroups?.find((subgroup) => subgroup.slug === slug).name;
  return groupBy(data, 'subgroup_en')[subgroupName];
};

export const useEnergyBalanceGroupIndicators = (data) => groupBy(data, 'indicator_en');

export const useGroupsDefaults = (groups: GroupProps[]) => groups?.map((group) => {
  const { default_subgroup: subgroupSlug, subgroups } = group;
  const indicatorSlug = group?.subgroups?.find(
    ({ slug }) => slug === subgroupSlug,
  )?.default_indicator?.slug || subgroups[0].slug;
  return ({
    name: group.name,
    groupSlug: group.slug,
    subgroupSlug,
    indicatorSlug,
  });
});

export default {
  useGroups,
  useGroup,
};
