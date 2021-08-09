import React, { FC, useState } from 'react';
import dynamic from 'next/dynamic';

import cx from 'classnames';

// components
import Hero from 'layout/hero';
import LoadingSpinner from 'components/loading-spinner';
import Tooltip from 'components/tooltip';
import Icon from 'components/icon';
import VisualizationsNav from 'components/visualizations-nav';
import Filters from 'components/filters';
import Legend from 'components/legend';
import DataSource from 'components/data-source';

// hooks
import { useGroup } from 'hooks/groups';
import { useSubgroup } from 'hooks/subgroups';

import CONFIG from 'constants';
import { selectedIndicator } from '../../constants';

interface CompareLayoutProps {
  groupSlug: string | string[],
  subgroupSlug: string | string[],
  onClose: (groupSlug: string | string[], subgroupSlug: string | string[]) => void,
  className?: string,
}

type ChartProps = {
  widgetData: any,
  widgetConfig: any
};

const CompareLayout: FC<CompareLayoutProps> = ({
  groupSlug,
  subgroupSlug,
  className,
  onClose,
}: CompareLayoutProps) => {
  const {
    title,
    type,
    visualizationTypes,
    categories,
    data: indicatorData,
    description,
    config,
  } = selectedIndicator;

  const [active, setActive] = useState(type || visualizationTypes[0]);
  const { data: groupData, isLoading, isSuccess } = useGroup(groupSlug);
  const { data: subgroupData, isLoading: isLoadingGroup } = useSubgroup(groupSlug, subgroupSlug);

  if (isLoading || !isSuccess || isLoadingGroup) return <LoadingSpinner />;

  const {
    name: groupName,
  } = groupData;

  const {
    name: subgroupName,
  } = subgroupData;

  const Loading = () => <LoadingSpinner />;
  const DynamicChart = dynamic<ChartProps>(
    () => import(`components/indicator-visualizations/${active}`),
    { loading: Loading },
  );
  return (
    <div className="py-20 text-white rounded-2xl">
      <Hero
        header={false}
        rounded
        className="relative rounded-t-2xl bg-gradient-color2 pb-2"
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
          <span className="px-8 py-1">Don´t compare</span>
        </button>
        <h2 className="text-white">{groupName}</h2>
        <div className="pt-4 flex items-center">
          <h1 className="text-3.5xl py-6">{subgroupName}</h1>
        </div>
      </Hero>
      <div className={cx('container m-auto p-6 bg-white rounded-b-2xl flex flex-col', { [className]: !!className })}>
        <VisualizationsNav
          active={active}
          mobile
          visualizationTypes={['map']}
          onClick={setActive}
        />
        <div className="flex flex-col py-8">
          <div className="flex justify-between items-center">
            <h2 className="text-gray1 font-bold">{title}</h2>
          </div>
          <p className="text-gray1 py-8">{description}</p>
          {categories.length > 1 && <Filters categories={categories} className="mb-4" />}
        </div>

        <div className="flex text-gray1 items-center">
          <span className="pr-2">Showing for:</span>
          <Tooltip
            trigger="click"
            placement="bottom-start"
            content={(
              <ul className="justify-center flex flex-col w-full z-10 rounded-xl bg-gray3 divide-y divide-white divide-opacity-10">
                {/* {years.map(year => (<li>{year}</li>))} */}
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

        <DynamicChart
          widgetData={indicatorData[active]}
          widgetConfig={config[active]}
        />

        {categories.length > 1 && <Legend categories={[]} className="mb-4" />}
        <DataSource type="horizontal" />

      </div>
    </div>
  );
};

export default CompareLayout;
