import React, { FC, useState } from 'react';
import Link from 'next/link';
import cx from 'classnames';

import { RootState } from 'store/store';

import { useSelector } from 'react-redux';
import { useSearch } from 'hooks/search';
import { useRouter } from 'next/router';

// types
import type { GroupProps } from 'types/data';

interface MenuProps {
  items: GroupProps[],
  isHeader?: boolean
}

const Menu: FC<MenuProps> = ({
  items,
  isHeader,
}: MenuProps) => {
  const [selectedIndex, setSelectedIndex] = useState({ index: 0, subIndex: 0 });
  const { query: { locale } } = useRouter();
  const {
    searchValue,
  } = useSelector(
    (state: RootState) => (state.search),
  );

  const lang = locale || 'en';
  const searchResults = useSearch(items, searchValue);
  const results = searchValue === '' ? items : searchResults;
  return (
    <ul className={cx('overflow-y-auto max-h-128 z-10 absolute left-1/2 transform -translate-x-1/2 right-0 bg-white px-10 box-border space-y-1 w-full shadow-sm',
      {
        'top-23 border-t rounded-b-2xl': !isHeader,
        'top-10 rounded-2xl ': isHeader,
      })}
    >
      {results.map((
        {
          name,
          slug,
          subgroups,
        }, index,
      ) => (
        <li
          className="box-border w-full pt-8 text-gray1"
          key={slug}
        >
          <span className="box-border text-sm tracking-tight uppercase">{name}</span>
          <ul className="space-y-1 pb-4 pt-3.5">
            {subgroups?.map(({
              name: sgName, id: sgId, slug: sgSlug, default_indicator,
            }, subIndex) => {
              const defIndicatorSlug = !default_indicator
                ? subgroups[0].slug
                : default_indicator?.slug;
              return (
                <li
                  className={cx('box-border px-5 py-2 bg-gray6 bg-opacity-5 hover:bg-opacity-10 shadow-xs rounded-lg',
                    { 'bg-gray1 bg-opacity-5': index === selectedIndex.index && subIndex === selectedIndex.subIndex })}
                  key={sgSlug}
                >
                  <Link
                    key={sgId}
                    href={{ pathname: `/${slug}/${sgSlug}/${defIndicatorSlug}`, query: { locale: lang } }}
                    className="text-gray1"
                    onMouseEnter={() => { setSelectedIndex({ index, subIndex }); }}
                  >
                    {sgName}
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
