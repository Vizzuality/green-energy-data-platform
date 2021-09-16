export type SubgroupProps = {
  description: string,
  id: number;
  indicators: IndicatorProps[],
  slug: string;
  name: string;
  published: boolean,
  default_indicator?: IndicatorProps,
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

interface Region {
  id: string,
  name: string,
  region_type: string,
}

interface Unit {
  id: string,
  name: string,
}
export interface Record {
  category_1?: string,
  category_2?: string,
  id: string,
  value: number,
  unit: Unit,
  region: Region,
  year: number,
  visualizationTypes: string[],
}

interface CategoryFilters {
  [key: string]: string | number,
}

interface Group {
  id: string,
  name: string,
  slug: string,
}

export interface IndicatorProps {
  categories: [],
  category_filters: CategoryFilters,
  default_visualization: string,
  description: string;
  end_date: number,
  id: number;
  slug: string,
  name: string;
  published: boolean,
  start_date: number,
  visualizationTypes: string[],
  records: Record[],
  group: Group,
  subgroup: Group,
}
