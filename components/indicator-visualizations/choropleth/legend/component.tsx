import React, { FC, useCallback, useState } from 'react';

import cx from 'classnames';

import { useId } from '@react-aria/utils';

import Icon from 'components/icon';

import i18next from 'i18next';

interface LegendProps {
  className?: string;
  children: React.ReactNode;
  maxHeight?: string | number;
}

export const Legend: FC<LegendProps> = ({
  children,
  className = '',
  maxHeight,
}: LegendProps) => {
  // language keys
  const legend = i18next.t('legend');
  const noDataMap = i18next.t('noDataMap');
  
  const [active, setActive] = useState(false);

  const id = useId();
  const onToggleActive = useCallback(() => {
    setActive(!active);
  }, [active]);

  return (
    <div
      className={cx('absolute text-left bottom-2 left-2 bg-gray1 rounded-3xl text-sm text-white flex flex-col flex-grow z-20 max-w-[60%]',
        { [className]: !!className })}
    >
      <button
        type="button"
        aria-expanded={active}
        aria-controls={id}
        className="relative flex items-center w-full px-5 py-1.5 space-x-2 text-sm text-white font-heading"
        onClick={onToggleActive}
      >
        <span>{legend}</span>
        <Icon
          ariaLabel={active ? 'collapse dropdown' : 'expand dropdown'}
          name="triangle_border"
          size="sm"
          className={cx({ 'transform rotate-180': active })}
        />

      </button>
      {!children && <div className="px-6 py-4 italic">{noDataMap}</div>}
      {active && (
        <div
          className="relative flex flex-col flex-grow overflow-hidden rounded-3xl"
          style={{
            maxHeight,
          }}
        >
          <div className="absolute top-0 left-0 z-20 w-full h-4 pointer-events-none bg-gradient-to-b from-gray1 via-gray1" />
          <div className="overflow-x-hidden overflow-y-auto">
            {children}
          </div>
          <div className="absolute bottom-0 left-0 z-20 w-full h-3 pointer-events-none bg-gradient-to-t from-gray1 via-gray1" />
        </div>
      )}
    </div>
  );
};

export default Legend;
