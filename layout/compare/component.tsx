import React, { FC } from 'react';

import cx from 'classnames';

// components
import Hero from 'layout/hero';
import Dropdown from 'components/select';

interface CompareLayoutProps {
  id: number,
  group: string,
  subgroup: string,
  onClose: (id: number, group: string, slug: string) => void,
  className?: string,
}

const CompareLayout: FC<CompareLayoutProps> = ({
  id,
  group,
  subgroup,
  className,
  onClose,
}: CompareLayoutProps) => (
  <div className="pb-44 text-white rounded-2xl">
    <Hero className="rounded-t-2xl bg-gradient-color2 ">
      <button
        type="button"
        onClick={() => onClose(id, group, subgroup)}
      >
        Don´t compare
      </button>
      <h2 className="text-5.5xl text-white">{group}</h2>
      <div className="flex items-center">
        <h1 className="text-5.5xl py-6">{subgroup}</h1>
        <Dropdown
          menuElements={[{ id: 1, name: 'group1' }, { id: 2, name: 'group2' }]}
          border
          className="ml-3"
          icon="triangle_border"
          iconSize="lg"
        />
      </div>
    </Hero>
    <div className={cx('container m-auto px-32', { [className]: !!className })}>
      children
    </div>
  </div>
);

export default CompareLayout;
