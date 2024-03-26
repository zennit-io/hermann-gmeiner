import { createColumnHelper } from "@tanstack/table-core";
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/general/DropdownMenu";
import Link from "next/link";
import {
  TableProvider,
  TableProviderHandle,
} from "@/components/general/table/TableProvider";
import { useCallback, useState } from "react";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { getAllTeachers } from "@/db/actions/teacher/get-all-teachers";
import { deleteTeacherById } from "@/db/actions/teacher/delete-teacher-by-id";

type TeacherTableProps = {
  page: number;
  data: Teacher[];
};

export const TeacherTable = ({ page, data }: TeacherTableProps) => {
  const [tablePrimitive, setTablePrimitive] =
    useState<TableProviderHandle<Teacher> | null>(null);
  const setTableHandler = useCallback((node: TableProviderHandle<Teacher>) => {
    setTablePrimitive(node);
  }, []);

  const deleteTeacherMutation = useMutation({
    mutationFn: async (id) => {
      const deletion = await deleteTeacherById(id);
    },
  });
  const { status, ...query } = useQuery<Teacher[]>({
    queryKey: ["projects", page],
    queryFn: () => getAllTeachers({ page }),
    initialData: data,
    placeholderData: keepPreviousData,
  });

  return (
    <section>
      <TableProvider
        columns={columns}
        rows={query.data ?? []}
        providerRef={setTableHandler}
      />
    </section>
  );
};

export type Teacher = {
  id: number;
  name: string;
  surname: string;
  email: string | null;
  phoneNumber: string | null;
  photo: string;
};

const columnCreator = createColumnHelper<Teacher>();
const columns = [
  columnCreator.accessor("id", {
    header: "ID",
  }),
  columnCreator.accessor("name", {
    header: "Emër",
    cell: ({ getValue }) => (
      <span className={"max-w-[150px] truncate"}>{getValue()}</span>
    ),
    filterFn: "includesString",
  }),
  columnCreator.accessor("surname", {
    enableSorting: false,
    header: "Mbiemër",
    cell: ({ getValue }) => (
      <span className={"block max-w-80 truncate"}>{getValue()}</span>
    ),
  }),
  columnCreator.accessor("email", {
    header: "Email",
    enableSorting: false,
    cell: ({ getValue }) => (
      <span className={"block max-w-80 truncate"}>{getValue() ?? "-"}</span>
    ),
  }),
  columnCreator.accessor("phoneNumber", {
    header: "Numri i telefonit",
    cell: ({ getValue }) => (
      <span className={"block max-w-80 truncate"}>{getValue() ?? "-"}</span>
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
                href={`/menaxhimi/artikujt/ndrysho/${projectId}`}
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
