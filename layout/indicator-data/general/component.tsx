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

import dynamic from 'next/dynamic';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

// hooks
import {
  useIndicator,
  useIndicatorMetadata,
  useIndicatorRecords,
} from 'hooks/indicators';

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

import { useColors } from 'hooks/utils';

import DropdownContent from 'layout/dropdown-content';
import { MapLayersProps } from 'components/indicator-visualizations/choropleth/component';

import ChartConfig from './config';

import IndicatorDataProps from './types';

type ChartProps = {
  widgetData: any,
  widgetConfig: any,
  colors: string[],
};

interface WidgetDataTypes {
  visualizationTypes: string[];
  layers?: MapLayersProps[]
}

const IndicatorChart: FC<IndicatorDataProps> = () => {
  const [dropdownVisibility, setDropdownVisibility] = useState({
    indicator: false,
    year: false,
    region: false,
    unit: false,
    category: { label: 'category_1', value: null },
    scenario: false,
  });

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.indicator);
  const {
    year, unit, region, category, scenario, visualization,
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
      enabled: !!visualization && !!unit && (!!region || !!year),
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
  } = indicatorData;

  const categories = useMemo(
    () => getCategoriesFromRecords(records, visualization), [records, visualization],
  );

  const subcategories = useMemo(
    () => getSubcategoriesFromRecords(records), [records],
  );

  const filteredRecords = useMemo(
    () => filterRecords(records, filters, categories),
    [records, filters, categories],
  );

  const colors = useColors(categories.length);

  const widgetDataKeys = category?.label === 'category_1' ? categories : subcategories;
  const widgetConfig = useMemo(
    () => ChartConfig(widgetDataKeys)[visualization],
    [visualization, widgetDataKeys],
  );

  const widgetData = useMemo<WidgetDataTypes>(
    () => getGroupedValues(
      name, groupSlug, filters, filteredRecords, regionsGeometries, units,
    ) as WidgetDataTypes, [name, groupSlug, filters, filteredRecords, regionsGeometries, units],
  );

  const currentVisualization = useMemo<string>(
    // if the current visualization is not allowed when the user changes the indicator,
    // it will fallback into the default one. If it is, it will remain.
    () => (indicatorData?.visualization_types?.includes(visualization)
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

  const displayYear = useMemo(() => years.find(({ value }) => value === year)?.label, [years, year]) || '';
  const displayRegion = useMemo(() => regions.find(({ value }) => value === region)?.label, [regions, region]) || '';
  const displayUnit = useMemo(() => units.find(({ value }) => value === unit)?.label, [units, unit]) || '';

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

  const DynamicChart = useMemo(() => {
    if (visualization && visualization !== 'choropleth') {
      return dynamic<ChartProps>(import(`components/indicator-visualizations/${visualization}`));
    }
    return null;
  }, [visualization]);

  return (
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
            {isFetchedRecords
                && !isFetchingRecords
                && !filteredRecords.length
                && !!visualization && !!unit && (!!region || !!year)
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
                  layers={widgetData[0]?.layers || []}
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
  );
};

export default IndicatorChart;