import React from 'react';
import Link from 'next/link';
import cx from 'classnames';

// hooks
import { useRouter } from 'next/router';

import { GroupProps } from 'types/data';

export interface NavProps {
  items: Array<GroupProps>;
  className?: string;
}

export const Nav: React.FC<NavProps> = ({
  items,
  className,
}: NavProps) => {
  const router = useRouter();
  const { group } = router.query;
  return (
    <nav>
      <ul className={cx('flex flex-grow text-white divide-x',
        { [className]: !!className })}
      >
        {items?.map(({
          id,
          name,
          slug,
          default_subgroup,
        }, index) => (
          <li
            key={id}
            className={cx('relative px-4 mb-4 focus:outline-none text-opacity-50 text-sm box-content',
              { 'pl-0': index === 0 },
              { 'font-bold': slug === group })}
          >
            <Link
              href="/[group]/[subgroup]"
              as={`/${slug}/${default_subgroup}`}
            >
              {name}
            </Link>
            <div className={cx(
              { 'absolute right-4 -bottom-4 rounded-2xl h-1 bg-current': slug === group },
              { 'left-0': slug === group && index === 0 },
              { 'left-4 ': slug === group && index !== 0 },
            )}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
