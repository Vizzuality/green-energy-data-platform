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

import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

// hooks
import {
  useIndicator,
  useIndicatorRecords,
} from 'hooks/indicators';
import useDefaultRecordFilters from 'hooks/records';

// components
import Icon from 'components/icon';
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
  getGroupedValues,
} from 'utils';

import { RootState } from 'store/store';

import { setFilters } from 'store/slices/indicator';
import i18next from 'i18next';

import { useRegions } from 'hooks/regions';
import { useColors } from 'hooks/utils';

import DropdownContent from 'layout/dropdown-content';
import ChartConfig from './config';

import IndicatorDataProps from './types';

const ModelIntercomparison: FC<IndicatorDataProps> = ({
  className,
}: IndicatorDataProps) => {
  const [dropdownVisibility, setDropdownVisibility] = useState({
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
    year, region, unit, category, scenario,
  } = useSelector((state: RootState) => state.indicator);
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

  const filters = useMemo(() => ({
    year,
    region,
    unit,
    category,
    scenario,
  }), [year, region, unit, category, scenario]);

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

  const { data: regionsGeojson } = useRegions(indicatorSlug, visualizationType, {
    refetchOnWindowFocus: false,
  });

  const {
    data: records,
    isFetching: isFetchingRecords,
  } = useIndicatorRecords(groupSlug, subgroupSlug, indicatorSlug, {
    refetchOnWindowFocus: false,
  });

  const {
    name,
    categories: categoriesIndicator,
  } = indicatorData;

  const filteredRecords = useMemo(
    () => filterRecords(records, filters, visualizationType, categoriesIndicator),
    [records, filters, visualizationType, categoriesIndicator],
  );

  const {
    categories,
    defaultCategory,
    subcategories,
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
    filteredRecords,
    visualizationType,
    filters,
  );
  const colors = useColors(categories.length);

  const widgetDataKeys = category?.label === 'category_1' ? categories : subcategories;
  const widgetConfig = useMemo(
    () => ChartConfig(widgetDataKeys)[visualizationType],
    [visualizationType, widgetDataKeys],
  );

  const widgetData = useMemo(
    () => getGroupedValues(
      name, groupSlug, categories, visualizationType, filters, filteredRecords, regionsGeojson,
    ), [name, groupSlug, categories, visualizationType, filters, filteredRecords, regionsGeojson],
  );

  useEffect(() => {
    const {
      default_visualization: defaultVisualization,
    } = indicatorData;

    setVisualizationType(defaultVisualization);
  }, [indicatorData]);

  useEffect(() => {
    dispatch(setFilters({
      ...defaultYear && { year: defaultYear },
      ...defaultRegion && { region: defaultRegion },
      ...defaultUnit && { unit: defaultUnit },
      ...defaultScenario && { scenario: defaultScenario },
      ...defaultCategory && { category: { label: defaultCategory } },
    }));
  }, [dispatch, defaultYear, defaultRegion, defaultUnit, defaultScenario, defaultCategory]);
  return (
    <section className={`flex flex-col  ${className}`}>
      <div className="flex justify-between">
        <section className="w-full">
          {categories.length > 0 && (
          <Filters
            visualizationType={visualizationType}
            categories={categories}
            hasSubcategories={!!subcategories.length}
            className="overflow-y-auto mb-4"
            onClick={setFilters}
          />
          )}
        </section>
        <section className="flex flex-col justify-between ml-8 w-full">
          <DataSource indicatorSlug={indicatorSlug} className="mb-4" />
          {categories.length > 0 && visualizationType !== 'choropleth' && (
          <Legend
            categories={category?.label === 'category_1' ? categories : subcategories}
          />
          )}
        </section>
      </div>
      <div>

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
                  <DropdownContent
                    list={years}
                    id="year"
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
              )}
            </div>
            )}

            {/* region filter */}
            {(['line'].includes(visualizationType) && !!regions.length) && (
            <div className="flex items-center">
              <span className="pr-2">
                {i18next.t('region')}
                :
              </span>
              {regions.length === 1 && (<span className="flex items-center border text-color1 border-gray1 border-opacity-20 py-0.5 px-4 rounded-full mr-4">{regions[0]}</span>)}
              {regions.length > 1 && (
              <Tooltip
                placement="bottom-start"
                visible={dropdownVisibility.region}
                interactive
                onClickOutside={() => closeDropdown('region')}
                content={(
                  <DropdownContent
                    list={regions}
                    id="region"
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
                </button>
              </Tooltip>
              )}
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
                {visualizationType !== 'choropleth'
                  && (
                    <Tooltip
                      placement="bottom-start"
                      visible={dropdownVisibility.unit}
                      interactive
                      onClickOutside={() => closeDropdown('unit')}
                      content={(
                        <DropdownContent
                          list={units}
                          id="unit"
                          onClick={handleChange}
                        />
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
                  )}
              </div>
              {visualizationType !== 'line'
                  && (
                    <div className="w-full h-96">
                      <LineChart
                        widgetData={widgetData}
                        widgetConfig={widgetConfig}
                        colors={colors}
                      />
                    </div>
                  )}
              {visualizationType === 'bar'
                  && (
                    <div className="w-full h-96 flex">
                      {scenarios.map((s) => (
                        <BarChart
                          key={s}
                          widgetData={widgetData}
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
