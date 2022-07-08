import React, { FC } from 'react';
import cx from 'classnames';

import { useRouter } from 'next/router';

import i18next from 'i18next';
import { useSession } from 'next-auth/client';
import Button from 'components/button';
import Item from './item';

interface DataProps {
  className?: string,
  type?: 'vertical' | 'horizontal',
  indicatorSlug: string,
  dataSource: string,
  isAccessible: boolean,
  compareIndex?: 1 | 2
}

const downloadLinks = [
  { label: 'CSV', format: 'csv' },
  { label: 'PNG', format: 'png' },
];

const Card: FC<DataProps> = ({
  className = '',
  type = 'vertical',
  indicatorSlug,
  dataSource,
  isAccessible = false,
  compareIndex,
}: DataProps) => {
  const router = useRouter();
  const [session] = useSession();
  const { subgroup } = router.query;
  const signInPage = () => router.push('/signin');
  const indSlug = indicatorSlug || subgroup?.[1];

  return (
    <div className={cx('flex divide-gray4 divide-opacity-90 text-center bg-gray5 text-gray1 rounded-2xl',
      {
        [className]: className,
        'opacity-50': !isAccessible,
        'divide-y flex-col': type === 'vertical',
        'divide-x flex-row': type === 'horizontal',
      })}
    >
      {!session
        ? (
          <div className={cx('flex-col items-center p-4',
            { 'w-full justify-center': type === 'horizontal' })}
          >
            <p>{i18next.t('downloadLoginMode')}</p>
            <Button
              className="mx-auto mt-6"
              type="submit"
              aria-label="Sign in"
              theme="secondary-background-dark"
              size="xlg"
              onClick={signInPage}
            >
              Log in
            </Button>
          </div>
        )
        : (

          <>
            <Item
              icon="download"
              name={i18next.t('download')}
              links={downloadLinks}
              className={cx('p-6',
                { 'justify-center rounded-l-2xl': type === 'horizontal' },
                { 'justify-start rounded-t-2xl': type === 'vertical' })}
              indSlug={indSlug}
              disabled={!isAccessible}
              compareIndex={compareIndex}
            />
            <Item
              icon="data"
              name={i18next.t('dataSource')}
              source={dataSource}
              className={cx('p-6',
                { 'justify-center rounded-r-2xl': type === 'horizontal' },
                { 'justify-start rounded-b-2xl': type === 'vertical' })}
              indSlug={indSlug}
              disabled={!isAccessible}
            />
          </>
        )}
    </div>
  );
};

export default Card;
