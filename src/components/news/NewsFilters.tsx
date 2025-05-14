
import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

// News sources
export const newsSources = [
  { label: "All Sources", value: "all" },
  { label: "Bloomberg", value: "Bloomberg" },
  { label: "Reuters", value: "Reuters" },
  { label: "CNBC", value: "CNBC" },
  { label: "FX Street", value: "FXStreet" },
  { label: "Financial Times", value: "Financial Times" },
  { label: "Wall Street Journal", value: "Wall Street Journal" },
  { label: "Investing.com", value: "Investing.com" },
  { label: "FX Blue", value: "FXBlue" },
];

// Asset categories
export const assetCategories = [
  { label: "All Categories", value: "all" },
  { label: "Forex", value: "Forex" },
  { label: "Stocks", value: "Stocks" },
  { label: "Commodities", value: "Commodities" },
  { label: "Crypto", value: "Crypto" },
  { label: "Indices", value: "Indices" },
  { label: "Bonds", value: "Bonds" },
  { label: "Central Banks", value: "Central Banks" },
  { label: "Economic Data", value: "Economic Data" },
];

// Impact levels
export const impactLevels = [
  { label: "All Impacts", value: "all" },
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

interface NewsFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedSource: string;
  setSelectedSource: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedImpact: string;
  setSelectedImpact: (value: string) => void;
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
  return (
    <div className="flex flex-col md:flex-row gap-4 mt-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input 
          type="search"
          placeholder="Search news..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <Select value={selectedSource} onValueChange={setSelectedSource}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Source" />
          </SelectTrigger>
          <SelectContent>
            {newsSources.map(source => (
              <SelectItem key={source.value} value={source.value}>
                {source.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {assetCategories.map(category => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedImpact} onValueChange={setSelectedImpact}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Impact" />
          </SelectTrigger>
          <SelectContent>
            {impactLevels.map(level => (
              <SelectItem key={level.value} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default NewsFilters;
