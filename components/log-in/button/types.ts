import { MenuTriggerProps } from '@react-types/menu';
import { MenuPopupProps } from './pop-up/types';

export type MenuButtonProps = MenuTriggerProps & {
  label: string;
  /** Menu's items */
  children: MenuPopupProps['children'];
  /** Callback executed when the user clicks on a menu's item */
  onAction: unknown;
};

export default MenuButtonProps;
