import React, {
  FC,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';

import { useQueryClient } from 'react-query';

import cx from 'classnames';

import dynamic from 'next/dynamic';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

// hooks
import {
  useIndicator,
  useIndicatorMetadata,
  useIndicatorRecords,
} from 'hooks/indicators';
import { useMe } from 'hooks/auth';

// components
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
  getCategoriesFromRecords,
  getSubcategoriesFromRecords,
} from 'utils';

import { RootState } from 'store/store';

import { setFilters } from 'store/slices/indicator';
import i18next from 'i18next';

import { useColors, useOpacityColors } from 'hooks/utils';

import DropdownContent from 'layout/dropdown-content';

import ChartConfig from 'components/indicator-visualizations/config';
import { ComponentTypes } from 'types/data';

type ChartProps = {
  widgetData: unknown,
  widgetConfig: unknown,
  colors: string[],
  color?: string,
};

const IndicatorChart: FC<ComponentTypes> = ({
  className,
}: ComponentTypes) => {
  const [dropdownVisibility, setDropdownVisibility] = useState({
    indicator: false,
    year: false,
    region: false,
    unit: false,
    category: { label: 'category_1', value: null },
    scenario: false,
  });

  const [subcategoriesTotals, setSubcategoriesTotals] = useState(null);

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { current } = useSelector((state: RootState) => (state.language));

  const filters = useSelector((state: RootState) => state.indicator);
  const {
    year, unit, region, category, scenario, visualization = 'choropleth',
  } = filters;
  const router = useRouter();
  const { query: { group: groupSlug, subgroup: subgroupQuery } } = router;

  const subgroupSlug = subgroupQuery?.[0];
  const indicatorSlug = subgroupQuery?.[1];
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

  const {
    data: indicatorData,
  } = useIndicator(groupSlug, subgroupSlug, indicatorSlug, ({
    placeholderData: queryClient.getQueryData(['indicator', indicatorSlug]) || {
      categories: [],
      category_filters: {},
      accessible_by: [],
      data_source: null,
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

  const {
    data: records,
    isFetching: isFetchingRecords,
    isFetched: isFetchedRecords,
    isSuccess: isSuccessRecords,
  } = useIndicatorRecords(
    groupSlug, subgroupSlug, indicatorSlug, filtersIndicator, {
      refetchOnWindowFocus: false,
      enabled: !!visualization && (!!region || !!year),
    },
  );

  const {
    defaultCategory,
    years,
    defaultYear,
    regions,
    defaultRegion,
    regionsGeometries,
    units,
    defaultUnit,
    scenarios,
    defaultScenario,
  } = useIndicatorMetadata(indicatorSlug, visualization, records, {}, {
    refetchOnWindowFocus: false,
    enabled: !!indicatorSlug && !!visualization,
  });

  const {
    name,
    accessible_by: accessibleBy,
    data_source: dataSource,
  } = indicatorData;

  const categories = useMemo(
    () => getCategoriesFromRecords(records, visualization),
    [records, visualization],
  );

  const filteredRecords = useMemo(
    () => filterRecords(records, filters, categories, groupSlug),
    [records, filters, categories, groupSlug],
  );

  const subcategories = useMemo(
    () => getSubcategoriesFromRecords(records), [records],
  );

  const widgetDataKeys = category?.label === 'category_1' ? categories : subcategories;

  const mainColors = useColors(widgetDataKeys.length);
  const colorsOpacity = useOpacityColors(mainColors);
  const colors = category?.label === 'category_1' ? mainColors : colorsOpacity;

  const widgetConfig = useMemo(
    () => ChartConfig(widgetDataKeys, current, records)[visualization],
    [visualization, widgetDataKeys, records, current],
  );

  const widgetData = useMemo(
    () => getGroupedValues(
      name, groupSlug, filters, filteredRecords, regionsGeometries, units,
    ), [name, groupSlug, filters, filteredRecords, regionsGeometries, units],
  );

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

  const displayYear = useMemo(() => years.find(({ value }) => value === year)?.label, [years, year]) || '';
  const displayRegion = useMemo(() => regions.find(({ value }) => value === region)?.label, [regions, region]) || '';
  const displayUnit = useMemo(() => units.find(({ value }) => value === unit)?.label, [units, unit]) || '';
  const displayScenario = useMemo(() => scenarios.find(({ value }) => value === scenario)?.label, [scenarios, scenario]) || '';

  useEffect(() => {
    dispatch(setFilters({
      visualization: currentVisualization,
      ...(currentUnit && { unit: currentUnit }) || { unit: null },
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

  const DynamicChart = useMemo(() => {
    if (visualization && visualization !== 'choropleth') {
      return dynamic<ChartProps>(import(`components/indicator-visualizations/${visualization}`));
    }
    return null;
  }, [visualization]);

  useEffect(() => {
    if (category?.label === 'category_1' && subcategories.length === 1) setSubcategoriesTotals(LegendPayload);
  }, [category, subcategories.length, setSubcategoriesTotals]);

  const singleValueLegendColor = useMemo(
    () => subcategoriesTotals?.find(((subcat) => subcat?.label === category?.value))?.color,
    [category, subcategoriesTotals],
  );

  const { data: user } = useMe();

  const hasDownloadPermissions = useMemo(() => user && user.role && (accessibleBy.includes(user.role) || user.role === 'admin'),
    [accessibleBy, user]);

  return (
    <div className={`grid grid-cols-12 ${className}`}>
      <div className="col-span-8 h-full w-full">
        <section className="flex flex-col w-full">
          <div className="flex w-full justify-between">
            {/* year filter */}
            {['bar', 'pie', 'choropleth'].includes(visualization) && !!years.length && (
              <div className="flex items-center flex-wrap">
                <span className="pr-2 whitespace-nowrap">
                  {i18next.t('showing')}
                  :
                </span>
                {years.length === 1 && (<span className="flex items-center border text-color1 border-gray1 border-opacity-20 py-0.5 px-4 rounded-full mr-4">{displayYear}</span>)}
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
                      className="flex items-center border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full mr-4 whitespace-nowrap"
                    >
                      <span>{displayYear || i18next.t('selectYear')}</span>
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
                {regions.length === 1 && (<span className="flex items-center border text-color1 border-gray1 border-opacity-20 py-0.5 px-4 rounded-full mr-4">{displayRegion}</span>)}
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
                      className="flex items-center border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full mr-4 whitespace-nowrap"
                    >
                      <span>{displayRegion || 'Select a region'}</span>
                      <Icon ariaLabel="dropdown" name="triangle_border" className="ml-4" />
                    </button>
                  </Tooltip>
                )}
              </div>
            )}

            {/* scenario filter */}
            {['choropleth'].includes(visualization) && !!scenarios.length && (
              <div className="flex items-center">
                <span className="pr-2">
                  {i18next.t('scenario')}
                  :
                </span>
                {scenarios?.length > 1 && (
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
                      className="flex items-center border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full mr-4 whitespace-nowrap"
                    >
                      <span>{displayScenario || i18next.t('selectScenario')}</span>
                      <Icon ariaLabel="dropdown" name="triangle_border" className="ml-4" />
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
            {isFetchedRecords
              && !isFetchingRecords
              && !filteredRecords.length
              && !!visualization && (!!region || !!year)
              && (
                <div className="w-full h-full min-h-1/2 flex flex-col items-center justify-center">
                  <img alt="No data" src="/images/illus_nodata.svg" className="w-28 h-auto" />
                  <p>Data not found</p>
                </div>
              )}

            {(!!filteredRecords.length && !isFetchingRecords && isSuccessRecords) && (
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
                          className={cx('flex items-center cursor-pointer whitespace-nowrap hover:font-bold',
                            {
                              'text-sm  text-gray1 text-opacity-50': visualization !== 'choropleth',
                              'border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full mr-4': visualization === 'choropleth',
                            })}
                        >
                          <span>{displayUnit}</span>
                          <Icon ariaLabel="units dropdown" name="triangle_border" size="sm" className="ml-2" />
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
                        color={singleValueLegendColor}
                      />
                    </div>
                  )}
                {visualization === 'choropleth' && (
                  <div className="w-full h-96">
                    <MapContainer
                      layers={widgetData[0]?.layers || []}
                    />
                  </div>
                )}

              </div>
            )}
          </div>
        </section>
      </div>
      <div className="col-span-4">
        <section className="flex flex-col justify-between ml-8">
          {categories.length > 0 && (
            <Filters
              visualization={visualization}
              categories={categories}
              hasSubcategories={!!subcategories.length || categories.length === 1}
              className="overflow-y-auto mb-4"
              onClick={setFilters}
            />
          )}
          {categories.length > 0 && visualization !== 'choropleth' && (
            <div className="mb-4">
              <Legend
                payload={LegendPayload}
                className="overflow-y-scroll text-ellipsis w-full"
                singleValueLegendColor={singleValueLegendColor}
              />
            </div>
          )}
          <DataSource
            indicatorSlug={indicatorSlug}
            dataSource={dataSource}
            isAccesible={!!hasDownloadPermissions}
          />
        </section>
      </div>
    </div>
  );
};

export default IndicatorChart;
