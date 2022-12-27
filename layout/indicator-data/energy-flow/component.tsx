import React, {
  FC,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';

import cx from 'classnames';

import { useQueryClient } from 'react-query';

import {
  useSelector,
  useDispatch,
} from 'react-redux';
import { useRouter } from 'next/router';

import { RootState } from 'store/store';

// hooks
import {
  useSankeyData,
  useSankeyIndicatorMetadata,
} from 'hooks/indicators';

// components
import Icon from 'components/icon';
import Tooltip from 'components/tooltip';
import LoadingSpinner from 'components/loading-spinner';
import Sankey from 'components/indicator-visualizations/sankey';

import CONFIG from 'components/indicator-visualizations/sankey/config';

import { setFilters } from 'store/slices/indicator';
import i18next from 'i18next';

import DropdownContent from 'layout/dropdown-content';

type SankeyWrapper = {
  indicatorName: string,
  className?: string
};

const DROPDOWN_BUTTON_STYLES = 'text-sm mb-2 flex items-center border text-color1 border-gray1 border-opacity-20 py-0.5 px-4 rounded-full mr-4 whitespace-nowrap';

// language keys
const showing = i18next.t('showing');
const yearLang = i18next.t('yearLang');
const selectYear = i18next.t('selectYear');
const unitLang = i18next.t('unitLang');
const selectUnit = i18next.t('selectUnit');
const regionLang = i18next.t('regionLang');
const selectRegion = i18next.t('selectRegion');
const dataNotFound = i18next.t('dataNotFound');

const SankeyChart: FC<SankeyWrapper> = ({
  indicatorName,
  className,
}: SankeyWrapper) => {
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
    year, region, visualization,
  } = filters;

  const { query } = useRouter();
  const { subgroup: subgroupQuery, locale } = query;

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
    years,
    defaultYear,
    units,
    regions,
    defaultRegion,
    isFetching: isFetchingRecordsMetadata,
  } = useSankeyIndicatorMetadata(indicatorSlug, visualization, { locale }, {
    refetchOnWindowFocus: false,
    enabled: !!indicatorSlug,
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

  const {
    data,
    isFetching: isFetchingRecords,
    isFetched: isFetchedRecords,
    isSuccess: isSuccessRecords,
  } = useSankeyData(indicatorSlug, filters, ({
    placeholderData: queryClient.getQueryData(['sankey-data', indicatorSlug, currentYear]) || {
      nodes: [],
      data: [],
    },
    refetchOnWindowFocus: false,
    enable: !!indicatorSlug && !!currentYear,
  }));
  const { nodes, links, units: currentUnit } = data;

  useEffect(() => {
    dispatch(setFilters({
      visualization: 'sankey',
      category: null,
      region: currentRegion,
      year: currentYear,
      scenario: null,
    }));
  }, [
    dispatch,
    currentYear,
    currentRegion,
  ]);

  if (!nodes || !links) return null;

  return (
    <div className={`flex ${className}`}>
      <div className="flex flex-col w-full h-full py-8">
        <section className="flex flex-col w-full">
          <div className="flex justify-between w-full">
            {/* filters */}
            {/* year filter */}
            <div className="flex flex-wrap items-center">
              <span className="pr-2 mb-2">
                {showing}
                :
              </span>
              {years.length === 1 && (
                <div className={DROPDOWN_BUTTON_STYLES}>
                  <span className="hidden mr-2 md:flex">
                    {yearLang}
                    :
                  </span>
                  <span>
                    {displayYear || selectYear}
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
                    className={cx(DROPDOWN_BUTTON_STYLES, 'hover:bg-color1 hover:text-white')}
                  >
                    <span className="hidden mr-2 md:flex">
                      {yearLang}
                      :
                    </span>
                    <span>
                      {displayYear || selectYear}
                    </span>
                    <Icon ariaLabel="change date" name="calendar" className="ml-4" />
                  </button>
                </Tooltip>
              )}
              {/* unit filter */}
              {units.length === 1 && (
                <div className={DROPDOWN_BUTTON_STYLES}>
                  <span className="hidden mr-2 md:flex">
                    {unitLang}
                    :
                  </span>
                  <span>
                    {currentUnit}
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
                    className={cx(DROPDOWN_BUTTON_STYLES, 'hover:bg-color1 hover:text-white')}
                  >
                    <span className="hidden mr-2 md:flex">
                      {unitLang}
                      :
                    </span>
                    <span>
                      {currentUnit || selectUnit}
                    </span>
                  </button>
                </Tooltip>
              )}
              {/* region filter  */}
              {regions.length === 1 && displayRegion && (
                <div className={DROPDOWN_BUTTON_STYLES}>
                  <span className="hidden mr-2 md:flex">
                    {regionLang}
                    :
                  </span>
                  <span>
                    {displayRegion || selectRegion}
                  </span>
                </div>
              )}
              {regions.length > 1 && displayRegion && (
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
                    className={cx(DROPDOWN_BUTTON_STYLES, 'hover:bg-color1 hover:text-white')}
                  >
                    <span className="hidden mr-2 md:flex">
                      {regionLang}
                      :
                    </span>
                    <span>
                      {displayRegion || selectRegion}
                    </span>
                  </button>
                </Tooltip>
              )}
            </div>
          </div>

          <div className="flex w-full h-full min-h-1/2">
            {(isFetchingRecords || isFetchingRecordsMetadata) && (
              <LoadingSpinner />
            )}
            {isFetchedRecords
              && !data
              && !isFetchingRecords
              && !!visualization && !!year
              && (
                <div className="flex flex-col items-center justify-center w-full h-full min-h-1/2">
                  <img alt="No data" src="/images/illus_nodata.svg" className="h-auto w-28" />
                  <p>{dataNotFound}</p>
                </div>
              )}

            {!isFetchingRecords && isSuccessRecords && (
            <div className="flex flex-col w-full h-full py-8 min-h-1/2">
              <div className="w-full min-h-1/2">
                <Sankey
                  indicatorName={indicatorName}
                  indicatorSlug={indicatorSlug}
                  unit={currentUnit}
                  widgetData={data}
                  widgetConfig={CONFIG}
                />
              </div>
            </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SankeyChart;
