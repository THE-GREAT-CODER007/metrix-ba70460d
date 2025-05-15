
export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  time: string;
  summary: string;
  category: string;
  impact: "high" | "medium" | "low";
  url: string;
  imageUrl: string;
}

export interface EconomicEvent {
  id: string;
  title: string;
  date: string;
  country: string;
  impact: "high" | "medium" | "low";
  previous: string;
  forecast: string;
  actual: string;
}

export type FilterSource = "all" | string;
export type FilterCategory = "all" | string;
export type FilterImpact = "all" | "high" | "medium" | "low";
export type FilterCountry = "all" | string;
