import React, {
  FC, useEffect, useState, useMemo, useCallback,
} from 'react';

import { useQueryClient } from 'react-query';

import cx from 'classnames';

import dynamic from 'next/dynamic';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { orderBy, filter } from 'lodash';
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
import PaginatedDynamicChart from 'components/paginated-dynamic-chart/component';
import Disclaimer from 'components/disclaimer';

// utils
import {
  filterRecords,
  getGroupedValues,
  getCategoriesFromRecords,
  getSubcategoriesFromRecords,
  getStrokeColor,
  getLegendData,
} from 'utils';

import { RootState } from 'store/store';

import { setFilters } from 'store/slices/indicator';
import i18next from 'i18next';

import { useColors, useOpacityColors } from 'hooks/utils';

import DropdownContent from 'layout/dropdown-content';

import ChartConfig from 'components/indicator-visualizations/config';

import { DROPDOWN_BUTTON_STYLES } from 'layout/indicator-data/constants';
import type { ComponentTypes } from 'types/data';

import { CLASS_DOM_DOWNLOAD_IMAGE } from 'utils/constants';

type ChartProps = {
  widgetData: unknown;
  widgetConfig: unknown;
  colors: string[];
  color?: string;
};

const BUTTON_STYLES = 'text-sm mb-2 flex items-center border text-color1 border-gray1 border-opacity-20 py-0.5 px-4 rounded-full mr-4 whitespace-nowrap';

