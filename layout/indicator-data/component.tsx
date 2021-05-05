import React, {
  FC,
  useState,
} from 'react';
import cx from 'classnames';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useGroups } from 'hooks/groups';

// components
import VisualizationsNav from 'components/visualizations-nav';
import Dropdown from 'components/select/component';
import Icon from 'components/icon';
import Tooltip from 'components/tooltip';
import Filters from 'components/filters';
import Legend from 'components/legend';
import DataSource from 'components/data-source';

import { indicatorsList, datesList, selectedIndicator } from '../../constants';

import IndicatorDataProps from './types';

type ChartProps = {
  widgetData: any,
  widgetConfig: any
};

const IndicatorData: FC<IndicatorDataProps> = ({
  className,
  indicator = selectedIndicator,
}: IndicatorDataProps) => {
  const {
    title,
    type,
    visualizationTypes,
    data,
    config,
  } = indicator;

  const [active, setActive] = useState(type || visualizationTypes[0]);

  const { groups } = useGroups();
  const Loading = () => <p>loading...</p>;
  const DynamicChart = dynamic<ChartProps>(
    () => import(`components/indicator-visualizations/${active}`),
    { loading: Loading },
  );
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
            {title}
          </h2>
          <div className="flex">
            <Dropdown
              menuElements={indicatorsList}
              label="Change indicator"
              icon="triangle_border"
              className="mr-4"
            />
            <Tooltip
              trigger="click"
              placement="bottom-start"
              content={(
                <ul className="justify-center flex flex-col w-full z-10 rounded-xl bg-gray3 divide-y divide-white divide-opacity-10">

                  {groups && groups[0].subgroups.map(({ name, id, slug }) => (
                    <li key={id} className="px-5 text-white first:rounded-b-xl last:rounded-b-xl hover:bg-white hover:text-gray3 hover:rounded-t divide-y divide-white divide-opacity-10">
                      <Link href={{
                        pathname: '/compare',
                        query: {
                          // sgInd1: groups[0].slug,
                          // sgInd2: slug,
                          sgInd1: 'energy-balance',
                          sgInd2: 'energy-supply',
                        },
                      }}
                      >
                        <a className="flex items-center py-2 w-full last:border-b-0" href="/compare">
                          <span>{name}</span>
                          {' '}
                          <Icon ariaLabel="arrow" name="arrow" className="ml-2" />
                        </a>
                      </Link>
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
          Metadata lorem ipsum sit amet. Donec ullamcorper nulla non metus
          auctor fringilla. Donec ullamcorper nulla non metus auctor fringilla.
          Vivamus sagittis lacus vel augue laoreet . Donec ullamcorper nulla non
          metus auctor fringilla.
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
                widgetData={data[active]}
                widgetConfig={config[active]}
              />
            </div>
          </section>
          <section className="flex flex-col justify-between">
            <Filters categories={categories} className="mb-4" />
            <Legend categories={categories} className="mb-4" />
            <DataSource />
          </section>
        </div>
      </div>
    </div>
  );
};

export default IndicatorData;
