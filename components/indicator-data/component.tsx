import React, {
  FC,
} from 'react';

// components
import VisualizationsNav from 'components/visualizations-nav';
import Dropdown from 'components/select/component';
import Filters from 'components/filters';
import DataSource from 'components/data-source';

interface IndicatorDataProps {
  color: string;
}

const IndicatorData: FC<IndicatorDataProps> = ({
  color,
}: IndicatorDataProps) => (
  <div className="bg-white rounded-2.5xl text-black divide-y divide-gray mx-13 shadow-sm -mt-40">
    <VisualizationsNav className="px-32 w-full" selected={'Line'} color={color} />
    <div className="flex px-32 py-11 w-full">
      <section className="flex-1 mr-8">
        <div className="flex items-center w-full justify-between">
          <h2 className="text-3.5xl max-w-sm">Overall energy balance</h2>
          <Dropdown label="Change indicator:" />
        </div>
        Change indicator:
        <Dropdown />
        <p>Widget</p>
      </section>
      <section className="flex flex-col justify-between">
        <Filters />
        <DataSource />
      </section>
    </div>

  </div>
);

export default IndicatorData;
