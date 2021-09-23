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
};
