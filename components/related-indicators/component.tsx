import React, {
  FC,
} from 'react';

interface RelatedIndicatorsProps {
  info: Array<string>;
}

const RelatedIndicators: FC<RelatedIndicatorsProps> = ({
  info,
}: RelatedIndicatorsProps) => (
  <section className="flex">
    {info.map((w, index) => (
      <div key={w} className="w-96 h-72 bg-white rounded-2.5xl shadow-sm">
        {`widget-${index}`}
      </div>
    ))}
  </section>
);

export default RelatedIndicators;
