import { useState } from "react";
//
import {
  type ColumnDef,
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  flexRender,
  type RowData,
} from "@tanstack/react-table";
//
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";
import Filter from "./Filter";
import fuzzyFilter from "./_utils/fuzzy-filter";
//
import cn from "@/lib/cn";
//
type TableProviderProps<TData extends RowData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
};
const TableProvider = <TData extends RowData>({
  columns,
  data,
}: TableProviderProps<TData>) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable<TData>({
    columns,
    data,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map(({ id, headers }) => (
          <TableRow key={id}>
            {headers.map(
              ({ id, colSpan, isPlaceholder, column, getContext }) => (
                <TableHead key={id} colSpan={colSpan}>
                  {!isPlaceholder && (
                    <div
                      data-sortable={column.getCanSort()}
                      className={cn(
                        "data-[sortable=true]:cursor-pointer data-[sortable=true]:select-none"
                      )}
                      onClick={column.getToggleSortingHandler()}
                    >
                      {flexRender(column.columnDef.header, getContext())}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                  {column.getCanFilter() && (
                    <Filter column={column} table={table} />
                  )}
                </TableHead>
              )
            )}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map(({ id, getVisibleCells }) => (
          <TableRow key={id}>
            {getVisibleCells().map(({ id, column, getContext }) => (
              <TableCell key={id}>
                {flexRender(column.columnDef.cell, getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableProvider;
