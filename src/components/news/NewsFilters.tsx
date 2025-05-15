
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { FilterSource, FilterCategory, FilterImpact } from '@/types/news';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";

// Sources for filtering
const sources = [
  { label: "All Sources", value: "all" },
  { label: "Reuters", value: "Reuters" },
  { label: "Bloomberg", value: "Bloomberg" },
  { label: "Financial Times", value: "Financial Times" },
  { label: "CNBC", value: "CNBC" },
  { label: "Wall Street Journal", value: "Wall Street Journal" },
  { label: "MarketWatch", value: "MarketWatch" },
];

// Categories for filtering
const categories = [
  { label: "All Categories", value: "all" },
  { label: "Stocks", value: "Stocks" },
  { label: "Forex", value: "Forex" },
  { label: "Crypto", value: "Crypto" },
  { label: "Commodities", value: "Commodities" },
  { label: "Economy", value: "Economy" },
  { label: "Politics", value: "Politics" },
  { label: "Technology", value: "Technology" },
];

// Impact levels for filtering
const impacts = [
  { label: "All Impacts", value: "all" },
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

// Define the schema for our form
const FiltersSchema = z.object({
  search: z.string().optional(),
  source: z.string(),
  category: z.string(),
  impact: z.string(),
});

type FiltersFormValues = z.infer<typeof FiltersSchema>;

interface NewsFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSource: FilterSource;
  setSelectedSource: (source: FilterSource) => void;
  selectedCategory: FilterCategory;
  setSelectedCategory: (category: FilterCategory) => void;
  selectedImpact: FilterImpact;
  setSelectedImpact: (impact: FilterImpact) => void;
}

const NewsFilters: React.FC<NewsFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedSource,
  setSelectedSource,
  selectedCategory,
  setSelectedCategory,
  selectedImpact,
  setSelectedImpact
}) => {
  // Initialize form with react-hook-form and zod
  const form = useForm<FiltersFormValues>({
    resolver: zodResolver(FiltersSchema),
    defaultValues: {
      search: searchQuery,
      source: selectedSource,
      category: selectedCategory,
      impact: selectedImpact,
    },
  });
  
  // Update filters when form values change
  const onSubmit = (data: FiltersFormValues) => {
    if (data.search !== undefined) setSearchQuery(data.search);
    setSelectedSource(data.source as FilterSource);
    setSelectedCategory(data.category as FilterCategory);
    setSelectedImpact(data.impact as FilterImpact);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/3">
                <FormControl>
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      placeholder="Search news..."
                      className="pl-8"
                      {...field}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex gap-2 flex-1 flex-wrap md:flex-nowrap">
            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/3">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Source" />
                    </SelectTrigger>
                    <SelectContent>
                      {sources.map(source => (
                        <SelectItem key={source.value} value={source.value}>
                          {source.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/3">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="impact"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/3">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Impact" />
                    </SelectTrigger>
                    <SelectContent>
                      {impacts.map(impact => (
                        <SelectItem key={impact.value} value={impact.value}>
                          {impact.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="text-right">
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

export default NewsFilters;
