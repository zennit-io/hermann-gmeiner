import React from "react";
import { TeacherTable } from "@/components/management/TeacherTable";
import type { SearchParamProps } from "@/types/navigation/SearchParamProps";
import { getAllTeachers } from "@/db/actions/teacher/get-all-teachers";

const Page = async ({ searchParams }: SearchParamProps<["page"]>) => {
  const teachers = await getAllTeachers({ page: Number(searchParams.page!) });
  return (
    <section>
      <TeacherTable page={Number(searchParams.page!)} data={teachers} />
    </section>
  );
};

export default Page;
