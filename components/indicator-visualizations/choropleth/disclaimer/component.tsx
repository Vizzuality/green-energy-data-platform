import React, { FC } from 'react';

import cx from 'classnames';

import Icon from 'components/icon';

import i18next from 'i18next';

interface DisclaimerProps {
  className?: string;
  message: String;
  onDisclaimerClose: (boolean) => void;
}

export const Disclaimer: FC<DisclaimerProps> = ({
  message,
  className,
  onDisclaimerClose,
}: DisclaimerProps) => (
  <div
    className={cx('p-4 absolute text-left bg-gray1 rounded-xl text-sm text-white flex z-20 items-baseline',
      { [className]: !!className })}
  >
    <p className="w-48 pr-4">{message}</p>
    <button type="button" className="flex items-center text-xs" onClick={() => onDisclaimerClose(false)}>
      <p className="uppercase pr-2">{i18next.t('close')}</p>
      <Icon ariaLabel="close disclaimer" size="sm" name="close" />
    </button>
  </div>
);

export default Disclaimer;
