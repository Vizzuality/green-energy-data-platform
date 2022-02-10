import React, {
  FC,
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';

import cx from 'classnames';

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
import FiltersMI from 'components/filters-model-intercomparison';
import Legend from 'components/legend';
import DataSource from 'components/data-source';
import LoadingSpinner from 'components/loading-spinner';
import Line from 'components/indicator-visualizations/line';
import Bar from 'components/indicator-visualizations/bar';

// utils
import {
  filterRecords,
  getModelIntercomparisonData,
  getCategoriesFromRecords,
  getSubcategoriesFromRecords,
} from 'utils';

import { RootState } from 'store/store';

import { setFilters } from 'store/slices/indicator';
import i18next from 'i18next';

import { useColors } from 'hooks/utils';

import DropdownContent from 'layout/dropdown-content';

import ChartConfig from 'components/indicator-visualizations/config';

// types
import { ChartLine, ChartBar } from 'types/model-intercomparison';
import { ComponentTypes } from 'types/data';

const ModelIntercomparison: FC<ComponentTypes> = ({
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

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { current } = useSelector((state: RootState) => (state.language));
  const filters = useSelector((state: RootState) => state.indicator);
  const {
    year, unit, region, scenario, visualization, category,
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

  const { data_source: dataSource } = indicatorData;

  const filterByRegion = useMemo(() => (visualization !== 'choropleth' && visualization !== 'bars'), [visualization]);

  const filtersIndicator = useMemo(() => {
    // TO DO - API should be able to filter records by scenario
    if (filterByRegion) {
      return ({
        scenario,
        visualization,
        region,
        unit,
      });
    }
    return ({
      scenario,
      visualization,
      unit,
      year,
    });
  }, [
    visualization,
    scenario,
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
      enabled: !!visualization && !!scenario && (!!region || !!year),
    },
  );

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

  const categories = useMemo(
    () => getCategoriesFromRecords(records, visualization), [records, visualization],
  );

  const [activeModels, setActiveModel] = useState(categories);

  const filteredRecords = useMemo(
    () => filterRecords(records, filters, categories, groupSlug),
    [records, filters, categories, groupSlug],
  );

  const subcategories = useMemo(
    () => getSubcategoriesFromRecords(records), [records],
  );

  const widgetDataKeysLine = category?.label === 'category_1' ? categories : subcategories;
  const widgetDataKeysBar = subcategories;
  const widgetDataKeys = visualization === 'bar' ? widgetDataKeysBar : widgetDataKeysLine;
  const configType = visualization === 'line' ? 'line' : `model_intercomparison_${visualization}`;
  const widgetConfig = useMemo(
    () => ChartConfig(widgetDataKeys, current)[configType],
    [configType, widgetDataKeys, current],
  );
  const colors = useColors(widgetDataKeys.length);
  const widgetData = useMemo<ChartLine[] | ChartBar[]>(
    () => getModelIntercomparisonData(
      filters, filteredRecords, activeModels,
    ) as ChartLine[] | ChartBar[],
    [filters, filteredRecords, activeModels],
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
      if (years?.find(({ value }) => value === year)) {
        return year;
      }
      return defaultYear?.value;
    },
    [year, years, defaultYear],
  );

  const currentUnit = useMemo<string>(
    () => {
      if (units?.find(({ value }) => value === unit)) {
        return unit;
      }
      return defaultUnit?.value;
    },
    [unit, units, defaultUnit],
  );

  const currentRegion = useMemo<string>(
    () => {
      if (regions?.find(({ value }) => value === region)) {
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

  const displayRegion = useMemo(() => regions?.find(({ value }) => value === region)?.label, [regions, region]) || '';
  const displayUnit = useMemo(() => units?.find(({ value }) => value === unit)?.label, [units, unit]) || '';
  const displayScenario = useMemo(() => scenarios?.find(({ value }) => value === scenario)?.label, [scenarios, scenario]) || '';

  useEffect(() => {
    dispatch(setFilters({
      visualization: currentVisualization,
      ...(defaultUnit && { unit: currentUnit }) || { unit: null },
      ...defaultCategory && { category: defaultCategory },
      ...((['line'].includes(currentVisualization)) && { region: currentRegion }) || { region: null },
      ...(['bar'].includes(currentVisualization) && { year: currentYear }) || { year: null },
      scenario: currentScenario || null,
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
    () => widgetDataKeys.map((item, index) => ({
      label: item,
      color: colors[index],
    })), [colors, widgetDataKeys],
  );

  const legendRef = useRef(null);
  const legendContainerRef = useRef(null);
  const height = legendContainerRef?.current && legendContainerRef?.current?.clientHeight;

  return (
    <section className={`flex flex-col  ${className}`}>
      <section className="flex items-center flex-wrap">
        <span className="pr-2 whitespace-nowrap">
          {i18next.t('showing')}
          :
        </span>
        <div className="flex py-4 items-center">
          {/* region filter */}
          {(['line'].includes(visualization) && !!regions.length) && (
          <div className="flex items-center">
            {regions.length === 1 && (
            <div className="flex items-center border text-color1 border-gray1 border-opacity-20 py-0.5 px-4 rounded-full mr-4 whitespace-nowrap">
              <span className="mr-2 hidden md:flex">
                {i18next.t('region')}
                :
              </span>
              <span>
                {displayRegion || i18next.t('selectRegion')}
              </span>
            </div>
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
                className="flex items-center border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full mr-4 whitespace-nowrap"
              >
                <span className="mr-2 hidden md:flex">
                  {i18next.t('region')}
                  :
                </span>
                <span>
                  {displayRegion || i18next.t('selectRegion')}
                </span>
              </button>
            </Tooltip>
            )}
          </div>
          )}
          {/* Scenario filter */}
          {scenarios.length === 1 && (
          <div className="flex items-center border text-color1 border-gray1 border-opacity-20 py-0.5 px-4 rounded-full mr-4 whitespace-nowrap">
            <span className="mr-2 hidden md:flex">
              {i18next.t('scenario')}
              :
            </span>
            <span>
              {displayScenario || i18next.t('selectScenario')}
            </span>
          </div>
          )}
          {!regions.length && <span className="flex items-center border text-color1 border-gray1 border-opacity-20 py-0.5 px-4 rounded-full mr-4">China</span>}

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
              <span className="mr-2 hidden md:flex">
                {i18next.t('scenario')}
                :
              </span>
              <span>
                {displayScenario || i18next.t('selectScenario')}
              </span>
            </button>
          </Tooltip>
            )}
          {/* Units filter */}
          {units.length === 1 && (
          <div className="flex items-center border text-color1 border-gray1 border-opacity-20 py-0.5 px-4 rounded-full mr-4 whitespace-nowrap">
            <span className="mr-2 hidden md:flex">
              {i18next.t('unit')}
              :
            </span>
            <span>
              {displayUnit || i18next.t('selectUnit')}
            </span>
          </div>
          )}
          {units?.length > 1 && (
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
                className="flex items-center border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full mr-4 whitespace-nowrap"
              >
                <span className="mr-2 hidden md:flex">
                  {i18next.t('unit')}
                  :
                </span>
                <span>
                  {displayUnit || i18next.t('selectUnit')}
                </span>
              </button>
            </Tooltip>
          )}
        </div>
      </section>
      <div className="flex justify-between mb-4 w-full">
        <section className="w-1/2">
          {categories.length > 0 && visualization === 'bar' && (
            <div className="max-h-128">
              <FiltersMI
                models={categories}
                activeModels={activeModels}
                onClick={setActiveModel}
                height={height}
              />
            </div>
          )}
          {categories.length > 0 && visualization !== 'bar' && (
          <Filters
            visualization={visualization}
            categories={categories}
            hasSubcategories={!!subcategories.length}
            className="overflow-y-auto"
            onClick={setFilters}
            height={height}
          />
          )}
        </section>
        <section ref={legendContainerRef} className="flex flex-col justify-between ml-4 w-1/2">
          <DataSource indicatorSlug={indicatorSlug} dataSource={dataSource} className="mb-4" />
          {categories.length > 0 && visualization !== 'choropleth' && (
          <Legend
            ref={legendRef}
            payload={LegendPayload}
            className="mb-4 overflow-y-scroll overflow-x-hidden"
          />
          )}
        </section>
      </div>
      <div>

        <section className="flex flex-col w-full">
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
              <div className={cx('w-full', {
                'flex flex-wrap': visualization === 'bar',
                'h-96': visualization !== 'bar',
              })}
              >
                {visualization === 'line' && (
                <Line
                  widgetData={widgetData}
                  widgetConfig={widgetConfig}
                  colors={colors}
                />
                )}
                {visualization === 'bar' && widgetData.map(
                  (widget) => (
                    <div key={widget.model} className="mr-2">
                      <span className="flex justify-center text-sm tracking-tight opacity-50 w-full">{widget.model}</span>
                      <Bar
                        widgetData={widget.data}
                        widgetConfig={widgetConfig}
                        colors={colors}
                      />
                    </div>
                  ),
                )}
              </div>
            </div>
            )}
          </div>
        </section>
      </div>
    </section>
  );
};

export default ModelIntercomparison;
