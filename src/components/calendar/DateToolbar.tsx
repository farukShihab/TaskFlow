import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateToolbarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export function DateToolbar({
  selectedDate,
  onDateChange,
}: DateToolbarProps) {
  const isToday =
    selectedDate.toDateString() === new Date().toDateString();

  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  function previousDay() {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() - 1);
    onDateChange(date);
  }

  function nextDay() {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + 1);
    onDateChange(date);
  }

  function goToToday() {
    onDateChange(new Date());
  }

  return (
    <section
      className="
      surface
      p-4
    "
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={previousDay}
            className="rounded-xl border p-2"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={goToToday}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white"
          >
            <CalendarDays size={18} />
            {isToday ? "Today" : "Go to Today"}
          </button>

          <button
            onClick={nextDay}
            className="rounded-xl border p-2"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <button
              className="
    flex items-center gap-2
    rounded-xl
    border border-border
    bg-card
    px-4 py-2
    text-sm font-medium text-foreground
    transition-colors
    hover:bg-white/5
    focus-ring
  "
            >
              <CalendarDays
                size={16}
                className="text-violet-400"
              />
              {formattedDate}
            </button>
          </PopoverTrigger>

          <PopoverContent
            className="w-auto p-0"
            align="end"
          >
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                if (date) {
                  onDateChange(date);
                }
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </section>
  );
}