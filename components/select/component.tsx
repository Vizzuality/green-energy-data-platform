import React, { FC } from 'react';
import { useSelect } from 'downshift';



export interface DropdownSelectProps {
  label?: string
};

export const DropdownSelect: FC<DropdownSelectProps> = ({
  label = '',
  items = ['indicator1', 'indicator2']
}: DropdownSelectProps) => {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    openMenu,
    selectItem,
  } = useSelect({ items })
  return (
    <div>
      <label {...getLabelProps()}>{label}</label>
      <button
        type="button"
        {...getToggleButtonProps({
          onMouseEnter: () => {
            openMenu()
          },
        })}
      >
        {selectedItem}
      </button>
      {isOpen && (
        <button
          type="button"
          tabindex={-1}
          onClick={() => {
            selectItem(null)
          }}
          aria-label="clear selection"
        >
          &#215;
        </button>)}
      <ul {...getMenuProps()} >
        {isOpen &&
          items.map((item, index) => (
            <li
              style={
                highlightedIndex === index
                  ? { backgroundColor: '#bde4ff' }
                  : {}
              }
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              {item}
            </li>
          ))}
      </ul>
    </div >
  )
};

export default DropdownSelect;
