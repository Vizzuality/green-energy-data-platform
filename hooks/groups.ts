import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

// services
import { fetchGroups, fetchGroup } from 'services/groups';
import { GroupProps } from 'types/data';

export const useGroups = (queryConfig = {}) => {
  const {
    current,
  } = useSelector(
    (state: RootState) => (state.language),
  );
  return useQuery(['fetch-groups', current],
    () => fetchGroups('', { locale: current }).then(({ data }) => data), {
    // keepPreviousData: true
      ...queryConfig,
    });
};

export const useGroup = (id: string | string[], queryConfig = {}) => {
  const {
    current,
  } = useSelector(
    (state: RootState) => (state.language),
  );

  return useQuery(['fetch-group', id, current],
    () => fetchGroup(id, { locale: current })
      .then((data) => data),
    {
      keepPreviousData: true,
      enabled: !!id,
      ...queryConfig,
    });
};

export const useGroupsDefaults = (groups: GroupProps[]) => groups.map((group) => {
  const { default_subgroup: subgroupSlug, subgroups } = group;
  const indicatorSlug = group?.subgroups?.find(
    ({ slug }) => slug === subgroupSlug,
  )?.default_indicator.slug || subgroups[0].slug;
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
