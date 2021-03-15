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
  const { groups: selected } = router.query;

  return (
    <nav>
      <ul className="flex flex-grow py-3 text-white divide-x">
        {items.map(({ id, name }, index) => (
          <li
            key={id}
            className={cx('relative px-4 focus:outline-none text-opacity-50 text-sm',
              { underline: id === selected },
              { 'pl-0': index === 0 })}
          >
            <Link
              href="/[groups]"
              as={`/${id}`}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
