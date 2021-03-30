import React from 'react';
import Link from 'next/link';
import cx from 'classnames';

import { useRouter } from 'next/router';

export interface NavProps {
  items: Array<{
    id: string;
    name: string;
  }>;
  className?: string;
}

export const Nav: React.FC<NavProps> = ({
  items,
}: NavProps) => {
  const router = useRouter();
  const { group: selected } = router.query;

  return (
    <nav>
      <ul className="flex flex-grow text-white divide-x">
        {items.map(({ id, name }, index) => (
          <li
            key={id}
            className={cx('relative px-4 mb-4 focus:outline-none text-opacity-50 text-sm box-content',
              { 'pl-0': index === 0 },
              { 'font-bold': id === selected })}
          >
            <Link
              href="/[groups]"
              as={`/${id}`}
            >
              {name}
            </Link>
            <div className={cx(
              { 'absolute right-4 -bottom-4 rounded-2xl h-1 bg-current': id === selected },
              { 'left-0': id === selected && index === 0 },
              { 'left-4 ': id === selected && index !== 0 },
            )}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
