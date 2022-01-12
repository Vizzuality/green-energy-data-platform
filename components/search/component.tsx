import React, {
  FC, ReactNode, useRef, useState,
} from 'react';

import cx from 'classnames';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { setSearchValue } from 'store/slices/search';

import { useSearch } from 'hooks/search';

import i18next from 'i18next';

// types
import { GroupProps } from 'types/data';

// components
import Icon from 'components/icon';
import Menu from './menu';
import NoResults from './no-results';

interface SearchProps {
  items: GroupProps[],
  className?: string,
  children?: ReactNode
  isHeader?: boolean
}

const Search: FC<SearchProps> = ({
  items,
  className,
  children,
  isHeader = false,
}: SearchProps) => {
  const inputRef = useRef();
  const [isOpen, toggleMenu] = useState(false);
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
  const noResults = !results?.length;
  return (
    <div className={cx('flex h-full relative', className,
      {
        'rounded-lg': !isHeader && !isOpen,
        'rounded-t-lg': !isHeader && isOpen,
      })}
    >
      <button
        className="flex box-border w-full m-auto relative items-center"
        type="button"
        onClick={handleMenu}
      >
        <div className="flex flex-1 overflow-auto justify-start items-center relative px-10">
          <Icon
            ariaLabel="search"
            name="search"
            className="fill-current"
            size="lg"
          />
          <input
            ref={inputRef}
            type="search"
            className="search-input bg-transparent ml-6 w-56 flex-1"
            placeholder={`${i18next.t('searchIndicator')}...`}
            value={searchValue}
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
        {children}
      </button>
      {noResults && isOpen && searchValue.length > 1
          && (
            <NoResults className={cx({
              'top-23 border-t px-10 box-border space-y-1 w-full rounded-b-2xl': !isHeader,
              'top-8 box-border rounded-2xl': isHeader,
            })}
            />
          )}
      {isOpen && !noResults && (
        <Menu items={items} isHeader={isHeader} />
      )}

    </div>
  );
};

export default Search;
