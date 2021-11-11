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
import MapContainer from 'components/indicator-visualizations/choropleth';
import LoadingSpinner from 'components/loading-spinner';

// utils
import {
  filterRecords,
  getGroupedValues,
  getSubcategoriesFromRecords,
} from 'utils';

import { RootState } from 'store/store';

import { setFilters } from 'store/slices/indicator';
import i18next from 'i18next';

import { useRegions } from 'hooks/regions';
import { useColors } from 'hooks/utils';
import { useDefaultRecordFilters } from 'hooks/records';

import DropdownContent from 'layout/dropdown-content';
import ChartConfig from './config';

import IndicatorDataProps from './types';

type ChartProps = {
  widgetData: any,
  widgetConfig: any,
  colors: string[],
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
  const filters = useSelector((state: RootState) => state.indicator);
  const {
    year, region, unit, category, scenario, visualization,
  } = filters;
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

  const handleChange = useCallback((key, value) => {
    dispatch(setFilters({ [key]: value }));

    setDropdownVisibility({
      ...dropdownVisibility,
      [key]: false,
    });
  }, [dispatch, dropdownVisibility]);

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
      visualizationTypes: [],
      group: null,
      subgroup: null,
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  }));

  const { data: regionsGeojson } = useRegions(indicatorSlug, visualization, {
    refetchOnWindowFocus: false,
  });

  const {
    data: records,
    isFetching: isFetchingRecords,
  } = useIndicatorRecords(
    groupSlug, subgroupSlug, indicatorSlug, filters, { refetchOnWindowFocus: false },
  );

  const {
    name,
    categories: categoriesIndicator,
    visualizationTypes: visualizationTypesIndicator,
    description,
  } = indicatorData;

  const filteredRecords = useMemo(
    () => filterRecords(records, filters, categoriesIndicator),
    [records, filters, categoriesIndicator],
  );

  const {
    categories,
    defaultCategory,
    years,
    defaultYear,
    regions,
    defaultRegion,
    units,
    defaultUnit,
    scenarios,
    defaultScenario,
  } = useDefaultRecordFilters(
    records,
    filters,
  );

  const colors = useColors(categories.length);
  const subcategories = useMemo(
    () => getSubcategoriesFromRecords(records), [records],
  );

  const widgetDataKeys = category?.label === 'category_1' ? categories : subcategories;
  const widgetConfig = useMemo(
    () => ChartConfig(widgetDataKeys)[visualization],
    [visualization, widgetDataKeys],
  );
  const widgetData = useMemo(
    () => getGroupedValues(
      name, groupSlug, filters, filteredRecords, regionsGeojson, units,
    ), [name, groupSlug, filters, filteredRecords, regionsGeojson, units],
  );

  const currentVisualization = useMemo(
    // if the current visualization is not allowed when the user changes the indicator,
    // it will fallback into the default one. If it is, it will remain.
    () => (indicatorData?.visualizationTypes.includes(visualization)
      ? visualization : indicatorData?.default_visualization),
    [visualization, indicatorData],
  );

  useEffect(() => {
    dispatch(setFilters({
      visualization: currentVisualization,
      ...defaultUnit ? { unit: defaultUnit.id } : { unit: '' },
      ...defaultCategory && { category: defaultCategory },
      ...(['line', 'pie'].includes(currentVisualization) && defaultRegion) ? { region: defaultRegion.id } : { region: '' },
      ...(['pie', 'choropleth', 'bar'].includes(currentVisualization) && defaultYear) ? { year: defaultYear } : { year: null },
      ...(['choropleth'].includes(currentVisualization) && defaultScenario) && { scenario: defaultScenario },
    }));
  }, [
    dispatch,
    defaultYear,
    defaultRegion,
    defaultUnit,
    defaultCategory,
    defaultScenario,
    currentVisualization,
  ]);

  const DynamicChart = useMemo(() => {
    if (visualization && visualization !== 'choropleth') {
      return dynamic<ChartProps>(import(`components/indicator-visualizations/${visualization}`));
    }
    return null;
  }, [visualization]);

  const displayYear = years.find((y) => y.value === year)?.label;
  const displayUnit = units.find((y) => y.value === unit)?.label;
  const displayRegion = regions.find((y) => y.value === region)?.label;

  return (
    <div className={cx('bg-white rounded-2.5xl text-gray1 divide-y divide-gray shadow',
      { [className]: className })}
    >
      <VisualizationsNav
        active={visualization}
        className="w-full lg:px-32 md:px-24 sm:px-16 px-8"
        visualizationTypes={visualizationTypesIndicator}
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
                <ul className="w-full z-10 rounded-xl divide-y divide-white divide-opacity-10 overflow-y-auto max-h-96 min-w-full shadow-sm">
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
              <div className="flex w-full justify-between">
                {/* year filter */}
                {['bar', 'pie', 'choropleth'].includes(visualization) && !!years.length && (
                  <div className="flex items-center">
                    <span className="pr-2">Showing for:</span>
                    {years.length === 1 && (<span className="flex items-center border text-color1 border-gray1 border-opacity-20 py-0.5 px-4 rounded-full mr-4">{years[0].label}</span>)}
                    {years.length > 1 && (
                    <Tooltip
                      placement="bottom-start"
                      visible={dropdownVisibility.year}
                      interactive
                      onClickOutside={() => closeDropdown('year')}
                      content={(
                        <DropdownContent
                          list={years}
                          keyEl="year"
                          onClick={handleChange}
                        />
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => { toggleDropdown('year'); }}
                        className="flex items-center border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full mr-4"
                      >
                        <span>{displayYear || i18next.t('dates')}</span>
                        <Icon ariaLabel="change date" name="calendar" className="ml-4" />
                      </button>
                    </Tooltip>
                    )}
                  </div>
                )}

                {/* region filter */}
                {(['line', 'pie'].includes(visualization) && !!regions.length) && (
                  <div className="flex items-center">
                    <span className="pr-2">
                      {i18next.t('region')}
                      :
                    </span>
                    {regions.length === 1 && (<span className="flex items-center border text-color1 border-gray1 border-opacity-20 py-0.5 px-4 rounded-full mr-4">{regions[0].label}</span>)}
                    {regions.length > 1 && (
                    <Tooltip
                      placement="bottom-start"
                      visible={dropdownVisibility.region}
                      interactive
                      onClickOutside={() => closeDropdown('region')}
                      content={(
                        <DropdownContent
                          list={regions}
                          keyEl="region"
                          onClick={handleChange}
                        />
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => { toggleDropdown('region'); }}
                        className="flex items-center border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full mr-4"
                      >
                        <span>{displayRegion || 'Select a region'}</span>
                      </button>
                    </Tooltip>
                    )}
                  </div>
                )}

                {/* scenario filter */}
                {['choropleth'].includes(visualization) && !!scenarios.length && (
                <div className="flex items-center">
                  <span className="pr-2">Scenario:</span>
                  {scenarios.length > 1 && (
                  <Tooltip
                    placement="bottom-start"
                    visible={dropdownVisibility.scenario}
                    interactive
                    onClickOutside={() => closeDropdown('scenario')}
                    content={(
                      <DropdownContent
                        list={scenarios}
                        keyEl="scenario"
                        onClick={handleChange}
                      />
                      )}
                  >
                    <button
                      type="button"
                      onClick={() => { toggleDropdown('scenario'); }}
                      className="flex items-center border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full mr-4"
                    >
                      <span>{scenario || i18next.t('dates')}</span>
                    </button>
                  </Tooltip>
                  )}
                </div>
                )}
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
                    {visualization !== 'choropleth'
                  && (
                    <Tooltip
                      placement="bottom-start"
                      visible={dropdownVisibility.unit}
                      interactive
                      onClickOutside={() => closeDropdown('unit')}
                      content={(
                        <DropdownContent
                          list={units}
                          keyEl="unit"
                          onClick={handleChange}
                        />
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => { toggleDropdown('unit'); }}
                        className="text-sm flex items-center cursor-pointer text-gray1 text-opacity-50"
                      >
                        <span>{displayUnit}</span>
                      </button>
                    </Tooltip>
                  )}
                  </div>
                  {visualization !== 'choropleth'
                  && (
                    <div className="w-full h-96">
                      <DynamicChart
                        widgetData={widgetData}
                        widgetConfig={widgetConfig}
                        colors={colors}
                      />
                    </div>
                  )}

                  {visualization === 'choropleth' && (
                  <div className="w-full h-96">
                    <MapContainer
                      // @ts-ignore
                      layers={widgetData.layers}
                      categories={categories}
                    />
                  </div>
                  )}

                </div>
                )}
              </div>
            </section>
          </div>
          <div className="flex">
            <section className="flex flex-col justify-between ml-8">
              {categories.length > 0 && (
              <Filters
                visualizationType={visualization}
                categories={categories}
                hasSubcategories={!!subcategories.length}
                className="overflow-y-auto mb-4"
                onClick={setFilters}
              />
              )}
              {categories.length > 0 && visualization !== 'choropleth' && (
                <Legend
                  categories={category?.label === 'category_1' ? categories : subcategories}
                  className="max-h-72 overflow-y-auto mb-4"
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
