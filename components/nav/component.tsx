import React from 'react';
import Link from 'next/link';
import cx from 'classnames';

import { useRouter } from 'next/router';

export interface NavProps {
  items: Array<{
    id: number;
    slug: string;
    name: string;
  }>;
  className?: string;
}

export const Nav: React.FC<NavProps> = ({
  items,
  className,
}: NavProps) => {
  const router = useRouter();
  const { group } = router.query;

  console.log(router, items);

  return (
    <nav>
      <ul className={cx('flex flex-grow text-white divide-x',
        { [className]: !!className })}
      >
        {items.map(({ id, name, slug }, index) => (
          <li
            key={id}
            className={cx('relative px-4 mb-4 focus:outline-none text-opacity-50 text-sm box-content',
              { 'pl-0': index === 0 },
              { 'font-bold': slug === group })}
          >
            <Link
              href="/[group]/[subgroup]"
              as={`/${slug}`}
            >
              {name}
            </Link>
            <div className={cx(
              { 'absolute right-4 -bottom-4 rounded-2xl h-1 bg-current': id === group.id },
              { 'left-0': slug === group.id && index === 0 },
              { 'left-4 ': slug === group.id && index !== 0 },
            )}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
