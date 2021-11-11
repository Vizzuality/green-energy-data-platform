import React, {
  FC,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';

import dynamic from 'next/dynamic';

import { AxiosRequestConfig } from 'axios';
import cx from 'classnames';

import { RootState } from 'store/store';

// components
import Hero from 'layout/hero';
import Tooltip from 'components/tooltip';
import Icon from 'components/icon';
import VisualizationsNav from 'components/visualizations-nav';
import Filters from 'components/filters';
import LoadingSpinner from 'components/loading-spinner/component';
import Legend from 'components/legend';
import DataSource from 'components/data-source';
import MapContainer from 'components/indicator-visualizations/choropleth';

// utils
import {
  filterRecords,
  getGroupedValues,
  getSubcategoriesFromRecords,
} from 'utils';

import {
  setFilters,
} from 'store/slices/indicator';
import { setCompareFilters } from 'store/slices/indicator_compare';
import i18next from 'i18next';

import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// hooks
import { useGroup, useGroups, useGroupsDefaults } from 'hooks/groups';
import { useSubgroup } from 'hooks/subgroups';
import {
  useIndicator,
  useIndicatorRecords,
} from 'hooks/indicators';
import { useRegions } from 'hooks/regions';
import { useColors } from 'hooks/utils';
import { useDefaultRecordFilters } from 'hooks/records';

import { IndicatorProps } from 'types/data';
import { CompareLayoutProps } from './types';

import ChartConfig from '../indicator-data/config';
import DropdownContent from '../dropdown-content';

type ChartProps = {
  widgetData: Record<string, string>[],
  widgetConfig: any,
  colors: string[]
};

const CompareLayout: FC<CompareLayoutProps> = ({
  groupSlug,
  subgroupSlug,
  indicatorSlug,
  className,
  onClose,
  compareIndex,
}: CompareLayoutProps) => {
  const [dropdownVisibility, setDropdownVisibility] = useState({
    group: false,
    subgroup: false,
    indicator: false,
    year: false,
    region: false,
    unit: false,
    scenario: false,
    category: { label: 'category_1', value: null },
  });

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const {
    year,
    region,
    unit,
    category,
    scenario,
    visualization,
  } = useSelector(
    (state: RootState) => (compareIndex === 1 ? state.indicator : state.indicator_compare),
  );

  const router = useRouter();
  const { query } = router;

  const { data: groups } = useGroups({
    placeholderData: [],
    refetchOnWindowFocus: false,
  });

  const defaultGroupSlugs = useGroupsDefaults(groups);

  const handleGroupChange = useCallback((g, sg, ind) => {
    setDropdownVisibility((prevDropdownVisibility) => ({
      ...prevDropdownVisibility,
      subgroup: !prevDropdownVisibility.subgroup,
    }));

    router.push({
      query: {
        ...query,
        [`g${compareIndex}`]: g,
        [`sg${compareIndex}`]: sg,
        [`ind${compareIndex}`]: ind,
      },
    });
  }, [router, query, compareIndex]);

  const handleSubgroupChange = useCallback((sg, ind) => {
    setDropdownVisibility((prevDropdownVisibility) => ({
      ...prevDropdownVisibility,
      subgroup: !prevDropdownVisibility.subgroup,
    }));

    router.push({
      query: {
        ...query,
        [`sg${compareIndex}`]: sg,
        [`ind${compareIndex}`]: ind,
      },
    });
  }, [router, query, compareIndex]);

  const handleIndicatorChange = useCallback((url) => {
    setDropdownVisibility((prevDropdownVisibility) => ({
      ...prevDropdownVisibility,
      indicator: !prevDropdownVisibility.subgroup,
    }));
    router.push({
      query: {
        ...query, [`ind${compareIndex}`]: url,
      },
    });
  }, [router, query, compareIndex]);

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

  const handleChange = useCallback((key, _value) => {
    if (compareIndex === 1) {
      dispatch(setFilters({ [key]: _value }));
    } else {
      dispatch(setCompareFilters({ [key]: _value }));
    }

    setDropdownVisibility({
      ...dropdownVisibility,
      [key]: false,
    });
  }, [dispatch, compareIndex, dropdownVisibility]);

  const { data: subgroup } = useSubgroup(groupSlug, subgroupSlug, {
    refetchOnWindowFocus: false,
  });

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
  }: AxiosRequestConfig = useIndicator(groupSlug, subgroupSlug, indicatorSlug, ({
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
    refetchOnWindowFocus: false,
  }));

  const {
    data: records,
    isFetching: isFetchingRecords,
  } = useIndicatorRecords(groupSlug, subgroupSlug, indicatorSlug, filters, {
    refetchOnWindowFocus: false,
  });

  const { data: regionsGeojson } = useRegions(indicatorSlug, visualization, {
    refetchOnWindowFocus: false,
  });

  const {
    name,
    categories: categoriesIndicator,
    visualizationTypes,
    description,
  }: IndicatorProps = indicatorData;

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
    () => getSubcategoriesFromRecords(filteredRecords), [filteredRecords],
  );

  const widgetDataKeys = category?.label === 'category_1' ? categories : subcategories;
  const widgetConfig = useMemo(
    () => ChartConfig(widgetDataKeys)[visualization],
    [visualization, widgetDataKeys],
  );

  const widgetData = useMemo(
    () => getGroupedValues(
      name, groupSlug, filters, filteredRecords, regionsGeojson, units,
    ),
    [name, groupSlug, filters, filteredRecords, regionsGeojson, units],
  );

  const {
    default_visualization: defaultVisualization,
  } = indicatorData;

  useEffect(() => {
    setFilters({ ...filters, visualization: defaultVisualization });
  }, [indicatorData, defaultVisualization, filters]);

  const { data: group } = useGroup(groupSlug, {
    refetchOnWindowFocus: false,
    placeholderData: {
      name: null,
      subgroups: [],
    },
  });

  const { name: groupName } = group;

  const currentVisualization = useMemo(
    // if the current visualization is not allowed when the user changes the indicator,
    // it will fallback into the default one. If it is, it will remain.
    () => (indicatorData?.visualizationTypes.includes(visualization)
      ? visualization : indicatorData?.default_visualization),
    [visualization, indicatorData],
  );

  useEffect(() => {
    const newFilters = {
      visualization: currentVisualization,
      ...defaultUnit ? { unit: defaultUnit.id } : { unit: '' },
      ...defaultCategory && { category: defaultCategory },
      ...(['line', 'pie'].includes(currentVisualization) && defaultRegion) ? { region: defaultRegion.id } : { region: '' },
      ...(['pie', 'choropleth', 'bar'].includes(currentVisualization) && defaultYear) ? { year: defaultYear } : { year: null },
      ...(['choropleth'].includes(currentVisualization) && defaultScenario) && { scenario: defaultScenario },
    };
    if (compareIndex === 1) {
      dispatch(setFilters(newFilters));
    } else {
      dispatch(setCompareFilters(newFilters));
    }
  }, [
    dispatch,
    defaultYear,
    defaultRegion,
    defaultUnit,
    defaultScenario,
    defaultCategory,
    defaultVisualization,
    compareIndex,
    currentVisualization,
  ]);

  const DynamicChart = useMemo(() => {
    if (visualization && visualization !== 'choropleth') {
      return dynamic<ChartProps>(import(`components/indicator-visualizations/${visualization}`));
    }
    return null;
  }, [visualization]);

  return (
    <div className="py-24 text-gray1" key={compareIndex}>
      <Hero
        theme="light"
        header={false}
        rounded
        className="min-h-xs relative bg-gradient-color2 pb-2 px-11 rounded-t-2xl text-white"
      >
        <button
          type="button"
          className="absolute left-0 top-0 bg-gray1 rounded-tl-2xl rounded-br-2xl flex divide-x divide-white items-center"
          onClick={() => onClose(groupSlug, subgroupSlug, indicatorSlug)}
        >
          <Icon
            ariaLabel="close"
            name="close"
            size="sm"
            className="mx-3 "
          />
          <span className="px-8 py-1 text-sm">Don´t compare</span>
        </button>
        <div className="py-5">
          <Tooltip
            placement="bottom-start"
            className=""
            visible={dropdownVisibility.group}
            interactive
            onClickOutside={() => { closeDropdown('group'); }}
            content={(
              <ul
                className="justify-center flex flex-col w-full z-10 rounded-xl bg-gray3 divide-y divide-white divide-opacity-10 shadow-sm"
              >
                {defaultGroupSlugs?.map(({
                  name: defaultName,
                  groupSlug: defaultGroupSlug,
                  subgroupSlug: defaultSubgroupSlug,
                  indicatorSlug: defaultIndicatorSlug,
                }) => (
                  <li
                    key={defaultGroupSlug}
                    className={cx('max-h relative px-4 focus:outline-none text-opacity-50 text-sm box-content items-center',
                      { 'font-bold': defaultGroupSlug === group })}
                  >
                    <button
                      type="button"
                      className="px-5 cursor-pointer w-full py-2 flex pointer-events-all"
                      onClick={() => handleGroupChange(
                        defaultGroupSlug, defaultSubgroupSlug, defaultIndicatorSlug,
                      )}
                    >
                      {defaultName}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          >
            <button
              type="button"
              className="flex items-center pt-3"
              onClick={() => { toggleDropdown('group'); }}
            >
              <h2 className="text-white font-bold pt-10">{groupName}</h2>
            </button>
          </Tooltip>

          <Tooltip
            placement="bottom-start"
            className=""
            visible={dropdownVisibility.subgroup}
            interactive={dropdownVisibility.group}
            onClickOutside={() => { closeDropdown('subgroup'); }}
            content={(
              <ul
                className="justify-center flex flex-col w-full z-10 rounded-xl bg-gray3 divide-y divide-white divide-opacity-10 shadow-sm"
              >
                {group.subgroups.map(({
                  slug: sgSlug, id, name: sgName, default_indicator,
                }) => {
                  const indSlug = default_indicator.slug || group.subgroups[0];
                  return (
                    <li
                      key={id}
                      className="text-white first:rounded-t-xl last:rounded-b-xl hover:bg-white hover:text-gray3 divide-y divide-white divide-opacity-10"
                    >
                      <button
                        type="button"
                        className="px-5 cursor-pointer w-full py-2 flex"
                        onClick={() => handleSubgroupChange(sgSlug, indSlug)}
                      >
                        {sgName}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          >

            <button
              type="button"
              className="flex items-center pt-3"
              disabled={dropdownVisibility.group}
              onClick={() => { toggleDropdown('subgroup'); }}
            >
              <h1 className="text-3.5xl text-left">
                {indicatorData?.subgroup?.name}
              </h1>
              <Icon
                ariaLabel="collapse dropdown"
                name="triangle_border"
                size="xlg"
                className={cx('ml-3 border-2 text-white text-sm border-white border-opacity-30 hover:bg-color1 rounded-full p-2',
                  { 'transform -rotate-180': false })}
              />
            </button>
          </Tooltip>

        </div>
      </Hero>
      <div className={cx('container m-auto bg-white rounded-b-2xl flex flex-col', { [className]: !!className })}>
        <VisualizationsNav
          active={visualization}
          className="w-full px-11 py-7"
          visualizationTypes={visualizationTypes}
          mobile
        />
        <div className="flex flex-col p-11 w-full">
          <div className="flex items-baseline w-full justify-between">
            <h2 className="flex max-w-xs font-bold">
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
                      ({ name: group_name, id, slug }) => (
                        <li key={id} className="px-5 text-white first:rounded-t-xl last:rounded-b-xl hover:bg-white hover:text-gray3 first:hover:rounded-t-xl divide-y divide-white divide-opacity-10 bg-gray3">
                          <button
                            type="button"
                            className="flex items-center py-2 w-full last:border-b-0"
                            onClick={() => handleIndicatorChange(slug)}
                          >
                            {group_name}
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
                  className="flex items-center border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full text-sm"
                >
                  <span>{i18next.t('change')}</span>
                  <Icon
                    ariaLabel="change indicator"
                    size="sm"
                    name="triangle_border"
                    className="ml-4 text-sm"
                  />
                </button>
              </Tooltip>
            </div>
          </div>
          <p className="text-sm text-justify py-7.5">
            {description || 'Metadata lorem ipsum sit amet. Donec ullamcorper nulla non metus auctor fringilla. Donec ullamcorper nulla non metus auctor fringilla. Vivamus sagittis lacus vel augue laoreet . Donec ullamcorper nulla non metus auctor fringilla.'}
          </p>
          {categories?.length > 1 && (
            <Filters
              visualizationType={visualization}
              categories={categories}
              hasSubcategories={!!subcategories.length}
              className="mb-4"
              onClick={compareIndex === 1 ? setFilters : setCompareFilters}
            />
          )}

          <div className="flex justify-between">
            <section className="flex flex-col w-full">
              <div className="flex">
                {/* year filter */}
                {['bar', 'pie'].includes(visualization) && !!years.length && (
                <div className="flex items-center">
                  <span className="pr-2">Showing for:</span>
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
                      <span>{year || i18next.t('dates')}</span>
                      <Icon ariaLabel="change date" name="calendar" className="ml-4" />
                    </button>
                  </Tooltip>
                </div>
                )}

                {/* region filter */}
                {(['line', 'pie'].includes(visualization) && !!regions.length) && (
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
                      <span>{region || 'Select a region'}</span>
                      <Icon ariaLabel="change date" name="calendar" className="ml-4" />
                    </button>
                  </Tooltip>
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
              <div className="flex h-full flex-col w-full min-h-1/2">
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
                    {visualization !== 'choropleth' && (
                    <div className="flex flex-col h-full w-full min-h-1/2 py-8">
                      <div className="flex items-center">
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
                            className="flex items-center cursor-pointer opacity-50 hover:font-bold hover:cursor-pointer tracking-tight text-sm"
                          >
                            <span>{unit}</span>
                          </button>
                        </Tooltip>
                      </div>
                      <div className="w-full flex justify-center pb-11">
                        <DynamicChart
                          widgetData={widgetData}
                          widgetConfig={widgetConfig}
                          colors={colors}
                        />
                      </div>
                    </div>
                    )}

                    {visualization === 'choropleth' && (
                    <div className="w-full h-96 pb-11">
                      <MapContainer
                        // @ts-ignore
                        layers={widgetData.layers}
                        categories={categories}
                      />
                    </div>
                    )}
                  </div>
                </div>
                )}
                {categories.length > 0 && visualization !== 'choropleth' && (
                <Legend
                  categories={category?.label === 'category_1' ? categories : subcategories}
                  className="overflow-y-auto mb-4"
                />
                )}
                <DataSource
                  type="horizontal"
                  indicatorSlug={indicatorSlug}
                />
              </div>

            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareLayout;