const IndicatorChart: FC<ComponentTypes> = ({ className }: ComponentTypes) => {
  // language keys
  const showing = i18next.t('showing');
  const selectYear = i18next.t('selectYear');
  const regionLang = i18next.t('region');
  const scenarioLang = i18next.t('scenario');
  const selectScenario = i18next.t('selectScenario');
  const dataNotFound = i18next.t('dataNotFound');
  
  const [dropdownVisibility, setDropdownVisibility] = useState({
    indicator: false,
    year: false,
    region: false,
    unit: false,
    category: { label: 'category_1', value: null },
    uiCategory: { label: 'category_1', value: null },
    scenario: false,
  });

  const [subcategoriesTotals, setSubcategoriesTotals] = useState(null);

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const filters = useSelector((state: RootState) => state.indicator);
  const {
    year,
    unit,
    region,
    category,
    uiCategory,
    scenario,
    visualization = 'choropleth',
  } = filters;

  /** Max bar chart items */
  const MAX_ITEMS = visualization === 'bar' ? 35 : 13;

  const router = useRouter();
  const {
    query: { group: groupSlug, subgroup: subgroupQuery, locale },
  } = router;
  const lang = locale || 'en';
  const subgroupSlug = subgroupQuery?.[0];
  const indicatorSlug = subgroupQuery?.[1];

  const toggleDropdown = useCallback(
    (key) => {
      setDropdownVisibility({
        ...dropdownVisibility,
        [key]: !dropdownVisibility[key],
      });
    },
    [dropdownVisibility],
  );

  const closeDropdown = useCallback(
    (key) => {
      setDropdownVisibility({
        ...dropdownVisibility,
        [key]: false,
      });
    },
    [dropdownVisibility],
  );

  const handleChange = useCallback(
    (key, value) => {
      dispatch(setFilters({
        ...filters,
        [key]: value,
      }));
      setDropdownVisibility({
        ...dropdownVisibility,
        [key]: false,
      });
    },
    [dispatch, dropdownVisibility, filters],
  );

  const { data: indicatorData } = useIndicator(
    groupSlug,
    subgroupSlug,
    indicatorSlug,
    {
      placeholderData: queryClient.getQueryData([
        'indicator',
        indicatorSlug,
        locale,
      ]) || {
        categories: [],
        category_filters: {},
        only_admins_can_download: true,
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
    },
    {
      locale: lang,
    },
  );

  const {
    data: records,
    isFetching: isFetchingRecords,
    isFetched: isFetchedRecords,
    isSuccess: isSuccessRecords,
  } = useIndicatorRecords(
    groupSlug,
    subgroupSlug,
    indicatorSlug,
    {
      ...(visualization === 'line' && { region: filters.region }),
      ...unit && { unit: filters.unit },
      locale: lang,
    },
    {
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
  } = useIndicatorMetadata(
    indicatorSlug,
    visualization,
    records,
    { locale: lang },
    {
      refetchOnWindowFocus: false,
      enabled: !!indicatorSlug && !!visualization,
    },
  );

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
    () => getSubcategoriesFromRecords(records, visualization),
    [records, visualization],
  );

  const widgetData = useMemo(
    () => getGroupedValues(
      name,
      categories,
      groupSlug,
      filters,
      filteredRecords,
      regionsGeometries,
      units,
    ),
    [name, categories, groupSlug, filters, filteredRecords, regionsGeometries, units],
  );

  const widgetDataOrderedByName = orderBy(widgetData as Object[], ['name'], ['asc']);
  const widgetDataKeys = category?.label === 'category_1' ? categories : getLegendData(widgetDataOrderedByName, visualization);
  const mainColors = useColors(widgetDataKeys.length);
  const colorsOpacity = useOpacityColors(mainColors);
  const colors = category?.label === 'category_1' ? mainColors : colorsOpacity;
  // +  const mainColorsKeys = widgetDataKeys.map((k, index) => ({ [k]: mainColors[index] }));
  // +  const colorsOpacity = useOpacityColors(mainColorsKeys);
  // +  const colors = category?.label === 'category_1' ? mainColorsKeys : colorsOpacity;
  const widgetConfig = useMemo(
    () => ChartConfig(widgetDataKeys, lang, records)[visualization],
    [visualization, widgetDataKeys, records, lang],
  );

  const currentVisualization = useMemo<string>(
    // if the current visualization is not allowed when the user changes the indicator,
    // it will fallback into the default one. If it is, it will remain.
    () => (indicatorData?.visualization_types?.includes(visualization)
      ? visualization
      : indicatorData?.default_visualization),
    [visualization, indicatorData],
  );

  const currentYear = useMemo<number>(() => {
    if (years.find(({ value }) => value === year)) {
      return year;
    }
    return defaultYear?.value;
  }, [year, years, defaultYear]);

  const currentUnit = useMemo<string>(() => {
    if (units.find(({ value }) => value === unit)) {
      return unit;
    }
    return defaultUnit?.value;
  }, [unit, units, defaultUnit]);

  const currentRegion = useMemo<string>(() => {
    if (regions?.find(({ value }) => value === region)) {
      return region;
    }
    return defaultRegion?.value;
  }, [region, regions, defaultRegion]);

  const currentScenario = useMemo<string>(
    () => scenario || defaultScenario?.value,
    [scenario, defaultScenario],
  );

  const displayYear = useMemo(
    () => years.find(({ value }) => value === year)?.label,
    [years, year],
  ) || '';
  const displayRegion = useMemo(
    () => regions?.find(({ value }) => value === region)?.label,
    [regions, region],
  ) || '';
  const displayUnit = useMemo(
    () => units.find(({ value }) => value === unit)?.label,
    [units, unit],
  ) || '';
  const displayScenario = useMemo(
    () => scenarios.find(({ value }) => value === scenario)?.label,
    [scenarios, scenario],
  ) || '';

  const hasSubcategories = useMemo(() => subcategories.length > 1 || (subcategories.length === 1 && categories.length > 1), [subcategories, visualization]);

  const selectedCategory = useMemo(() => {
    if (!hasSubcategories) return defaultCategory;
    // Use the last selected filter
    if (uiCategory?.value !== category?.value && categories?.includes(category?.value)) {
      return uiCategory;
    }

    if (category?.label === 'category_2' && category?.value && categories?.includes(category?.value)) {
      return category;
    }

    if (category?.label === 'category_2' && category?.value && !categories?.includes(category?.value)) {
      dispatch(setFilters({
        ...filters,
        category: defaultCategory,
      }));
      return defaultCategory;
    }


    return defaultCategory;
  }, [subcategories, visualization, category, uiCategory, categories, defaultCategory]);

  useEffect(() => {
    dispatch(
      setFilters({
        visualization: currentVisualization,
        ...((currentUnit && { unit: currentUnit }) || { unit: null }),
        ...((selectedCategory && categories.includes(category?.value)) ? { category: selectedCategory } : { category: selectedCategory }),
        ...((['line', 'pie'].includes(currentVisualization) && {
          region: currentRegion,
        }) || { region: null }),
        ...((['pie', 'choropleth', 'bar'].includes(currentVisualization) && {
          year: currentYear,
        }) || { year: null }),
        ...(['choropleth'].includes(currentVisualization)
          && defaultScenario && { scenario: currentScenario }),
      }),
    );
  }, [
    defaultYear,
    defaultUnit,
    defaultScenario,
    currentRegion,
    currentVisualization,
    indicatorSlug,
  ]);

  const LegendPayload = useMemo(() => {
    let legendData;
    if (visualization === 'pie' && (category?.label === 'category_1' || subcategories.length <= 1)) {
      legendData = widgetDataKeys;
    } else if (category?.label === 'category_1') {
      legendData = categories;
    } else if (visualization === 'bar') {
      legendData = subcategories;
    } else {
      legendData = getLegendData(widgetDataOrderedByName, visualization);
    }

    return legendData
      .map((item, index) => {
        const legendColor = visualization === 'line' ? getStrokeColor(index, item.name || item, colors) : colors[index];
        return {
          label: item.name || item,
          color: legendColor,
        };
      });
  }, [colors, widgetDataOrderedByName, categories, category, subcategories, visualization]);

  const DynamicChart = useMemo(() => {
    if (visualization && visualization !== 'choropleth') {
      return dynamic<ChartProps>(
        import(`components/indicator-visualizations/${visualization}`),
      );
    }
    return null;
  }, [visualization]);

  useEffect(() => {
    if (category?.label === 'category_1' && subcategories.length === 1) { setSubcategoriesTotals(LegendPayload); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, subcategories.length, setSubcategoriesTotals]);

  const singleValueLegendColor = useMemo(
    () => subcategoriesTotals?.find((s) => s?.label === category?.value)
      ?.color,
    [category, subcategoriesTotals],
  );
  const { data: user } = useMe();

  const hasDownloadPermissions = useMemo(
    () => user
      && user.role
      && (!onlyAdminsCanDownload || user.role === 'admin'),
    [onlyAdminsCanDownload, user],
  );

  return (
    <>
    <div className={`grid grid-cols-12 ${className}`}>
      <div className="w-full h-full col-span-8">
        <section className="flex flex-col w-full">
          <div className="flex items-end justify-between w-full">
            {/* year filter */}
            {['bar', 'pie', 'choropleth'].includes(visualization)
              && !!years.length && (
                <div className="flex flex-wrap items-center">
                  <span className="pr-2 mb-2 whitespace-nowrap">
                    {showing}
                    :
                  </span>
                  {years.length === 1 && (
                    <span className={BUTTON_STYLES}>{displayYear}</span>
                  )}
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
                        onClick={() => {
                          toggleDropdown('year');
                        }}
                        className={cx(
                          BUTTON_STYLES,
                          'hover:bg-color1 hover:text-white',
                        )}
                      >
                        <span>{displayYear || selectYear}</span>
                        <Icon
                          ariaLabel="change date"
                          name="calendar"
                          className="ml-4"
                        />
                      </button>
                    </Tooltip>
                  )}
                </div>
            )}
            {['choropleth'].includes(visualization) && units.length > 1 && (
            <div className="flex items-center mb-2">
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
                  onClick={() => {
                    toggleDropdown('unit');
                  }}
                  className={cx(
                    'text-sm flex items-center cursor-pointer whitespace-nowrap hover:font-bold',
                    {
                      'border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full mr-4':
                                visualization === 'choropleth',
                    },
                  )}
                >
                  <span>{displayUnit}</span>
                  <Icon
                    ariaLabel="units dropdown"
                    name="triangle_border"
                    size="sm"
                    className="ml-2"
                  />
                </button>
              </Tooltip>
            </div>
            )}

            {/* region filter */}
            {['line', 'pie'].includes(visualization)
              && !!regions.length
              && displayRegion && (
                <div className="flex items-center">
                  <span className="pr-2 mb-2">
                    {regionLang}
                    :
                  </span>
                  {regions.length === 1 && (
                    <span className={BUTTON_STYLES}>{displayRegion}</span>
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
                        onClick={() => {
                          toggleDropdown('region');
                        }}
                        className={cx(
                          BUTTON_STYLES,
                          'hover:bg-color1 hover:text-white',
                        )}
                      >
                        <span>{displayRegion || 'Select a region'}</span>
                        <Icon
                          ariaLabel="dropdown"
                          name="triangle_border"
                          className="ml-4"
                        />
                      </button>
                    </Tooltip>
                  )}
                </div>
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
                      onClick={() => {
                        toggleDropdown('scenario');
                      }}
                      className={DROPDOWN_BUTTON_STYLES}
                    >
                      <span>
                        {displayScenario || selectScenario}
                      </span>
                      <Icon
                        ariaLabel="dropdown"
                        name="triangle_border"
                        className="ml-4"
                      />
                    </button>
                  </Tooltip>
                )}
              </div>
            )}
          </div>

          <div
            className={`flex w-full h-full min-h-1/2 ${CLASS_DOM_DOWNLOAD_IMAGE}`}
          >
            {(isFetchingRecords || !isFetchedRecords) && <LoadingSpinner />}
            {/* Records should not come empty, remove condition when possible */}
            {((!records.length && !isSuccessRecords) || (!isFetchingRecords
              && isFetchedRecords
              && isSuccessRecords
              && !filteredRecords.length
              && !!visualization
              && (!!region || !!year))) && (
                <div className="flex flex-col items-center justify-center w-full h-full min-h-1/2">
                  <img
                    alt="No data"
                    src="/images/illus_nodata.svg"
                    className="h-auto w-28"
                  />
                  <p>{dataNotFound}</p>
                </div>
            )}
            {!!filteredRecords.length
              && !isFetchingRecords
              && isFetchedRecords
              && isSuccessRecords && (
                <div className="flex flex-col w-full h-full py-8 min-h-1/2">
                  {visualization !== 'choropleth' && units.length === 1 && (
                    <span
                      className={cx({
                        'text-sm  text-gray1 text-opacity-50':
                          visualization !== 'choropleth',
                        'border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full mr-4':
                          visualization === 'choropleth',
                      })}
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
                          onClick={() => {
                            toggleDropdown('unit');
                          }}
                          className={cx(
                            'flex items-center cursor-pointer whitespace-nowrap hover:font-bold',
                            {
                              'text-sm  text-gray1 text-opacity-50':
                                visualization !== 'choropleth',
                              'border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full mr-4':
                                visualization === 'choropleth',
                            },
                          )}
                        >
                          <span>{displayUnit}</span>
                          <Icon
                            ariaLabel="units dropdown"
                            name="triangle_border"
                            size="sm"
                            className="ml-2"
                          />
                        </button>
                      </Tooltip>
                    </div>
                  )}
                  {visualization !== 'choropleth' && (
                    <div className="w-full h-96">
                      {
                          ((visualization === 'bar' || visualization === 'line') && Array.isArray(widgetData) && widgetData.length > MAX_ITEMS) ? (
                            <PaginatedDynamicChart
                              maxItems={MAX_ITEMS}
                              widgetData={widgetData}
                            >
                              <DynamicChart
                                widgetData={widgetData}
                                widgetConfig={widgetConfig}
                                colors={colors}
                                color={singleValueLegendColor}
                              />
                            </PaginatedDynamicChart>
                          )
                            : (
                              <DynamicChart
                              widgetData={visualization === 'pie' ? widgetDataOrderedByName : widgetData}
                                widgetConfig={widgetConfig}
                                colors={colors}
                                color={singleValueLegendColor}
                              />
                            )
                        }
                    </div>
                  )}
                  {visualization === 'choropleth' && (
                    <div className="w-full h-96">
                      <MapContainer layers={widgetData[0]?.layers || []} />
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
              hasSubcategories={hasSubcategories}
              className="mb-4 overflow-y-auto"
              onClick={setFilters}
            />
          )}
          {categories.length > 0 && visualization !== 'choropleth' && (
            <div className="mb-4">
              <Legend
                payload={LegendPayload}
                className="w-full overflow-y-auto text-ellipsis"
                singleValueLegendColor={singleValueLegendColor}
              />
            </div>
          )}
          <DataSource
            indicatorSlug={indicatorSlug}
            dataSource={dataSource}
            isAccessible={!!hasDownloadPermissions}
          />
        </section>
      </div>
    </div>
          {/* <Disclaimer /> */}
          </>
  );
};

export default IndicatorChart;
