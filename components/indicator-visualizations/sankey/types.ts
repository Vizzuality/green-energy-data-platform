export interface ChartProps {
  widgetData: any,
  widgetConfig: any,
  unit: string,
  indicatorSlug: string
}

export type Payload = {
  [key: string]: string | number | string[] | number[]
};

export interface TooltipProps {
  payload: Payload[],
  indicatorSlug: string,
  unit: string,
}
