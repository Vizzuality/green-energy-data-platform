import React, {
  FC,
  useState,
} from 'react';
import cx from 'classnames';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// hooks
import { useIndicator } from 'hooks/indicators';

// components
import LoadingSpinner from 'components/loading-spinner';
import VisualizationsNav from 'components/visualizations-nav';
import Dropdown from 'components/select/component';
import Icon from 'components/icon';
import Tooltip from 'components/tooltip';
import Filters from 'components/filters';
import Legend from 'components/legend';
import DataSource from 'components/data-source';


import { datesList, selectedIndicator } from '../../constants';

import IndicatorDataProps from './types';

type ChartProps = {
  widgetData: any,
  widgetConfig: any
};

const IndicatorData: FC<IndicatorDataProps> = ({
  className,
  defaultIndicator,
  groups,
  subgroups,
  subgroup,
}: IndicatorDataProps) => {

  const {
    default_visualization: defaultVisualization,
    visualizationTypes,
    name,
    // categories, // TO - DO - chamge when API is ready
    // data,
    description,
  } = defaultIndicator;

  const { indicators } = subgroup;


  // TO - DO - change for the ones on top
  const { categories, data, config } = selectedIndicator;

  const [active, setActive] = useState(defaultVisualization);
  const Loading = () => <LoadingSpinner />;


  const DynamicChart = dynamic<ChartProps>(
    () => import(`components/indicator-visualizations/${active}`),
    { loading: Loading },
  );

  const groupId = '066bc939-a3cb-40f3-a4b3-21ad8fe9aef9';
  const subgroupId = '69598aad-9db8-4e7a-9594-7125fc3a4d20';
  const indicatorId = '3efd7616-8833-4c31-a070-3000796f3597';
  const { indicator, widgetData } = useIndicator(groupId, subgroupId, indicatorId, active);

  return (
    <div className={cx('bg-white rounded-2.5xl text-gray1 divide-y divide-gray shadow-sm',
      { [className]: className })}
    >
      <VisualizationsNav
        active={active}
        className="px-32 w-full"
        visualizationTypes={visualizationTypes}
        onClick={setActive}
      />
      <div className="flex flex-col px-32 py-11 w-full">
        <div className="flex items-center w-full justify-between">
          <h2 className="text-3.5xl max-w-sm">
            {name}
          </h2>
          <div className="flex">
            <Dropdown
              menuElements={indicators}
              label="Change indicator"
              icon="triangle_border"
              className="mr-4"
            />
            <Tooltip
              trigger="click"
              placement="bottom-start"
              content={(
                <ul className="justify-center flex flex-col w-full z-10 rounded-xl bg-gray3 divide-y divide-white divide-opacity-10">
                  {groups.map(({ name: groupName, id, subgroups: subgroupsCompare }) => (
                    <li key={id} className="px-5 text-white first:rounded-b-xl last:rounded-b-xl hover:bg-white hover:text-gray3 hover:rounded-t divide-y divide-white divide-opacity-10">
                      <button type="button" aria-haspopup="listbox" aria-labelledby="exp_elem exp_button" id="exp_button" className="flex items-center py-2 w-full last:border-b-0">
                        <span>{groupName}</span>
                        {' '}
                        <Icon ariaLabel="arrow" name="arrow" className="ml-2" />
                      </button>
                      <ul id="exp_elem_list" tabIndex={-1} role="listbox" aria-labelledby="exp_elem" className=" " aria-activedescendant="exp_elem_Pu">
                        {subgroupsCompare.map(({ name: subgroupName, id: subgroupId }) => (

                          <li key={subgroupName} id={`exp-elem_${subgroupId}`} role="option" className="" aria-selected="true">
                            <Link href={{
                              pathname: '/compare',
                              query: {
                                // sgInd1: defaultIndicator.slug,
                                // sgInd2: slug,
                                sgInd1: 'energy-balance',
                                sgInd2: 'energy-supply',
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
          {description}
        </p>
        <div className="flex">
          <section className="flex-1 flex-col mr-8">
            <div className="flex items-center">
              Showing for:
              <Dropdown
                menuElements={datesList}
                className="bg-white ml-3"
                label="Select dates"
                icon="calendar"
                iconSize="lg"
                iconRotable={false}
              />
            </div>
            <div className="flex-1 py-10 h-full">
              <DynamicChart
                widgetData={widgetData}
                widgetConfig={config[active]}
              />
            </div>
          </section>
          <section className="flex flex-col justify-between">
            <Filters categories={categories} className="mb-4" />
            <Legend categories={categories} className="mb-4" />
            <DataSource />
            <DataSource type="horizontal" />
          </section>
        </div>
      </div>
    </div>
  );
};

export default IndicatorData;
