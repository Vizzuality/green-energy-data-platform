import React from 'react';
import Link from 'next/link';
import cx from 'classnames';

export interface NavProps {
  className?: string;
}

export const cookieBanner: React.FC<NavProps> = ({
  className,
}: NavProps) => (
  <>
    <div className="absolute w-full h-16 text-center">
      <p>
        This site uses cookies to provide you with a great user experience.
        By using this platform, you accept our use of cookies.
      </p>
    </div>
  </>
);

export default cookieBanner;
