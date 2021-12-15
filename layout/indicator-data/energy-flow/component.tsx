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
  useSankeyData,
} from 'hooks/indicators';

// components
import Icon from 'components/icon';
import Tooltip from 'components/tooltip';
import Legend from 'components/legend';
import LoadingSpinner from 'components/loading-spinner';
import Sankey from 'components/indicator-visualizations/sankey';

import CONFIG from 'components/indicator-visualizations/sankey/config';

import { RootState } from 'store/store';

import { setFilters } from 'store/slices/indicator';
import i18next from 'i18next';

import { useColors } from 'hooks/utils';

import DropdownContent from 'layout/dropdown-content';

import { ComponentTypes } from 'types/data';

const SankeyChart: FC<ComponentTypes> = ({
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
  // const filters = useSelector((state: RootState) => state.indicator);
  // const {
  //   year,
  // } = filters;
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

  const { id: indicatorId } = indicatorData;
  const years = [
    { label: 2000, value: 2000 },
    { label: 2015, value: 2015 },
    { label: 2020, value: 2020 },
  ];
  const units = [{ label: '10000tce', value: '10000tce' }];
  const unit = '10000tce';
  const defaultYear = years[0].value;
  const defaultUnit = units[0].value;
  const year = 2015;
  const visualization = 'sankey';
  const filters = { year };

  const {
    data,
    isFetching: isFetchingRecords,
    isFetched: isFetchedRecords,
    isSuccess: isSuccessRecords,
  } = useSankeyData(indicatorId, filters, ({
    placeholderData: queryClient.getQueryData(['sankey-data', indicatorId]) || {
      nodes: [],
      data: [],
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  }));

  // const {
  //   defaultCategory,
  //   years,
  //   defaultYear,
  //   regionsGeometries,
  //   units,
  //   defaultUnit,
  //   scenarios,
  //   defaultScenario,
  // } = useIndicatorMetadata(indicatorSlug, visualization, records, {}, {
  //   refetchOnWindowFocus: false,
  //   enabled: records && !!indicatorSlug && !!visualization,
  // });

  // const widgetData = useMemo(
  //   () => getGroupedValues(
  //     name, groupSlug, filters, filteredRecords, regionsGeometries, units,
  //   ), [name, groupSlug, filters, filteredRecords, regionsGeometries, units],
  // );

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

  // const currentScenario = useMemo<string>(
  //   () => (scenario || defaultScenario?.value),
  //   [scenario, defaultScenario],
  // );

  const displayYear = useMemo(() => years.find(({ value }) => value === year)?.label, [years, year]) || '';
  const displayUnit = useMemo(() => units.find(({ value }) => value === unit)?.label, [units, unit]) || '';

  useEffect(() => {
    dispatch(setFilters({
      visualization: currentVisualization,
      // ...(currentUnit && { unit: currentUnit }) || { unit: null },
      region: null,
      // year: currentYear || null,
      scenario: null,
    }));
  }, [
    // dispatch,
    // defaultYear,
    // currentYear,
    // defaultUnit,
    // currentUnit,
    // defaultCategory,
    // defaultScenario,
    // currentScenario,
    // currentVisualization,
    // indicatorSlug,
  ]);

  const colors = useColors(data.nodes.length);
  const LegendPayload = useMemo<{ label: string, color: string }[]>(
    () => data?.nodes.map((item, index) => ({
      label: item.name,
      color: colors[index],
    })), [colors, data],
  );

  return (
    <div className={`flex justify-between ${className}`}>
      <div className="flex flex-col h-full w-full">
        <section className="flex flex-col w-full">
          <div className="flex w-full justify-between">
            {/* year filter */}
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
          </div>

          <div className="flex h-full w-full min-h-1/2">
            {isFetchingRecords && (
            <LoadingSpinner />
            )}
            {isFetchedRecords
                && !data
                && !isFetchingRecords
                && !!visualization && !!year
                && (
                  <div className="w-full h-full min-h-1/2 flex flex-col items-center justify-center">
                    <img alt="No data" src="/images/illus_nodata.svg" className="w-28 h-auto" />
                    <p>Data not found</p>
                  </div>
                )}

            {(!isFetchingRecords && isSuccessRecords) && (
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
                    className="flex items-center cursor-pointer text-sm  text-gray1 text-opacity-50"
                  >
                    <span>{displayUnit}</span>
                  </button>
                </Tooltip>
              </div>
              <div className="w-full">
                <Sankey
                  widgetData={data}
                  widgetConfig={CONFIG}
                />
              </div>
            </div>
            )}
          </div>
        </section>
        <section className="flex flex-col justify-between ml-8 mb-4">

          <Legend
            payload={LegendPayload}
            className="grid grid-cols-4"
          />
        </section>
      </div>
    </div>
  );
};

export default SankeyChart;
