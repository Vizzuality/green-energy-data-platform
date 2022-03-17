import React, {
  FC,
  useMemo,
  useEffect,
} from 'react';
import {
  useQueryClient,
} from 'react-query';

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
    scenario, visualization,
  } = useSelector((state: RootState) => state.indicator_related);
  const {
    current,
  } = useSelector(
    (state: RootState) => (state.language),
  );
  const queryClient = useQueryClient();

  const dispatch = useDispatch();

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
    isFetched: isFetchedRecords,
  } = useIndicatorRecords(group, subgroup, indicator, {
    visualization: defaultVisualization,
    unit: currentUnit || null,
    ...defaultCategory && { category: defaultCategory },
    ...['line', 'pie'].includes(defaultVisualization) ? { region: currentRegion } : { region: null },
    ...['pie', 'choropleth', 'bar'].includes(defaultVisualization) ? { year: currentYear } : { year: null },
  }, {
    enabled: !!isFetched && !!isSuccess,
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
    placeholderData: queryClient.getQueryData(['fetch-regions', current]) || [],
  });

  const categories = useMemo(
    () => getCategoriesFromRecords(records, visualization),
    [records, visualization],
  );

  const colors = useColors(categories.length);

  const widgetConfig = useMemo(
    () => CONFIG(categories, current)[defaultVisualization],
    [defaultVisualization, categories, current],
  );

  const newFilters = useMemo(() => ({
    visualization: defaultVisualization,
    category: { label: 'category_1' },
    scenario: null,
    ...(defaultUnit && { unit: currentUnit }) || { unit: null },
    ...((['line', 'pie'].includes(defaultVisualization)) && { region: currentRegion }) || { region: null },
    ...(['pie', 'choropleth', 'bar'].includes(defaultVisualization) && { year: currentYear }) || { year: null },
  }), [currentRegion, currentUnit, currentYear, defaultVisualization, defaultUnit]);

  const widgetData = useMemo(
    () => getGroupedValuesRelatedIndicators(
      categories, newFilters, records, regionsGeojson,
    ) || [],
    [categories, newFilters, records, regionsGeojson],
  );

  return (
    <section key={indicatorId} className="h-48 w-full">
      {(isFetchingMeta || isFetchingRecords) && (
        <div className="flex items-center justify-center w-full h-full">
          <LoadingSpinner key={indicatorId} />
        </div>
      )}

      {!!isFetchedRecords && !records?.length && (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <img key="no-data" alt="No data" src="/images/illus_nodata.svg" className="h-auto w-28" />
        <p key="no-data">Data not found</p>
      </div>
      )}

      {!isFetchingRecords && !!records?.length && (
        (defaultVisualization === 'pie' && (
          <PieChart
            widgetData={widgetData}
            widgetConfig={widgetConfig}
            colors={colors}
            className="mt-2"
          />
        )) || (defaultVisualization === 'line' && (
          <LineChart
            widgetData={widgetData}
            widgetConfig={widgetConfig}
            colors={colors}
          />
        )) || (defaultVisualization === 'bar' && (
          <BarChart
            widgetData={widgetData}
            widgetConfig={widgetConfig}
            colors={colors}
          />
        )) || (defaultVisualization === 'choropleth' && (
          <MapContainer
            hasInteraction={false}
            style={{ marginTop: 30 }}
            layers={widgetData[0]?.layers || []}
          />
        ))
      )}
    </section>
  );
};

export default GridItem;
