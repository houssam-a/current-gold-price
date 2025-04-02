
import { TrendingDown, TrendingUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface PriceChangeIndicatorProps {
  change: number;
  changePercentage: number;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

export function PriceChangeIndicator({ 
  change, 
  changePercentage, 
  size = "md", 
  showIcon = true,
  className
}: PriceChangeIndicatorProps) {
  const { t } = useLanguage();
  
  const isPositive = change > 0;
  const isNeutral = change === 0;
  
  const textSizeClass = size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base";
  const iconSizeClass = size === "sm" ? "h-3 w-3" : size === "md" ? "h-4 w-4" : "h-5 w-5";
  
  return (
    <div
      className={cn(
        "flex items-center font-medium",
        isPositive ? "text-green-500" : isNeutral ? "text-muted-foreground" : "text-red-500",
        textSizeClass,
        className
      )}
    >
      {showIcon && (
        isPositive ? <TrendingUp className={cn(iconSizeClass, "mr-1")} /> : 
        <TrendingDown className={cn(iconSizeClass, "mr-1")} />
      )}
      <span>
        {isPositive ? "+" : ""}{change.toFixed(2)} ({changePercentage.toFixed(2)}%)
      </span>
    </div>
  );
}
