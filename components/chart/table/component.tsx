import React, { FC } from 'react';
import cx from 'classnames';

type Key = string | number;

interface TableHeaderItem {
  key?: Key | null,
  item: string | number
}

interface TableItem {
  label: string | number;
  value: string | number;
}

interface TableItems {
  label: string | number;
  value: TableItem[];
}

interface TableProps {
  widgetConfig: {
    headers: TableHeaderItem[]
    items: TableItems[]
  }
}

const Table: FC<TableProps> = ({ widgetConfig }: TableProps) => {
  const { headers, items } = widgetConfig;
  return (
    <table className="table-auto">
      <thead>
        <tr>
          {headers.map(
            (h, index) => (
              <th
                key={h}
                className={cx(
                  { 'bg-gray2 text-white rounded-md px-2': index === 0 },
                )}
              >
                {h}
              </th>
            ),
          )}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.label}>
            <td className="flex flex-grow">{item.label}</td>
            {item.value.map((i) => (
              <td key={`${i.label}-${i.value}`} className="px-5 items-center">{i.value}</td>))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
