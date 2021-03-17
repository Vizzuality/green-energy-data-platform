import React, { FC, forwardRef } from 'react';

interface LabelProps {
  label: string
}

const CustomLink= forwardRef(({
  href,
  onClick,
  ref,
  label
}) => {
  return (
    <a className="p-12" onClick={onClick} href={href} ref={ref}>{label}</a>
  )
});

export default CustomLink;
