import React, {
  FC, useEffect, useState, useMemo, useCallback,
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
import PaginatedDynamicChart from 'components/paginated-dynamic-chart/component';

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
/** Max bar chart items */
const MAX_ITEMS = 35;

const IndicatorChart: FC<ComponentTypes> = ({ className }: ComponentTypes) => {
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
      dispatch(setFilters({ [key]: value }));

      setDropdownVisibility({
        ...dropdownVisibility,
        [key]: false,
      });
    },
    [dispatch, dropdownVisibility],
  );

  const { data: indicatorData } = useIndicator(
    groupSlug,
    subgroupSlug,
    indicatorSlug,
    {
      placeholderData: queryClient.getQueryData([
        'indicator',
        indicatorSlug,
      ]) || {
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
    },
    {
      locale: lang,
    },
  );
  const filterByRegion = useMemo(
    () => visualization !== 'choropleth' && visualization !== 'bars',
    [visualization],
  );

  const filtersIndicator = useMemo(() => {
    if (filterByRegion) {
      return {
        visualization,
        region,
        unit,
      };
    }
    return {
      visualization,
      unit,
      year,
    };
  }, [visualization, region, unit, year, filterByRegion]);

  const {
    data: records,
    isFetching: isFetchingRecords,
    isFetched: isFetchedRecords,
    isSuccess: isSuccessRecords,
  } = useIndicatorRecords(
    groupSlug,
    subgroupSlug,
    indicatorSlug,
    filtersIndicator,
    {
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
    () => getSubcategoriesFromRecords(records, visualization),
    [records, visualization],
  );

  const widgetData = useMemo(
    () => getGroupedValues(
      name,
      groupSlug,
      filters,
      filteredRecords,
      regionsGeometries,
      units,
    ),
    [name, groupSlug, filters, filteredRecords, regionsGeometries, units],
  );
  const widgetDataKeys = category?.label === 'category_1' ? categories : getLegendData(widgetData, visualization);
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
    if (regions.find(({ value }) => value === region)) {
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
    () => regions.find(({ value }) => value === region)?.label,
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
  const selectedCategory = useMemo(() => {
    const hasSubcategories = subcategories.length > 1 || (subcategories.length === 1 && visualization !== 'pie');
    if (!hasSubcategories) return defaultCategory;
    // Use the last selected filter
    if (uiCategory.value !== category.value) {
      return uiCategory;
    }
    if (category?.label === 'category_2' && category.value && categories.includes(category.value)) {
      return category;
    }
    return defaultCategory;
  }, [subcategories.length, visualization, category, uiCategory, categories, defaultCategory]);

  useEffect(() => {
    dispatch(
      setFilters({
        visualization: currentVisualization,
        ...((currentUnit && { unit: currentUnit }) || { unit: null }),
        ...(selectedCategory && { category: selectedCategory }),
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    defaultYear,
    defaultUnit,
    defaultScenario,
    currentVisualization,
    indicatorSlug,
  ]);

  const LegendPayload = useMemo(() => {
    let legendData;
    if (visualization === 'pie' && (category?.label === 'category_1' || subcategories.length <= 1)) {
      legendData = widgetData;
    } else if (category?.label === 'category_1') {
      legendData = categories;
    } else if (visualization === 'bar') {
      legendData = subcategories;
    } else {
      legendData = getLegendData(widgetData, visualization);
    }

    return legendData
      .map((item, index) => {
        const legendColor = visualization === 'line' ? getStrokeColor(index, item.name || item, colors) : colors[index];
        return {
          label: item.name || item,
          color: legendColor,
        };
      });
  }, [colors, widgetData, categories, category, subcategories, visualization]);

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
    () => subcategoriesTotals?.find((subcat) => subcat?.label === category?.value)
      ?.color,
    [category, subcategoriesTotals],
  );
  const { data: user } = useMe();

  const hasDownloadPermissions = useMemo(
    () => user
      && user.role
      && (accessibleBy.includes(user.role) || user.role === 'admin'),
    [accessibleBy, user],
  );

  return (
    <div className={`grid grid-cols-12 ${className}`}>
      <div className="w-full h-full col-span-8">
        <section className="flex flex-col w-full">
          <div className="flex justify-between w-full">
            {/* year filter */}
            {['bar', 'pie', 'choropleth'].includes(visualization)
              && !!years.length && (
                <div className="flex flex-wrap items-center">
                  <span className="pr-2 mb-2 whitespace-nowrap">
                    {i18next.t('showing')}
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
                        <span>{displayYear || i18next.t('selectYear')}</span>
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

            {/* region filter */}
            {['line', 'pie'].includes(visualization)
              && !!regions.length
              && displayRegion && (
                <div className="flex items-center">
                  <span className="pr-2 mb-2">
                    {i18next.t('region')}
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
                      onClick={() => {
                        toggleDropdown('scenario');
                      }}
                      className={DROPDOWN_BUTTON_STYLES}
                    >
                      <span>
                        {displayScenario || i18next.t('selectScenario')}
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
            {isFetchingRecords && <LoadingSpinner />}
            {isFetchedRecords
              && !isFetchingRecords
              && !filteredRecords.length
              && !!visualization
              && (!!region || !!year) && (
                <div className="flex flex-col items-center justify-center w-full h-full min-h-1/2">
                  <img
                    alt="No data"
                    src="/images/illus_nodata.svg"
                    className="h-auto w-28"
                  />
                  <p>Data not found</p>
                </div>
            )}
            {!!filteredRecords.length
              && !isFetchingRecords
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
                          (visualization === 'bar' && Array.isArray(widgetData) && widgetData.length > MAX_ITEMS) ? (
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
                                widgetData={widgetData}
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
              hasSubcategories={
                subcategories.length > 1 || (subcategories.length === 1 && visualization !== 'pie')
              }
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
  );
};

export default IndicatorChart;
