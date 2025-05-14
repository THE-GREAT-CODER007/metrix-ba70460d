
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

// Countries for economic calendar
export const countries = [
  { label: "All Countries", value: "all" },
  { label: "United States", value: "United States" },
  { label: "Eurozone", value: "Eurozone" },
  { label: "United Kingdom", value: "United Kingdom" },
  { label: "Japan", value: "Japan" },
  { label: "Australia", value: "Australia" },
  { label: "Canada", value: "Canada" },
  { label: "China", value: "China" },
  { label: "Egypt", value: "Egypt" },
];

interface EconomicCalendarFiltersProps {
  calendarDate: Date | undefined;
  setCalendarDate: (date: Date | undefined) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
}

const EconomicCalendarFilters: React.FC<EconomicCalendarFiltersProps> = ({
  calendarDate,
  setCalendarDate,
  selectedCountry,
  setSelectedCountry
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mt-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full md:w-auto justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {calendarDate ? format(calendarDate, "PPP") : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={calendarDate}
            onSelect={setCalendarDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      
      <Button 
        variant="outline" 
        onClick={() => setCalendarDate(undefined)}
        className="w-full md:w-auto"
      >
        Show All Dates
      </Button>
      
      <Select value={selectedCountry} onValueChange={setSelectedCountry}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Select Country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map(country => (
            <SelectItem key={country.value} value={country.value}>
              {country.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default EconomicCalendarFilters;
