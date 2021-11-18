import React, {
  FC,
  useMemo,
  useEffect,
} from 'react';
import Link from 'next/link';

// components
import BarChart from 'components/indicator-visualizations/bar';
import LineChart from 'components/indicator-visualizations/line';
import PieChart from 'components/indicator-visualizations/pie';
import MapContainer from 'components/indicator-visualizations/choropleth/component';
import LoadingSpinner from 'components/loading-spinner/component';

// hooks
import { useDispatch, useSelector } from 'react-redux';
import { useColors } from 'hooks/utils';
import { useRegions } from 'hooks/regions';
import { useIndicatorRecords, useIndicatorMetadata } from 'hooks/indicators';

// utils
import {
  getGroupedValuesRelatedIndicators,
  getCategoriesFromRecords,
} from 'utils';

import { setRelatedFilters } from 'store/slices/indicator_related';

import { RootState } from 'store/store';

import CONFIG from '../config';

interface GridItemProps {
  group: string | string[],
  subgroup: string,
  indicator: string,
  defaultVisualization: string
}

const GridItem: FC<GridItemProps> = ({
  group,
  subgroup,
  indicator,
  defaultVisualization,
}: GridItemProps) => {
  const {
    year, region, unit, category, scenario, visualization,
  } = useSelector((state: RootState) => state.indicator_related);

  const dispatch = useDispatch();
  const filters = useMemo(() => ({
    year,
    region,
    unit,
    category,
    scenario,
    visualization,
  }), [year, region, unit, category, scenario, visualization]);

  const {
    defaultCategory,
    defaultYear,
    defaultRegion,
    defaultUnit,
    defaultScenario,
  } = useIndicatorMetadata(indicator, visualization, [], {}, {
    refetchOnWindowFocus: false,
    enabled: !!indicator && !!visualization,
  });

  const currentYear = useMemo<number>(
    () => (defaultYear?.value),
    [defaultYear],
  );

  const currentUnit = useMemo<string>(
    () => (defaultUnit?.value),
    [defaultUnit],
  );

  const currentRegion = useMemo<string>(
    () => (defaultRegion?.value),
    [defaultRegion],
  );

  const currentScenario = useMemo<string>(
    () => (scenario || defaultScenario?.value),
    [scenario, defaultScenario],
  );

  const {
    data: records,
    isFetching: isFetchingRecords,
  } = useIndicatorRecords(group, subgroup, indicator, {
    visualization: defaultVisualization,
    ...(defaultUnit && { unit: currentUnit }) || { unit: null },
    ...defaultCategory && { category: defaultCategory },
    ...((['line', 'pie'].includes(visualization)) && { region: currentRegion }) || { region: null },
    ...(['pie', 'choropleth', 'bar'].includes(visualization) && { year: currentYear }) || { year: null },
    ...(['choropleth'].includes(visualization) && defaultScenario) && { scenario: currentScenario },

  }, {
    enabled: !!visualization,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    dispatch(setRelatedFilters({
      visualization: defaultVisualization,
      ...(defaultUnit && { unit: currentUnit }) || { unit: null },
      ...((['line', 'pie'].includes(visualization)) && { region: currentRegion }) || { region: null },
      ...(['pie', 'choropleth', 'bar'].includes(visualization) && { year: currentYear }) || { year: null },
      scenario: null,
    }));
  }, [
    dispatch,
    defaultVisualization,
    defaultYear,
    currentYear,
    currentRegion,
    defaultUnit,
    currentUnit,
    defaultCategory,
    defaultScenario,
    currentScenario,
    visualization,
  ]);

  const { data: regionsGeojson } = useRegions({}, {
    refetchOnWindowFocus: false,
  });

  const categories = useMemo(
    () => getCategoriesFromRecords(records, visualization),
    [records, visualization],
  );

  const colors = useColors(categories.length);

  const widgetConfig = useMemo(
    () => CONFIG(categories)[visualization],
    [visualization, categories],
  );
  const widgetData = useMemo(
    () => getGroupedValuesRelatedIndicators(
      group, categories, filters, records, regionsGeojson,
    ),
    [group, categories, filters, records, regionsGeojson],
  );

  return (
    <section className="w-hull h-48">
      {isFetchingRecords && (
        <div className="w-full h-full flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}

      {!isFetchingRecords && !records.length && (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <img alt="No data" src="/images/illus_nodata.svg" className="w-28 h-auto" />
        <p>Data not found</p>
      </div>
      )}
      {!isFetchingRecords && !!records.length && (
      <Link href={`/${group}/${subgroup}/${indicator}`} passHref>
        <a href={`/${group}/${subgroup}/${indicator}`}>
          {visualization === 'pie' && (
          <PieChart
            widgetData={widgetData}
            widgetConfig={widgetConfig}
            colors={colors}
          />
          )}
          {visualization === 'line' && (
          <LineChart
            widgetData={widgetData}
            widgetConfig={widgetConfig}
            colors={colors}
          />
          )}
          {visualization === 'bar' && (
          <BarChart
            widgetData={widgetData}
            widgetConfig={widgetConfig}
            colors={colors}
          />
          )}

          {visualization === 'choropleth' && (
          <MapContainer
            hasInteraction={false}
            style={{ marginTop: 30 }}
            layers={widgetData[0]?.layers || []}
          />
          )}
        </a>
      </Link>
      )}
    </section>
  );
};

export default GridItem;
