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
import { useSelector, useDispatch } from 'react-redux';

// hooks
import { useRouter } from 'next/router';
import {
  useIndicator,
  useIndicatorRecords,
  useIndicatorMetadata,
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
import { setCompareFilters } from 'store/slices/indicator_compare';
import i18next from 'i18next';

import { useColors, useOpacityColors } from 'hooks/utils';

import DropdownContent from 'layout/dropdown-content';

import ChartConfig from 'components/indicator-visualizations/config';

import { DROPDOWN_BUTTON_STYLES, TEXT_BUTTON_STYLES } from 'layout/indicator-data/constants';
import { CLASS_DOM_DOWNLOAD_IMAGE } from 'utils/constants';

import type IndicatorCompareDataProps from '../types';

const dataNotFound = i18next.t('dataNotFound');

interface ChartProps {
  widgetData: unknown,
  widgetConfig: unknown,
  color?: string,
  colors: string[]
}


const CompareIndicatorChart: FC<IndicatorCompareDataProps> = ({
  groupSlug,
  subgroupSlug,
  indicatorSlug,
  className,
  compareIndex = 1,
}: IndicatorCompareDataProps) => {
  
  // language keys
  const showing = i18next.t('showing');
  const selectYear = i18next.t('selectYear');
  const scenarioLang = i18next.t('scenario');
  const selectScenario = i18next.t('selectScenario');
  const regionLang = i18next.t('region');

  const [dropdownVisibility, setDropdownVisibility] = useState({
    indicator: false,
    year: false,
    region: false,
    unit: false,
    category: { label: 'category_1', value: null },
    uiCategory: { label: 'category_1', value: null },
    scenario: false,
  });

  const { query: { locale } } = useRouter();
  const lang = locale || 'en';
  const [subcategoriesTotals, setSubcategoriesTotals] = useState(null);

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const filters = useSelector(
    (state: RootState) => (compareIndex === 1 ? state.indicator : state.indicator_compare),
  );
  const {
    year, unit, region, category, scenario, visualization,
  } = filters;

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
    if (compareIndex === 1) {
      dispatch(setFilters({ [key]: value }));
    } else dispatch(setCompareFilters({ [key]: value }));

    setDropdownVisibility({
      ...dropdownVisibility,
      [key]: false,
    });
  }, [dispatch, compareIndex, dropdownVisibility]);

  const {
    data: indicatorData,
  } = useIndicator(groupSlug, subgroupSlug, indicatorSlug, {
    placeholderData: queryClient.getQueryData(['indicator', indicatorSlug, locale]) || {
      categories: [],
      category_filters: {},
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
    refetchOnWindowFocus: false,
  }, { locale: lang });

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
  } = useIndicatorMetadata(indicatorSlug, visualization, records, { locale: lang }, {
    refetchOnWindowFocus: false,
    enabled: !!indicatorSlug && !!visualization,
  });

  const {
    name,
    only_admins_can_download: onlyAdminsCanDownload,
    data_source: dataSource,
  } = indicatorData;

  const categories = useMemo(
    () => getCategoriesFromRecords(records, visualization, lang),
    [records, visualization, lang],
  );

  const filteredRecords = useMemo(
    () => filterRecords(records, filters, categories, groupSlug),
    [records, filters, categories, groupSlug],
  );

  const subcategories = useMemo(
    () => getSubcategoriesFromRecords(filteredRecords, visualization), [filteredRecords, visualization],
  );

  const widgetDataKeys = category?.label === 'category_1' ? categories : subcategories;

  const mainColors = useColors(widgetDataKeys.length);
  const colorsOpacity = useOpacityColors(mainColors);
  const colors = category?.label === 'category_1' ? mainColors : colorsOpacity;

  const widgetConfig = useMemo(
    () => ChartConfig(widgetDataKeys, lang, records)[visualization],
    [visualization, widgetDataKeys, records, lang],
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
  const selectedCategory = useMemo(() => {
    if (category?.label === 'category_2' && category?.value) {
      return category;
    } return defaultCategory;
  }, [category, defaultCategory]);

  useEffect(() => {
    if (compareIndex === 1) {
      dispatch(setFilters({
        visualization: currentVisualization,
        ...(defaultUnit && { unit: currentUnit } || { unit: null }),
        ...(selectedCategory && { category: selectedCategory }),
        ...((['line', 'pie'].includes(currentVisualization)) && { region: currentRegion } || { region: null }),
        ...(['pie', 'choropleth', 'bar'].includes(currentVisualization) && { year: currentYear } || { year: null }),
        ...(['choropleth'].includes(currentVisualization) && defaultScenario && { scenario: currentScenario }),
      }));
    } else {
      dispatch(setCompareFilters({
        visualization: currentVisualization,
        ...(defaultUnit && { unit: currentUnit } || { unit: null }),
        ...(selectedCategory && { category: selectedCategory }),
        ...((['line', 'pie'].includes(currentVisualization)) && { region: currentRegion } || { region: null }),
        ...(['pie', 'choropleth', 'bar'].includes(currentVisualization) && { year: currentYear } || { year: null }),
        ...(['choropleth'].includes(currentVisualization) && defaultScenario && { scenario: currentScenario }),
      }));
    }
  }, [
    compareIndex,
    dispatch,
    defaultYear,
    currentYear,
    currentRegion,
    defaultUnit,
    currentUnit,
    selectedCategory,
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
    () => subcategoriesTotals?.find(((s) => s?.label === category?.value))?.color,
    [category, subcategoriesTotals],
  );

  const { data: user } = useMe();

  const hasDownloadPermissions = useMemo(() => user && user.role && (!onlyAdminsCanDownload || user.role === 'admin'),
    [onlyAdminsCanDownload, user]);

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex flex-col w-full h-full">
        {categories.length > 0 && (
          <Filters
            visualization={visualization}
            categories={categories}
            hasSubcategories={!!subcategories.length || categories.length === 1}
            className="mb-8 overflow-y-auto"
            onClick={compareIndex === 1 ? setFilters : setCompareFilters}
          />
        )}
        <section className="flex flex-col w-full">
          <div className="flex">
            {/* year filter */}
            {['bar', 'pie', 'choropleth'].includes(visualization) && (
              <div className="flex flex-wrap items-center">
                <span className="pr-2 mb-2 whitespace-nowrap">
                  {showing}
                  :
                </span>
                {years.length === 1 && (
                  <span className={DROPDOWN_BUTTON_STYLES}>{displayYear}</span>)}
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
                      className={cx(DROPDOWN_BUTTON_STYLES,
                        {
                          'hover:bg-color1 hover:text-white': years.length > 1,
                        })}
                    >
                      <span className={TEXT_BUTTON_STYLES}>{displayYear || selectYear}</span>
                      <Icon ariaLabel="change date" name="calendar" className="ml-4 text-color-1" />
                    </button>
                  </Tooltip>
                )}

                {/* scenario filter */}
                {['choropleth'].includes(visualization) && !!scenarios.length && (
                  <div className="flex items-center">
                    <span className="pr-2 mb-2">
                      {scenarioLang}
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
                          className={DROPDOWN_BUTTON_STYLES}
                        >
                          <span className={TEXT_BUTTON_STYLES}>
                            {displayScenario || selectScenario}
                          </span>
                        </button>
                      </Tooltip>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* region filter */}
            {(['line', 'pie'].includes(visualization) && !!regions.length && displayRegion) && (
              <div className="flex items-center">
                <span className="pr-2 mb-2">
                  {regionLang}
                  :
                </span>
                {regions.length === 1 && (
                <span className={DROPDOWN_BUTTON_STYLES}>{displayRegion}</span>
                )}
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
                      className={DROPDOWN_BUTTON_STYLES}
                    >
                      <span className={TEXT_BUTTON_STYLES}>{displayRegion || 'Select a region'}</span>
                    </button>
                  </Tooltip>
                )}
              </div>
            )}
            {!regions.length
            && displayRegion && <span className={DROPDOWN_BUTTON_STYLES}>{displayRegion}</span>}
          </div>
          <div className="flex w-full h-full min-h-1/2">
            {isFetchingRecords && (
              <LoadingSpinner />
            )}

            {isFetchedRecords
              && !isFetchingRecords
              && !filteredRecords.length
              && !!visualization && (!!region || !!year)
              && (
                <div className="flex flex-col items-center justify-center w-full h-full min-h-1/2">
                  <img alt="No data" src="/images/illus_nodata.svg" className="h-auto w-28" />
                  <p>{dataNotFound}</p>
                </div>
              )}

            {(!!filteredRecords.length && !isFetchingRecords && isSuccessRecords) && (
              <div className={`flex flex-col w-full h-full py-4 pb-8 min-h-1/2 ${CLASS_DOM_DOWNLOAD_IMAGE}`}>
                {visualization !== 'choropleth' && units.length === 1 && (
                <span className={cx(
                  {
                    'text-sm  text-gray1 text-opacity-50': visualization !== 'choropleth',
                    'border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full mr-4': visualization === 'choropleth',
                  },
                )}
                >
                  {displayUnit}

                </span>
                )}
                  {visualization !== 'choropleth' && units.length > 1 && (
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
                        className={cx('flex items-center cursor-pointer hover:font-bold',
                          {
                            'text-sm  text-gray1 text-opacity-50': visualization !== 'choropleth',
                            DROPDOWN_BUTTON_STYLES: visualization === 'choropleth',
                          })}
                      >
                        <span>{displayUnit}</span>
                        <Icon ariaLabel="units dropdown" name="triangle_border" size="sm" className="ml-2" />
                      </button>
                    </Tooltip>
                  </div>
                  )}
                {visualization !== 'choropleth'
                  && (
                    <div className="w-full h-96">
                      <DynamicChart
                        widgetData={widgetData}
                        widgetConfig={widgetConfig}
                        color={singleValueLegendColor}
                        colors={colors}
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
      <section className="flex flex-col justify-between flex-1">
        {LegendPayload.length > 0 && visualization !== 'choropleth' && (
          <div className="mb-4">
            <Legend
              payload={LegendPayload}
              className="overflow-y-auto text-ellipsis"
              singleValueLegendColor={singleValueLegendColor}
            />
          </div>
        )}
        <DataSource
          indicatorSlug={indicatorSlug}
          type="horizontal"
          dataSource={dataSource}
          className="flex-1"
          isAccessible={!!hasDownloadPermissions}
          compareIndex={compareIndex}
        />
      </section>
    </div>
  );
};

export default CompareIndicatorChart;
