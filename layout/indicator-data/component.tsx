import React, {
  FC,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import {
  useQueryClient,
} from 'react-query';

import cx from 'classnames';

import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { RootState } from 'store/store';

// hooks
import { useGroups } from 'hooks/groups';
import { useSubgroup } from 'hooks/subgroups';
import {
  useIndicator,
  useIndicatorRecords,
  useIndicatorMetadata,
} from 'hooks/indicators';

import { setFilters } from 'store/slices/indicator';
import i18next from 'i18next';

// components
import VisualizationsNav from 'components/visualizations-nav';
import Icon from 'components/icon';
import Tooltip from 'components/tooltip';
import General from './general';
import ModelIntercomparison from './model-intercomparison';

import IndicatorDataProps from './types';

const IndicatorData: FC<IndicatorDataProps> = ({
  className,
}: IndicatorDataProps) => {
  const [dropdownVisibility, setDropdownVisibility] = useState({
    indicator: false,
    year: false,
    region: false,
    unit: false,
    category: { label: 'category_1', value: null },
    scenario: false,
  });

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
    year, region, unit, scenario, visualization,
  } = useSelector((state: RootState) => state.indicator);

  const router = useRouter();
  const { query: { group: groupSlug, subgroup: subgroupQuery } } = router;

  const subgroupSlug = subgroupQuery?.[0];
  const indicatorSlug = subgroupQuery?.[1];

  const handleIndicatorChange = useCallback((url) => {
    setDropdownVisibility({
      ...dropdownVisibility,
      indicator: false,
    });

    router.push(url);
  }, [router, dropdownVisibility]);

  const toggleDropdown = useCallback((key) => {
    setDropdownVisibility({
      ...dropdownVisibility,
      [key]: !dropdownVisibility[key],
    });
  }, [dropdownVisibility]);

  const closeDropdown = useCallback((key) => {
    setDropdownVisibility({
      ...dropdownVisibility,
      [key]: false,
    });
  }, [dropdownVisibility]);

  const { data: subgroup } = useSubgroup(groupSlug, subgroupSlug, {
    refetchOnWindowFocus: false,
  });

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

  const filterByRegion = useMemo(() => (visualization !== 'choropleth' && visualization !== 'bars'), [visualization]);

  const filtersIndicator = useMemo(() => {
    if (filterByRegion) {
      return ({
        visualization,
        region,
        unit,
      });
    }
    return ({
      visualization,
      unit,
      year,
    });
  }, [visualization, region, unit, year, filterByRegion]);

  const { data: records } = useIndicatorRecords(
    groupSlug, subgroupSlug, indicatorSlug, filtersIndicator, {
      refetchOnWindowFocus: false,
      enabled: !!visualization && !!unit && (!!region || !!year),
    },
  );

  const {
    defaultCategory,
    defaultYear,
    defaultRegion,
    units,
    years,
    regions,
    defaultUnit,
    defaultScenario,
  } = useIndicatorMetadata(indicatorSlug, visualization, records, {}, {
    refetchOnWindowFocus: false,
    enabled: !!indicatorSlug && !!visualization,
  });

  const {
    name,
    visualization_types: visualizationTypesIndicator,
    description,
  } = indicatorData;

  const currentVisualization = useMemo<string>(
    // if the current visualization is not allowed when the user changes the indicator,
    // it will fallback into the default one. If it is, it will remain.
    () => (indicatorData?.visualization_types?.includes(visualization)
      ? visualization : indicatorData?.default_visualization),
    [visualization, indicatorData],
  );
  const currentYear = useMemo<number>(
    () => {
      if (years.find(({ value }) => value === year)) {
        return year;
      }
      return defaultYear?.value;
    },
    [year, years, defaultYear],
  );

  const currentUnit = useMemo<string>(
    () => {
      if (units.find(({ value }) => value === unit)) {
        return unit;
      }
      return defaultUnit?.value;
    },
    [unit, units, defaultUnit],
  );

  const currentRegion = useMemo<string>(
    () => {
      if (regions.find(({ value }) => value === region)) {
        return region;
      }
      return defaultRegion?.value;
    },
    [region, regions, defaultRegion],
  );

  const currentScenario = useMemo<string>(
    () => (scenario || defaultScenario?.value),
    [scenario, defaultScenario],
  );

  useEffect(() => {
    dispatch(setFilters({
      visualization: currentVisualization,
      ...(defaultUnit && { unit: currentUnit }) || { unit: null },
      ...defaultCategory && { category: defaultCategory },
      ...((['line', 'pie'].includes(currentVisualization)) && { region: currentRegion }) || { region: null },
      ...(['pie', 'choropleth', 'bar'].includes(currentVisualization) && { year: currentYear }) || { year: null },
      ...(['choropleth'].includes(currentVisualization) && defaultScenario) && { scenario: currentScenario },
    }));
  }, [
    dispatch,
    defaultYear,
    currentYear,
    currentRegion,
    defaultUnit,
    currentUnit,
    defaultCategory,
    defaultScenario,
    currentScenario,
    currentVisualization,
    indicatorSlug,
  ]);

  return (
    <div className={cx('bg-white rounded-2.5xl text-gray1 divide-y divide-gray shadow',
      { [className]: className })}
    >
      <VisualizationsNav
        active={visualization}
        groupSlug={groupSlug}
        className="w-full lg:px-32 md:px-24 sm:px-16 px-8"
        visualizationTypes={visualizationTypesIndicator}
      />
      <div className="flex flex-col w-full px-16 lg:px-32 md:px-24 py-11">
        <div className="flex items-center justify-between w-full">
          <h2 className="flex text-3.5xl max-w-6xl">
            {name}
          </h2>
          <div className="flex">
            <Tooltip
              placement="bottom-end"
              visible={dropdownVisibility.indicator}
              interactive
              onClickOutside={() => closeDropdown('indicator')}
              content={(
                <ul className="z-10 w-full min-w-full overflow-y-auto divide-y divide-white shadow-sm rounded-xl divide-opacity-10 max-h-96">
                  {subgroup?.indicators?.map(
                    ({ name: groupName, id, slug }) => (
                      <li key={id} className="px-5 text-white divide-y divide-white first:rounded-t-xl last:rounded-b-xl hover:bg-white hover:text-gray3 first:hover:rounded-t-xl divide-opacity-10 bg-gray3">
                        <button
                          type="button"
                          className="flex items-center w-full py-2 last:border-b-0"
                          onClick={() => handleIndicatorChange(`/${groupSlug}/${subgroupSlug}/${slug}`)}
                        >
                          {groupName}
                        </button>
                      </li>
                    ),
                  )}
                </ul>
              )}
            >
              <button
                type="button"
                onClick={() => { toggleDropdown('indicator'); }}
                className="flex items-center border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full mr-4 whitespace-nowrap"
              >
                <span>{i18next.t('change')}</span>
                <Icon ariaLabel="change indicator" name="triangle_border" className="ml-4" />
              </button>
            </Tooltip>

            <Tooltip
              trigger="click"
              placement="bottom-start"
              maxHeight={400}
              onTrigger={() => setSubMenuVisibility({ menuVisibility: !compareMenuVisibility.menuVisibility, id: '' })}
              content={(
                <ul className="z-10 flex flex-col justify-center w-full divide-y divide-white shadow-sm rounded-xl bg-gray3 divide-opacity-10">
                  {groups?.map(({
                    name: groupName, id, subgroups: subgroupsCompare, slug,
                  }) => (
                    <li key={id} className="text-white divide-y divide-white first:rounded-t-xl last:rounded-b-xl divide-opacity-10">
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
                                className="flex items-center w-full py-2 last:border-b-0 "
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
              )}
            >
              <button
                type="button"
                className="border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full"
              >
                Compare
              </button>
            </Tooltip>
          </div>
        </div>
        <p className="text-sm py-7.5">
          {description || 'Metadata lorem ipsum sit amet. Donec ullamcorper nulla non metus auctor fringilla. Donec ullamcorper nulla non metus auctor fringilla. Vivamus sagittis lacus vel augue laoreet . Donec ullamcorper nulla non metus auctor fringilla.'}
        </p>
        {groupSlug !== 'model-intercomparison' && <General />}
        {groupSlug === 'model-intercomparison' && <ModelIntercomparison />}
      </div>
    </div>
  );
};

export default IndicatorData;
