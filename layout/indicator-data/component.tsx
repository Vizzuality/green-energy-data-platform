import React, {
  FC,
  useState,
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
  visualizationTypes: string[],
  data: DataItem[],
  config?: Object
}

interface IndicatorDataProps {
  className?: string;
  indicator: IndicatorProps;
}

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

  const [active, setActive] = useState(type || visualizationTypes[0])

  const DynamicChart = dynamic(
    () => import(`components/chart/${active}`),
    { loading: () => <p>loading...</p> },
  );
  return (
    <div className={cx('bg-white rounded-2.5xl text-gray2 divide-y divide-gray shadow-sm',
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
              border
              label="Change indicator"
              icon="triangle_border"
            />
            <Button size="md" className="border text-color1 border-gray2 border-opacity-20 hover:bg-color1 hover:text-white">Compare</Button>
          </div>
        </div>
        <div>
          <p className="text-sm py-7.5">
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
                widgetData={data[active]}
                widgetConfig={config[active]}
              />
            </div>
          </section>
          <section className="flex flex-col justify-between">
            <Filters className="mb-4" />
            <DataSource />
          </section>
        </div>
      </div>
    </div>
  );
};

export default IndicatorData;
