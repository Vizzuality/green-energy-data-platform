import { useQuery } from 'react-query';

// services
import { fetchGroups, fetchGroup } from 'services/groups';
import { GroupProps } from 'types/data';

export const useGroups = (queryConfig = {}) => useQuery('fetch-groups',
  () => fetchGroups().then(({ data }) => data.filter((d) => d.id !== 'f96f2d8b-4869-4a0c-baac-f5a256ded7d6')), {
    // keepPreviousData: true
    ...queryConfig,
  });

export const useGroup = (id: string, queryConfig = {}) => useQuery(['fetch-group', id],
  () => fetchGroup(id)
    .then((data) => data),
  {
    // keepPreviousData: true,
    ...queryConfig,
  });

export const useGroupsDefaults = (groups: GroupProps[]) => groups.map((group) => {
  const { default_subgroup: subgroupSlug } = group;
  const indicatorSlug = group?.subgroups?.find(
    ({ slug }) => slug === subgroupSlug,
  ).default_indicator?.slug;
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
