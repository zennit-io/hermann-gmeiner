"use client";
import React, { useMemo } from "react";

import { ColumnDef } from "@tanstack/react-table";
import fuzzySort from "@/components/general/table/_utils/fuzzy-sort";
import TableProvider from "@/components/general/table/TableProvider";
import Button from "@/components/general/Button";
import Input from "@/components/general/Input";
import Calendar from "@/components/general/Calendar";
import { IconInfoCircle } from "@tabler/icons-react";

const ZennUIPage = () => {
  const columns = useMemo<ColumnDef<any, any>[]>(
    () => [
      {
        header: "Name",
        footer: (props) => props.column.id,
        columns: [
          {
            header: "Personal Info",
            columns: [
              {
                accessorKey: "firstName",
                cell: (info) => info.getValue(),
                header: () => <span>First Name</span>,
                footer: (props) => props.column.id,
              },
              {
                accessorFn: (row) => row.lastName,
                id: "lastName",
                cell: (info) => info.getValue(),
                header: () => <span>Last Name</span>,
                footer: (props) => props.column.id,
              },
              {
                accessorFn: (row) => `${row.firstName} ${row.lastName}`,
                id: "fullName",
                header: "Full Name",
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
                filterFn: "fuzzy",
                sortingFn: fuzzySort,
              },
            ],
          },
        ],
      },
      {
        header: "Info",
        footer: (props) => props.column.id,
        columns: [
          {
            header: "More Info",
            columns: [
              {
                accessorKey: "age",
                header: () => "Age",
                footer: (props) => props.column.id,
              },
              {
                accessorKey: "visits",
                header: () => <span>Visits</span>,
                footer: (props) => props.column.id,
              },
              {
                accessorKey: "status",
                header: "Status",
                footer: (props) => props.column.id,
              },
              {
                accessorKey: "progress",
                header: "Profile Progress",
                footer: (props) => props.column.id,
              },
            ],
          },
        ],
      },
    ],
    []
  );
  return (
    <div className={"flex flex-col gap-2"}>
      <div className={"flex items-center gap-2"}>
        <Button variant={"default"}>Zennit</Button>
        <Button variant={"primary"}>Zennit</Button>
        <Button variant={"secondary"}>Zennit</Button>
        <Button variant={"tertiary"}>Zennit</Button>
        <Button variant={"border"}>Zennit</Button>
      </div>
      <div className={"flex gap-2"}>
        <Input StartDecorator={IconInfoCircle} className={"w-1/4"} />
        <Input
          EndDecorator={IconInfoCircle}
          className={"w-1/4"}
          variant={"border"}
        />
      </div>
      <div>
        <Calendar />
      </div>
      <TableProvider columns={columns} data={data} />
    </div>
  );
};

export default ZennUIPage;
const data = [
  {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    visits: 5,
    status: "Single",
    progress: 50,
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    age: 25,
    visits: 10,
    status: "Married",
    progress: 75,
  },
  {
    firstName: "Alice",
    lastName: "Johnson",
    age: 35,
    visits: 15,
    status: "Single",
    progress: 90,
  },
  {
    firstName: "Bob",
    lastName: "Johnson",
    age: 40,
    visits: 20,
    status: "Married",
    progress: 100,
  },
];
