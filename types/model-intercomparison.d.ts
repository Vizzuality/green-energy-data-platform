export type ChartProps = {
  widgetData: unknown,
  widgetConfig: unknown,
  colors: string[],
};

export type Object = {
  label: string | number,
  value: string | number,
};

export interface WidgetConfigTypes {
  cartesianAxis?: Object,
  cartesianGrid?: Object,
  tooltip?: Object,
  height?: number,
}

export interface Data {
  [key: string]: string | number | string[],
  model?: string,
  year?: number,
}

export interface ChartLine {
  year: number,
  // visualizationTypes: string[],
  [key: string]: string | number | string[] | Data,
}

export interface ChartBar {
  [key: string]: string | number | string[] | Data[],
}
