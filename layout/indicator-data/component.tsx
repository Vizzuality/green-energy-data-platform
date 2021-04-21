import React, {
  FC,
  useState,
  useCallback,
} from 'react';
import cx from 'classnames';
import dynamic from 'next/dynamic';

import Link from 'next/link';

// components
import VisualizationsNav from 'components/visualizations-nav';
import Dropdown from 'components/select/component';
import Tooltip from 'components/tooltip';
import Icon from 'components/icon';
import Filters from 'components/filters';
import Legend from 'components/legend';
import DataSource from 'components/data-source';

import { indicatorsList, datesList, selectedIndicator } from '../../constants';

type ChartProps = {
  widgetData: any,
  widgetConfig: any
};

type CategoriesObject = {
  [key: string]: string[]
};

type ObjectData = {
  [key: string]: Object[]
};

type GroupItemProps = {
  id: string,
  name: string,
  status: string,
  subgroups: string[]
};

interface IndicatorProps {
  id: string | number,
  title: string,
  type: string,
  visualizationTypes: string[],
  categories: { id: number, name: string }[],
  categories_filters: CategoriesObject,
  startDate: string | number,
  endDate: string | number,
  data: ObjectData, // TO DO - change when we have clear de type of data
  config?: Object
}

interface IndicatorDataProps {
  groups: GroupItemProps[],
  className?: string;
  indicator?: IndicatorProps;
}

const IndicatorData: FC<IndicatorDataProps> = ({
  groups,
  className,
  indicator = selectedIndicator,
}: IndicatorDataProps) => {
  const {
    title,
    type,
    visualizationTypes,
    categories,
    data,
    config,
  } = indicator;

  const [active, setActive] = useState(type || visualizationTypes[0]);
  const [visible, setVisibility] = useState(false);

  const Loading = () => <p>loading...</p>;
  const DynamicChart = dynamic<ChartProps>(
    () => import(`components/indicator-visualizations/${active}`),
    { loading: Loading },
  );

  const toggleVisibility = () => {
    setVisibility(!visible);
  };

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
              iconColor="text-gray2"
              className="mr-4 text-white"
            />
            <Tooltip
              visible={visible}
              placement="bottom-start"
              content={(
                <div className="justify-center flex flex-col w-full z-10 rounded-xl bg-gray3">
                  <ul>
                    {groups.map(
                      ({ name, status, id }) => (
                        status === 'disabled' && (
                          <li key={id} className="px-5 text-white first:rounded-b-xl last:rounded-b-xl hover:bg-white hover:text-gray3 hover:rounded-t divide-y divide-white divide-opacity-10">
                            <Link key="group1" href="/compare" passHref>
                              <a className="flex items-center py-2 w-full last:border-b-0" href="/compare">
                                <span>{name}</span>
                                {' '}
                                <Icon ariaLabel="arrow" name="arrow" className="ml-2" />
                              </a>
                            </Link>
                          </li>
                        )
                      ),
                    )}
                  </ul>
                </div>
              )}
            >
              <button
                type="button"
                className="flex items-center justify-center text-center px-4 py-1 border rounded-full bold focus:outline-none text-sm"
                onClick={toggleVisibility}
              >
                Compare
              </button>
            </Tooltip>
          </div>
        </div>
        <div>
          <p className="text-sm py-7.5">
            Metadata lorem ipsum sit amet. Donec ullamcorper nulla non metus
            auctor fringilla. Donec ullamcorper nulla non metus auctor fringilla.
            Vivamus sagittis lacus vel augue laoreet . Donec ullamcorper nulla non
            metus auctor fringilla.
          </p>
        </div>
        <div className="flex">
          <section className="flex-1 flex-col mr-8">
            <div>
              <div className="flex items-center">
                Showing for:
                <Dropdown
                  menuElements={datesList}
                  className="ml-3 text-white"
                  label="Select dates"
                  icon="calendar"
                  iconColor="text-gray2"
                  iconSize="lg"
                  iconRotable={false}
                />
              </div>

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
