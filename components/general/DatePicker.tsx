"use client";

import { ButtonHTMLAttributes, useState } from "react";
//
import Calendar, { CalendarProps } from "@/components/general/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/general/Popover";
//
import { IconCalendar } from "@tabler/icons-react";
//
import { cn } from "@/lib/cn";
import type { DateRange } from "react-day-picker";
import "@/augmentation";

type CalendarMode = CalendarProps["mode"];
type DatePickResult<Mode extends CalendarMode> = Mode extends "single"
  ? Date
  : DateRange;
type DatePickerProps<Mode extends CalendarMode> = {
  mode?: Mode;
  onDatePick?: (result: DatePickResult<Mode>) => void;
  placeholder?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function DatePicker<Mode extends CalendarMode>({
  mode = "single",
  onDatePick,
  placeholder,
  className,
  ...props
}: DatePickerProps<Mode>) {
  const [selectedDate, setSelectedDate] = useState<
    Date | DateRange | undefined
  >(undefined);
  const handleDatePick = (result: Date | DateRange | undefined) => {
    setSelectedDate(result);
    onDatePick?.(result as DatePickResult<Mode>);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          {...props}
          className={cn(
            "flex min-w-64 items-center justify-start rounded-lg border border-border px-2 py-1.5 text-left text-foreground",
            !selectedDate && "text-muted-foreground",
            className
          )}
        >
          <IconCalendar className="mr-2 size-4" />
          {selectedDate ? (
            formatDisplayDate(selectedDate)
          ) : (
            <span>{placeholder ?? "Pick a Date"}</span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        {/* @ts-ignore */}
        <Calendar
          mode={mode}
          selected={selectedDate}
          onSelect={handleDatePick}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

const formatDisplayDate = (dateResult: Date | DateRange) => {
  if (dateResult instanceof Date) return dateResult.format().date;
  return `${dateResult.from ? dateResult.from.format().date : ""} - ${dateResult.to ? dateResult.to.format().date : ""}`;
};
