
import React from 'react';
import { Badge } from "@/components/ui/badge";

// Economic event type
export type EconomicEvent = {
  id: string;
  title: string;
  date: string;
  country: string;
  impact: "low" | "medium" | "high";
  previous: string;
  forecast: string;
  actual: string;
};

// Function to get impact color
export const getImpactColor = (impact: string) => {
  switch (impact) {
    case "high": return "bg-red-500";
    case "medium": return "bg-yellow-500";
    case "low": return "bg-green-500";
    default: return "bg-gray-500";
  }
};

// Function to compare actual vs forecast
export const compareValues = (actual: string, forecast: string) => {
  const actualNum = parseFloat(actual.replace('%', ''));
  const forecastNum = parseFloat(forecast.replace('%', ''));
  
  if (isNaN(actualNum) || isNaN(forecastNum)) return "";
  
  return actualNum > forecastNum ? "text-green-500" :
         actualNum < forecastNum ? "text-red-500" : "";
};

interface EconomicEventRowProps {
  event: EconomicEvent;
}

const EconomicEventRow: React.FC<EconomicEventRowProps> = ({ event }) => {
  return (
    <tr key={event.id} className="border-b border-gray-800 hover:bg-gray-900/40 transition-colors">
      <td className="p-3">{event.date}</td>
      <td className="p-3">{event.country}</td>
      <td className="p-3 font-medium">{event.title}</td>
      <td className="p-3 text-center">
        <Badge className={getImpactColor(event.impact)}>
          {event.impact}
        </Badge>
      </td>
      <td className="p-3 text-right">{event.previous}</td>
      <td className="p-3 text-right">{event.forecast}</td>
      <td className={`p-3 text-right font-medium ${compareValues(event.actual, event.forecast)}`}>
        {event.actual}
      </td>
    </tr>
  );
};

export default EconomicEventRow;
