import React, {
  FC,
  useEffect,
  useState,
  useMemo,
} from 'react';
import {
  useQueryClient,
} from 'react-query';
import cx from 'classnames';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// hooks
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
// import { useGroups } from 'hooks/groups';
import { useSubgroup } from 'hooks/subgroups';
import { useIndicator } from 'hooks/indicators';

// components
// import LoadingSpinner from 'components/loading-spinner';
import VisualizationsNav from 'components/visualizations-nav';
import Icon from 'components/icon';
import Tooltip from 'components/tooltip';
// import Filters from 'components/filters';
import Legend from 'components/legend';
import DataSource from 'components/data-source';

// utils
import {
  parseDataByVisualizationType,
} from 'utils';

import { setFilters } from 'store/slices/indicator';

import { selectedIndicator } from '../../constants';

import IndicatorDataProps from './types';

type ChartProps = {
  widgetData: any,
  widgetConfig: any
};

// const Loading = () => <LoadingSpinner />;

const IndicatorData: FC<IndicatorDataProps> = ({
  className,
}: IndicatorDataProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { query: { group: groupSlug, subgroup: subgroupQuery } } = router;

  const subgroupSlug = subgroupQuery?.[0];
  const indicatorSlug = subgroupQuery?.[1];

  // todo: uncomment along with Compare select
  // const { data: groups } = useGroups({
  //   refetchOnWindowFocus: false,
  //   placeholderData: [],
  // });

  const { data: subgroup } = useSubgroup(groupSlug, subgroupSlug, {
    refetchOnWindowFocus: false,
  });

  const dispatch = useDispatch();
  const { year, region } = useSelector((state) => state.indicator);

  const filters = useMemo(() => ({
    year,
    region,
  }), [year, region]);

  const {
    data,
    isLoading,
  } = useIndicator(groupSlug, subgroupSlug, indicatorSlug, ({
    placeholderData: queryClient.getQueryData(`indicator-${indicatorSlug}`) || {
      records: [],
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

  const widgetData = useMemo(
    () => parseDataByVisualizationType(data, filters, visualizationType),
    [data, filters, visualizationType],
  );

  const widgetConfig = useMemo(
    () => selectedIndicator?.config?.[visualizationType], [visualizationType],
  );

  const widgetRecords = useMemo(() => widgetData.widgetData, [widgetData]);

  useEffect(() => {
    const {
      default_visualization: defaultVisualization,
    } = data;

    setVisualizationType(defaultVisualization);
  }, [data]);

  const {
    visualizationTypes,
    name,
    categories,
    description,
  } = data;

  const {
    defaultRegion,
    defaultYear,
    regions,
    years,
  } = widgetData;

  useEffect(() => {
    dispatch(setFilters({
      ...defaultYear && { year: defaultYear },
      ...defaultRegion && { region: defaultRegion },
    }));
  }, [dispatch, defaultYear, defaultRegion]);

  const DynamicChart = dynamic<ChartProps>(
    () => import(`components/indicator-visualizations/${visualizationType}`),
  );

  return (
    <div className={cx('bg-white rounded-2.5xl text-gray1 divide-y divide-gray shadow-sm',
      { [className]: className })}
    >
      {/* {isLoading && <LoadingSpinner />} */}

      <VisualizationsNav
        active={visualizationType}
        className="px-32 w-full"
        visualizationTypes={visualizationTypes}
        onClick={setVisualizationType}
      />
      <div className="flex flex-col lg:px-32 md:px-24 sm:px-16 py-11 w-full">
        <div className="flex items-center w-full justify-between">
          <h2 className="flex text-3.5xl max-w-6xl">
            {name}
          </h2>
          <div className="flex">
            <Tooltip
              trigger="click"
              placement="bottom-end"
              content={(
                <ul className="w-full z-10 rounded-xl  divide-y divide-white divide-opacity-10 overflow-y-auto max-h-96 min-w-full">
                  {subgroup?.indicators?.map(
                    ({ name: groupName, id, slug }) => (
                      <li key={id} className="px-5 text-white first:rounded-t-xl last:rounded-b-xl hover:bg-white hover:text-gray3 first:hover:rounded-t-xl divide-y divide-white divide-opacity-10 bg-gray3">
                        <Link href={`/${groupSlug}/${subgroupSlug}/${slug}`}>
                          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                          <a className="flex items-center py-2 w-full last:border-b-0">{groupName}</a>
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              )}
            >
              <button
                type="button"
                className="flex items-center border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full mr-4"
              >
                <span>Change Indicator</span>
                <Icon ariaLabel="change indicator" name="triangle_border" className="ml-4" />
              </button>

            </Tooltip>
            {/*
              // todo: hidden for the time being.
            */}
            {/* <Tooltip
              trigger="click"
              placement="bottom-start"
              maxHeight={400}
              content={(
                <ul className="justify-center flex flex-col w-full z-10 rounded-xl bg-gray3 divide-y divide-white divide-opacity-10">
                  {groups?.map(({
                    name: groupName, id, subgroups: subgroupsCompare, slug,
                  }) => (
                    <li key={id} className="px-5 text-white first:rounded-b-xl last:rounded-b-xl hover:bg-white hover:text-gray3 hover:rounded-t divide-y divide-white divide-opacity-10">
                      <button type="button" aria-haspopup="listbox" aria-labelledby="exp_elem exp_button" id="exp_button" className="flex items-center py-2 w-full last:border-b-0">
                        <span>{groupName}</span>
                        {' '}
                        <Icon ariaLabel="arrow" name="arrow" className="ml-2" />
                      </button>
                      <ul id="exp_elem_list" tabIndex={-1} role="listbox" aria-labelledby="exp_elem" className="" aria-activedescendant="exp_elem_Pu">
                        {subgroupsCompare.map(({
                          name: subgroupName,
                          id: subgroupId,
                          slug: subgroupCompareSlug,
                          default_indicator: compareIndicator,
                        }) => (
                          <li
                            key={subgroupName}
                            id={`exp-elem_${subgroupId}`}
                            role="option"
                            className=""
                            aria-selected="true"
                          >
                            <Link href={{
                              pathname: '/compare',
                              query: {
                                g1: groupSlug,
                                sg1: subgroupSlug,
                                ind1: 'agriculture',
                                g2: slug,
                                sg2: subgroupCompareSlug,
                                ind2: compareIndicator.slug,
                              },
                            }}
                            >
                              <a
                                className="flex items-center py-2 w-full last:border-b-0"
                                href="/compare"
                              >
                                {subgroupName}
                              </a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
            >
              <button
                type="button"
                className="border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full"
              >
                Compare
              </button>
            </Tooltip> */}
          </div>
        </div>
        <p className="text-sm py-7.5">
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
                      trigger="click"
                      placement="bottom-start"
                      content={(
                        <ul className="w-full z-10 rounded-xl  divide-y divide-white divide-opacity-10 overflow-y-auto max-h-96 min-w-full">
                          {years?.map((_year) => (
                            <li
                              key={_year}
                              className="text-white last:rounded-b-xl hover:bg-white hover:text-gray3 hover:rounded-xl divide-y divide-white divide-opacity-10 bg-gray3"
                            >
                              <button
                                type="button"
                                className="flex items-center py-2 w-full last:border-b-0 px-5"
                                onClick={() => dispatch(setFilters({ year: _year }))}
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
                    <span className="pr-2">Region:</span>
                    <Tooltip
                      trigger="click"
                      placement="bottom-start"
                      content={(
                        <ul className="justify-center flex flex-col w-full z-10 rounded-xl divide-y divide-white divide-opacity-10 max-h-48 overflow-y-auto">
                          {regions.map((_region) => (
                            <li
                              key={_region}
                              className="px-5 text-white first:rounded-b-xl last:rounded-b-xl hover:bg-white hover:text-gray3 hover:rounded-t divide-y divide-white divide-opacity-10 bg-gray3"
                            >
                              <button
                                type="button"
                                onClick={() => dispatch(setFilters({ region: _region }))}
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
                        className="flex items-center border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full mr-4"
                      >
                        <span>{region || 'Select a region'}</span>
                        <Icon ariaLabel="change date" name="calendar" className="ml-4" />
                      </button>
                    </Tooltip>
                  </div>
                )}
              </div>
              <div className="flex h-full w-full py-8">
                {!isLoading && !widgetRecords.length && (
                  <div className="w-full h-full min-h-1/2 flex flex-col items-center justify-center">
                    <img alt="No data" src="/images/illus_nodata.svg" className="w-28 h-auto" />
                    <p>Data not found</p>
                  </div>
                )}

                {(!!widgetRecords.length) && (
                  <DynamicChart
                    widgetData={widgetRecords}
                    widgetConfig={widgetConfig}
                  />
                )}
              </div>
            </section>
          </div>
          <div className="flex h-full">
            <section className="flex flex-col justify-between h-full ml-8">
              {/* {categories?.length > 1 && <Filters categories={categories} className="mb-4" />} */}
              {categories?.length > 1 && <Legend categories={categories} className="overflow-y-auto mb-4" />}
              <DataSource />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndicatorData;
