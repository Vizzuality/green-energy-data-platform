import React, {
  FC,
} from 'react';
import cx from 'classnames';

// components
import VisualizationsNav from 'components/visualizations-nav';
import Dropdown from 'components/select/component';
import Filters from 'components/filters';
import DataSource from 'components/data-source';

import { indicatorsList, datesList } from '../../constants';

interface IndicatorDataProps {
  color: string;
  className?: string;
}

const IndicatorData: FC<IndicatorDataProps> = ({
  color,
  className,
}: IndicatorDataProps) => (
  <div className={cx('bg-white rounded-2.5xl text-black divide-y divide-gray shadow-sm',
    { [className]: className })}
  >
    <VisualizationsNav className="px-32 w-full" selected={'Line'} color={color} />
    <div className="flex px-32 py-11 w-full">
      <section className="flex-1 mr-8">
        <div className="flex items-center w-full justify-between">
          <h2 className="text-3.5xl max-w-sm font-bold">Overall energy balance</h2>
          <Dropdown
            menuElements={indicatorsList}
            border
            label="Change indicator"
            icon="triangle_border"
          />
        </div>
        <Dropdown
          menuElements={datesList}
          border
          className="bg-white"
          label="Select dates"
          icon="calendar"
          iconSize="lg"
          iconRotable={false}
        />

        <p>Widget</p>
      </section>
      <section className="flex flex-col justify-between">
        <div>
          <Filters className="mb-4" color={color} />
        </div>
        <DataSource color={color} />
      </section>
    </div>

  </div>
);

export default IndicatorData;
