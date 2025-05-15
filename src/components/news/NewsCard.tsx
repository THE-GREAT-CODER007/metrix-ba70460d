
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowRight, Clock } from "lucide-react";
import { toast } from "sonner";
import { NewsArticle } from '@/types/news';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Function to get impact color
export const getImpactColor = (impact: string) => {
  switch (impact) {
    case "high": return "bg-red-500";
    case "medium": return "bg-yellow-500";
    case "low": return "bg-green-500";
    default: return "bg-gray-500";
  }
};

// Function to get source avatar
export const getSourceAvatar = (source: string) => {
  switch (source.toLowerCase()) {
    case "bloomberg": return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Bloomberg_logo.svg/1280px-Bloomberg_logo.svg.png";
    case "financial times": return "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Financial_Times_corporate_logo.svg/1280px-Financial_Times_corporate_logo.svg.png";
    case "reuters": return "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Reuters_logo.svg/1280px-Reuters_logo.svg.png";
    case "cnbc": return "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/CNBC_logo.svg/1280px-CNBC_logo.svg.png";
    case "wall street journal": return "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/The_Wall_Street_Journal_Logo.svg/1280px-The_Wall_Street_Journal_Logo.svg.png";
    case "bbc": return "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BBC_News_logo.svg/1280px-BBC_News_logo.svg.png";
    case "nikkei": return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Nikkei_logo.svg/1280px-Nikkei_logo.svg.png";
    case "investing.com": return "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Investing.com_logo.svg/1280px-Investing.com_logo.svg.png";
    case "marketwatch": return "https://mw3.wsj.net/mw5/content/logos/mw_logo_social.png";
    default: return "";
  }
};

interface NewsCardProps {
  item: NewsArticle;
  index: number;
}

const NewsCard: React.FC<NewsCardProps> = ({ item, index }) => {
  const handleReadMore = (e: React.MouseEvent<HTMLButtonElement>, url: string) => {
    e.preventDefault();
    e.stopPropagation(); // Stop event propagation to prevent the card click
    window.open(url, '_blank');
    toast("Opening news source", {
      description: `Redirecting to ${item.source}...`,
      duration: 3000,
    });
  };

  // Prevent default behavior for the anchor tag
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden border border-gray-800 hover:border-metrix-blue transition-all duration-300 group h-full">
        <div className="flex flex-col h-full">
          <div className="w-full h-40 relative">
            <AspectRatio ratio={16/9} className="bg-gray-800 h-full">
              <motion.img 
                src={item.imageUrl || "https://via.placeholder.com/640x360?text=No+Image"} 
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
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={getSourceAvatar(item.source)} alt={item.source} />
                  <AvatarFallback>{item.source.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-metrix-blue font-medium">{item.source}</span>
              </div>
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
          {/* Use onClick to prevent default behavior instead of href */}
          <div 
            onClick={handleCardClick}
            className="absolute inset-0 cursor-pointer"
            aria-label={`Read more about ${item.title}`}
          />
        </div>
      </Card>
    </motion.div>
  );
};

export default NewsCard;
