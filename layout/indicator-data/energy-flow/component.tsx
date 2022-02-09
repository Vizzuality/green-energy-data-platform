import React, {
  FC,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';

import { useQueryClient } from 'react-query';
import { uniqBy } from 'lodash';

import {
  useSelector,
  useDispatch,
} from 'react-redux';
import { useRouter } from 'next/router';

import { RootState } from 'store/store';

// hooks
import {
  useIndicator,
  useSankeyData,
  useIndicatorMetadata,
} from 'hooks/indicators';

// components
import Icon from 'components/icon';
import Tooltip from 'components/tooltip';
import Legend from 'components/legend';
import LoadingSpinner from 'components/loading-spinner';
import SankeyLoops from 'components/indicator-visualizations/sankey-loops';

import { COLORS } from 'components/indicator-visualizations/sankey-loops/constants';

import { setFilters } from 'store/slices/indicator';
import i18next from 'i18next';

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
  const filters = useSelector((state: RootState) => state.indicator);
  const {
    year, region, visualization, unit,
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

  const { id: indicatorId } = indicatorData;
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
    refetchOnWindowFocus: false,
  }));

  const {
    years,
    defaultYear,
    units,
    defaultUnit,
    regions,
    defaultRegion,
  } = useIndicatorMetadata(indicatorSlug, visualization, data, {}, {
    refetchOnWindowFocus: false,
    enabled: data && !!indicatorSlug,
  });

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
      if (units.find(({ label }) => label === unit)) {
        return unit;
      }
      return defaultUnit?.label;
    },
    [unit, units, defaultUnit],
  );

  const currentRegion = useMemo<string>(
    () => {
      if (regions.find(({ label }) => label === region)) {
        return region;
      }
      return defaultRegion?.label;
    },
    [region, regions, defaultRegion],
  );

  const displayYear = useMemo(() => years.find(({ value }) => value === year)?.label, [years, year]) || '';
  const displayRegion = useMemo(() => regions.find(({ label }) => label === region)?.label, [regions, region]) || '';
  const displayUnit = useMemo(() => units.find(({ label }) => label === unit)?.label, [units, unit]) || '';

  const currentVisualization = useMemo<string>(
    // if the current visualization is not allowed when the user changes the indicator,
    // it will fallback into the default one. If it is, it will remain.
    () => (indicatorData?.visualization_types?.includes(visualization)
      ? visualization : indicatorData?.default_visualization),
    [visualization, indicatorData],
  );

  useEffect(() => {
    dispatch(setFilters({
      visualization: currentVisualization,
      ...(currentUnit && { unit: currentUnit }) || { unit: null },
      category: null,
      region: currentRegion || null,
      year: currentYear || null,
      scenario: null,
    }));
  }, [
    dispatch,
    defaultYear,
    currentYear,
    defaultUnit,
    currentUnit,
    currentRegion,
    currentVisualization,
    indicatorSlug,
  ]);

  const parsedLinks = useMemo(() => uniqBy(data?.links, 'class'), [data]);

  const LegendPayload = useMemo(
    () => parsedLinks.map((item) => ({
      label: item.class.charAt(0).toUpperCase() + item.class.slice(1),
      color: COLORS[item.class.toLowerCase()] || COLORS['other energy'],
    })), [parsedLinks],
  );

  return (
    <div className={`flex ${className}`}>
      <div className="flex flex-col h-full w-full">
        <section className="flex flex-col w-full">
          <div className="flex justify-between w-full">
            {/* filters */}
            {/* year filter */}
            <div className="flex items-center flex-wrap">
              <span className="pr-2">
                {i18next.t('showing')}
                :
              </span>
              {years.length === 1 && (
                <div className="items-center border text-color1 border-gray1 border-opacity-20 py-0.5 px-4 rounded-full mr-4 md:flex hidden">
                  <span className="hidden mr-2 md:flex">
                    {i18next.t('year')}
                    :
                  </span>
                  <span>
                    {displayYear || i18next.t('selectYear')}
                  </span>
                </div>
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
                    onClick={() => { toggleDropdown('year'); }}
                    className="flex items-center border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full mr-4"
                  >
                    <span className="hidden mr-2 md:flex">
                      {i18next.t('year')}
                      :
                    </span>
                    <span>
                      {displayYear || i18next.t('selectYear')}
                    </span>
                    <Icon ariaLabel="change date" name="calendar" className="ml-4" />
                  </button>
                </Tooltip>
              )}
              {/* unit filter */}
              {units.length === 1 && (
                <div className="flex items-center border text-color1 border-gray1 border-opacity-20 py-0.5 px-4 rounded-full mr-4">
                  <span className="hidden mr-2 md:flex">
                    {i18next.t('unit')}
                    :
                  </span>
                  <span>
                    {displayUnit || i18next.t('selectUnit')}
                  </span>
                </div>
              )}
              {units.length > 1 && (
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
                    className="flex items-center border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full mr-4"
                  >
                    <span className="hidden mr-2 md:flex">
                      {i18next.t('unit')}
                      :
                    </span>
                    <span>
                      {displayUnit || i18next.t('selectUnit')}
                    </span>
                  </button>
                </Tooltip>
              )}
              {/* region filter  */}
              {regions.length === 1 && (
                <div className="flex items-center border text-color1 border-gray1 border-opacity-20 py-0.5 px-4 rounded-full mr-4">
                  <span className="hidden mr-2 md:flex">
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
                    className="flex items-center border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full mr-4"
                  >
                    <span className="hidden mr-2 md:flex">
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
          </div>

          <div className="flex w-full h-full min-h-1/2">
            {isFetchingRecords && (
              <LoadingSpinner />
            )}
            {isFetchedRecords
              && !data
              && !isFetchingRecords
              && !!visualization && !!year
              && (
                <div className="flex flex-col items-center justify-center w-full h-full min-h-1/2">
                  <img alt="No data" src="/images/illus_nodata.svg" className="h-auto w-28" />
                  <p>Data not found</p>
                </div>
              )}
            {(!isFetchingRecords && isSuccessRecords) && (
              <div className="flex flex-col flex-1 w-96 py-8 h-700">
                <SankeyLoops
                  unit={currentUnit}
                  data={data}
                  indicator={indicatorId}
                />
              </div>
            )}
          </div>
        </section>
        <section className="flex flex-col justify-between mb-4">
          <Legend
            payload={LegendPayload}
            className="grid lg:grid-cols-4 sm:grid-cols-3 "
          />
        </section>
      </div>
    </div>
  );
};

export default SankeyChart;
