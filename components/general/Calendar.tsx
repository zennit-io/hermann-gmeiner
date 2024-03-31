"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DayPicker } from "react-day-picker";

import cn from "@/lib/cn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/general/Select";
import {
  ChangeEvent,
  Children,
  type ComponentProps,
  isValidElement,
} from "react";

export type CalendarProps = ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      captionLayout="dropdown-buttons"
      fromYear={2015}
      toYear={2025}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months:
          "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 ",
        month: "space-y-4",
        caption: "flex justify-start pt-1 relative items-center",
        caption_label: "hidden",
        nav: "space-x-1 flex items-center",
        nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        nav_button_previous: "absolute right-6 top-1/2 -translate-y-1/2",
        nav_button_next: "absolute right-0 top-1/2 -translate-y-1/2",
        table: "w-full border-collapse space-y-1",
        head_row: "flex gap-2",
        dropdown_year: "absolute top-0 left-0 z-10",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem] uppercase",
        row: "flex w-full mt-2 gap-2",
        cell: cn(
          "rounded-lg relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: "size-8 rounded-lg items-center justify-center flex p-0 font-normal aria-selected:opacity-100 ",
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        caption_dropdowns: "w-4/5",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeftIcon className="size-4" />,
        IconRight: () => <ChevronRightIcon className="size-4" />,
        Dropdown: ({ children, caption, value, onChange }) => (
          <Select
            value={String(value)}
            onValueChange={(value) =>
              onChange?.({
                target: { value },
              } as ChangeEvent<HTMLSelectElement>)
            }
          >
            <SelectTrigger
              className={
                "mx-0.5 inline-flex w-[calc(50%-theme(spacing.1))] min-w-[calc(50%-theme(spacing.1))] bg-background shadow-inner shadow-foreground/40"
              }
            >
              {caption}
            </SelectTrigger>
            <SelectContent>
              {Children.map(children, (child, i) => {
                if (isValidElement(child)) {
                  console.log(child.props);
                  return (
                    <SelectItem key={i} value={String(child.props.value)}>
                      {child}
                    </SelectItem>
                  );
                }
                return null;
              })}
            </SelectContent>
          </Select>
        ),
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export default Calendar;
