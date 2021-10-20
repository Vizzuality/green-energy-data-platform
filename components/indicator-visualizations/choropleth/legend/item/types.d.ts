import { ReactNode } from 'react';

export interface LegendItemProps {
  id?: number;
  name?: string;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
}
