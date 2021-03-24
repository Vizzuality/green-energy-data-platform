import React, { FC } from 'react';

interface TooltipProps {

}

const Tooltip: FC<TooltipProps> = (props: TooltipProps) => {
  return (
    <div className="border-2m">
      {/* <p className="label">{`${label} : ${payload[0].value}`}</p> */}
      <p className="desc">Anything you want can be displayed here.</p>
    </div>
  );
};

export default Tooltip;
