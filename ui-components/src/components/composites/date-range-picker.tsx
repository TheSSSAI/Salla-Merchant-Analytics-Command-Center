import * as React from "react";
import { addDays, format, subDays, subMonths } from "date-fns";
import { Calendar as CalendarIcon, Check } from "lucide-react";
import { DateRange, DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface DateRangePickerProps {
  className?: string;
  date?: DateRange;
  onDateChange?: (date: DateRange | undefined) => void;
  align?: "start" | "center" | "end";
}

const PRESETS = [
  { label: "Last 7 Days", getValue: () => ({ from: subDays(new Date(), 7), to: new Date() }) },
  { label: "Last 30 Days", getValue: () => ({ from: subDays(new Date(), 30), to: new Date() }) },
  { label: "Last 90 Days", getValue: () => ({ from: subDays(new Date(), 90), to: new Date() }) },
  { label: "Last Year", getValue: () => ({ from: subDays(new Date(), 365), to: new Date() }) },
  { label: "Month to Date", getValue: () => ({ from: new Date(new Date().getFullYear(), new Date().getMonth(), 1), to: new Date() }) },
];

export function DateRangePicker({
  className,
  date,
  onDateChange,
  align = "start",
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedPreset, setSelectedPreset] = React.useState<string | undefined>();

  // Handle Preset Selection
  const handlePresetChange = (value: string) => {
    const preset = PRESETS.find((p) => p.label === value);
    if (preset) {
      const newDate = preset.getValue();
      onDateChange?.(newDate);
      setSelectedPreset(value);
    }
  };

  // When manual selection happens, clear preset if it doesn't match
  const handleCalendarSelect = (newDate: DateRange | undefined) => {
    onDateChange?.(newDate);
    setSelectedPreset(undefined);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full sm:w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align={align}>
          <div className="flex flex-col sm:flex-row">
            <div className="p-3 border-b sm:border-b-0 sm:border-r space-y-3">
              <div className="font-medium text-sm text-muted-foreground mb-2">Presets</div>
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
                {PRESETS.map((preset) => (
                  <Button
                    key={preset.label}
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePresetChange(preset.label)}
                    className={cn(
                      "justify-start font-normal",
                      selectedPreset === preset.label && "bg-accent text-accent-foreground font-medium"
                    )}
                  >
                    {selectedPreset === preset.label && (
                      <Check className="mr-2 h-3 w-3" />
                    )}
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>
            <div className="p-3">
              <DayPicker
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={handleCalendarSelect}
                numberOfMonths={2}
                showOutsideDays={false}
                classNames={{
                  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-4",
                  caption: "flex justify-center pt-1 relative items-center",
                  caption_label: "text-sm font-medium",
                  nav: "space-x-1 flex items-center",
                  nav_button: cn(
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border border-input rounded-md flex items-center justify-center transition-opacity"
                  ),
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: cn(
                    "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md flex items-center justify-center transition-colors cursor-pointer"
                  ),
                  day_selected:
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground",
                  day_outside: "text-muted-foreground opacity-50",
                  day_disabled: "text-muted-foreground opacity-50",
                  day_range_middle:
                    "aria-selected:bg-accent aria-selected:text-accent-foreground",
                  day_hidden: "invisible",
                }}
              />
            </div>
          </div>
          <div className="p-3 border-t flex justify-end gap-2">
             <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
               Cancel
             </Button>
             <Button size="sm" onClick={() => setIsOpen(false)}>
               Apply
             </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}