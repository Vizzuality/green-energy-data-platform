import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';

interface IDropdownItem {
  id: number;
  text: string;
}

interface IProps {
  dropdownText?: string;
  items?: IDropdownItem[];
}

const dropdownItems = [
  {
    id: 1,
    text: "indicator"
  },
  {
    id: 2,
    text: "indicator2"
  },
  {
    id: 3,
    text: "indicator3"
  },
  {
    id: 4,
    text: "indicator4"
  }
];

const Dropdown = ({
  dropdownText = "Select indicator",
  items = dropdownItems
}: IProps) => {
  const dropdownRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const keyHandler = (event: KeyboardEvent) => {
    console.log('key handler', listRef, listRef.current!)
    if (isOpen) {
      switch (event.key) {
        case "Escape":
          setIsOpen(false);
          break;
        case "ArrowDown":
          const nodeList = listRef.current!.querySelectorAll("li");
          if (activeIndex === items.length - 1) return;
          nodeList[activeIndex + 1].focus();
          break;
        case "ArrowUp":
          const nodeList2 = listRef.current!.querySelectorAll("li");
          if (activeIndex === 0) return;
          nodeList2[activeIndex - 1].focus();
          break;
      }
    }
  };

  const handleClickOutside = (event: any) => {
    if (
      listRef.current!.contains(event.target) ||
      dropdownRef.current!.contains(event.target)
    ) {
      return;
    }
    setIsOpen(false);
  };

  useEffect(() => {
    console.log(isOpen)
    if (isOpen) {
      console.log(listRef)
      console.log(listRef.current!.querySelector("li")!.focus())
      listRef.current!.querySelector("li")!.focus();
      document.addEventListener("mouseup", handleClickOutside);
    } else {
      document.removeEventListener("mouseup", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setActiveIndex(-1);
    }
  }, [isOpen]);

  const focusHandler = (index: number) => {
    setActiveIndex(index);
  };

  const handleSelect = ({ text }) => {
    console.log(text, 'selected')
  };
console.log(listRef)
  return (
    <div onKeyUp={keyHandler} className="relative">
      <button
        aria-haspopup="true"
        aria-controls="dropdown1"
        onClick={handleClick}
        ref={dropdownRef}
        onFocus={() => setActiveIndex(-1)}
      >
        {dropdownText}
        {/* <Icon /> */}
      </button>
      <ul
        id="dropdown1"
        ref={listRef}
        className={cx('dropdown menu',
          {
            'block': isOpen,
            'hidden': !isOpen
          }
        )}
      >
        {items.map((item, index) => (
          <li
            key={item.id}
            className="menu-item"
            onFocus={() => focusHandler(index)}
            onClick={()=> handleSelect(item)}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
