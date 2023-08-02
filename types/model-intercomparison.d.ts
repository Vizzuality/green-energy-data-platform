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
  // visualizationTypes: string[],
  [key: string]: string | number | string[] | Data;
  year?: number;
}

export interface ChartBar {
  [key: string]: string | number | string[] | Data[],
}
