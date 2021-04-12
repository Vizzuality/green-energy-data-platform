import React, { FC } from 'react';
import cx from 'classnames';

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
    headers: string[] | number [],
    items: TableItems[]
  }
}

const Table: FC<TableProps> = ({ widgetConfig }: TableProps) => {
  const { headers, items } = widgetConfig;
  return (
    <table className="table-auto my-10">
      <thead>
        <tr>
          {headers.map(
            (header, index) => (
              <th
                key={header}
                className={cx(
                  { 'bg-gray1 text-white rounded-md px-2': index === 0 },
                )}
              >
                {header}
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
