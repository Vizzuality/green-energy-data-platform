import React from 'react';
import Link from 'next/link';

export interface NavProps {
  className?: string;
}

export const cookieBanner: React.FC<NavProps> = ({
  className,
}: NavProps) => (
  <>
    <div className="absolute w-full h-16 text-center bg-slate-800">
      <p>
        This site uses cookies to provide you with a great user experience.
        By using this platform, you accept our
        <Link href={{ pathname: '/' }} passHref>
          <a href="/" className="flex items-center justify-center text-center text-white bg-transparent border-2 border-white rounded-full hover:text-opacity-50 hover:border-opacity-50 active:bg-white active:text-black focus:outline-none">use of cookies.</a>
        </Link>
      </p>

      <button onClick={ }>X</button>
    </div>
  </>
);

export default cookieBanner;
