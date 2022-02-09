import { ReactNode } from "react";

export interface ChartProps {
  indicatorName: string,
  indicatorSlug: string,
  widgetData: any,
  widgetConfig: any,
}

export type Target = Readonly<{
  name: string,
  colr: string,
}>;

export interface Payload2 {
  circular?: boolean,
  circulanLinkID?: number,
  circularLinkType?: string,
  circularPathData?: unknown,
  class?: string,
  class_cn?: string,
  index?: number,
  path?: string,
  source: any,
  target: any,
  value: number,
  width?: number,
  y0?: number,
  y1?: number,
};

export type Payload = Readonly<{
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

export type Node = Readonly<{
  col: number,
  column: number,
  depth: number,
  height: number,
  index: number,
  name: string,
  partOfCycle: boolean
  sourceLinks: unknown[],
  targetLinks: unknown[],
  value: number,
  x0: number,
  x1: number,
  y0: number,
  y1: number,
}>;

export type NodeLoops = Readonly<{
  name: string,
  col: number,
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
  sortNodes?: string,
  children: ( data: unknown ) => unknown;
}

type SankeyElement = Readonly<{
  name: string,
  index: number,
  sourceLinks: any,
  targetLinks: any,
  partOfCycle: boolean,
}>;

export interface TooltipProps {
  data: Payload,
  indicatorName?: string,
  unit?: string,
  className?: string,
}
