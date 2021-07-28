import React, { FC, ReactElement } from 'react';

import Tippy, { TippyProps } from '@tippyjs/react/headless';

interface TooltipProps extends TippyProps {
  children: ReactElement,
  maxHeight?: number,
}

const Tooltip: FC<TooltipProps> = ({
  content,
  children,
  ...props
}: TooltipProps) => (
  <Tippy
    {...props}
    interactive
    // render={() => (
    //   <div className="relative">
    //     {content}
    //   </div>
    // )}
    render={() => content}
  >

    {children}
  </Tippy>
);

export default Tooltip;
