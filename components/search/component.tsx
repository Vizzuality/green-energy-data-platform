import React, { FC, useRef, useState } from 'react';
import Link from 'next/link';
import cx from 'classnames';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';

// components
import Icon from 'components/icon';

// types
import { GroupProps } from 'types/data';

import { useSearch } from 'hooks/search';
import { setSearchValue } from 'store/slices/search';

interface SearchProps {
  items: GroupProps[]
}

const Search: FC<SearchProps> = ({
  items,
}: SearchProps) => {
  const inputRef = useRef();
  const [isOpen, toggleMenu] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState({ index: 0, subIndex: 0 });
  const dispatch = useDispatch();

  const {
    searchValue,
  } = useSelector(
    (state: RootState) => (state.search),
  );

  const updateSearch = (e) => {
    dispatch(setSearchValue(e.currentTarget.value));
  };

  const handleClearSearch = () => dispatch(setSearchValue(''));

  const handleMenu = () => toggleMenu(!isOpen);
  const searchResults = useSearch(items, searchValue);
  const results = searchValue === '' ? items : searchResults;
  const noResults = !results.length;

  return (
    <div className="flex h-full relative">
      <button className="flex px-2 box-border w-full justify-center m-auto relative" type="button" onClick={handleMenu}>
        <div className="flex justify-center items-center relative">
          <Icon ariaLabel="search" name="search" className="fill-current" />
          <input
            ref={inputRef}
            type="search"
            className="search-input bg-gray1 ml-6 w-56"
            placeholder="Search data indicator..."
            value={searchValue || ''}
            onChange={updateSearch}
          />
          {searchValue && (
          <button
            type="button"
            className="flex items-center absolute right-0"
            onClick={handleClearSearch}
          >
            <Icon
              ariaLabel="close"
              name="close"
              size="lg"
              className="rounded-full bg-white bg-opacity-30 text-white fill-current ml-5 p-1"
            />
          </button>
          )}

        </div>

      </button>
      {noResults && isOpen && searchValue.length > 1
          && (
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl box-border py-16 flex flex-col justify-center m-auto items-center lg:px-48 md:px-32 sm:px-8 ">
              <img alt="No data" src="/images/illus_nodata.svg" className="w-28 h-auto mx-16" />
              <p className="text-gray1">Data not found</p>
            </div>
          )}
      {isOpen && !noResults && (
      <ul className="absolute top-8 left-1/2 transform -translate-x-1/2 right-0 bg-white px-10 rounded-2xl box-border space-y-1 w-max">
        {results.map((
          {
            name,
            slug,
            subgroups,
          }, index,
        ) => (
          <li
            className="w-full text-gray1 box-border pt-8"
            key={slug}
          >
            <span className="uppercase text-sm tracking-tight box-border m-2">{name}</span>
            <ul className="space-y-1 pb-4">
              {subgroups.map(({
                name: sgName, id: sgId, slug: sgSlug, default_indicator,
              }, subIndex) => (
                <li
                  className={cx('box-border px-5 py-2 hover:bg-gray1 hover:bg-opacity-5 rounded-2x hover:shadow-sm rounded-lg',
                    { 'bg-gray1 bg-opacity-5 shadow-sm': index === selectedIndex.index && subIndex === selectedIndex.subIndex })}
                  key={sgSlug}
                >
                  <Link key={sgId} href={`/${slug}/${sgSlug}/${default_indicator.slug}`}>
                    <a
                      href={`/${slug}/${sgSlug}/${default_indicator.slug}`}
                      className="text-gray1"
                      onMouseEnter={() => { setSelectedIndex({ index, subIndex }); }}
                    >
                      {sgName}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      )}

    </div>
  );
};

export default Search;
