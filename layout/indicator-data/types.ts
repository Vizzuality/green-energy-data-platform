import { GroupProps, SubgroupProps } from 'types/data';

type CategoriesObject = {
  [key: string]: string[]
};

type ObjectData = {
  [key: string]: Object[]
};

interface IndicatorProps {
  id: string | number,
  name: string,
  default_visualization?: IndicatorProps,
  visualizationTypes: string[],
  categories: { id: number, name: string }[],
  categories_filters: CategoriesObject,
  startDate: string | number,
  endDate: string | number,
  data: ObjectData, // TO DO - change when we have clear de type of data
  description: string,
  config?: Object,
}

export default interface IndicatorDataProps {
  className?: string;
  defaultIndicator: IndicatorProps;
}
