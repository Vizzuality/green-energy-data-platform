import React, { FC } from 'react';
import cx from 'classnames';

import { useSession } from 'next-auth/client';

import { parseDataToDownload } from 'utils';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

// services
import { fetchDataToDownload } from 'services/indicators';

import Icon from 'components/icon';

interface LinkProps {
  label: string,
  format: string,
}

interface ItemProps {
  icon: string,
  name: string,
  links?: LinkProps[],
  source?: string,
  indSlug: string,
  className?: string,
  disabled?: boolean,
}

const Item: FC<ItemProps> = ({
  icon,
  name,
  links,
  source,
  indSlug,
  className = '',
  disabled = false,
}: ItemProps) => {
  const [session] = useSession();

  const {
    current,
  } = useSelector(
    (state: RootState) => (state.language),
  );

  const handleDownload = (format) => fetchDataToDownload(`Bearer ${session.token}`, indSlug, format, { locale: current })
    .then((data) => parseDataToDownload(format, data, indSlug));

  return (
    <div className={cx('w-full m-auto inline-flex flex-grow text-center divide-y divide-gray4 divide-opacity-90',
      { [className]: className })}
    >
      <div className="inline-flex w-full">
        <Icon ariaLabel={name} color="text-color1" name={icon} size="lg" className="mr-5" />
        <div className="flex flex-col">
          <p className="text-left inline-flex text-base hover:text-gray-700">{name}</p>
          {!source && (
            <ul className="flex flex-wrap">
              {links?.map(({ label, format }) => (
                <li className="text-color1 text-sm pr-3.75" key={label}>
                  <button
                    type="button"
                    className={cx(
                      'underline',
                      { 'cursor-pointer hover:font-bold': !disabled },
                    )}
                    onClick={() => handleDownload(format)}
                    disabled={disabled}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          )}
          {source && (
            <span className="text-left text-color1 text-sm pr-3.75 font-bold">
              {source}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;
