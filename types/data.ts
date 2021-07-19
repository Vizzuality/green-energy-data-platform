export type SubgroupProps = {
  description: string,
  id: number;
  indicators: IndicatorsProps[],
  slug: string;
  name: string;
  published: boolean,
  default_indicator?: IndicatorsProps,
};

export interface GroupProps {
  id: number;
  slug: string;
  name: string;
  subtitle: string;
  status: string;
  description: string;
  default_subgroup: string,
  subgroups: SubgroupProps[];
}

export interface IndicatorsProps {
  categories: [],
  category_filters: unknown, // TO DO - change when API gets updated
  default_visualization: string,
  description: string;
  end_date: number,
  id: number;
  name: string;
  published: boolean,
  start_date: number,
  visualizationTypes: string[],
}
