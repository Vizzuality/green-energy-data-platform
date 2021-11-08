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
  widgetData: any,
  widgetConfig: any
  colors: string[]
};

export default interface IndicatorCompareDataProps {
  groupSlug: string | string[];
  subgroupSlug: string | string[];
  indicatorSlug: string;
  className?: string;
  visualization: string;
}
