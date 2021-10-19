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
  return useQuery('fetch-groups',
    () => fetchGroups({ locale: current }).then(({ data }) => data.filter((d) => d.id !== '9c0e0f67-d5d3-44ff-b663-cb54135fbe19')), {
    // keepPreviousData: true
      ...queryConfig,
    });
};

export const useGroup = (id: string, queryConfig = {}) => {
  const {
    current,
  } = useSelector(
    (state: RootState) => (state.language),
  );

  return useQuery(['fetch-group', id],
    () => fetchGroup(id, { locale: current })
      .then((data) => data),
    {
    // keepPreviousData: true,
      ...queryConfig,
    });
};

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
