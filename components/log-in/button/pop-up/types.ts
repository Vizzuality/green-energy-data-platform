import { HTMLAttributes } from 'react';

import { FocusStrategy, CollectionChildren } from '@react-types/shared';

import ItemProps from '../item/types';

export interface MenuPopupProps {
  /** Props for the popup's container */
  domProps: HTMLAttributes<HTMLElement>;
  /** Focus strategy applied to the popup's items */
  autoFocus?: boolean | FocusStrategy;
  /** Menu's items */
  children: CollectionChildren<{}>;
  /** Callback executed when the popup is closed */
  onClose: ItemProps['onClose'];
  /** Callback executed when the user clicks on a menu's item */
  onAction: ItemProps['onAction'];
}
