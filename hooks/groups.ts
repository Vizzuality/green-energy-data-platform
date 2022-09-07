import { useQuery } from 'react-query';

// services
import { fetchGroups, fetchGroup } from 'services/groups';
import { GroupProps } from 'types/data';

export const useGroups = (queryConfig = {}, params = {}) => useQuery(['fetch-groups', params],
  () => fetchGroups('', params).then(({ data }) => data), {
    // keepPreviousData: true
    ...queryConfig,
  });

export const useGroup = (id: string | string[], queryConfig = {}, params = {}) => useQuery(['fetch-group', id],
  () => fetchGroup(id, params)
    .then((data) => data),
  {
    keepPreviousData: true,
    enabled: !!id,
    ...queryConfig,
  });

export const useGroupsDefaults = (groups: GroupProps[]) => groups.map((group) => {
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
