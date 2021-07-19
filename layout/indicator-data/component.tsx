import React, {
  FC,
  useEffect,
  useState,
} from 'react';
import cx from 'classnames';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// hooks
import { useRouter } from 'next/router';
import { useGroups } from 'hooks/groups';
import { useSubgroup } from 'hooks/subgroups';
import { useIndicator } from 'hooks/indicators';

// components
import LoadingSpinner from 'components/loading-spinner';
import VisualizationsNav from 'components/visualizations-nav';
import Icon from 'components/icon';
import Tooltip from 'components/tooltip';
import Filters from 'components/filters';
import Legend from 'components/legend';
import DataSource from 'components/data-source';

import { selectedIndicator } from '../../constants';

import IndicatorDataProps from './types';

type ChartProps = {
  widgetData: any,
  widgetConfig: any
};

const IndicatorData: FC<IndicatorDataProps> = ({
  className,
}: IndicatorDataProps) => {
  const router = useRouter();
  const { query: { group: groupSlug, subgroup: subgroupQuery } } = router;

  const subgroupSlug = subgroupQuery?.[0];
  const indicatorSlug = subgroupQuery?.[1];

  const { data: groups } = useGroups();
  const { data: subgroup } = useSubgroup(groupSlug, subgroupSlug);

  const [active, setActive] = useState(null);

  const {
    data,
    widgetData,
    years,
    isLoading,
  } = useIndicator(groupSlug, subgroupSlug, indicatorSlug, active);

  const [selectedYear, setYear] = useState(years?.[0]);

  const Loading = () => <LoadingSpinner />;

  useEffect(() => {
    if (subgroup) {
      const {
        default_visualization: defaultVisualization,
      } = subgroup?.default_indicator || subgroup?.indicators[0];
      setActive(defaultVisualization);
    }
  }, [subgroup]);

  if (!subgroup || !data) return null;

  const {
    visualizationTypes,
    name,
    categories,
    description,
  } = data;

  const DynamicChart = dynamic<ChartProps>(
    () => import(`components/indicator-visualizations/${active}`),
    { loading: Loading },
  );
  const { config } = selectedIndicator;

  return (
    <div className={cx('bg-white rounded-2.5xl text-gray1 divide-y divide-gray shadow-sm',
      { [className]: className })}
    >
      {isLoading && <LoadingSpinner />}
      {!isLoading && !widgetData && (
        <div className="w-full h-full min-h-1/2 flex flex-col items-center justify-center">
          <img alt="No data" src="/images/illus_nodata.svg" className="w-28 h-auto" />
          <p>Data not found.</p>
        </div>
      )}

      {!isLoading && widgetData && (
        <>
          <VisualizationsNav
            active={active}
            className="px-32 w-full"
            visualizationTypes={visualizationTypes}
            onClick={setActive}
          />
          <div className="flex flex-col px-32 py-11 w-full">
            <div className="flex items-center w-full justify-between">
              <h2 className="flex text-3.5xl max-w-sm">
                {name}
              </h2>
              <div className="flex">
                <Tooltip
                  trigger="click"
                  placement="bottom-start"
                  content={(
                    <ul className="justify-center flex flex-col w-full z-10 rounded-xl bg-gray3 divide-y divide-white divide-opacity-10">
                      {subgroup?.indicators?.map(
                        ({ name: groupName, id, slug }) => (
                          <li key={id} className="px-5 text-white first:rounded-b-xl last:rounded-b-xl hover:bg-white hover:text-gray3 hover:rounded-t divide-y divide-white divide-opacity-10">
                            <button
                              type="button"
                              aria-haspopup="listbox"
                              aria-labelledby="exp_elem exp_button"
                              id="exp_button"
                              className="flex items-center py-2 w-full last:border-b-0"
                              onClick={(e) => {
                                e.preventDefault();
                                router.push(`/${groupSlug}/${subgroupSlug}/${slug}`);
                              }}
                            >
                              <span>{groupName}</span>
                              {' '}
                            </button>
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
                <Tooltip
                  trigger="click"
                  placement="bottom-start"
                  content={(
                    <ul className="justify-center flex flex-col w-full z-10 rounded-xl bg-gray3 divide-y divide-white divide-opacity-10">
                      {groups?.map(({
                        name: groupName, id, subgroups: subgroupsCompare, slug, default_indicator,
                      }) => (
                        <li key={id} className="px-5 text-white first:rounded-b-xl last:rounded-b-xl hover:bg-white hover:text-gray3 hover:rounded-t divide-y divide-white divide-opacity-10">
                          <button type="button" aria-haspopup="listbox" aria-labelledby="exp_elem exp_button" id="exp_button" className="flex items-center py-2 w-full last:border-b-0">
                            <span>{groupName}</span>
                            {' '}
                            <Icon ariaLabel="arrow" name="arrow" className="ml-2" />
                          </button>
                          <ul id="exp_elem_list" tabIndex={-1} role="listbox" aria-labelledby="exp_elem" className="" aria-activedescendant="exp_elem_Pu">
                            {subgroupsCompare.map(
                              (
                                {
                                  name: subgroupName, id: subgroupId, slug: subgroupCompareSlug, default_indicator: compareIndicator,
                                },
                              ) => (
                                <li key={subgroupName} id={`exp-elem_${subgroupId}`} role="option" className="" aria-selected="true">
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
                              ),
                            )}

                          </ul>
                          {/* </Link> */}
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
                </Tooltip>
              </div>
            </div>
            <p className="text-sm py-7.5">
              {description || 'Metadata lorem ipsum sit amet. Donec ullamcorper nulla non metus auctor fringilla. Donec ullamcorper nulla non metus auctor fringilla. Vivamus sagittis lacus vel augue laoreet . Donec ullamcorper nulla non metus auctor fringilla.'}
            </p>
            <div className="flex">
              <section className="flex-1 flex-col mr-8">
                {active === 'line' && (
                  <>
                    <div className="flex items-center">
                      Showing from:
                      <Tooltip
                        trigger="click"
                        placement="bottom-start"
                        hideOnClick
                        content={(
                          <ul className="justify-center flex flex-col w-full z-10 rounded-xl bg-gray3 divide-y divide-white divide-opacity-10 max-h-48 overflow-y-scroll">
                            {years?.map((year) => <li className="px-5 text-white first:rounded-b-xl last:rounded-b-xl hover:bg-white hover:text-gray3 hover:rounded-t divide-y divide-white divide-opacity-10" key={year}>{year}</li>)}
                          </ul>
                        )}
                      >
                        <button
                          type="button"
                          className="flex items-center border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full mr-4"
                        >
                          <span>Select dates</span>
                          <Icon ariaLabel="change date" name="calendar" className="ml-4" />
                        </button>
                      </Tooltip>
                    </div>
                    <div className="flex items-center">
                      to
                      <Tooltip
                        trigger="click"
                        placement="bottom-start"
                        hideOnClick
                        content={(
                          <ul className="justify-center flex flex-col w-full z-10 rounded-xl bg-gray3 divide-y divide-white divide-opacity-10 max-h-48 overflow-y-scroll">
                            {years?.map((year) => <li className="px-5 text-white first:rounded-b-xl last:rounded-b-xl hover:bg-white hover:text-gray3 hover:rounded-t divide-y divide-white divide-opacity-10" key={year}>{year}</li>)}
                          </ul>
                        )}
                      >
                        <button
                          type="button"
                          className="flex items-center border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full mr-4"
                        >
                          <span>Select dates</span>
                          <Icon ariaLabel="change date" name="calendar" className="ml-4" />
                        </button>
                      </Tooltip>
                    </div>
                    {/* <div className="flex items-center">
                      to
                      <Tooltip
                        trigger="click"
                        placement="bottom-start"
                        hideOnClick
                        content={(
                          <ul className="justify-center flex flex-col w-full z-10 rounded-xl bg-gray3 divide-y divide-white divide-opacity-10 max-h-48 overflow-y-scroll">
                            {years?.map((year) => <li className="px-5 text-white first:rounded-b-xl last:rounded-b-xl hover:bg-white hover:text-gray3 hover:rounded-t divide-y divide-white divide-opacity-10" key={year}>{year}</li>)}
                          </ul>
                        )}
                      >
                        <button
                          type="button"
                          className="flex items-center border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full mr-4"
                        >
                          <span>Select dates</span>
                          <Icon ariaLabel="change date" name="calendar" className="ml-4" />
                        </button>
                      </Tooltip>
                    </div> */}
                  </>
                )}

                {(active === 'bar' || active === 'pie') && (
                  <div className="flex items-center">
                    Showing for:
                    <Tooltip
                      trigger="click"
                      placement="bottom-start"
                      hideOnClick
                      content={(
                        <ul className="justify-center flex flex-col w-full z-10 rounded-xl bg-gray3 divide-y divide-white divide-opacity-10 max-h-48 overflow-y-scroll">
                          {years?.map((year) => <li className="px-5 text-white first:rounded-b-xl last:rounded-b-xl hover:bg-white hover:text-gray3 hover:rounded-t divide-y divide-white divide-opacity-10" key={year}>{year}</li>)}
                        </ul>
                      )}
                    >
                      <button
                        type="button"
                        className="flex items-center border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full mr-4"
                      >
                        <span>Select dates</span>
                        <Icon ariaLabel="change date" name="calendar" className="ml-4" />
                      </button>
                    </Tooltip>
                  </div>
                )}
                <div className="flex-1 py-10 h-full">
                  <Icon ariaLabel="no data found" name="illus_nodata" size="2xlg" className="mr-5" />
                  {isLoading
                    ? <LoadingSpinner />
                    : (
                      <DynamicChart
                        widgetData={widgetData}
                        widgetConfig={config[active]}
                      />
                    )}
                </div>
              </section>
              <section className="flex flex-col justify-between">
                {categories?.length > 1 && <Filters categories={categories} className="mb-4" />}
                {categories?.length > 1 && <Legend categories={categories} className="mb-4" />}
                <DataSource />
              </section>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IndicatorData;
