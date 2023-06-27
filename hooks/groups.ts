import { useQuery } from 'react-query';

// services
import { fetchGroups, fetchGroup } from 'services/groups';
import { GroupProps } from 'types/data';

export const useGroups = (params = {}, queryConfig = {}) => {
  const query = useQuery(['fetch-groups', JSON.stringify(params)],
  () => fetchGroups('', params).then(({ data }) => {
    return data} ), {
    ...queryConfig,
  })
  return query
};

export const useGroup = (id: string | string[], queryConfig = {}, params = {}) => useQuery(['fetch-group', id, params],
  () => fetchGroup(id, params)
    .then((data) => data),
  {
    enabled: !!id,
    ...queryConfig,
  });

export const useEnergyBalanceSelectedSubgroup = (data, slug) => data?.subgroups?.find((subgroup) => subgroup.slug === slug);

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
