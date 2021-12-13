type Node = {
  name_en: string,
  name_cn: string,
};

type Link = {
  class_cn: string,
  class_en: string,
  source: number,
  target: number,
  value: number,
};

type Data = {
  links: Link[],
  region_cn: string,
  region_en: string,
  units_cn: string,
  units_en: string,
  year: number
};

export interface IndicatorData {
  nodes: Node[],
  data: Data[],
  indicator_en: string,
}
