import React from "react";
import { IconClock } from "@tabler/icons-react";

type ArticlePreviewProps = {
  title: string;
  description: string;
  tagList: string[];
  length: string;
  // image?: string;
};
const ArticlePreview = ({
  title,
  length,
  tagList,
  description,
}: ArticlePreviewProps) => {
  return (
    <div className={"flex h-44 w-full flex-col gap-2"}>
      <span className={"flex w-full items-center gap-2 font-light"}>
        <IconClock stroke={1.5} />
        {length}
      </span>
      <div
        className={
          "flex h-6 items-center gap-2 overflow-x-auto overflow-y-hidden scrollbar"
        }
      >
        {tagList.map((tag) => (
          <span
            key={tag}
            className={"rounded-full bg-primary px-2 py-1 text-xs font-light"}
          >
            {tag}
          </span>
        ))}
      </div>
      <span className={"h-9 w-full truncate text-xl font-semibold"}>
        {title}
      </span>
      <span className={"line-clamp-3 w-full"}>{description}</span>
    </div>
  );
};

export default ArticlePreview;
