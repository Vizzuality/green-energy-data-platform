export interface ChartProps {
  widgetData: any,
  widgetConfig: any,
}

export type Payload = {
  [key: string]: string | number | string[] | number[]
};

export interface TooltipProps {
  payload: Payload[],
  indicatorSlug: string,
  unit: string,
}

type Node = Readonly<{
  name_en: string,
  name_cn: string
}>;

type Link = Readonly<{
  region_cn: string,
  region_en: string,
  units_cn: string,
  units_en: string
  year: number
}>;

type Data = Readonly<{
  year: number,
  links: Link[]
}>;

export interface SankeyData {
  nodes: Node[],
  data: Data[]
}
