export interface ChartProps {
  indicatorName: string,
  indicatorSlug: string,
  widgetData: any,
  widgetConfig: any,
}

export type Target = Readonly<{
  name: string,
}>;

export type Payload = Readonly<{
  source: Target,
  target: Target,
  value: number,
}>;

export type Node = Readonly<{
  circular?: boolean
  class?: string,
  class_cn?: string,
  index?: number,
  path?: string,
  source?: SankeyElement,
  target?: SankeyElement,
  value?: number,
  width?: number,
  y0?: number,
  y1?: number,
}>;

export type NodeLoops = Readonly<{
  name: string,
}>;

export type LinkLoops = Readonly<{
  source: NodeLoops,
  target: NodeLoops,
  value: number,
  class: string,
  class_cn: string,
}>;

export interface SankeyLoopsData {
  nodes: NodeLoops[],
  links: LinkLoops[],
}

export type SankeyChart = Readonly<{
  indicator: string,
  data: SankeyLoopsData,
  unit: string,
}>;

export interface SankeyChartProps {
  top: number,
  left: number,
  className?: string,
  data: unknown,
  size: unknown,
  nodeId: (string: any) => number | string,
  nodeAlign?: string,
  nodeWidth: number,
  nodePadding: number,
  nodePaddingRatio: number,
  extent?: unknown,
  iterations: number,
  circularLinkGap?: boolean,
  children: ({ data: any }) => unknown;
}

type SankeyElement = Readonly<{
  name: string,
  index: number,
  sourceLinks: any,
  targetLinks: any,
  partOfCycle: boolean,
}>;

export interface TooltipProps {
  payload?: Payload[],
  indicatorName?: string,
  unit?: string,
  className?: string,
  data?: Node,
}
