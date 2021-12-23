export type ChartProps = {
  widgetData: unknown,
  widgetConfig: unknown,
  colors: string[],
};

export type Object = {
  label: string | number,
  value: string | number,
};

export interface WdigetConfigTypes {
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

export interface Line {
  year: number,
  // visualizationTypes: string[],
  [key: string]: string | number | string[] | Data,
}

export interface Bar {
  [key: string]: string | number | string[] | Data[],
}
