import React, { FC, useRef, HTMLAttributes, ReactNode } from 'react';

import { mergeProps } from '@react-aria/utils';
import { useTreeState } from '@react-stately/tree';
import { FocusScope } from '@react-aria/focus';
import { useOverlay, DismissButton } from '@react-aria/overlays';
import { useMenu } from '@react-aria/menu';

import MenuItem from '../item';

interface MenuPopupProps {
  onClose: () => void,
  domProps: HTMLAttributes<HTMLElement>,
  onAction: () => void,
  children?: ReactNode,
}

const MenuPopup: FC<MenuPopupProps> = (props: MenuPopupProps) => {
  // Create menu state based on the incoming props
  const state = useTreeState({...props, selectionMode: 'none'});
  // Get props for the menu element
  const ref = useRef();
  const { menuProps } = useMenu(props, state, ref);
  const { onClose, domProps, onAction, } = props;


  // Handle events that should cause the menu to close,
  // e.g. blur, clicking outside, or pressing the escape key.
  const overlayRef = useRef();
  const { overlayProps } = useOverlay(
    {
      onClose,
      shouldCloseOnBlur: true,
      isOpen: true,
      isDismissable: true,
    },
    overlayRef,
  );

  // Wrap in <FocusScope> so that focus is restored back to the
  // trigger when the menu is closed. In addition, add hidden
  // <DismissButton> components at the start and end of the list
  // to allow screen reader users to dismiss the popup easily.
  return (
    <FocusScope restoreFocus>
      <div {...overlayProps} ref={overlayRef}>
        <DismissButton onDismiss={onClose} />
        <ul
          {...mergeProps(menuProps, domProps)}
          ref={ref}
          className="absolute left-0 right-0 top-10 flex flex-col w-full z-50 rounded-xl mt-4 bg-gray3 divide-y divide-white divide-opacity-10"
        >
          {[...state.collection].map((item) => (
            <MenuItem
              key={item.key}
              item={item}
              state={state}
              onAction={onAction}
              onClose={onClose}
            />
          ))}
        </ul>
        <DismissButton onDismiss={onClose} />
      </div>
    </FocusScope>
  );
};

export default MenuPopup;
