
import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface PriceChangeIndicatorProps {
  change: number;
  changePercentage: number;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  showDaily?: boolean;
  className?: string;
  hidden?: boolean;
  yesterdayPrice?: number;
  currentPrice?: number;
}

export function PriceChangeIndicator({ 
  change, 
  changePercentage, 
  size = "md", 
  showIcon = true,
  showDaily = false,
  className,
  hidden = false,
  yesterdayPrice,
  currentPrice
}: PriceChangeIndicatorProps) {
  // If hidden, don't render anything
  if (hidden) return null;
  
  const { t } = useLanguage();
  
  const isPositive = change > 0;
  const isNeutral = change === 0;
  
  const textSizeClass = size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base";
  const iconSizeClass = size === "sm" ? "h-3 w-3" : size === "md" ? "h-4 w-4" : "h-5 w-5";
  
  // Ensure change is always displayed with proper sign and formatting
  const formattedChange = isPositive ? `+${change.toFixed(2)}` : change.toFixed(2);
  const formattedPercentage = isPositive ? `+${changePercentage.toFixed(2)}%` : `${changePercentage.toFixed(2)}%`;
  
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
        isNeutral ? <Minus className={cn(iconSizeClass, "mr-1")} /> :
        <TrendingDown className={cn(iconSizeClass, "mr-1")} />
      )}
      <span>
        {formattedChange} ({formattedPercentage})
      </span>
      {showDaily && (
        <span className="ml-1 text-muted-foreground text-xs">
          {t("dailyChange")}
        </span>
      )}
      {yesterdayPrice && currentPrice && (
        <span className="ml-2 text-xs text-muted-foreground">
          {t("yesterday")}: {yesterdayPrice.toFixed(2)} → {currentPrice.toFixed(2)}
        </span>
      )}
    </div>
  );
}
