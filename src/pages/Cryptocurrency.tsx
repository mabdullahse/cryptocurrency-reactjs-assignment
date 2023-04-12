import React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtual } from 'react-virtual';
import { NumericFormat } from 'react-number-format';

interface ICrypto {
  id: number;
  name: string;
  symbol: string;
  cmc_rank: string;
  quote: {
    [key: string]: {
      price: number;
      volume_24h: number;
    };
  };
}
interface TableProps {
  data: ICrypto[]; // Update the type to expect an array of ICrypto[]
  currencyPrefix: string;
  currencySymbol: string;
  onCryptoSelection: (id: number) => void;
}

const Cryptocurrency: React.FC<TableProps> = ({
  data,
  currencySymbol,
  currencyPrefix,
  onCryptoSelection,
}) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns = React.useMemo<ColumnDef<ICrypto>[]>(
    () => [
      {
        accessorKey: 'name',
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
        size: 65,
      },
      {
        accessorFn: (row) => row.cmc_rank,
        id: 'cmc_rank',
        cell: (info) => info.getValue(),
        header: () => <span>Rank</span>,
        size: 50,
      },
      {
        accessorFn: (row) => row.symbol,
        id: 'symbol',
        cell: (info) => info.getValue(),
        header: () => <span>Symbol</span>,
        size: 75,
      },

      {
        accessorFn: (row) => row.quote[currencySymbol].price,
        id: 'quote',
        cell: (info) => {
          const price = info.getValue() as number;
          return (
            <NumericFormat
              value={price}
              displayType={'text'}
              thousandSeparator={true}
              prefix={currencyPrefix}
              decimalScale={2}
            />
          );
        },
        header: () => <span>Price</span>,
      },
      {
        accessorFn: (row) => row.quote[currencySymbol].volume_24h,
        id: 'slug',
        cell: (info) => {
          const price = info.getValue() as number;
          return (
            <NumericFormat
              value={price}
              displayType={'text'}
              thousandSeparator={true}
              prefix={currencyPrefix}
              decimalScale={2}
            />
          );
        },
        header: () => <span> 24 hour Change</span>,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const { rows } = table.getRowModel();
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10,
  });
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  return (
    <div className='p-2'>
      <div className='h-2' />
      <div ref={tableContainerRef} className='cryptotable-cotainer'>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {paddingTop > 0 && (
              <tr>
                <td style={{ height: `${paddingTop}px` }} />
              </tr>
            )}
            {virtualRows.map((virtualRow) => {
              const row = rows[virtualRow.index] as Row<ICrypto>;

              return (
                <tr key={row.id} onClick={() => onCryptoSelection(+row.id)} className='cursor-pointer'>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {paddingBottom > 0 && (
              <tr>
                <td style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cryptocurrency;
