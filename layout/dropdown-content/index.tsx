import React, { FC } from 'react';

interface DrodownProps {
  list: number[] | string[],
  id: string,
  onClick: (key, value) => void,
  compareIndex?: number
}

const DropdownContent: FC<DrodownProps> = ({
  list, id, onClick, compareIndex,
}: DrodownProps) => (
  <ul className="w-full z-10 rounded-xl  divide-y divide-white divide-opacity-10 overflow-y-auto max-h-96 min-w-full shadow-sm">
    {list.map((list_element) => (
      <li
        key={compareIndex ? `${compareIndex}-${list_element}` : list_element}
        className="text-white last:rounded-b-xl hover:bg-white hover:text-gray3 hover:last:rounded-xl divide-y divide-white divide-opacity-10 bg-gray3"
      >
        <button
          type="button"
          className="flex items-center py-2 w-full last:border-b-0 px-5 whitespace-nowrap"
          onClick={() => onClick(id, list_element)}
        >
          {list_element}
        </button>
      </li>
    ))}
  </ul>
);

export default DropdownContent;
