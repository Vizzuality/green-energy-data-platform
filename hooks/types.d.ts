type Node = Readonly<{
  name?: string,
}>;

type Link = Readonly<{
  class: string;
  source: number;
  target: number;
  value: number;
}>;

type Data = {
  links: Link[],
  region: string,
  units: string,
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
