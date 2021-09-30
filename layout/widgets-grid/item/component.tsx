import React, {
  FC,
  useMemo,
} from 'react';
import Link from 'next/link';

// components
import BarChart from 'components/indicator-visualizations/bar';
import LineChart from 'components/indicator-visualizations/line';
import PieChart from 'components/indicator-visualizations/pie';
import MapContainer from 'components/indicator-visualizations/choropleth/component';
import LoadingSpinner from 'components/loading-spinner/component';

// hooks
import { useIndicatorRecords } from 'hooks/indicators';
import { useSelector } from 'react-redux';

// utils
import {
  filterRelatedIndicators,
  getGroupedValuesRelatedIndicators,
  getCategoriesFromRecords,

} from 'utils';

import { RootState } from 'store/store';

import CONFIG from '../config';

interface GridItemProps {
  group: string | string[],
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
  const {
    year, region, unit, category,
  } = useSelector((state: RootState) => state.indicator);

  const filters = useMemo(() => ({
    year,
    region,
    unit,
    category,
  }), [year, region, unit, category]);

  const {
    data: records,
    isFetching: isFetchingRecords,
  } = useIndicatorRecords(group, subgroup, indicator, {
    refetchOnWindowFocus: false,
  });

  const filteredRecords = useMemo(
    () => filterRelatedIndicators(records, filters, visualization),
    [records, filters, visualization],
  );

  const categories = useMemo(() => getCategoriesFromRecords(filteredRecords), [filteredRecords]);

  const widgetConfig = useMemo(
    () => CONFIG(categories)[visualization],
    [visualization, categories],
  );
  const widgetData = useMemo(
    () => getGroupedValuesRelatedIndicators(visualization, filteredRecords),
    [visualization, filteredRecords],
  );

  return (
    <section className="w-hull h-48">
      {isFetchingRecords && (
      <LoadingSpinner />
      )}

      {!isFetchingRecords && !filteredRecords.length && (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <img alt="No data" src="/images/illus_nodata.svg" className="w-28 h-auto" />
        <p>Data not found</p>
      </div>
      )}
      {!isFetchingRecords && (
      <Link href={`/${group}/${subgroup}/${indicator}`} passHref>
        <a href={`/${group}/${subgroup}/${indicator}`}>
          {visualization === 'pie' && (
          <PieChart
            widgetData={widgetData}
            widgetConfig={widgetConfig}
          />
          )}
          {visualization === 'line' && (
          <LineChart
            widgetData={widgetData}
            widgetConfig={widgetConfig}
          />
          )}
          {visualization === 'bar' && (
          <BarChart
            widgetData={widgetData}
            widgetConfig={widgetConfig}
          />
          )}
          {visualization === 'choropleth' && (
          <MapContainer hasLegend={false} style={{ marginTop: 30 }} />
          )}
        </a>
      </Link>
      )}
    </section>
  );
};

export default GridItem;
