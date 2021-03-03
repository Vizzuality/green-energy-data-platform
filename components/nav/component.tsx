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
  items
}: NavProps) => {
  const router = useRouter();
  const { groups: selected } = router.query;

  return (
    <nav>
      <ul className="flex justify-between flex-grow py-3 font-heading">
        {items.map(({ id, name }) => (
          <li key={id} className={cx('relative focus:outline-none text-opacity-50 text-sm',
            {
              'underline': id === selected,
            },
          )}>
            <Link
              href={'/[groups]'}
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
