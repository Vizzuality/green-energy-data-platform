import React, { FC, useState } from 'react';
import dynamic from 'next/dynamic';

import cx from 'classnames';

// components
import Hero from 'layout/hero';
import LoadingSpinner from 'components/loading-spinner';
import Dropdown from 'components/select';
import Icon from 'components/icon';
import VisualizationsNav from 'components/visualizations-nav';
import Filters from 'components/filters';
import Legend from 'components/legend';
import DataSource from 'components/data-source';

// hooks
import { useGroup } from 'hooks/groups';
import { useSubgroup } from 'hooks/subgroups';

import { indicatorsList, datesList, selectedIndicator } from '../../constants';

interface CompareLayoutProps {
  subgroup: string | string[],
  onClose: (groupSlug: string, subgroupSlug: string) => void,
  className?: string,
}

type ChartProps = {
  widgetData: any,
  widgetConfig: any
};

const CompareLayout: FC<CompareLayoutProps> = ({
  subgroup,
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

  const { data: subgroupData, isLoading: isLoadingGroup } = useSubgroup(subgroup);
  const { data: groupData, isLoading, isSuccess } = useGroup(subgroupData?.group, ({
    enabled: !!subgroupData?.group,
  }));

  if (isLoading || !isSuccess || isLoadingGroup) return <LoadingSpinner />;

  const { name: subgroupTitle, slug: subgroupSlug } = subgroupData;
  const { title: groupTitle, subgroups, slug: groupSlug } = groupData;

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
        <h2 className="text-white">{groupTitle}</h2>
        <div className="pt-4 flex items-center">
          <h1 className="text-3.5xl py-6">{subgroupTitle}</h1>
          <Dropdown
            menuElements={subgroups}
            border
            label={false}
            className="rounded-full p-6 text-white"
            icon="triangle_border"
            iconSize="md"
            shape="circle"
            theme="light"
          />
        </div>
      </Hero>
      <div className={cx('container m-auto p-6 bg-white rounded-b-2xl flex flex-col', { [className]: !!className })}>
        <VisualizationsNav
          active={active}
          mobile
          visualizationTypes={visualizationTypes}
          onClick={setActive}
        />
        <div className="flex flex-col py-8">
          <div className="flex justify-between items-center">
            <h2 className="text-gray1 font-bold">{title}</h2>
            <Dropdown
              menuElements={indicatorsList}
              label="Change indicator"
              icon="triangle_border"
              className="mr-4"
            />
          </div>
          <p className="text-gray1 py-8">{description}</p>
          <Filters categories={categories} className="mb-4" />
        </div>

        <div className="flex text-gray1 items-center">
          Showing for:
          <Dropdown
            menuElements={datesList}
            className="bg-white ml-3"
            label="Select dates"
            icon="calendar"
            iconSize="lg"
            iconColor="text-gray1"
            iconRotable={false}
          />
        </div>

        <DynamicChart
          widgetData={indicatorData[active]}
          widgetConfig={config[active]}
        />

        <Legend categories={categories} className="mb-4" />
        <DataSource type="horizontal" />

      </div>
    </div>
  );
};

export default CompareLayout;
