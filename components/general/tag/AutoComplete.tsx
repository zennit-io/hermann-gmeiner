import React from "react";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/general/Command";
import { type Tag as TagType } from "./TagInput";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/general/Popover";
import { IconChevronDown } from "@tabler/icons-react";
import cn from "@/lib/cn";

type AutocompleteProps = {
  tags: TagType[];
  setTags: React.Dispatch<React.SetStateAction<TagType[]>>;
  autocompleteOptions: TagType[];
  maxTags?: number;
  onTagAdd?: (tag: string) => void;
  allowDuplicates: boolean;
  children: React.ReactNode;
  placeholder?: string;
};

export const Autocomplete: React.FC<AutocompleteProps> = ({
  tags,
  setTags,
  autocompleteOptions,
  maxTags,
  onTagAdd,
  allowDuplicates,
                                                            placeholder,
  children,
}) => {
  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "relative flex w-5 items-center justify-end",
          tags.length === 0 && "w-full justify-between",
        )}
        asChild
      >
        <button classN
        ,ame={"w-full truncate py-1.5 text-muted-foreground"}>
        {tags.length === 0 && placeholder}
        <span className={"rounded-full bg-foreground/20 p-1"}>
            <IconChevronDown size={16} />
          </span>
      </button>
    </PopoverTrigger>
  <PopoverContent className={"w-fit max-w-none p-2"} asChild>
    <Command className="min-w-[400px] border">
      {children}
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {autocompleteOptions.map((option) => (
            <CommandItem key={option.id}>
              <div
                className="w-full"
                onClick={() => {
                  if (maxTags && tags.length >= maxTags) return;
                  if (
                    !allowDuplicates &&
                    tags.some((tag) => tag.text === option.text)
                  )
                    return;
                  setTags([...tags, option]);
                  onTagAdd?.(option.text);
                }}
              >
                {option.text}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  </PopoverContent>;
</Popover>
  );
};
