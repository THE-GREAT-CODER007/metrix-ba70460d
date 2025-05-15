
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { FilterCountry } from '@/types/news';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { cn } from '@/lib/utils';

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

// Define the schema for our form
const CalendarFiltersSchema = z.object({
  date: z.date().optional(),
  country: z.string(),
});

type CalendarFiltersFormValues = z.infer<typeof CalendarFiltersSchema>;

interface EconomicCalendarFiltersProps {
  calendarDate: Date | undefined;
  setCalendarDate: (date: Date | undefined) => void;
  selectedCountry: FilterCountry;
  setSelectedCountry: (country: FilterCountry) => void;
}

const EconomicCalendarFilters: React.FC<EconomicCalendarFiltersProps> = ({
  calendarDate,
  setCalendarDate,
  selectedCountry,
  setSelectedCountry
}) => {
  // Initialize form with react-hook-form and zod
  const form = useForm<CalendarFiltersFormValues>({
    resolver: zodResolver(CalendarFiltersSchema),
    defaultValues: {
      date: calendarDate,
      country: selectedCountry,
    },
  });

  // Update filters when form values change
  const onSubmit = (data: CalendarFiltersFormValues) => {
    setCalendarDate(data.date);
    setSelectedCountry(data.country as FilterCountry);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full md:w-auto justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
              </FormItem>
            )}
          />
          
          <Button 
            variant="outline" 
            onClick={() => form.setValue('date', undefined)}
            className="w-full md:w-auto"
            type="button"
          >
            Show All Dates
          </Button>
          
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex-1">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
              </FormItem>
            )}
          />

          <Button 
            type="submit"
            className="bg-metrix-blue hover:bg-blue-700"
          >
            Apply Filters
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EconomicCalendarFilters;
