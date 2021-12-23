export type Payload = Readonly<{
  label: string,
  color: string,
}>;

export interface WidgetLegendProps {
  className?: string,
  payload: Payload[],
  ref?: unknown
}
