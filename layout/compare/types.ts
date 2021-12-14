export interface CompareLayoutProps {
  groupSlug: string,
  subgroupSlug: string,
  indicatorSlug: string,
  onClose: (
    groupSlug: string,
    subgroupSlug: string,
    indicatorSlug: string
  ) => void,
  className?: string,
  compareIndex: number,
}

export type ChartProps = {
  widgetData: unknown,
  widgetConfig: unknown
  colors: string[]
};

export interface IndicatorDataProps {
  groupSlug: string | string[];
  subgroupSlug: string | string[];
  indicatorSlug: string;
  className?: string;
  visualization: string;
}

export default interface IndicatorCompareDataProps {
  groupSlug: string | string[];
  subgroupSlug: string | string[];
  indicatorSlug: string;
  className?: string;
  visualization: string;
}
