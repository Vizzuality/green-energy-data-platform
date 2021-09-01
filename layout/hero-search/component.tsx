import React, {
  FC,
  ReactNode,
} from 'react';
import cx from 'classnames';
import Link from 'next/link';
import i18next from 'i18next';
import { useRouter } from 'next/router';
// components
import Search from 'components/search/component';
import Icon from 'components/icon';

interface HeroProps {
  children?: ReactNode,
  groups?: ReactNode,
  className?: string,
}

const Hero: FC<HeroProps> = ({
  className,
  groups,
  children,
}: HeroProps) => {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <div className="w-full bg-gray1 text-white">
      <div className={cx('flex justify-between items-center px-12 py-2 border-b border-white border-opacity-30 relative',
        { [className]: !!className })}
      >
        <Link href="/" passHref>
          <a href="/">
            <img
              alt="GEDP"
              src="/images/logo_GEDP.svg"
              className="w-36"
            />
          </a>
        </Link>

        <Search />

        <button
          type="button"
          className="flex items-center ml-13"
          onClick={handleClose}
        >
          <span>Close</span>
          <Icon
            ariaLabel="close"
            name="close"
            size="2xlg"
            className="rounded-full bg-white text-gray1 fill-current p-2.5 ml-5"
          />
        </button>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};

export default Hero;
