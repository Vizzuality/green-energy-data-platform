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
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

// hooks
import { useGroups } from 'hooks/groups';
import { useSubgroup } from 'hooks/subgroups';
import {
  useIndicator,
  useIndicatorRecords,
} from 'hooks/indicators';

// components
import VisualizationsNav from 'components/visualizations-nav';
import Icon from 'components/icon';
import Tooltip from 'components/tooltip';
import Filters from 'components/filters';
import Legend from 'components/legend';
import DataSource from 'components/data-source';
import MapContainer from 'components/indicator-visualizations/choropleth/component';
import LoadingSpinner from 'components/loading-spinner';

// utils
import {
  filterRecords,
  getGroupedValues,
  getYearsFromRecords,
  getUnitsFromRecords,
  getRegionsFromRecords,
  getCategoriesFromRecords,
  getSubcategoriesFromRecords,
} from 'utils';

import { RootState } from 'store/store';

import { setFilters } from 'store/slices/indicator';
import i18next from 'i18next';

import { useRegions } from 'hooks/regions';
import ChartConfig from './config';

import IndicatorDataProps from './types';

type ChartProps = {
  widgetData: any,
  widgetConfig: any
};

const IndicatorData: FC<IndicatorDataProps> = ({
  className,
}: IndicatorDataProps) => {
  const [dropdownVisibility, setDropdownVisibility] = useState({
    indicator: false,
    year: false,
    region: false,
    unit: false,
    category: { label: 'category_1', value: null },
  });

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const {
    year, region, unit, category,
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

  const handleYearChange = useCallback((_year) => {
    dispatch(setFilters({ year: _year }));

    setDropdownVisibility({
      ...dropdownVisibility,
      year: false,
    });
  }, [dispatch, dropdownVisibility]);

  const handleRegionChange = useCallback((_region) => {
    dispatch(setFilters({ region: _region }));

    setDropdownVisibility({
      ...dropdownVisibility,
      region: false,
    });
  }, [dispatch, dropdownVisibility]);

  const handleUnitChange = useCallback((_unit) => {
    dispatch(setFilters({ unit: _unit }));

    setDropdownVisibility({
      ...dropdownVisibility,
      unit: false,
    });
  }, [dispatch, dropdownVisibility]);

  const { data: groups } = useGroups({
    refetchOnWindowFocus: false,
    placeholderData: [],
  });

  const { data: regionsGeojson } = useRegions(indicatorSlug, {
    refetchOnWindowFocus: false,
  });
  const { data: subgroup } = useSubgroup(groupSlug, subgroupSlug, {
    refetchOnWindowFocus: false,
  });

  const filters = useMemo(() => ({
    year,
    region,
    unit,
    category,
  }), [year, region, unit, category]);

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
      visualizationTypes: [],
      group: null,
      subgroup: null,
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  }));

  const [visualizationType, setVisualizationType] = useState(indicatorData.default_visualization);

  const {
    data: records,
    isFetching: isFetchingRecords,
  } = useIndicatorRecords(groupSlug, subgroupSlug, indicatorSlug, {
    refetchOnWindowFocus: false,
  });

  const filteredRecords = useMemo(
    () => filterRecords(records, filters, visualizationType),
    [records, filters, visualizationType],
  );

  const years = useMemo(() => getYearsFromRecords(records), [records]);
  const regions = useMemo(() => getRegionsFromRecords(records), [records]);
  const units = useMemo(() => getUnitsFromRecords(records), [records]);

  const defaultYear = useMemo(() => years?.[0], [years]);
  const defaultRegion = useMemo(() => (regions.includes('China') ? 'China' : regions?.[0]), [regions]);
  const defaultUnit = useMemo(() => units?.[0], [units]);
  const defaultCategory = 'category_1';

  const categories = useMemo(() => getCategoriesFromRecords(filteredRecords), [filteredRecords]);
  const subcategories = useMemo(
    () => getSubcategoriesFromRecords(filteredRecords), [filteredRecords],
  );
  const widgetDataKeys = category?.label === 'category_1' ? categories : subcategories;
  const widgetConfig = useMemo(
    () => ChartConfig(widgetDataKeys)[visualizationType],
    [visualizationType, widgetDataKeys],
  );
  const widgetData = useMemo(
    () => getGroupedValues(visualizationType, filters, filteredRecords, regionsGeojson),
    [visualizationType, filters, filteredRecords, regionsGeojson],
  );

  useEffect(() => {
    const {
      default_visualization: defaultVisualization,
    } = indicatorData;

    setVisualizationType(defaultVisualization);
  }, [indicatorData]);

  const {
    visualizationTypes,
    name,
    description,
  } = indicatorData;

  useEffect(() => {
    dispatch(setFilters({
      ...defaultYear && { year: defaultYear },
      ...defaultRegion && { region: defaultRegion },
      ...defaultUnit && { unit: defaultUnit },
      ...defaultCategory && { category: { label: defaultCategory } },
    }));
  }, [dispatch, defaultYear, defaultRegion, defaultUnit, defaultCategory]);

  const DynamicChart = useMemo(() => dynamic<ChartProps>(import(`components/indicator-visualizations/${visualizationType}`)), [visualizationType]);

  return (
    <div className={cx('bg-white rounded-2.5xl text-gray1 divide-y divide-gray shadow',
      { [className]: className })}
    >
      <VisualizationsNav
        active={visualizationType}
        className="w-full lg:px-32 md:px-24 sm:px-16 px-8"
        visualizationTypes={visualizationTypes}
        onClick={setVisualizationType}
      />
      <div className="flex flex-col lg:px-32 md:px-24 px-16 py-11 w-full">
        <div className="flex items-center w-full justify-between">
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
                <ul className="w-full z-10 rounded-xl divide-y divide-white divide-opacity-10 overflow-y-auto max-h-96 min-w-full">
                  {subgroup?.indicators?.map(
                    ({ name: groupName, id, slug }) => (
                      <li key={id} className="px-5 text-white first:rounded-t-xl last:rounded-b-xl hover:bg-white hover:text-gray3 first:hover:rounded-t-xl divide-y divide-white divide-opacity-10 bg-gray3">
                        <button
                          type="button"
                          className="flex items-center py-2 w-full last:border-b-0"
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
                className="flex items-center border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full mr-4"
              >
                <span>{i18next.t('change')}</span>
                <Icon ariaLabel="change indicator" name="triangle_border" className="ml-4" />
              </button>

            </Tooltip>

            <Tooltip
              trigger="click"
              placement="bottom-start"
              maxHeight={400}
              content={(
                <ul className="justify-center flex flex-col w-full z-10 rounded-xl bg-gray3 divide-y divide-white divide-opacity-10">
                  {groups?.map(({
                    name: groupName, id, subgroups: subgroupsCompare, slug,
                  }) => (
                    <li key={id} className="px-5 text-white first:rounded-b-xl last:rounded-b-xl hover:bg-white hover:text-gray3 hover:rounded-t divide-y divide-white divide-opacity-10">
                      <button type="button" aria-haspopup="listbox" aria-labelledby="exp_elem exp_button" id="exp_button" className="flex items-center py-2 w-full last:border-b-0">
                        <span>{groupName}</span>
                        {' '}
                        <Icon ariaLabel="arrow" name="arrow" className="ml-2" />
                      </button>
                      <ul id="exp_elem_list" tabIndex={-1} role="listbox" aria-labelledby="exp_elem" className="" aria-activedescendant="exp_elem_Pu">
                        {subgroupsCompare.map(({
                          name: subgroupName,
                          id: subgroupId,
                          slug: subgroupCompareSlug,
                          default_indicator: compareIndicator,
                        }) => (
                          <li
                            key={subgroupName}
                            id={`exp-elem_${subgroupId}`}
                            role="option"
                            className=""
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
                                className="flex items-center py-2 w-full last:border-b-0"
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
        <div className="flex justify-between">
          <div className="flex flex-col h-full w-full">
            <section className="flex flex-col w-full">
              <div className="flex">
                {/* year filter */}
                {['bar', 'pie', 'choropleth'].includes(visualizationType) && (
                  <div className="flex items-center">
                    <span className="pr-2">Showing for:</span>
                    {years.length === 1 && (<span className="flex items-center border text-color1 border-gray1 border-opacity-20 py-0.5 px-4 rounded-full mr-4">{years[0]}</span>)}
                    {years.length > 1 && (
                    <Tooltip
                      placement="bottom-start"
                      visible={dropdownVisibility.year}
                      interactive
                      onClickOutside={() => closeDropdown('year')}
                      content={(
                        <ul className="w-full z-10 rounded-xl  divide-y divide-white divide-opacity-10 overflow-y-auto max-h-96 min-w-full">
                          {years.map((_year) => (
                            <li
                              key={_year}
                              className="text-white last:rounded-b-xl hover:bg-white hover:text-gray3 hover:rounded-xl divide-y divide-white divide-opacity-10 bg-gray3"
                            >
                              <button
                                type="button"
                                className="flex items-center py-2 w-full last:border-b-0 px-5"
                                onClick={() => { handleYearChange(_year); }}
                              >
                                {_year}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => { toggleDropdown('year'); }}
                        className="flex items-center border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full mr-4"
                      >
                        <span>{year || i18next.t('dates')}</span>
                        <Icon ariaLabel="change date" name="calendar" className="ml-4" />
                      </button>
                    </Tooltip>
                    )}
                  </div>
                )}

                {/* region filter */}
                {(['line', 'pie'].includes(visualizationType) && !!regions.length) && (
                  <div className="flex items-center">
                    <span className="pr-2">
                      {i18next.t('region')}
                      :
                    </span>
                    <Tooltip
                      placement="bottom-start"
                      visible={dropdownVisibility.region}
                      interactive
                      onClickOutside={() => closeDropdown('region')}
                      content={(
                        <ul className="w-full z-10 rounded-xl  divide-y divide-white divide-opacity-10 overflow-y-auto max-h-96 min-w-full">
                          {regions.map((_region) => (
                            <li
                              key={_region}
                              className="text-white last:rounded-b-xl hover:bg-white hover:text-gray3 hover:rounded-xl divide-y divide-white divide-opacity-10 bg-gray3"
                            >
                              <button
                                type="button"
                                onClick={() => handleRegionChange(_region)}
                                className="flex items-center py-2 w-full last:border-b-0 px-5"
                              >
                                {_region}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => { toggleDropdown('region'); }}
                        className="flex items-center border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full mr-4"
                      >
                        <span>{region || 'Select a region'}</span>
                      </button>
                    </Tooltip>
                  </div>
                )}
                {!regions.length && <span className="flex items-center border text-color1 border-gray1 border-opacity-20 py-0.5 px-4 rounded-full mr-4">China</span>}
              </div>
              <div className="flex h-full w-full min-h-1/2">
                {isFetchingRecords && (
                  <LoadingSpinner />
                )}

                {!isFetchingRecords && !filteredRecords.length && (
                  <div className="w-full h-full min-h-1/2 flex flex-col items-center justify-center">
                    <img alt="No data" src="/images/illus_nodata.svg" className="w-28 h-auto" />
                    <p>Data not found</p>
                  </div>
                )}

                {(!!filteredRecords.length && !isFetchingRecords) && (
                <div className="flex flex-col h-full w-full min-h-1/2 py-8">
                  <div className="flex items-center">
                    <Tooltip
                      placement="bottom-start"
                      visible={dropdownVisibility.unit}
                      interactive
                      onClickOutside={() => closeDropdown('unit')}
                      content={(
                        <ul className="w-full rounded-xl divide-y divide-white divide-opacity-10 overflow-y-auto max-h-96 min-w-full">
                          {units.map((_unit) => (
                            <li
                              key={_unit}
                              className="text-white first:rounded-t-xl last:rounded-b-xl hover:bg-white hover:text-gray3 hover:rounded-t divide-y divide-white divide-opacity-10 bg-gray3"
                            >
                              <button
                                type="button"
                                className="flex items-center py-2 w-full last:border-b-0 px-5"
                                onClick={() => { handleUnitChange(_unit); }}
                              >
                                {_unit}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => { toggleDropdown('unit'); }}
                        className="text-sm flex items-center cursor-pointer text-gray1 text-opacity-50"
                      >
                        <span>{unit}</span>
                      </button>
                    </Tooltip>
                  </div>
                  <DynamicChart
                    widgetData={widgetData}
                    widgetConfig={widgetConfig}
                  />
                  {visualizationType === 'choropleth' && (
                  <div className="w-full h-96">
                    <MapContainer layers={widgetData} />
                  </div>
                  )}

                </div>
                )}
              </div>
            </section>
          </div>

          <div className="flex h-full">
            <section className="flex flex-col justify-between h-full ml-8">
              {categories.length > 0 && (
              <Filters
                categories={categories}
                hasSubcategories={!!subcategories.length}
                className="overflow-y-auto mb-4"
                onClick={setFilters}
              />
              )}
              {categories.length > 0 && (
                <Legend
                  categories={category.label === 'category_1' ? categories : subcategories}
                  className="overflow-y-auto mb-4"
                />
              )}
              <DataSource indicatorSlug={indicatorSlug} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndicatorData;
