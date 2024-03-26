"use client";
import React, {
  forwardRef,
  ReactNode,
  Ref,
  useImperativeHandle,
  useState,
} from "react";
//
import {
  type ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type Table as TableData,
  useReactTable,
} from "@tanstack/react-table";
//
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";
import Filter from "./Filter";
import fuzzyFilter from "./_utils/fuzzy-filter";
//
import { cn } from "@/lib/cn";
import * as Accordion from "@radix-ui/react-accordion";
//
import {
  IconArrowsSort,
  IconSortAscending,
  IconSortDescending,
} from "@tabler/icons-react";

type UniqueId = string | number | symbol;
type RowData = { subRows?: RowData[]; content?: ReactNode } & Record<
  UniqueId,
  any
>;
export type TableProviderHandle<TData extends RowData> = {
  table: TableData<TData> /**
   *  Retrieves a set of all unique values of a specific column from a table.
   *
   *  @template ColumnValue The type of the column values.
   *  @template TData The Row Type definition.
   *
   *  @param {NonNullable<InferColumnIds<TData, typeof columns>>} columnId - The ID of the column to retrieve values from.
   *  @param {(accumulator: ColumnValue[], value: NoInfer<ColumnValue>) => boolean} reduceFn - A function
   *  that determines whether a value should be added to the output set.
   *  Defaults to a function that checks if the accumulator already includes the value.
   *  Careful to provide it if the values are complex objects that work by reference, such as objects,
   *  arrays, and class instances.
   *
   *
   *  @returns {ColumnValue[]} - Returns nothing if no column ID is provided.
   *  Otherwise, returns an array of unique column values.
   *
   *
   */;
  getColumnValuesSet<ColumnValue extends any>(
    columnId: NonNullable<InferColumnIds<TData, any>>,
    reduceFn?: (accumulator: any[], value: NoInfer<any>) => boolean
  ): ColumnValue[];
};
export type TableRowProps<TData extends RowData> = TData & {
  content?: ReactNode;
};
export type ColumnMap<TData extends RowData> = ColumnDef<TData, any>[];
export type TableProviderProps<TData extends RowData> = {
  columns: ColumnMap<TData>;
  rows: TableRowProps<TData>[];
  showFilters?: boolean;
  showFooter?: boolean;
  providerRef?: Ref<TableProviderHandle<TData>>;
  classList?: Partial<{
    "header-row": string;
    "body-row": string;
    "footer-row": string;
    "header-cell": string;
    "body-cell": string;
    "footer-cell": string;
    "table": string;
    "table-header": string;
    "table-body": string;
    "table-footer": string;
  }>;
  className?: string;
};
export type InferColumnIds<
  TData extends RowData,
  Columns extends ColumnMap<TData>,
> = Columns[number]["id"];

export const TableProvider = <TData extends RowData>({
  columns,
  rows,
  showFilters = false,
  showFooter = false,
  providerRef,
  classList,
  className,
}: TableProviderProps<TData>) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable<TData>({
    columns,
    data: rows,
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
    getSubRows: ({ subRows }) => subRows as TData[],
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
  });
  useImperativeHandle(
    providerRef,
    () => ({
      table,
      getColumnValuesSet<ColumnValue extends any>(
        columnId: NonNullable<InferColumnIds<TData, typeof columns>>,
        reduceFn: (
          accumulator: ColumnValue[],
          value: NoInfer<ColumnValue>
        ) => boolean = (accumulator, value) => accumulator.includes(value)
      ): ColumnValue[] {
        return table
          .getRowModel()
          .rows.reduce((accumulator: ColumnValue[], row) => {
            const value: ColumnValue = row.getValue(columnId);
            if (!reduceFn(accumulator, value)) accumulator.push(value);
            return accumulator;
          }, []);
      },
    }),
    [table]
  );
  return (
    <Accordion.Root type={"multiple"} className={className}>
      <Table className={classList?.["table"]}>
        <TableHeader className={classList?.["table-header"]}>
          {table.getHeaderGroups().map((row) => (
            <TableRow
              key={row.id}
              className={cn("bg-transparent", classList?.["header-row"])}
            >
              {row.headers.map((cell) => (
                <TableHead
                  key={cell.id}
                  colSpan={cell.colSpan}
                  className={classList?.["header-cell"]}
                  data-colname={cell.id}
                >
                  {!cell.isPlaceholder && (
                    <div
                      data-sortable={cell.column.getCanSort()}
                      className={
                        "flex items-center justify-start gap-2 data-[sortable=true]:cursor-pointer data-[sortable=true]:select-none"
                      }
                      onClick={cell.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        cell.column.columnDef.header,
                        cell.getContext()
                      )}
                      {cell.column.getCanSort() &&
                        ({
                          asc: <IconSortAscending className={"size-4"} />,
                          desc: <IconSortDescending className={"size-4"} />,
                        }[cell.column.getIsSorted() as string] ?? (
                          <IconArrowsSort className={"size-4"} />
                        ))}
                    </div>
                  )}
                  {cell.column.getCanFilter() && showFilters && (
                    <Filter column={cell.column} table={table} />
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className={classList?.["table-body"]}>
          {table.getRowModel().rows.map(({ id, getVisibleCells }, i) => {
            const rowData = rows[i];
            const TableDataRow = forwardRef((props: any, ref) => (
              <TableRow
                className={cn(
                  "w-full [-webkit-appearance:none]",
                  classList?.["body-row"]
                )}
                {...props}
                ref={ref}
              >
                {getVisibleCells().map(({ id, column, getContext }) => (
                  <TableCell
                    key={id}
                    className={classList?.["body-cell"]}
                    data-colname={column.id}
                  >
                    {flexRender(column.columnDef.cell, getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ));
            TableDataRow.displayName = "TableDataRow";
            if (!rowData?.content) return <TableDataRow key={id} />;
            return (
              <Accordion.AccordionItem
                value={id}
                key={id}
                className={cn(
                  "relative [display:contents]",
                  classList?.["body-row"]
                )}
              >
                <Accordion.AccordionHeader asChild>
                  <Accordion.AccordionTrigger asChild>
                    <TableDataRow />
                  </Accordion.AccordionTrigger>
                </Accordion.AccordionHeader>
                <Accordion.AccordionContent asChild>
                  <TableRow
                    className={
                      "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
                    }
                    style={{
                      animation: "accordion-down 0.2s ease-out;",
                    }}
                  >
                    <TableCell
                      colSpan={Object.keys(rowData).length}
                      className={"p-0"}
                    >
                      {rowData.content}
                    </TableCell>
                  </TableRow>
                </Accordion.AccordionContent>
              </Accordion.AccordionItem>
            );
          })}
        </TableBody>
        {showFooter && (
          <TableFooter className={classList?.["table-footer"]}>
            {table.getHeaderGroups().map((row) => (
              <TableRow key={row.id} className={"bg-transparent"}>
                {row.headers.map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      "font-semibold text-background",
                      classList?.["footer-cell"]
                    )}
                  >
                    {flexRender(
                      cell.column.columnDef.footer,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableFooter>
        )}
      </Table>
    </Accordion.Root>
  );
};
