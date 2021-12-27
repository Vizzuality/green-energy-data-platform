import React from 'react';
import Link from 'next/link';
import cx from 'classnames';

// hooks
import { useRouter } from 'next/router';
import { useGroups, useGroupsDefaults } from 'hooks/groups';

export interface NavProps {
  className?: string;
}

export const Nav: React.FC<NavProps> = ({
  className,
}: NavProps) => {
  const router = useRouter();
  const { group } = router.query;
  const { data: groups } = useGroups({
    placeholderData: [],
    refetchOnWindowFocus: false,
  });

  const defaultGroupSlugs = useGroupsDefaults(groups);

  return (
    <nav>
      <ul className={cx('flex flex-grow text-white divide-x',
        { [className]: !!className })}
      >
        {defaultGroupSlugs?.map(({
          name,
          groupSlug,
          subgroupSlug,
          indicatorSlug,
        }, index) => (
          <li
            key={groupSlug}
            className={cx('max-h relative px-4 mb-4 focus:outline-none text-opacity-50 text-sm box-content whitespace-nowrap',
              { 'pl-0': index === 0 },
              { 'font-bold': groupSlug === group })}
          >
            <Link
              href="/[group]/[...subgroup]"
              as={`/${groupSlug}/${subgroupSlug}/${indicatorSlug}`}
            >
              {name}
            </Link>
            <div className={cx(
              { 'absolute right-4 -bottom-4 rounded-2xl h-1 bg-current': groupSlug === group },
              { 'left-0': groupSlug === group && index === 0 },
              { 'left-4 ': groupSlug === group && index !== 0 },
            )}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
