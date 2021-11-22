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
  indicatorId: string,
  defaultVisualization: string
}

const GridItem: FC<GridItemProps> = ({
  group,
  subgroup,
  indicator,
  indicatorId,
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
    isFetching: isFetchingMeta,
    isFetched,
    isSuccess,
  } = useIndicatorMetadata(indicatorId, defaultVisualization, [], {}, {
    refetchOnWindowFocus: false,
    enabled: !!indicatorId && !!defaultVisualization,
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
  } = useIndicatorRecords(group, subgroup, indicator, defaultVisualization, {
    visualization: defaultVisualization,
    ...(defaultUnit && { unit: currentUnit }) || { unit: null },
    ...defaultCategory && { category: defaultCategory },
    ...['line', 'pie'].includes(defaultVisualization) ? { region: currentRegion } : { region: null },
    ...['pie', 'choropleth', 'bar'].includes(defaultVisualization) ? { year: currentYear } : { year: null },
  }, {
    enabled: !!isFetched && !!isSuccess && !!defaultUnit,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    dispatch(setRelatedFilters({
      visualization: defaultVisualization,
      ...(defaultUnit && { unit: currentUnit }) || { unit: null },
      ...((['line', 'pie'].includes(defaultVisualization)) && { region: currentRegion }) || { region: null },
      ...(['pie', 'choropleth', 'bar'].includes(defaultVisualization) && { year: currentYear }) || { year: null },
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
  ]);

  const { data: regionsGeojson } = useRegions({}, {
    refetchOnWindowFocus: false,
  });

  const categories = useMemo(
    () => getCategoriesFromRecords(records, defaultVisualization),
    [records, defaultVisualization],
  );

  const colors = useColors(categories.length);

  const widgetConfig = useMemo(
    () => CONFIG(categories)[defaultVisualization],
    [defaultVisualization, categories],
  );
  const widgetData = useMemo(
    () => getGroupedValuesRelatedIndicators(
      categories, filters, records, regionsGeojson,
    ),
    [categories, filters, records, regionsGeojson],
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
          {defaultVisualization === 'pie' && (
          <PieChart
            widgetData={widgetData}
            widgetConfig={widgetConfig}
            colors={colors}
          />
          )}
          {defaultVisualization === 'line' && (
          <LineChart
            widgetData={widgetData}
            widgetConfig={widgetConfig}
            colors={colors}
          />
          )}
          {defaultVisualization === 'bar' && (
          <BarChart
            widgetData={widgetData}
            widgetConfig={widgetConfig}
            colors={colors}
          />
          )}

          {defaultVisualization === 'choropleth' && (
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
