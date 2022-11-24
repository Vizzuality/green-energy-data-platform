import React, {
  useEffect, useMemo, useState, cloneElement, Children, ReactElement,
} from 'react';
import Button from 'components/button';
import Icon from 'components/icon';
import classNames from 'classnames';

type ChartProps = {
  widgetData: unknown[];
};

type PaginatedDynamicChartProps = ChartProps & {
  /** Max page items */
  maxItems: number,
  /** Dynamic chart element */
  children: ReactElement<ChartProps>
};

/** Sort the data by Total and paginate the chart elements by maxItems */
const PaginatedDynamicChart = ({ widgetData, maxItems, children }
: PaginatedDynamicChartProps) => {
  const initialPagination = useMemo(() => ({ from: 0, to: maxItems }), [maxItems]);

  const [pagination, setPagination] = useState(initialPagination);
  const child = Children.only(children);

  useEffect(() => {
    setPagination(initialPagination);
  }, [initialPagination, widgetData]);

  const sortedData = useMemo(() => {
    if (Array.isArray(widgetData)) {
      return widgetData.filter((d) => !!d.Total).sort((a, b) => Number(b.Total) - Number(a.Total));
    }
    return [];
  }, [widgetData]);

  const handleClick = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      if (pagination.to < widgetData.length) {
        setPagination({ from: pagination.to, to: pagination.to + maxItems });
      }
    } else if (pagination.from > 0) {
      setPagination({ from: pagination.from - maxItems, to: pagination.from });
    }
  };

  const data = sortedData.slice(pagination.from, pagination.to);
  const isFirst = pagination.from === 0;
  const isLast = pagination.to >= sortedData.length;

  return (
    <div className="w-full h-full mt-2">
      <div className="flex justify-between">
        <Button onClick={() => handleClick('prev')}>
          <Icon
            ariaLabel="category-up"
            name="triangle_border"
            size="xlg"
            onClick={() => handleClick('prev')}
            className={classNames('p-2 mr-3 transform rotate-90 border-2 rounded-full border-gray1 border-opacity-30 text-gray1', {
              'cursor-pointer hover:bg-gray1 hover:bg-opacity-90 hover:text-white': !isFirst,
              'opacity-30 cursor-auto': isFirst,
            })}
          />
        </Button>
        <Button size="sm" onClick={() => handleClick('next')}>
          <Icon
            ariaLabel="category-up"
            name="triangle_border"
            size="xlg"
            onClick={() => handleClick('next')}
            className={classNames('p-2 mr-3 transform -rotate-90 border-2 rounded-full  border-gray1 border-opacity-30 text-gray1', {
              'cursor-pointer hover:bg-gray1 hover:bg-opacity-90 hover:text-white': !isLast,
              'opacity-30 cursor-auto': isLast,
            })}
          />
        </Button>
      </div>
      {
        cloneElement(child, {
          ...child.props,
          widgetData: data,
        })
      }
    </div>
  );
};

export default PaginatedDynamicChart;
