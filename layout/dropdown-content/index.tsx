import React, { FC } from 'react';

interface DrodownProps {
  list: number[] | string[],
  key: string,
  onClick: (key, value) => void
}

const DropdownContent: FC<DrodownProps> = ({ list, key, onClick }: DrodownProps) => (
  <ul className="w-full z-10 rounded-xl  divide-y divide-white divide-opacity-10 overflow-y-auto max-h-96 min-w-full">
    {list.map((list_element) => (
      <li
        key={list_element}
        className="text-white last:rounded-b-xl hover:bg-white hover:text-gray3 hover:last:rounded-xl divide-y divide-white divide-opacity-10 bg-gray3"
      >
        <button
          type="button"
          className="flex items-center py-2 w-full last:border-b-0 px-5"
          onClick={() => { onClick(key, list_element); }}
        >
          {list_element}
        </button>
      </li>
    ))}
  </ul>
);

export default DropdownContent;
