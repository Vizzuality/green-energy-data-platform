export interface ChartProps {
  indicatorName: string,
  indicatorSlug: string,
  widgetData: any,
  widgetConfig: any,
}

export type Payload = {
  [key: string]: string | number | string[] | number[],
  name: string,
  value: number,
};

export interface TooltipProps {
  payload: Payload[],
  indicatorName: string,
  unit: string,
  className?: string,
}

type Node = Readonly<{
  name: string,
}>;

type Link = Readonly<{
  class: string,
  source: number,
  target: number,
  value: number,
}>;

type Data = Readonly<{
  region: string,
  units: string,
  year: number,
  links: Link[]
}>;

export interface SankeyData {
  nodes: Node[],
  data: Data[]
}
