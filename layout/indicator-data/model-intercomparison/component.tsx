import React, {
  FC,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';

import { useQueryClient } from 'react-query';

import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

// hooks
import {
  useIndicator,
  useIndicatorRecords,
  useIndicatorMetadata,
} from 'hooks/indicators';

// components
import Tooltip from 'components/tooltip';
import Filters from 'components/filters';
import Legend from 'components/legend';
import DataSource from 'components/data-source';
import LoadingSpinner from 'components/loading-spinner';
import LineChart from 'components/indicator-visualizations/line';
import BarChart from 'components/indicator-visualizations/bar';

// utils
import {
  filterRecords,
  getCategoriesFromRecords,
  getGroupedValues,
  getSubcategoriesFromRecords,
} from 'utils';

import { RootState } from 'store/store';

import { setFilters } from 'store/slices/indicator';
import i18next from 'i18next';

import { useColors } from 'hooks/utils';

// import { MapLayersProps } from 'components/indicator-visualizations/choropleth/component';
import DropdownContent from 'layout/dropdown-content';
import ChartConfig from './config';

import IndicatorDataProps from '../types';

const ModelIntercomparison: FC<IndicatorDataProps> = ({
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
    // TO DO - API should be able to filter records by scenario
    if (filterByRegion) {
      return ({
        //   scenario,
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
  }, [
    visualization,
    //  scenario,
    region,
    unit,
    year,
    filterByRegion,
  ]);

  const {
    data: records,
    isFetching: isFetchingRecords,
    isFetched: isFetchedRecords,
    isSuccess: isSuccessRecords,
  } = useIndicatorRecords(
    groupSlug, subgroupSlug, indicatorSlug, filtersIndicator, {
      refetchOnWindowFocus: false,
      enabled: !!visualization && !!unit && scenario && !!region,
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

  const filteredRecords = useMemo(
    () => filterRecords(records, filters, categories, groupSlug),
    [records, filters, categories, groupSlug],
  );

  const colors = useColors(categories.length);
  const subcategories = useMemo(
    () => getSubcategoriesFromRecords(records), [records],
  );

  const widgetDataKeys = visualization === 'line' ? categories : subcategories;
  const configType = visualization === 'line' ? 'line' : `model_intercomparison_${visualization}`;
  const widgetConfig = useMemo(
    () => ChartConfig(widgetDataKeys)[configType],
    [configType, widgetDataKeys],
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

  const displayRegion = useMemo(() => regions.find(({ value }) => value === region)?.label, [regions, region]) || '';
  const displayUnit = useMemo(() => units.find(({ value }) => value === unit)?.label, [units, unit]) || '';

  useEffect(() => {
    dispatch(setFilters({
      visualization: currentVisualization,
      ...(defaultUnit && { unit: currentUnit }) || { unit: null },
      ...defaultCategory && { category: defaultCategory },
      ...((['line', 'pie'].includes(currentVisualization)) && { region: currentRegion }) || { region: null },
      ...(['pie', 'choropleth', 'bar'].includes(currentVisualization) && { year: currentYear }) || { year: null },
      ...((['choropleth'].includes(currentVisualization) || groupSlug === 'model-intercomparison') && defaultScenario) && { scenario: currentScenario },
    }));
  }, [
    dispatch,
    groupSlug,
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

  return (
    <section className={`flex flex-col  ${className}`}>
      <div className="flex justify-between">
        <section className="w-full">
          {categories.length > 0 && (
          <Filters
            visualization={visualization}
            categories={categories}
            hasSubcategories={!!subcategories.length}
            className="overflow-y-auto mb-4"
            onClick={setFilters}
          />
          )}
        </section>
        <section className="flex flex-col justify-between ml-4 w-full">
          <DataSource indicatorSlug={indicatorSlug} className="mb-4" />
          {categories.length > 0 && visualization !== 'choropleth' && (
          <Legend
            payload={LegendPayload}
            className="max-h-72 overflow-y-auto mb-4"
          />
          )}
        </section>
      </div>
      <div>

        <section className="flex flex-col w-full">
          <div className="flex py-4 items-center">
            {/* region filter */}
            {(['line'].includes(visualization) && !!regions.length) && (
            <div className="flex items-center">
              <span className="pr-2">
                {i18next.t('region')}
                :
              </span>
              {regions.length === 1 && (<span className="flex items-center border text-color1 border-gray1 border-opacity-20 py-0.5 px-4 rounded-full mr-4">{regions[0]?.label}</span>)}
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
            {!regions.length && <span className="flex items-center border text-color1 border-gray1 border-opacity-20 py-0.5 px-4 rounded-full mr-4">China</span>}
            {/* Scenario filter */}
            <span className="pr-2">
              {i18next.t('scenario')}
              :
            </span>
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
                <span>{scenario || i18next.t('selectScenario')}</span>
              </button>
            </Tooltip>
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
                    className="flex items-center cursor-pointer text-sm text-gray1 text-opacity-50"
                  >
                    <span>{displayUnit}</span>
                  </button>
                </Tooltip>
              </div>
              {visualization === 'line'
                  && (
                    <div className="w-full h-96">
                      <LineChart
                        widgetData={widgetData}
                        widgetConfig={widgetConfig}
                        colors={colors}
                      />
                    </div>
                  )}
              {visualization === 'bar'
                  && (
                    <div className="w-full h-full flex flex-wrap">
                      {widgetData.map((data) => (
                        <BarChart
                          key={data.label}
                          widgetData={data}
                          widgetConfig={widgetConfig}
                          colors={colors}
                        />
                      ))}
                    </div>
                  )}

            </div>
            )}
          </div>
        </section>

      </div>
    </section>
  );
};

export default ModelIntercomparison;
