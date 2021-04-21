import React, {
  FC,
  useState,
  useCallback,
} from 'react';
import cx from 'classnames';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useGroups } from 'hooks/groups';

// components
import VisualizationsNav from 'components/visualizations-nav';
import Dropdown from 'components/select/component';
// import Button from 'components/button';
import Tooltip from 'components/tooltip';
import Filters from 'components/filters';
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
  className?: string;
  indicator?: IndicatorProps;
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
  const {
    query: {
      group,
    },
  } = useRouter();

  console.log('group', group);

  const [active, setActive] = useState(type || visualizationTypes[0]);
  const [visible, setVisibility] = useState(false);

  const { groups } = useGroups();

  const toggleVisibility = useCallback(() => {
    setVisibility(!visible);
  }, [visible]);

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
              visible={visible}
              placement="bottom-start"
              content={(
                <ul className="justify-center flex flex-col w-full z-10 rounded-xl bg-gray3 divide-y divide-white divide-opacity-10">
                  {groups && groups[0].subgroups.map(({ name, id }) => (
                    <li key={id}>
                      <Link href={`/compare?comp1=${groups[0].id}&comp2=${id}`}>
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            >
              <button
                size="md"
                className="border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white"
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
            <Filters className="mb-4" />
            <DataSource />
          </section>
        </div>
      </div>
    </div>
  );
};

export default IndicatorData;
