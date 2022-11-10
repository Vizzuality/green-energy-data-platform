export interface ChartProps {
  indicatorName: string,
  indicatorSlug: string,
  unit?: string,
  widgetData: unknown,
  widgetConfig: any,
}

export interface SankeyProps {
  indicatorName: string,
  indicatorSlug: string,
  unit?: string,
  widgetData: SankeyData,
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
  name_en?: string,
  name_cn?: string,
  name: string
}>;

type Link = Readonly<{
  class?: string,
  source: number,
  target: number,
  value: number,
}>;

export interface SankeyData {
  links: Link[],
  nodes: Node[],
}
