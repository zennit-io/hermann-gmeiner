import React from "react";
import { type Tag as TagType, TagInputProps } from "./TagInput";
import { Tag, type TagProps } from "./Tag";
import { cn } from "@/lib/cn";
import SortableList, { SortableItem } from "react-easy-sort";

export type TagListProps = {
  tags: TagType[];
  customTagRenderer?: (tag: TagType) => React.ReactNode;
  direction?: TagProps["direction"];
  onSortEnd: (oldIndex: number, newIndex: number) => void;
  inputFieldPosition?: TagInputProps["inputFieldPosition"];
} & Omit<TagProps, "tagObj">;

const DropTarget: React.FC = () => {
  return <div className={cn("h-full rounded-md bg-secondary/50")} />;
};

export const TagList: React.FC<TagListProps> = ({
  tags,
  customTagRenderer,
  direction,
  draggable,
  onSortEnd,
  inputFieldPosition,
  ...tagListProps
}) => {
  const [draggedTagId, setDraggedTagId] = React.useState<string | null>(null);

  const handleMouseDown = (id: string) => {
    setDraggedTagId(id);
  };

  const handleMouseUp = () => {
    setDraggedTagId(null);
  };

  return (
    <div
      className={cn(
        " w-full overflow-x-auto overflow-y-hidden rounded-md",
        {
          "flex flex-wrap gap-1": direction === "row",
          "flex flex-col gap-1": direction === "column",
        },
        inputFieldPosition === "inline" &&
          "w-auto max-w-[calc(100%-theme(width.4))] flex-nowrap gap-2"
      )}
    >
      {draggable ? (
        <SortableList
          onSortEnd={onSortEnd}
          className={"list flex flex-wrap gap-2"}
          dropTarget={<DropTarget />}
        >
          {tags.map((tagObj) => (
            <SortableItem key={tagObj.id}>
              <div
                onMouseDown={() => handleMouseDown(tagObj.id)}
                onMouseLeave={handleMouseUp}
                className={cn(
                  {
                    "rounded-md border border-solid border-primary":
                      draggedTagId === tagObj.id,
                  },
                  "transition-all duration-200 ease-in-out"
                )}
              >
                {customTagRenderer ? (
                  customTagRenderer(tagObj)
                ) : (
                  <Tag tagObj={tagObj} {...tagListProps} />
                )}
              </div>
            </SortableItem>
          ))}
        </SortableList>
      ) : (
        tags.map((tagObj) =>
          customTagRenderer ? (
            customTagRenderer(tagObj)
          ) : (
            <Tag key={tagObj.id} tagObj={tagObj} {...tagListProps} />
          )
        )
      )}
    </div>
  );
};
