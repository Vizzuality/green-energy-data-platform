import React, { FC } from 'react';

interface TableHeaderItem {
  item: string | number
}

interface TableItem {
  label: string | number,
  value: string | number
}

interface TableItems {
  label: string | number
  value: TableItem[]
};

interface TableProps {
  headers: TableHeaderItem[]
  items: TableItems[]
};
const Table: FC<TableProps> = ({ widgetData }) => {
console.log(widgetData)
  const { headers, items } = widgetData;
  return (
    <table>
      <thead>
        <tr>{headers.map(h => (<th>{h}</th>))}</tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr>
            <td>{item.label}</td>
            {item.value.map(i => (<td>{i.value}</td>))}
          </tr>
        ))}

      </tbody>
    </table>
  );
};

export default Table;


