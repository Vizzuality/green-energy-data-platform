import React, { FC } from 'react';

type DropdownItem = Readonly<{
  label: string
  value: string
}>;
interface DrodownProps {
  // list should only validate the DropdownItem type. I've kept the other to not break TS,
  // but they should be removed as soon as the data is parsed correctly.
  list: number[] | string[] | DropdownItem[],
  keyEl: string,
  onClick: (key, value) => void,
  compareIndex?: number
}

const DropdownContent: FC<DrodownProps> = ({
  list, keyEl, onClick, compareIndex,
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
          onClick={() => onClick(keyEl, list_element.id)}
        >
          {list_element.name}
        </button>
      </li>
    ))}
  </ul>
);

export default DropdownContent;
