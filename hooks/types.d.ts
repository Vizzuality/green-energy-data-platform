type Node = Readonly<{
  name_en?: string,
  name_cn?: string,
  name?: string,
}>;

type Link = Readonly<{
  class_cn: string;
  class_en: string;
  source: number;
  target: number;
  value: number;
}>;

type Data = {
  links: Link[],
  region_cn: string,
  region_en: string,
  units_cn: string,
  units_en: string,
  year: number
};

export interface Sankey {
  nodes: Node[],
  links: Link[];
  year: number;
  region: string;
}

export interface IndicatorData {
  nodes: Node[],
  data: Data[],
  indicator_en: string,
}
