export type SubgroupProps = Readonly<{
  description: string,
  id: number;
  indicators: IndicatorProps[],
  slug: string;
  name: string;
  published: boolean,
  default_indicator?: DataIdProps,
}>;

export type Scenario = Readonly<{
  id: string,
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

interface Unit {
  id: string,
  name: string,
}

interface Geometry {
  geometry: {
    coordinates: number[],
    type: string,
  },
  type: string,
}

interface RegionRecord {
  id: string,
  name: string,
}

export interface Record {
  category_1?: string,
  category_2?: string,
  id: string,
  name: string,
  slug: string,
  value: number,
  unit: Unit,
  region: RegionRecord,
  region_id: string;
  geometry?: Geometry[]
  year: number,
  visualization_types: string[],
  scenario: Scenario
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
  visualization_types: string[],
  records: Record[],
  group: DataIdProps,
  subgroup: DataIdProps,
}

type Filter = Readonly<{
  id: string,
  name: string,
}>;

type VisualizationFilters = Readonly<{
  years: number[],
  regions: Filter[],
  units: Filter[],
  scenarios: Filter[]
}>;

export interface IndicatorMetadata {
  line?: VisualizationFilters,
  choropleth?: VisualizationFilters,
  bar?: VisualizationFilters,
  pie?: VisualizationFilters,
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
export interface Region {
  id: string,
  geometry: Geometry,
  name: string,
  region_type: string
}
