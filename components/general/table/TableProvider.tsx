"use client";
import {
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
  type RowData,
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
import cn from "@/lib/cn";
import * as Accordion from "@radix-ui/react-accordion";
//
export type TableProviderHandle<TData extends RowData> = {
  table: TableData<TData>;
  /**
   * Retrieves a set of all unique values of a specific column from a table.
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
   */
  getColumnValuesEnum<ColumnValues extends any>(
    columnId: NonNullable<InferColumnIds<TData, any>>,
    reduceFn?: (accumulator: any[], value: NoInfer<any>) => boolean
  ): ColumnValues[];
};
export type TableRowProps<TData extends RowData> = TData & {
  content?: ReactNode;
};
export type ColumnMap<TData extends RowData> = ColumnDef<TData, unknown>[];
export type TableProviderProps<TData extends RowData> = {
  columns: ColumnMap<TData>;
  data: TableRowProps<TData>[];
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
};
export type InferColumnIds<
  TData extends RowData,
  Columns extends ColumnMap<TData>,
> = Columns[number]["id"];

const TableProvider = <TData extends RowData>({
  columns,
  data,
  showFilters = false,
  showFooter = false,
  providerRef,
  classList,
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
  /**
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
   */
  const getColumnValuesEnum = <ColumnValue extends any>(
    columnId: NonNullable<InferColumnIds<TData, typeof columns>>,
    reduceFn: (
      accumulator: ColumnValue[],
      value: NoInfer<ColumnValue>
    ) => boolean = (accumulator, value) => accumulator.includes(value)
  ): ColumnValue[] => {
    return table
      .getRowModel()
      .rows.reduce((accumulator: ColumnValue[], row) => {
        const value: ColumnValue = row.getValue(columnId);
        if (!reduceFn(accumulator, value)) accumulator.push(value);
        return accumulator;
      }, []);
  };

  useImperativeHandle(providerRef, () => ({ table, getColumnValuesEnum }));
  return (
    <Accordion.Root type={"multiple"}>
      <Table className={classList?.["table"]}>
        <TableHeader className={classList?.["table-header"]}>
          {table.getHeaderGroups().map(({ id, headers }) => (
            <TableRow
              key={id}
              className={cn("bg-transparent", classList?.["header-row"])}
            >
              {headers.map(
                ({ id, colSpan, isPlaceholder, column, getContext }) => (
                  <TableHead
                    key={id}
                    colSpan={colSpan}
                    className={classList?.["header-cell"]}
                  >
                    {!isPlaceholder && (
                      <div
                        data-sortable={column.getCanSort()}
                        className={
                          "data-[sortable=true]:cursor-pointer data-[sortable=true]:select-none"
                        }
                        onClick={column.getToggleSortingHandler()}
                      >
                        {flexRender(column.columnDef.header, getContext())}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                    {column.getCanFilter() && showFilters && (
                      <Filter column={column} table={table} />
                    )}
                  </TableHead>
                )
              )}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className={classList?.["table-body"]}>
          {table.getRowModel().rows.map(({ id, getVisibleCells }, i) => {
            const rowData = data[i];
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
                  <TableCell key={id} className={classList?.["body-cell"]}>
                    {flexRender(column.columnDef.cell, getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ));
            TableDataRow.displayName = "TableDataRow";
            if (!rowData.content) return <TableDataRow key={id} />;
            return (
              <Accordion.AccordionItem
                value={id}
                key={id}
                className={"relative [display:contents]"}
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
            {table.getHeaderGroups().map(({ id, headers }) => (
              <TableRow key={id} className={"bg-transparent"}>
                {headers.map(({ id, column, getContext }) => (
                  <TableCell
                    key={id}
                    className={cn(
                      "font-semibold text-background",
                      classList?.["footer-cell"]
                    )}
                  >
                    {flexRender(column.columnDef.footer, getContext())}
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

export default TableProvider;
