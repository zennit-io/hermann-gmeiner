"use client";
import {
  TableProvider,
  TableProviderHandle,
} from "@/components/general/table/TableProvider";
import { createColumnHelper } from "@tanstack/table-core";
import Badge from "@/components/general/Badge";
import { useCallback, useMemo, useState } from "react";
import { Input } from "@/components/general/Input";
import { Tag, TagInput } from "@/components/general/tag/TagInput";
import { DatePicker } from "@/components/general/DatePicker";
import { DateRange } from "react-day-picker";
import {
  IconCircleArrowUpRight,
  IconDotsVertical,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/general/DropdownMenu";
import { Label } from "@/components/general/form/Label";
import Link from "next/link";

type Article = {
  id: number;
  title: string;
  description: string;
  length: string;
  tagList: string[];
  createdAt: string;
};
type ArticleTableProps = {
  articles: Article[];
};
const ArticleTable = ({ articles }: ArticleTableProps) => {
  const [tablePrimitive, setTablePrimitive] =
    useState<TableProviderHandle<Article> | null>(null);

  const setTableHandler = useCallback((node: TableProviderHandle<Article>) => {
    setTablePrimitive(node);
  }, []);

  const tagsSet: Tag[] = useMemo(
    () =>
      Array.from(
        new Set(tablePrimitive?.getColumnValuesSet<string[]>("tagList").flat())
      ).map((tag) => ({ id: tag, text: tag })),
    [tablePrimitive]
  );
  return (
    <div>
      <div className={"flex gap-2"}>
        <div className={"w-1/2"}>
          <Label htmlFor={"title"}>Kërko sipas titullit:</Label>
          <Input
            id={"title"}
            className={"w-full"}
            placeholder={"Titulli i artikullit..."}
            onTextChange={(query) =>
              tablePrimitive?.table.getColumn("title")?.setFilterValue(query)
            }
          />
        </div>
        <div className={"w-1/4"}>
          <Label htmlFor={"tags"}>Kërko sipas kategorive:</Label>
          <TagInput
            id={"tags"}
            size={"sm"}
            interaction={"clickable"}
            placeholder={"Zgjidh kategori..."}
            autocompleteOptions={tagsSet}
            enableAutocomplete
            inputFieldPosition={"inline"}
            className={"max-w-96 rounded-lg border border-border"}
            onTagsSet={(tags) => {
              tablePrimitive?.table
                .getColumn("tagList")
                ?.setFilterValue(tags.map((tag) => tag.text));
            }}
          />
        </div>
        <div className={"w-1/4"}>
          <Label htmlFor={"createdAt"}>Kërko sipas datës:</Label>
          <DatePicker
            className={"w-full"}
            id={"createdAt"}
            placeholder={"Zgjidh një grup datash krijimi..."}
            mode={"range"}
            onDatePick={(dateRange) => {
              tablePrimitive?.table
                .getColumn("createdAt")
                ?.setFilterValue(dateRange);
            }}
          />
        </div>
      </div>
      <hr className={"my-3 w-full border-foreground bg-foreground"} />
      <TableProvider
        columns={columns}
        rows={articles}
        providerRef={setTableHandler}
      />
    </div>
  );
};
const columnCreator = createColumnHelper<Article>();
const columns = [
  columnCreator.accessor("id", {
    header: "ID",
  }),
  columnCreator.accessor("title", {
    header: "Titulli",
    cell: ({ getValue }) => (
      <span className={"max-w-[150px] truncate"}>{getValue()}</span>
    ),
    filterFn: "includesString",
  }),
  columnCreator.accessor("description", {
    enableSorting: false,
    header: "Përshkrimi",
    cell: ({ getValue }) => (
      <span className={"block max-w-80 truncate"}>{getValue()}</span>
    ),
  }),
  columnCreator.accessor("tagList", {
    header: "Kategoritë",
    enableSorting: false,
    cell: ({ getValue }) => (
      <div className={"flex max-w-96 gap-2 overflow-x-auto overflow-y-hidden"}>
        {getValue().map((tag) => (
          <Badge key={tag} className={"capitalize"}>
            {tag}
          </Badge>
        ))}
      </div>
    ),
    filterFn: "arrIncludes",
  }),
  columnCreator.accessor("createdAt", {
    header: "Krijuar më",
    cell: ({ getValue }) => (
      <span className={"max-w-[150px] truncate"}>
        {new Date(getValue()).format().date}
      </span>
    ),
    filterFn: (row, columnId, filterValue) => {
      const { from, to } = filterValue as Required<NonNullable<DateRange>>;
      const rowDate = new Date(row[columnId as keyof typeof row] as string);
      return from! <= rowDate && rowDate <= to;
    },
  }),
  columnCreator.accessor("length", {
    enableSorting: false,
    header: "Kohëzgjatja",
    cell: ({ getValue }) => (
      <span className={"max-w-[150px] truncate"}>{getValue()}</span>
    ),
  }),
  columnCreator.display({
    id: "actions",
    header: () => <IconDotsVertical />,
    cell: ({ row }) => {
      const projectId = row.original.id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <IconDotsVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link
                href={`/projektet/${projectId}`}
                className={"flex w-full items-center gap-2"}
              >
                <IconCircleArrowUpRight stroke={1.5} />
                Shiko
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href={`/menaxhimi/artikujt/ndysho/${projectId}`}
                className={"flex w-full items-center gap-2"}
              >
                <IconEdit stroke={1.5} />
                Edito
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className={"text-red-800 focus:text-red-500"}>
              <IconTrash stroke={1.5} />
              Fshij
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
];
export default ArticleTable;
