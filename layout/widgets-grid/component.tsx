import React, {
  FC,
} from 'react';
import cx from 'classnames';

import Link from 'next/link';

interface WidgetsGridProps {
  items: Array<string>;
  className?: string,
}

const WidgetsGrid: FC<WidgetsGridProps> = ({
  items,
  className,
}: WidgetsGridProps) => (
  <section className="grid grid-cols-3 grid-flow gap-x-13 gap-y-6.5 py-13">
    {items.map((w, index) => (
      <div
        key={w}
        className={cx('w-full h-72 bg-white rounded-2.5xl shadow-sm',
          { [className]: className })}
      >
        {`widget-${index}`}
      </div>
    ))}
    <div
      className={cx('w-full h-72 bg-gradient-color1 rounded-2.5xl',
        { [className]: className })}
    >
      <Link href="/indicators" passHref>
        <a href="/indicators" className="w-full h-full items-center flex justify-center m-auto p-6 text-lg">
          View datasets for other indicators
        </a>
      </Link>
    </div>
  </section>
);

export default WidgetsGrid;
