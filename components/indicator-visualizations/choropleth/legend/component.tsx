import React, { FC, useCallback, useState } from 'react';

import cx from 'classnames';

import { useId } from '@react-aria/utils';

import SortableList from './sortable/list';

interface LegendProps {
  className?: string;
  children: React.ReactNode;
  maxHeight?: string | number;
  onChangeOrder: (id: string[]) => void;
}

export const Legend: FC<LegendProps> = ({
  children,
  className = '',
  maxHeight,
  onChangeOrder,
}: LegendProps) => {
  const [active, setActive] = useState(true);

  const id = useId();

  const onToggleActive = useCallback(() => {
    setActive(!active);
  }, [active]);

  return (
    <div
      className={cx({
        'absolute text-left bottom-2 left-2 w-3/6 bg-gray1 rounded-3xl text-sm text-white flex flex-col flex-grow': true,
        [className]: !!className,
      })}
    >
      <button
        type="button"
        aria-expanded={active}
        aria-controls={id}
        className="relative flex items-center w-full px-5 py-3 space-x-2 text-xs text-white uppercase font-heading"
        onClick={onToggleActive}
      >
        <span>Legend</span>

      </button>

      {active && (
        <div
          className="relative flex flex-col flex-grow overflow-hidden rounded-3xl"
          style={{
            maxHeight,
          }}
        >
          <div className="absolute top-0 left-0 z-10 w-full h-4 pointer-events-none bg-gradient-to-b from-gray1 via-gray1" />
          <div className="overflow-x-hidden overflow-y-auto">
            <SortableList onChangeOrder={onChangeOrder}>{children}</SortableList>
          </div>
          <div className="absolute bottom-0 left-0 z-10 w-full h-3 pointer-events-none bg-gradient-to-t from-gray1 via-gray1" />
        </div>
      )}
    </div>
  );
};

export default Legend;
