import React from "react";
import { IconClock } from "@tabler/icons-react";
import Image from "next/image";

type ArticlePreviewProps = {
  title: string;
  description: string;
  tagList: string[];
  length: string;
  thumbnail: string | null;
};
const ArticlePreview = ({
  title,
  length,
  tagList,
  description,
  thumbnail,
}: ArticlePreviewProps) => {
  return (
    <div className={"flex w-full flex-col gap-2"}>
      {thumbnail && (
        <Image
          src={thumbnail}
          alt={"Article Preview"}
          width={0}
          height={0}
          sizes={"100%"}
          className={"aspect-video w-full rounded-lg"}
        />
      )}
      <div
        className={
          "flex h-6 items-center gap-2 overflow-x-auto overflow-y-hidden scrollbar"
        }
      >
        <span className={"flex w-full items-center gap-2 font-light"}>
          <IconClock stroke={1.5} />
          {length}
        </span>
        {tagList.map((tag) => (
          <span
            key={tag}
            className={"rounded-full bg-primary px-2 py-1 text-xs font-light"}
          >
            {tag}
          </span>
        ))}
      </div>
      <span className={"w-full truncate text-xl font-semibold"}>{title}</span>
      <span className={"line-clamp-3 w-full"}>{description}</span>
    </div>
  );
};

export default ArticlePreview;
