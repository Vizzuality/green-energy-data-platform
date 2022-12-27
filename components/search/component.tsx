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

  // language keys
  const searchIndicator = i18next.t('searchIndicator');
  return (
    <div className={cx('flex h-full relative', className,
      {
        'rounded-lg': !isHeader && !isOpen,
        'rounded-t-2.5xl': !isHeader && isOpen,
      })}
    >
      <button
        className="box-border relative flex items-center w-full m-auto"
        type="button"
        onClick={handleMenu}
      >
        <div className="relative flex items-center justify-start flex-1 px-10 overflow-auto">
          <Icon
            ariaLabel="search"
            name="search"
            className="fill-current"
            size="lg"
          />
          <input
            ref={inputRef}
            type="search"
            className="flex-1 w-56 ml-6 bg-transparent search-input"
            placeholder={`${searchIndicator}...`}
            value={searchValue}
            onChange={updateSearch}
          />
          {searchValue && (
          <button
            type="button"
            className="absolute right-0 flex items-center"
            onClick={handleClearSearch}
          >
            <Icon
              ariaLabel="close"
              name="close"
              size="lg"
              className="p-1 ml-5 text-white bg-white rounded-full fill-current bg-opacity-30"
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
