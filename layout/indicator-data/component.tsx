import React, {
  FC,
} from 'react';
import cx from 'classnames';
import dynamic from 'next/dynamic';

// components
import VisualizationsNav from 'components/visualizations-nav';
import Dropdown from 'components/select/component';
import Button from 'components/button';
import Filters from 'components/filters';
import DataSource from 'components/data-source';

import { indicatorsList, datesList, selectedIndicator } from '../../constants';

type DataItem = Object; // TO DO - change when we have clear de type of data

interface IndicatorProps {
  title: string,
  type: string,
  data: DataItem[],
  config?: Object
}

interface IndicatorDataProps {
  color: string;
  className?: string;
  indicator: IndicatorProps;
}

const IndicatorData: FC<IndicatorDataProps> = ({
  color,
  className,
  indicator = selectedIndicator,
}: IndicatorDataProps) => {
  const {
    title,
    type,
    data,
    config,
  } = indicator;

  const DynamicChart = dynamic(
    () => import(`components/chart/${type}`),
    { loading: () => <p>loading...</p> },
  );

  return (
    <div className={cx('bg-white rounded-2.5xl text-black divide-y divide-gray shadow-sm',
      { [className]: className })}
    >
      <VisualizationsNav className="px-32 w-full" selected={type} color={color} />

      <div className="flex flex-col px-32 py-11 w-full">
        <div className="flex items-center w-full justify-between">
          <h2 className="text-3.5xl max-w-sm font-bold">
            {title}
          </h2>
          <div className="flex">
            <Dropdown
              menuElements={indicatorsList}
              border
              label="Change indicator"
              icon="triangle_border"
            />
            <Button size="md" className={`text-${color} border-${color} hover:bg-${color} hover:text-white`}>Compare</Button>
          </div>
        </div>
        <div>
          <p className="text-lg py-7.5">
            Metadata lorem ipsum sit amet. Donec ullamcorper nulla non metus
            auctor fringilla. Donec ullamcorper nulla non metus auctor fringilla.
            Vivamus sagittis lacus vel augue laoreet . Donec ullamcorper nulla non metus auctor fringilla.
          </p>
        </div>
        <div className="flex">
          <section className="flex-1 flex-col mr-8">
            <div>
              <div className="flex">
                Showing for:
                <Dropdown
                  menuElements={datesList}
                  border
                  className="bg-white"
                  label="Select dates"
                  icon="calendar"
                  iconSize="lg"
                  iconRotable={false}
                />
              </div>
              <DynamicChart
                color={color}
                widgetData={data}
                widgetConfig={config}
              />
            </div>
          </section>
          <section className="flex flex-col justify-between">
            <Filters className="mb-4" color={color} />
            <DataSource color={color} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default IndicatorData;
