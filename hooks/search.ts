import Fuse from 'fuse.js';
import { GroupProps } from 'types/data';

export const useSearch = (
  records: GroupProps[],
  search: string,
) => {
  const fuse = search
      && search.length
      && new Fuse(records, {
        keys: [
          'name',
          'subgroups.name',
        ],
        shouldSort: true,
        includeMatches: true,
        threshold: 0.1,
        location: 0,
        distance: 300,
        minMatchCharLength: 1,
      });

  const data = (fuse && fuse.search(search).map((d) => d.item));

  const filtered = data && data.length && data.map(
    ({ name, subgroups, ...d }) => ({
      ...d,
      name,
      subgroups: name.toLowerCase().includes(search)
        ? subgroups
        : subgroups.map((subgroup) => {
          if (!(subgroup.slug).toLowerCase().includes(search)) return null;
          return subgroup;
        }).filter((r) => r !== null),
    }),
  );

  return filtered;
};

export default {
  useSearch,
};
