import React, { FC } from 'react';

type DropdownItem = Readonly<{
  label: string | number
  value: string | number
}>;
interface DrodownProps {
  // list should only validate the DropdownItem type. I've kept the other to not break TS,
  // but they should be removed as soon as the data is parsed correctly.
  list: DropdownItem[],
  keyEl: string,
  onClick: (key, value) => void,
  compareIndex?: 1 | 2;
}

const DropdownContent: FC<DrodownProps> = ({
  list, keyEl, onClick, compareIndex,
}: DrodownProps) => (
  <ul className="w-full z-10 rounded-xl  divide-y divide-white divide-opacity-10 overflow-y-auto max-h-96 min-w-full shadow-sm">
    {list.map((list_element) => (
      <li
        key={compareIndex ? `${compareIndex}-${list_element.label}` : list_element.label}
        className="text-white last:rounded-b-xl hover:bg-white hover:text-gray3 hover:last:rounded-xl divide-y divide-white divide-opacity-10 bg-gray3"
      >
        <button
          type="button"
          className="flex items-center py-2 w-full last:border-b-0 px-5 whitespace-nowrap"
          onClick={() => onClick(keyEl, list_element.value)}
        >
          {list_element.label}
        </button>
      </li>
    ))}
  </ul>
);

export default DropdownContent;
