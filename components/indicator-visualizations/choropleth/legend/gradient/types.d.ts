type LegendTypeItem = {
  value: string | number;
  color: string;
};

export interface LegendTypeGradientProps {
  className?: string;
  items: Array<LegendTypeItem>;
}
