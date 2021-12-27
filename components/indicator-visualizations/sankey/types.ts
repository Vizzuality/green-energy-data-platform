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
  name_en: string,
  name_cn: string
}>;

type Link = Readonly<{
  class_cn: string,
  class_en: string,
  source: number,
  target: number,
  value: number,
}>;

type Data = Readonly<{
  region_cn: string,
  region_en: string,
  units_cn: string,
  units_en: string
  year: number,
  links: Link[]
}>;

export interface SankeyData {
  nodes: Node[],
  data: Data[]
}
