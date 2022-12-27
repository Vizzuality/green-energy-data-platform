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
  <ul className="z-10 w-full min-w-full overflow-y-auto divide-y divide-white shadow-sm rounded-xl divide-opacity-10 max-h-96">
    {list.map((list_element) => (
      <li
        key={compareIndex ? `${compareIndex}-${list_element.label}` : list_element.label}
        className="text-white divide-y divide-white last:rounded-b-xl hover:bg-white hover:text-gray3 hover:last:rounded-b-xl divide-opacity-10 bg-gray3"
      >
        <button
          type="button"
          className="flex items-center w-full px-5 py-2 last:border-b-0 whitespace-nowrap"
          onClick={() => onClick(keyEl, list_element.value)}
        >
          {list_element.label}
        </button>
      </li>
    ))}
  </ul>
);

export default DropdownContent;
