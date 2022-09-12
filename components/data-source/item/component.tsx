import React, { FC, useCallback } from 'react';
import cx from 'classnames';
import { useSelector } from 'react-redux';
import { useSession } from 'next-auth/client';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

import { parseDataToDownload } from 'utils';
import { RootState } from 'store/store';

// services
import { fetchDataToDownload } from 'services/indicators';

import { CLASS_DOM_DOWNLOAD_IMAGE } from 'utils/constants';

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
  compareIndex?: 1 | 2
}

const Item: FC<ItemProps> = ({
  icon,
  name,
  links,
  source,
  indSlug,
  className = '',
  disabled = false,
  compareIndex,
}: ItemProps) => {
  const [session] = useSession();

  const {
    current,
  } = useSelector(
    (state: RootState) => (state.language),
  );
  const visualization = useSelector((state: RootState) => state.indicator.visualization);

  const downloadAsImage = useCallback((_indSlug: string): void => {
    const index = compareIndex ? compareIndex - 1 : 0;
    if (visualization === 'choropleth') {
      const mapboxCanvas = document.getElementsByClassName('mapboxgl-canvas')[index] as HTMLCanvasElement;
      const dataUrl = mapboxCanvas.toDataURL('image/png');
      saveAs(dataUrl, `${_indSlug}-${Date.now()}.png`);
    } else {
      domtoimage.toBlob(document.getElementsByClassName(CLASS_DOM_DOWNLOAD_IMAGE)[index])
        .then((blob) => {
          saveAs(blob, `${_indSlug}-${Date.now()}.png`);
        });
    }
  }, [visualization, compareIndex]);

  const handleDownload = useCallback((format) => {
    if (format === 'png') return downloadAsImage(indSlug);

    return fetchDataToDownload(session.token as string, indSlug, format, { locale: current })
      .then((data) => parseDataToDownload(format, data, indSlug));
  }, [current, indSlug, session, downloadAsImage]);

  return (
    <div className={cx('w-full m-auto inline-flex flex-grow text-center divide-y divide-gray4 divide-opacity-90',
      { [className]: className })}
    >
      <div className="inline-flex w-full">
        <Icon ariaLabel={name} color="text-color1" name={icon} size="lg" className="mr-5" />
        <div className="flex flex-col">
          <p className="inline-flex text-base text-left hover:text-gray-700">{name}</p>
          {!source && (
            <ul className="flex flex-wrap space-x-3">
              {links?.map(({ label, format }) => (
                <li className="text-sm text-color1" key={label}>
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
