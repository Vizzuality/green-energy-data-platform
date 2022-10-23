import React, { FC, useState, useCallback } from 'react';
import cx from 'classnames';

import { useRouter } from 'next/router';

import { useEnergyBalanceGroupData } from 'hooks/groups';

// components
import Icon from 'components/icon';
import Tooltip from 'components/tooltip';

type SubgroupTypes = {
  name: string,
  default_indicator: { slug: string },
  id: string,
  slug: string
};

type DataTypes = {
  subgroup: SubgroupTypes,
};

type GroupTypes = {
  slug: string,
  subgroups: SubgroupTypes[],
};

export interface SubgroupsDropdownTypes {
  data: DataTypes,
  group: GroupTypes
}

const SubgroupsDropdown: FC<SubgroupsDropdownTypes> = ({ data, group }: SubgroupsDropdownTypes) => {
  const router = useRouter();

  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const handleSubgroupChange = useCallback((url) => {
    setDropdownVisibility(false);
    router.push(url);
  }, [router]);
  const { subgroups } = useEnergyBalanceGroupData(group);

  return (
  subgroups?.length > 1 ? (
    <Tooltip
      placement="bottom-start"
      visible={dropdownVisibility}
      interactive
      onClickOutside={() => { setDropdownVisibility(false); }}
      content={(
        <ul
          className="z-10 flex flex-col justify-center w-full divide-y divide-white shadow-sm rounded-xl bg-gray3 divide-opacity-10"
        >
          {subgroups?.map((subgroup) => (
            <li
              key={subgroup.slug}
              className="text-white divide-y divide-white first:rounded-t-xl last:rounded-b-xl hover:bg-white hover:text-gray3 divide-opacity-10"
            >
              <button
                type="button"
                className="flex w-full px-5 py-2 cursor-pointer"
                onClick={() => handleSubgroupChange(`/energy-balance/${subgroup?.slug}`)}
              >
                {subgroup.name}
              </button>
            </li>
          ))}
        </ul>
    )}
    >
      <button
        type="button"
        className="flex items-center pt-3"
        onClick={() => { setDropdownVisibility(!dropdownVisibility); }}
      >
        <h1 className="text-5.5xl text-left">
          {data?.subgroup?.name}
        </h1>
        <Icon
          ariaLabel="collapse dropdown"
          name="triangle_border"
          size="3xlg"
          className={cx('ml-3 border-2 text-white border-white border-opacity-30 hover:bg-color1 rounded-full p-4',
            { 'transform -rotate-180': false })}
        />
      </button>
    </Tooltip>
  ) : (
    <h1 className="text-5.5xl text-left">
      {data?.subgroup?.name}
    </h1>
  )
  );
};

export default SubgroupsDropdown;
