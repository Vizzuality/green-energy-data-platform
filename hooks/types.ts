type Link = Readonly<{
  class_cn: string,
  class_en: string,
  source: number,
  target: number,
  value: number,
}>;

type Node = Readonly<{
  name_en: string,
  name_cn: string,
}>;

type Data = Readonly<{
  region_en: string,
  region_cn: string,
  year: number,
  units_en: string,
  units_cn: string,
  links: Link[],
}>;

export interface IndicatorSankeyData {
  nodes: Node[],
  data: Data[],
  indicator_en: string,
}

export interface SankeyChartData {
  nodes: unknown,
  links: unknown,
}
