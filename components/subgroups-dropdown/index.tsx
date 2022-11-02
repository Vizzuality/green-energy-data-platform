import React, {
  FC, useState, useCallback, useMemo,
} from 'react';
import cx from 'classnames';

import { orderBy } from 'lodash';

import { useRouter } from 'next/router';

// components
import Icon from 'components/icon';
import Tooltip from 'components/tooltip';
import LoadingSpinner from 'components/loading-spinner';

type SubgroupTypes = {
  name: string;
  default_indicator: { slug: string };
  id: string;
  slug: string;
  indicators: { slug: string }[];
};

type DataTypes = {
  subgroup: SubgroupTypes;
};

type GroupTypes = {
  slug: string;
  subgroups: SubgroupTypes[];
};

export interface SubgroupsDropdownTypes {
  data: DataTypes;
  group: GroupTypes;
  subgroup: SubgroupTypes;
}

const SubgroupsDropdown: FC<SubgroupsDropdownTypes> = ({
  data,
  group,
  subgroup,
}: SubgroupsDropdownTypes) => {
  const router = useRouter();
  const subgroups = useMemo(() => orderBy(group?.subgroups, 'name'), [group]);

  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const handleSubgroupChange = useCallback(
    (url) => {
      setDropdownVisibility(false);
      router.push(url);
    },
    [router],
  );
  const getIndicatorSlug = useCallback((default_indicator) => {
    if (default_indicator && default_indicator.slug) {
      return default_indicator.slug;
    }
    return subgroup?.indicators[0].slug;
  }, [subgroup]);
  return subgroups?.length > 1 ? (
    <Tooltip
      placement="bottom-start"
      visible={dropdownVisibility}
      interactive
      onClickOutside={() => {
        setDropdownVisibility(false);
      }}
      content={(
        <ul className="z-10 flex flex-col justify-center w-full divide-y divide-white shadow-sm rounded-xl bg-gray3 divide-opacity-10">
          {group?.subgroups?.map(
            ({
              slug: sgSlug, id, name, default_indicator,
            }) => {
              // const indSlug = default_indicator?.slug || subg?.default_indicator.slug;
              const indSlug = getIndicatorSlug(default_indicator);
              if (!indSlug) {
                console.warn(
                  `Visualization rendering: Group (with slug) ${group?.slug} subgroup (with slug) ${sgSlug} has no default indicator data. Widget may not work correctly.`,
                );
                return null;
              }

              return (
                <li
                  key={id}
                  className="text-white divide-y divide-white first:rounded-t-xl last:rounded-b-xl hover:bg-white hover:text-gray3 divide-opacity-10"
                >
                  <button
                    type="button"
                    className="flex w-full px-5 py-2 cursor-pointer"
                    onClick={() => handleSubgroupChange(
                      `/${group.slug}/${sgSlug}/${indSlug}`,
                    )}
                  >
                    {name}
                  </button>
                </li>
              );
            },
          )}
        </ul>
      )}
    >
      {data?.subgroup?.name ? (
        <button
          type="button"
          className="flex items-center pt-3"
          onClick={() => {
            setDropdownVisibility(!dropdownVisibility);
          }}
        >
          <h1 className="text-5.5xl text-left">{data?.subgroup?.name}</h1>
          <Icon
            ariaLabel="collapse dropdown"
            name="triangle_border"
            size="3xlg"
            className={cx(
              'ml-3 border-2 text-white border-white border-opacity-30 hover:bg-color1 rounded-full p-4',
              { 'transform -rotate-180': false },
            )}
          />
        </button>
      ) : <LoadingSpinner />}
    </Tooltip>
  ) : (
    <h1 className="text-5.5xl text-left">{data?.subgroup?.name}</h1>
  );
};

export default SubgroupsDropdown;
