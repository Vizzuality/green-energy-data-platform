export type SubgroupProps = {
  description: string,
  id: number;
  indicators: IndicatorProps[],
  slug: string;
  name: string;
  published: boolean,
<<<<<<< HEAD
  default_indicator?: IndicatorProps,
=======
  default_indicator?: IndicatorsIdProps,
>>>>>>> no data styles
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

interface DataIdProps {
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
  group: DataIdProps,
  subgroup: DataIdProps,
}

export interface IndicatorsIdProps {
  id: number;
  name: string;
  slug: string,
}

// pages
export interface ComparePageProps {
  g1: string,
  sg1: string,
  ind1: string,
  g2: string,
  sg2: string,
  ind2: string
}
