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

interface TooltipCoalPowerPlants {
  [key: string]: string
}

interface Geometry {
  coordinates: number[],
  type: string,
  tooltip_properties: TooltipCoalPowerPlants[],
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

export interface ComponentTypes {
  className?: string;
}

export interface ComponentCompareTypes {
  className?: string;
  compareIndex: 1 | 2;
}

export interface DataIdProps {
  id: string,
  name: string,
  slug: string,
}

export interface IndicatorProps {
  categories: string[],
  category_filters: CategoryFilters | string[],
  accessible_by: string[],
  data_source: string,
  default_visualization: string,
  description: string;
  end_date: number,
  id: string;
  slug: string,
  name: string;
  published: boolean,
  start_date: number,
  visualization_types: string[],
  records: Record[],
  group: DataIdProps,
  subgroup: DataIdProps,
}

export interface Component {
  className?: string,
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

type Node = Readonly<{
  name_en: string,
  name_cn: string
}>;

type Link = Readonly<{
  class?: string,
  source: number,
  target: number,
  value: number,
}>;

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
