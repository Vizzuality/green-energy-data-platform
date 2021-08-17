import React, { FC } from 'react';
import cx from 'classnames';

import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import { parseDataToDownload } from 'utils';

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
  links: LinkProps[],
  className?: string,
}

const Item: FC<ItemProps> = ({
  icon,
  name,
  links,
  className = '',
}: ItemProps) => {
  const router = useRouter();
  const { subgroup } = router.query;
  const indicatorSlug = subgroup[1];

  const [session] = useSession();

  const handleDownload = (format) => {
    if (!session) return console.log('sign in to get data');

    return fetchDataToDownload(`Bearer ${session.token}`, indicatorSlug, format)
      .then((data) => parseDataToDownload(format, data, indicatorSlug));
  };

  return (
    <div className={cx('w-full m-auto inline-flex flex-grow text-center divide-y divide-gray4 divide-opacity-90',
      { [className]: className })}
    >
      <div className="inline-flex w-full">
        <Icon ariaLabel={name} color="text-color1" name={icon} size="lg" className="mr-5" />
        <div className="flex flex-col">
          <p className="inline-flex text-base hover:text-gray-700">{name}</p>
          <ul className="flex">
            {links.map(({ label, format }) => (
              <li className="text-color1 text-sm pr-3.75" key={label}>
                <button className="cursor-pointer hover:font-bold underline" type="button" onClick={() => handleDownload(format)}>{label}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Item;
