
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowRight, Clock } from "lucide-react";
import { toast } from "sonner";
import { NewsArticle } from '@/types/news';

// Function to get impact color
export const getImpactColor = (impact: string) => {
  switch (impact) {
    case "high": return "bg-red-500";
    case "medium": return "bg-yellow-500";
    case "low": return "bg-green-500";
    default: return "bg-gray-500";
  }
};

interface NewsCardProps {
  item: NewsArticle;
  index: number;
}

const NewsCard: React.FC<NewsCardProps> = ({ item, index }) => {
  const handleReadMore = (e: React.MouseEvent<HTMLButtonElement>, url: string) => {
    e.preventDefault();
    window.open(url, '_blank');
    toast("Opening news source", {
      description: `Redirecting to ${item.source}...`,
      duration: 3000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden border border-gray-800 hover:border-metrix-blue transition-all duration-300 group">
        <div className="flex flex-col h-full">
          <div className="w-full h-40 relative">
            <AspectRatio ratio={16/9} className="bg-gray-800 h-full">
              <motion.img 
                src={item.imageUrl} 
                alt={item.title} 
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </AspectRatio>
            <div className="absolute top-2 right-2">
              <Badge className={`${getImpactColor(item.impact)} text-white shadow-lg`}>
                {item.impact} impact
              </Badge>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
              <div className="flex justify-between text-xs">
                <span className="font-semibold px-2 py-0.5 bg-metrix-navy/70 rounded-full text-white">
                  {item.category}
                </span>
                <span className="text-white flex items-center gap-1 text-xs">
                  <Clock className="w-3 h-3" />
                  {item.time}
                </span>
              </div>
            </div>
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">{item.title}</h3>
            <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-1">{item.summary}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-metrix-blue font-medium">{item.source}</span>
              <Button 
                variant="link" 
                size="sm" 
                className="text-xs p-0"
                onClick={(e) => handleReadMore(e, item.url)}
              >
                Read more
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
          <a 
            href={item.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="absolute inset-0"
            aria-label={`Read more about ${item.title}`}
          >
            <span className="sr-only">Read more</span>
          </a>
        </div>
      </Card>
    </motion.div>
  );
};

export default NewsCard;
