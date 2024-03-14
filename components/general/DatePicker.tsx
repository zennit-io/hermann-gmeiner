"use client";
import { useState } from "react";
import { format } from "date-fns";
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
import cn from "@/lib/cn";
import type { DateRange } from "react-day-picker";

type CalendarMode = CalendarProps["mode"];
type DatePickResult<Mode extends CalendarMode> = Mode extends "single"
  ? Date
  : DateRange;
type DatePickerProps<Mode extends CalendarMode> = {
  mode?: Mode;
  onDatePick?: (result: DatePickResult<Mode>) => void;
};

export function DatePicker<Mode extends CalendarMode>({
  mode = "single",
  onDatePick,
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
          className={cn(
            "bg- flex w-[280px] items-center justify-start rounded-lg bg-foreground p-1 text-left text-black",
            !selectedDate && "text-muted-foreground"
          )}
        >
          <IconCalendar className="mr-2 size-4" />
          {selectedDate ? (
            formatDisplayDate(selectedDate)
          ) : (
            <span>Pick a date</span>
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
  if (dateResult instanceof Date) {
    return format(dateResult, "PPP");
  }
  return `${dateResult.from ? format(dateResult.from, "PPP") : ""} - ${dateResult.to ? format(dateResult.to, "PPP") : ""}`;
};
