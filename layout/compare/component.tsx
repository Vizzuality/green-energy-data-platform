import React, { FC, useState } from 'react';
import dynamic from 'next/dynamic';

import cx from 'classnames';

// components
import Hero from 'layout/hero';
import Dropdown from 'components/select';
import Icon from 'components/icon';
import VisualizationsNav from 'components/visualizations-nav';
import Filters from 'components/filters';
import Legend from 'components/legend';
import DataSource from 'components/data-source';

import { indicatorsList, datesList, selectedIndicator } from '../../constants';

interface CompareLayoutProps {
  id: number,
  group: {
    title: string
    slug: string
  },
  subgroup: string | string[],
  onClose: (id: number, group: string, slug: string) => void,
  className?: string,
}

type ChartProps = {
  widgetData: any,
  widgetConfig: any
};

const CompareLayout: FC<CompareLayoutProps> = ({
  id,
  group,
  subgroup,
  className,
  onClose,
}: CompareLayoutProps) => {
  const {
    title: groupTitle,
    slug: groupSlug,
  } = group;
  const {
    title,
    type,
    visualizationTypes,
    categories,
    data,
    description,
    config,
  } = selectedIndicator;

  const [active, setActive] = useState(type || visualizationTypes[0]);

  const Loading = () => <p>loading...</p>;
  const DynamicChart = dynamic<ChartProps>(
    () => import(`components/indicator-visualizations/${active}`),
    { loading: Loading },
  );

  return (
    <div className="py-20 text-white rounded-2xl">
      <Hero
        header={false}
        rounded
        className="relative rounded-t-2xl bg-gradient-color2 pt-14 pb-2"
      >
        <button
          type="button"
          className="absolute left-0 top-0 bg-gray1 px-8 py-2 rounded-tl-2xl rounded-br-2xl flex"
          onClick={() => onClose(id, groupSlug, subgroup)}
        >
          <Icon
            ariaLabel="close"
            name="close"
            size="sm"
            className="mx-3"
          />
          Don´t compare
        </button>
        <h2 className="text-white">{groupTitle}</h2>
        <div className="pt-4 flex items-center">
          <h1 className="text-3.5xl py-6">{subgroup}</h1>
          <Dropdown
            menuElements={[{ id: 1, name: 'group1' }, { id: 2, name: 'group2' }]}
            border
            className="ml-3 rounded-full p-6 text-white"
            icon="triangle_border"
            iconSize="md"
            isRounded
          />
        </div>
      </Hero>
      <div className={cx('container m-auto p-6 bg-white rounded-b-2xl', { [className]: !!className })}>
        <VisualizationsNav
          active={active}
          mobile
          visualizationTypes={visualizationTypes}
          onClick={setActive}
        />
        <div className="flex flex-col">
          <div className="flex">
            <h2 className="text-gray1 font-bold">{title}</h2>
            <Dropdown
              menuElements={indicatorsList}
              label="Change indicator"
              icon="triangle_border"
              className="mr-4"
            />
          </div>
          {console.log(description, selectedIndicator, 'description')}
          <p className="text-gray1">{description}</p>
        </div>
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

        <DynamicChart
          widgetData={data[active]}
          widgetConfig={config[active]}
        />

        <section className="flex flex-col justify-between">
          <Filters categories={categories} className="mb-4" />
          <Legend categories={categories} className="mb-4" />
          <DataSource />
        </section>

      </div>
    </div>
  );
};

export default CompareLayout;
