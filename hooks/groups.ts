import { useQuery } from 'react-query';

// services
import { fetchGroups, fetchGroup } from 'services/groups';
import { GroupProps } from 'types/data';

const groupsOrder = ['socioeconomic', 'energy', 'energy-related-co2-emissions', 'energy-balance', 'energy-flows', 'coal-power-plants', 'scenarios'];
const slugIndexMap = new Map();
groupsOrder.forEach((slug, index) => {
  slugIndexMap.set(slug, index);
});
export const useGroups = (params = {}, queryConfig = {}) => useQuery(['fetch-groups', JSON.stringify(params)],
  () => fetchGroups('', params).then(({ data }) => {
    return data.sort((a, b) => {
      const indexA = slugIndexMap.get(a.slug);
      const indexB = slugIndexMap.get(b.slug);
      
      if (indexA === undefined) return 1; // If not found, move to the end
      if (indexB === undefined) return -1; // If not found, move to the end
      
      return indexA - indexB; // Compare indexes
    });
  } ), {
    ...queryConfig,
  });


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
  const defaultSubgroup = subgroupSlug || subgroups[0].slug;
  const indicatorSlug = group?.subgroups?.find(
    ({ slug }) => slug === subgroupSlug,
  )?.default_indicator?.slug || subgroups[0].slug;
  return ({
    name: group.name,
    groupSlug: group.slug,
    subgroupSlug: defaultSubgroup,
    indicatorSlug,
  });
});

export default {
  useGroups,
  useGroup,
};
