import React, { FC, useRef } from 'react';
import cx from 'classnames';

// components
import Icon from 'components/icon';

const Search: FC = () => {
  const inputRef = useRef();

  // const updateSearch = (e) => {
  //   setSearch(e.currentTarget.value);
  // };


  // const handleClearSearch = () => {
  //   const { current } = inputRef;
  //   return current.value = '';
  // };


  return (
    <div className="c-search">
      <div className="search-input-container">
        <Icon ariaLabel="search" name="search" />
        <input
          ref={inputRef}
          type="search"
          className="search-input"
          placeholder="Search data indicator..."
        // value={searchValue}
        // onChange={updateSearch}
        />
        {/* <button
          className={cx('search-input--btn', { '-hidden': searchValue === '' })}
          onClick={handleClearSearch}
        >
          x
      </button> */}
      </div>
    </div>
  );
};

export default Search;
