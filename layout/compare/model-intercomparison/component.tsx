import React, {
  FC,
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';

import { useQueryClient } from 'react-query';

import cx from 'classnames';

import { useSelector, useDispatch } from 'react-redux';

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
import DropdownButton from 'layout/dropdown-button';

// utils
import {
  filterRecords,
  getModelIntercomparisonData,
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

// types
import { ChartLine, ChartBar } from 'types/model-intercomparison';
import IndicatorCompareDataProps from '../types';

const ModelIntercomparison: FC<IndicatorCompareDataProps> = ({
  groupSlug,
  subgroupSlug,
  indicatorSlug,
  className,
  compareIndex = 1,
}: IndicatorCompareDataProps) => {
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

  const { current } = useSelector((state: RootState) => (state.language));
  const filters = useSelector(
    (state: RootState) => (compareIndex === 1 ? state.indicator : state.indicator_compare),
  );
  const {
    year, unit, region, scenario, visualization, category,
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
    } else {
      dispatch(setCompareFilters({ [key]: value }));
    }

    setDropdownVisibility({
      ...dropdownVisibility,
      [key]: false,
    });
  }, [dispatch, dropdownVisibility, compareIndex]);

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
      visualizationTypes: [],
      group: null,
      subgroup: null,
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  }));

  const { data_source: dataSource } = indicatorData;

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
    () => getCategoriesFromRecords(records, visualization),
    [records, visualization],
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
    () => ChartConfig(widgetDataKeys, current, records)[configType],
    [configType, widgetDataKeys, current, records],
  );

  const mainColors = useColors(widgetDataKeys.length);
  const colorsOpacity = useOpacityColors(mainColors);
  const colors = category?.label === 'category_1' ? mainColors : colorsOpacity;

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
  const displayScenario = useMemo(() => scenarios.find(({ value }) => value === scenario)?.label, [scenarios, scenario]) || '';

  useEffect(() => {
    if (compareIndex === 1) {
      dispatch(setFilters({
        visualization: currentVisualization,
        ...(defaultUnit && { unit: currentUnit }) || { unit: null },
        ...defaultCategory && { category: defaultCategory },
        ...((['line'].includes(currentVisualization)) && { region: currentRegion }) || { region: null },
        ...(['bar'].includes(currentVisualization) && { year: currentYear }) || { year: null },
        ...((['choropleth'].includes(currentVisualization) || groupSlug === 'model-intercomparison') && defaultScenario) && { scenario: currentScenario },
      }));
    } else if (compareIndex === 2) {
      dispatch(setCompareFilters({
        visualization: currentVisualization,
        ...(defaultUnit && { unit: currentUnit }) || { unit: null },
        ...defaultCategory && { category: defaultCategory },
        ...((['line'].includes(currentVisualization)) && { region: currentRegion }) || { region: null },
        ...(['bar'].includes(currentVisualization) && { year: currentYear }) || { year: null },
        scenario: currentScenario || null,
      }));
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
    groupSlug,
    indicatorSlug,
    compareIndex,
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
              <DropdownButton
                display={displayRegion}
                elKey="region"
                translationKey="selectRegion"
              />
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
              >
                <DropdownButton
                  display={displayRegion}
                  elKey="region"
                  translationKey="selectRegion"
                  icon="triagle_border"
                  iconLabel="dropdown"
                />
              </button>
            </Tooltip>
            )}
          </div>
          )}
          {!regions.length && <span className="flex items-center border text-color1 border-gray1 border-opacity-20 py-0.5 px-4 rounded-full mr-4">China</span>}
          {/* Scenario filter */}
          {scenarios.length === 1 && (
          <DropdownButton
            display={displayScenario}
            elKey="scenario"
            translationKey="selectScenario"
          />
          )}
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
            >
              <DropdownButton
                display={displayScenario}
                elKey="scenario"
                translationKey="selectScenario"
                icon="triagle_border"
                iconLabel="dropdown"
              />
            </button>
          </Tooltip>
            )}
          {/* Units filter */}
          {units.length === 1 && (
          <DropdownButton
            display={displayUnit}
            elKey="unit"
            translationKey="selectUnit"
          />
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
              >
                <DropdownButton
                  display={displayUnit}
                  elKey="unit"
                  translationKey="selectUnit"
                />
              </button>
            </Tooltip>
          )}
        </div>
      </section>
      <div className="flex justify-between w-full">
        <section className="w-1/2 max-h-128">
          {categories.length > 0 && visualization === 'bar' && (
          <FiltersMI
            models={categories}
            activeModels={activeModels}
            onClick={setActiveModel}
            height={height}
          />
          )}
          {categories.length > 0 && visualization !== 'bar' && (
          <Filters
            visualization={visualization}
            categories={categories}
            hasSubcategories={!!subcategories.length  || categories.length === 1}
            className="overflow-y-auto"
            onClick={compareIndex === 1 ? setFilters : setCompareFilters}
            height={height}
          />
          )}
        </section>
        <section className="flex flex-col justify-between ml-4 w-1/2">
          <DataSource
            indicatorSlug={indicatorSlug}
            dataSource={dataSource}
            className="mb-4"
          />
          {LegendPayload.length > 0 && visualization !== 'choropleth' && (
          <Legend
            ref={legendRef}
            payload={LegendPayload}
            className="overflow-y-scroll overflow-x-hidden text-ellipsis"
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
            <div className="flex flex-col h-full w-full min-h-1/2 py-4">
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
