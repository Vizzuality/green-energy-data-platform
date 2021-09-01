import React, { FC, useRef, useState } from 'react';
import cx from 'classnames';

// components
import Icon from 'components/icon';

const Search: FC = () => {
  const inputRef = useRef();
  const [searchValue, setSearchValue] = useState('');

  const [filteredOptions, setFilteredOptions] = useState(['hola', 'adios']);
  const [options, setOptions] = useState([]);
  const [isOpen, toggleMenu] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [item3, setSelectedItem] = useState();
  const [value, setValue] = useState();

  const updateSearch = (e) => {
    setSearchValue(e.currentTarget.value);
  };

  const handleClearSearch = () => setSearchValue('');

  const handleMenu = () => toggleMenu(!isOpen);

  const noResults = !filteredOptions.length;
  return (
    <div className="w-full flex h-full relative">

      {/* <div className="w-0.5 bg-white bg-opacity-50 absolute top-0 bottom-0 right-48" /> */}

      <div>
        <div className="flex relative" onClick={handleMenu}>
          <div className="text-white flex flex-1 items-center justify-between w-full mx-13">
            {/* <span>{ value || placeholder }</span> */}
          </div>
          <div className="flex justify-center items-center flex-1 relative">
            <Icon ariaLabel="search" name="search" className="fill-current" />
            <input
              ref={inputRef}
              type="search"
              className="search-input bg-gray1 ml-6"
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

        </div>
        {noResults
          && <span className="no-results">No results</span>}
        {isOpen && (
          <ul className="absolute bg-white px-10 w-full rounded-2xl">
            {filteredOptions.map((item, index) => {
              return (
                <li
                  className={cx('w-full',
                    { 'bg-gray1 bg-opacity-5 m-2 rounded-2x shadow-sm rounded-lg': index === selectedIndex })}
                  key={item}
                  onMouseEnter={() => { setSelectedIndex(index); }}
                  onMouseDown={() => handleItem(item)}
                >
                  <button className="text-gray1 px-4 py-3">{item}</button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
