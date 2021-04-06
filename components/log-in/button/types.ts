import { ReactText } from 'react';
import { MenuTriggerProps } from '@react-types/menu';
import { MenuPopupProps } from './pop-up/types';

export type MenuButtonProps = MenuTriggerProps & {
  /** Menu's items */
  children: MenuPopupProps['children'];
  /** Callback executed when the user clicks on a menu's item */
  onAction: (key: ReactText) => void;
};

export default MenuButtonProps;
