import React, {
  FC,
  useMemo,
} from 'react';
import Link from 'next/link';

import BarChart from 'components/indicator-visualizations/bar';
import LineChart from 'components/indicator-visualizations/line';
import PieChart from 'components/indicator-visualizations/pie';

import { widgetData, widgetsConfig } from '../config';

interface GridItemProps {
  group: string,
  subgroup: string,
  indicator: string,
  visualization: string,
}

const GridItem: FC<GridItemProps> = ({
  group,
  subgroup,
  indicator,
  visualization,
}: GridItemProps) => {
  const widgetConfig = useMemo(
    () => widgetsConfig[visualization],
    [visualization],
  );

  return (
    <section className="w-hull h-48">
      <Link href={`/${group}/${subgroup}/${indicator}`} passHref>
        <a href={`/${group}/${subgroup}/${indicator}`}>
          {visualization === 'pie' && (
            <PieChart
              widgetData={widgetData[visualization]}
              widgetConfig={widgetConfig}
            />
          )}
          {visualization === 'line' && (
            <LineChart
              widgetData={widgetData[visualization]}
              widgetConfig={widgetConfig}
            />
          )}
          {visualization === 'bar' && (
            <BarChart
              widgetData={widgetData[visualization]}
              widgetConfig={widgetConfig}
            />
          )}
        </a>
      </Link>
    </section>
  );
};

export default GridItem;
