import React, {
  FC,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import dynamic from 'next/dynamic';

import cx from 'classnames';

import { RootState } from 'store/store';

// components
import Hero from 'layout/hero';
import Tooltip from 'components/tooltip';
import Icon from 'components/icon';
import VisualizationsNav from 'components/visualizations-nav';
import Filters from 'components/filters';
import LoadingSpinner from 'components/loading-spinner/component';
import Legend from 'components/legend';
import DataSource from 'components/data-source';

// utils
import {
  filterRecords,
  getGroupedValues,
  getYearsFromRecords,
  getUnitsFromRecords,
  getRegionsFromRecords,
  getCategoriesFromRecords,
} from 'utils';

import { setFilters } from 'store/slices/indicator';
import i18next from 'i18next';

import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// hooks
import { useGroup } from 'hooks/groups';
import { useSubgroup } from 'hooks/subgroups';
import {
  useIndicator,
  useIndicatorRecords,
} from 'hooks/indicators';

import ChartConfig from '../indicator-data/config';

interface CompareLayoutProps {
  groupSlug: string,
  subgroupSlug: string,
  indicatorSlug: string,
  onClose: (groupSlug: string, subgroupSlug: string) => void,
  className?: string,
}

type ChartProps = {
  widgetData: any,
  widgetConfig: any
};

const CompareLayout: FC<CompareLayoutProps> = ({
  groupSlug,
  subgroupSlug,
  indicatorSlug,
  className,
  onClose,
}: CompareLayoutProps) => {
  const [dropdownVisibility, setDropdownVisibility] = useState({
    indicator: false,
    year: false,
    region: false,
    unit: false,
  });

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { year, region, unit } = useSelector((state: RootState) => state.indicator);
  const router = useRouter();

  const handleIndicatorChange = useCallback((url) => {
    setDropdownVisibility({
      ...dropdownVisibility,
      indicator: false,
    });

    router.push(url);
  }, [router, dropdownVisibility]);

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

  const handleYearChange = useCallback((_year) => {
    dispatch(setFilters({ year: _year }));

    setDropdownVisibility({
      ...dropdownVisibility,
      year: false,
    });
  }, [dispatch, dropdownVisibility]);

  const handleRegionChange = useCallback((_region) => {
    dispatch(setFilters({ region: _region }));

    setDropdownVisibility({
      ...dropdownVisibility,
      region: false,
    });
  }, [dispatch, dropdownVisibility]);

  const handleUnitChange = useCallback((_unit) => {
    dispatch(setFilters({ unit: _unit }));

    setDropdownVisibility({
      ...dropdownVisibility,
      unit: false,
    });
  }, [dispatch, dropdownVisibility]);

  const { data: subgroup } = useSubgroup(groupSlug, subgroupSlug, {
    refetchOnWindowFocus: false,
  });

  const filters = useMemo(() => ({
    year,
    region,
    unit,
  }), [year, region, unit]);

  const {
    data,
  } = useIndicator(groupSlug, subgroupSlug, indicatorSlug, ({
    placeholderData: queryClient.getQueryData(`indicator-${indicatorSlug}`) || {
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
    refetchOnWindowFocus: false,
  }));

  const [visualizationType, setVisualizationType] = useState(data.default_visualization);

  const {
    data: records,
    isFetching: isFetchingRecords,
  } = useIndicatorRecords(groupSlug, subgroupSlug, indicatorSlug, {
    refetchOnWindowFocus: false,
  });

  const filteredRecords = useMemo(
    () => filterRecords(records, filters, visualizationType),
    [records, filters, visualizationType],
  );

  const years = useMemo(() => getYearsFromRecords(records), [records]);
  const regions = useMemo(() => getRegionsFromRecords(records), [records]);
  const units = useMemo(() => getUnitsFromRecords(records), [records]);

  const defaultYear = useMemo(() => years?.[0], [years]);
  const defaultRegion = useMemo(() => (regions.includes('China') ? 'China' : regions?.[0]), [regions]);
  const defaultUnit = useMemo(() => units?.[0], [units]);

  const categories = useMemo(() => getCategoriesFromRecords(filteredRecords), [filteredRecords]);

  const widgetConfig = useMemo(
    () => ChartConfig(categories)[visualizationType],
    [visualizationType, categories],
  );

  const widgetData = useMemo(
    () => getGroupedValues(visualizationType, filteredRecords),
    [visualizationType, filteredRecords],
  );

  useEffect(() => {
    const {
      default_visualization: defaultVisualization,
    } = data;

    setVisualizationType(defaultVisualization);
  }, [data]);

  const {
    visualizationTypes,
    name,
    description,
  } = data;

  const { data: group } = useGroup(groupSlug, {
    refetchOnWindowFocus: false,
    placeholderData: {
      subgroups: [],
    },
  });

  const handleSubgroupChange = useCallback((url) => {
    setDropdownVisibility(false);

    router.push(url);
  }, [router]);

  useEffect(() => {
    dispatch(setFilters({
      ...defaultYear && { year: defaultYear },
      ...defaultRegion && { region: defaultRegion },
      ...defaultUnit && { unit: defaultUnit },
    }));
  }, [dispatch, defaultYear, defaultRegion, defaultUnit]);

  const DynamicChart = useMemo(() => dynamic<ChartProps>(import(`components/indicator-visualizations/${visualizationType}`)), [visualizationType]);
  return (
    <div className="py-20 text-gray1">
      <Hero
        header={false}
        rounded
        className="relative bg-gradient-color2 pb-2 px-11 rounded-t-2xl text-white"
      >
        <button
          type="button"
          className="absolute left-0 top-0 bg-gray1 rounded-tl-2xl rounded-br-2xl flex divide-x divide-white items-center"
          onClick={() => onClose(groupSlug, subgroupSlug)}
        >
          <Icon
            ariaLabel="close"
            name="close"
            size="sm"
            className="mx-3 "
          />
          <span className="px-8 py-1 text-sm">Don´t compare</span>
        </button>
        <div className="py-5">
          <h2 className="text-white font-bold pt-10">{name}</h2>
          <Tooltip
            placement="bottom-start"
            className=""
            visible={dropdownVisibility}
            interactive
            onClickOutside={() => { setDropdownVisibility(false); }}
            content={(
              <ul
                className="justify-center flex flex-col w-full z-10 rounded-xl bg-gray3 divide-y divide-white divide-opacity-10"
              >
                {group.subgroups.map(({
                  slug: sgSlug, id, name: sgName, default_indicator: { slug: _indicatorSlug },
                }) => (
                  <li
                    key={id}
                    className="text-white first:rounded-t-xl last:rounded-b-xl hover:bg-white hover:text-gray3 divide-y divide-white divide-opacity-10"
                  >
                    <button
                      type="button"
                      className="px-5 cursor-pointer w-full py-2 flex"
                      onClick={() => handleSubgroupChange(`/${group.slug}/${sgSlug}/${_indicatorSlug}`)}
                    >
                      {sgName}
                    </button>
                  </li>
                ))}
              </ul>
          )}
          >
            <button
              type="button"
              className="flex items-center pt-3"
              onClick={() => { setDropdownVisibility(!dropdownVisibility); }}
            >
              <h1 className="text-3.5xl">
                {data?.subgroup?.name}
              </h1>
              <Icon
                ariaLabel="collapse dropdown"
                name="triangle_border"
                size="xlg"
                className={cx('ml-3 border-2 text-white text-sm border-white border-opacity-30 hover:bg-color1 rounded-full p-2',
                  { 'transform -rotate-180': false })}
              />
            </button>
          </Tooltip>

        </div>
      </Hero>
      <div className={cx('container m-auto p-11 bg-white rounded-b-2xl flex flex-col', { [className]: !!className })}>
        <VisualizationsNav
          active={visualizationType}
          className="w-full"
          visualizationTypes={visualizationTypes}
          onClick={setVisualizationType}
          mobile
        />
        <div className="flex flex-col py-11 w-full">
          <div className="flex items-baseline w-full justify-between">
            <h2 className="flex max-w-xs font-bold">
              {name}
            </h2>
            <div className="flex">
              <Tooltip
                placement="bottom-end"
                visible={dropdownVisibility.indicator}
                interactive
                onClickOutside={() => closeDropdown('indicator')}
                content={(
                  <ul className="w-full z-10 rounded-xl divide-y divide-white divide-opacity-10 overflow-y-auto max-h-96 min-w-full">
                    {subgroup?.indicators?.map(
                      ({ name: groupName, id, slug }) => (
                        <li key={id} className="px-5 text-white first:rounded-t-xl last:rounded-b-xl hover:bg-white hover:text-gray3 first:hover:rounded-t-xl divide-y divide-white divide-opacity-10 bg-gray3">
                          <button
                            type="button"
                            className="flex items-center py-2 w-full last:border-b-0"
                            onClick={() => handleIndicatorChange(`/${groupSlug}/${subgroupSlug}/${slug}`)}
                          >
                            {groupName}
                          </button>
                        </li>
                      ),
                    )}
                  </ul>
            )}
              >

                <button
                  type="button"
                  onClick={() => { toggleDropdown('indicator'); }}
                  className="flex items-center border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full text-sm"
                >
                  <span>{i18next.t('change')}</span>
                  <Icon
                    ariaLabel="change indicator"
                    size="sm"
                    name="triangle_border"
                    className="ml-4 text-sm"
                  />
                </button>
              </Tooltip>
              {categories?.length > 1 && <Filters categories={categories} className="mb-4" />}

            </div>
          </div>
          <p className="text-sm text-justify py-7.5">
            {description || 'Metadata lorem ipsum sit amet. Donec ullamcorper nulla non metus auctor fringilla. Donec ullamcorper nulla non metus auctor fringilla. Vivamus sagittis lacus vel augue laoreet . Donec ullamcorper nulla non metus auctor fringilla.'}
          </p>
          <div className="flex justify-between">
            <div className="flex flex-col h-full w-full">
              <section className="flex flex-col w-full">
                <div className="flex">
                  {/* year filter */}
                  {['bar', 'pie'].includes(visualizationType) && (
                  <div className="flex items-center">
                    <span className="pr-2">Showing for:</span>
                    <Tooltip
                      placement="bottom-start"
                      visible={dropdownVisibility.year}
                      interactive
                      onClickOutside={() => closeDropdown('year')}
                      content={(
                        <ul className="w-full z-10 rounded-xl  divide-y divide-white divide-opacity-10 overflow-y-auto max-h-96 min-w-full">
                          {years.map((_year) => (
                            <li
                              key={_year}
                              className="text-white last:rounded-b-xl hover:bg-white hover:text-gray3 hover:rounded-xl divide-y divide-white divide-opacity-10 bg-gray3"
                            >
                              <button
                                type="button"
                                className="flex items-center py-2 w-full last:border-b-0 px-5"
                                onClick={() => { handleYearChange(_year); }}
                              >
                                {_year}
                              </button>
                            </li>
                          ))}
                        </ul>
                    )}
                    >
                      <button
                        type="button"
                        onClick={() => { toggleDropdown('year'); }}
                        className="flex items-center border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full mr-4"
                      >
                        <span>{year || 'Select dates'}</span>
                        <Icon ariaLabel="change date" name="calendar" className="ml-4" />
                      </button>
                    </Tooltip>

                  </div>
                  )}

                  {/* region filter */}
                  {(['line', 'pie'].includes(visualizationType) && !!regions.length) && (
                  <div className="flex items-center">
                    <span className="pr-2">
                      {i18next.t('region')}
                      :
                    </span>
                    <Tooltip
                      placement="bottom-start"
                      visible={dropdownVisibility.region}
                      interactive
                      onClickOutside={() => closeDropdown('region')}
                      content={(
                        <ul className="justify-center flex flex-col w-full z-10 rounded-xl divide-y divide-white divide-opacity-10 max-h-48 overflow-y-auto">
                          {regions.map((_region) => (
                            <li
                              key={_region}
                              className="px-5 text-white first:rounded-b-xl last:rounded-b-xl hover:bg-white hover:text-gray3 hover:rounded-t divide-y divide-white divide-opacity-10 bg-gray3"
                            >
                              <button
                                type="button"
                                onClick={() => handleRegionChange(_region)}
                              >
                                {_region}
                              </button>
                            </li>
                          ))}
                        </ul>
                    )}
                    >
                      <button
                        type="button"
                        onClick={() => { toggleDropdown('region'); }}
                        className="flex items-center border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full mr-4"
                      >
                        <span>{region || 'Select a region'}</span>
                        <Icon ariaLabel="change date" name="calendar" className="ml-4" />
                      </button>
                    </Tooltip>
                  </div>
                  )}
                  {!regions.length && <span className="flex items-center border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full mr-4">China</span>}
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
                      <Tooltip
                        placement="bottom-start"
                        visible={dropdownVisibility.unit}
                        interactive
                        onClickOutside={() => closeDropdown('unit')}
                        content={(
                          <ul className="w-full rounded-xl divide-y divide-white divide-opacity-10 overflow-y-auto max-h-96 min-w-full">
                            {units.map((_unit) => (
                              <li
                                key={_unit}
                                className="px-5 text-white first:rounded-t-xl last:rounded-b-xl hover:bg-white hover:text-gray3 hover:rounded-t divide-y divide-white divide-opacity-10 bg-gray3"
                              >
                                <button
                                  type="button"
                                  className="flex items-center py-2 w-full last:border-b-0 px-5"
                                  onClick={() => { handleUnitChange(_unit); }}
                                >
                                  {_unit}
                                </button>
                              </li>
                            ))}
                          </ul>
                    )}
                      >
                        <button
                          type="button"
                          onClick={() => { toggleDropdown('unit'); }}
                          className="flex items-center cursor-pointer text-color1 hover:bg-color1 hover:rounded-full hover:text-white py-0.5 px-4 mr-4"
                        >
                          <span>{unit}</span>
                        </button>
                      </Tooltip>
                    </div>
                    <div className="w-96">
                      <DynamicChart
                        widgetData={widgetData}
                        widgetConfig={widgetConfig}
                      />
                    </div>
                  </div>
                  )}
                </div>
              </section>
            </div>
            <div className="flex h-full">
              <section className="flex flex-col justify-between h-full ml-8">
                {/* {categories?.length > 1 && <Filters categories={categories} className="mb-4" />} */}
                {categories.length > 0 && <Legend categories={categories} className="overflow-y-auto mb-4" />}
                {/* <DataSource /> */}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareLayout;
