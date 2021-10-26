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
  getCategoriesFromRecords,
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
  useIndicatorMetadata,
} from 'hooks/indicators';
import { useRegions } from 'hooks/regions';
import { useColors } from 'hooks/utils';

import { MapLayersProps } from 'components/indicator-visualizations/choropleth/component';
import { IndicatorProps } from 'types/data';
import { CompareLayoutProps } from './types';

import ChartConfig from './indicator-data/general/config';
import DropdownContent from '../dropdown-content';

interface WidgetDataTypes {
  visualizationTypes: string[];
  layers?: MapLayersProps[]
}

type ChartProps = {
  widgetData: any,
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
  const {
    current,
  } = useSelector(
    (state: RootState) => (state.language),
  );

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
      visualization_types: [],
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

  const {
    defaultCategory,
    years,
    defaultYear,
    regions,
    defaultRegion,
    units,
    defaultUnit,
    scenarios,
    defaultScenario,
  } = useIndicatorMetadata(indicatorSlug, visualization, records, {}, {
    refetchOnWindowFocus: false,
    enabled: !!indicatorSlug && !!visualization,
  });

  const { data: regionsGeojson } = useRegions({}, {
    refetchOnWindowFocus: false,
    placeholderData: queryClient.getQueryData(['fetch-regions', current]) || [],
  });

  const {
    name,
    categories: categoriesIndicator,
    visualization_types: visualizationTypes,
    description,
  }: IndicatorProps = indicatorData;

  const categories = useMemo(
    () => getCategoriesFromRecords(records, visualization), [records, visualization],
  );

  const filteredRecords = useMemo(
    () => filterRecords(records, filters, categoriesIndicator),
    [records, filters, categoriesIndicator],
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

  const widgetData = useMemo<WidgetDataTypes>(
    () => getGroupedValues(
      name, groupSlug, filters, filteredRecords, regionsGeojson, units,
    ) as WidgetDataTypes,
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
    () => (indicatorData?.visualization_types.includes(visualization)
      ? visualization : indicatorData?.default_visualization),
    [visualization, indicatorData],
  );

  const currentYear = useMemo<number>(
    () => (year || defaultYear?.value),
    [year, defaultYear],
  );

  const currentUnit = useMemo<string>(
    () => (unit || defaultUnit?.value),
    [unit, defaultUnit],
  );

  const currentRegion = useMemo<string>(
    () => (region || defaultRegion?.value),
    [region, defaultRegion],
  );

  const currentScenario = useMemo<string>(
    () => (scenario || defaultScenario?.value),
    [scenario, defaultScenario],
  );

  useEffect(() => {
    const newFilters = {
      visualization: currentVisualization,
      ...(defaultUnit && { unit: currentUnit }) || { unit: '' },
      ...defaultCategory && { category: defaultCategory },
      ...(['line', 'pie'].includes(currentVisualization)) && { region: currentRegion },
      ...(['pie', 'choropleth', 'bar'].includes(currentVisualization) && { year: currentYear }) || { year: null },
      ...(['choropleth'].includes(currentVisualization) && defaultScenario) && { scenario: currentScenario },
    };
    if (compareIndex === 1) {
      dispatch(setFilters(newFilters));
    } else {
      dispatch(setCompareFilters(newFilters));
    }
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
    compareIndex,
  ]);

  const DynamicChart = useMemo(() => {
    if (visualization && visualization !== 'choropleth') {
      return dynamic<ChartProps>(import(`components/indicator-visualizations/${visualization}`));
    }
    return null;
  }, [visualization]);

  const LegendPayload = useMemo<{ label: string, color: string }[]>(
    () => {
      let legendData;
      if (visualization === 'pie') {
        legendData = widgetData;
      } else legendData = category?.label === 'category_1' ? categories : subcategories;

      return legendData.map((item, index) => ({
        label: item.name || item,
        color: colors[index],
      }));
    }, [colors, widgetData, categories, category, subcategories, visualization],
  );

  return (
    <div className="py-24 text-gray1" key={compareIndex}>
      <Hero
        theme="light"
        header={false}
        rounded
        className="relative pb-2 text-white min-h-xs bg-gradient-color2 px-11 rounded-t-2xl"
      >
        <button
          type="button"
          className="absolute top-0 left-0 flex items-center divide-x divide-white bg-gray1 rounded-tl-2xl rounded-br-2xl"
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
                className="z-10 flex flex-col justify-center w-full divide-y divide-white shadow-sm rounded-xl bg-gray3 divide-opacity-10"
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
                      className="flex w-full px-5 py-2 cursor-pointer pointer-events-all"
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
              <h2 className="pt-10 font-bold text-white">{groupName}</h2>
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
                className="z-10 flex flex-col justify-center w-full divide-y divide-white shadow-sm rounded-xl bg-gray3 divide-opacity-10"
              >
                {group.subgroups.map(({
                  slug: sgSlug, id, name: sgName, default_indicator,
                }) => {
                  const indSlug = default_indicator.slug || group.subgroups[0];
                  return (
                    <li
                      key={id}
                      className="text-white divide-y divide-white first:rounded-t-xl last:rounded-b-xl hover:bg-white hover:text-gray3 divide-opacity-10"
                    >
                      <button
                        type="button"
                        className="flex w-full px-5 py-2 cursor-pointer"
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
          groupSlug={groupSlug}
          className="w-full px-11 py-7"
          visualizationTypes={visualizationTypes}
          mobile
        />
        <div className="flex flex-col w-full p-11">
          <div className="flex items-baseline justify-between w-full">
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
                  <ul className="z-10 w-full min-w-full overflow-y-auto divide-y divide-white rounded-xl divide-opacity-10 max-h-96">
                    {subgroup?.indicators?.map(
                      ({ name: group_name, id, slug }) => (
                        <li key={id} className="px-5 text-white divide-y divide-white first:rounded-t-xl last:rounded-b-xl hover:bg-white hover:text-gray3 first:hover:rounded-t-xl divide-opacity-10 bg-gray3">
                          <button
                            type="button"
                            className="flex items-center w-full py-2 last:border-b-0"
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
              <div className="flex flex-col w-full h-full min-h-1/2">
                {isFetchingRecords && (
                <LoadingSpinner />
                )}
                {!isFetchingRecords && !filteredRecords.length && (
                <div className="flex flex-col items-center justify-center w-full h-full min-h-1/2">
                  <img alt="No data" src="/images/illus_nodata.svg" className="h-auto w-28" />
                  <p>Data not found</p>
                </div>
                )}
                {(!!filteredRecords.length && !isFetchingRecords) && (
                <div className="flex flex-col w-full h-full py-8 min-h-1/2">
                  <div className="flex items-center">
                    {visualization !== 'choropleth' && (
                    <div className="flex flex-col w-full h-full py-8 min-h-1/2">
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
                            className="flex items-center text-sm tracking-tight opacity-50 cursor-pointer hover:font-bold hover:cursor-pointer"
                          >
                            <span>{unit}</span>
                          </button>
                        </Tooltip>
                      </div>
                      <div className="flex justify-center w-full pb-11">
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
                        layers={widgetData.layers}
                      />
                    </div>
                    )}
                  </div>
                </div>
                )}
                {LegendPayload.length > 0 && visualization !== 'choropleth' && (
                <Legend
                  payload={LegendPayload}
                  className="mb-4 overflow-y-auto"
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
