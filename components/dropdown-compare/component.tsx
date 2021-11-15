import React, {
  FC,
  useEffect,
  useState,
  useMemo,
} from 'react';
import {
  useQueryClient,
} from 'react-query';

import cx from 'classnames';

import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useRouter } from 'next/router';

// hooks
import { useGroups } from 'hooks/groups';
import {
  useIndicator,
  useIndicatorRecords,
} from 'hooks/indicators';
import { useDefaultRecordFilters } from 'hooks/records';

// utils
import {
  filterRecords,
} from 'utils';

import { setFilters } from 'store/slices/indicator';

// components
import Icon from 'components/icon';

import IndicatorDataProps from './types';

const IndicatorData: FC<IndicatorDataProps> = ({
  className,
}: IndicatorDataProps) => {
  const { data: groups } = useGroups({
    refetchOnWindowFocus: false,
    placeholderData: [],
  });

  const [compareMenuVisibility, setSubMenuVisibility] = useState({
    menuVisibility: true,
    id: '',
  });

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const {
    year, region, unit, category, scenario, visualization,
  } = useSelector((state: RootState) => state.indicator);

  const router = useRouter();
  const { query: { group: groupSlug, subgroup: subgroupQuery } } = router;

  const subgroupSlug = subgroupQuery?.[0];
  const indicatorSlug = subgroupQuery?.[1];

  const filters = useMemo(() => ({
    year,
    region,
    unit,
    category,
    scenario,
    visualization,
  }), [year, region, unit, category, scenario, visualization]);

  const {
    data: indicatorData,
  } = useIndicator(groupSlug, subgroupSlug, indicatorSlug, ({
    placeholderData: queryClient.getQueryData(['indicator', indicatorSlug]) || {
      categories: [],
      category_filters: {},
      default_visualization: null,
      description: null,
      end_date: null,
      id: null,
      name: null,
      published: false,
      start_date: null,
      visualization_types: [],
      group: null,
      subgroup: null,
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  }));

  const {
    data: records,
  } = useIndicatorRecords(groupSlug, subgroupSlug, indicatorSlug,
    filters,
    { refetchOnWindowFocus: false });

  const {
    categories: categoriesIndicator,
  } = indicatorData;

  const filteredRecords = useMemo(
    () => filterRecords(records, filters, categoriesIndicator),
    [records, filters, categoriesIndicator],
  );

   return (
    <div className={cx('bg-white rounded-2.5xl text-gray1 divide-y divide-gray shadow',
      { [className]: className })}
    >
      <ul className="justify-center flex flex-col w-full z-10 rounded-xl bg-gray3 divide-y divide-white divide-opacity-10 shadow-sm">
        {groups?.map(({
          name: groupName, id, subgroups: subgroupsCompare, slug,
        }) => (
          <li key={id} className="text-white first:rounded-t-xl last:rounded-b-xl divide-y divide-white divide-opacity-10">
            <button
              type="button"
              aria-haspopup="listbox"
              aria-labelledby="exp_elem exp_button"
              id="exp_button"
              className={cx('flex items-center w-full last:border-b-0 px-5 py-2',
                { hidden: id !== compareMenuVisibility.id && compareMenuVisibility.id !== '' })}
              onClick={() => setSubMenuVisibility({ menuVisibility: !compareMenuVisibility.menuVisibility, id: compareMenuVisibility.id ? '' : id })}
            >
              <span>{groupName}</span>
              {' '}
              <Icon
                ariaLabel="arrow"
                name="arrow"
                className={cx('ml-2',
                  { 'transform rotate-180': id === compareMenuVisibility.id })}
              />
            </button>

            <ul
              id="exp_elem_list"
              tabIndex={-1}
              role="listbox"
              aria-labelledby="exp_elem"
              className={cx('shadow-sm first:rounded-t-xl last:rounded-b-xl', { hidden: id !== compareMenuVisibility.id })}
              aria-activedescendant="exp_elem_Pu"
            >
              {subgroupsCompare.map(({
                name: subgroupName,
                id: subgroupId,
                slug: subgroupCompareSlug,
                default_indicator: compareIndicator,
              }, index) => (
                <li
                  key={subgroupName}
                  id={`exp-elem_${subgroupId}`}
                  role="option"
                  className={cx(
                    'px-5 hover:bg-white hover:text-gray1',
                    {
                      'hover:rounded-b-xl': index === subgroupsCompare.length - 1,
                    },
                  )}
                  aria-selected="true"
                >
                  <Link href={{
                    pathname: '/compare',
                    query: {
                      g1: groupSlug,
                      sg1: subgroupSlug,
                      ind1: indicatorSlug,
                      g2: slug,
                      sg2: subgroupCompareSlug,
                      ind2: compareIndicator.slug,
                    },
                  }}
                  >
                    <a
                      className="flex items-center py-2 w-full last:border-b-0 "
                      href="/compare"
                    >
                      {subgroupName}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndicatorData;
