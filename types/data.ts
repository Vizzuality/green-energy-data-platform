export type SubgroupProps = {
  description: string,
  id: number;
  indicators: IndicatorProps[],
  slug: string;
  name: string;
  published: boolean,
  default_indicator?: DataIdProps,
};

export type ScenarioProps = Readonly <{
  name: string
}>;

export interface GroupProps {
  id: number,
  slug: string,
  name: string,
  subtitle: string,
  status: string,
  description: string,
  default_subgroup: string,
  subgroups: SubgroupProps[],
}

interface GeometryProps {
  geometry: {
    coordinates: number[],
    type: string,
  },
  type: string,
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
  slug: string,
  value: number,
  unit: Unit,
  region: Region,
  geometry?: GeometryProps[]
  year: number,
  visualizationTypes: string[],
  scenario: ScenarioProps
}

interface CategoryFilters {
  [key: string]: string,
}

export interface DataIdProps {
  id: string,
  name: string,
  slug: string,
}

export interface IndicatorProps {
  categories: [],
  category_filters: CategoryFilters | string[],
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

// pages
export interface ComparePageProps {
  g1: string,
  sg1: string,
  ind1: string,
  g2: string,
  sg2: string,
  ind2: string
}
