import { ReactText } from 'react';
import { TreeState } from '@react-stately/tree';
import { Node } from '@react-types/shared';

export interface MenuItemProps {
  /** State of the menu item */
  state: TreeState<{}>;
  /** Menu item */
  item: Node<{}>;
  /** Callback executed when the popup is closed */
  onClose: () => void;
  /** Callback executed when the user clicks on a menu's item */
  onAction: (key: ReactText) => void;
}

export default MenuItemProps;
