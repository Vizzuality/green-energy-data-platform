type LegendTypeItem = {
  value: string;
  color: string;
};

export interface LegendTypeGradientProps {
  className?: string;
  items: Array<LegendTypeItem>;
}
