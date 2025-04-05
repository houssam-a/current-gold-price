
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { Diamond } from "lucide-react";

interface GoldPuritySelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function GoldPuritySelector({
  value,
  onValueChange,
}: GoldPuritySelectorProps) {
  // بيانات النقاء مع معلومات إضافية لكل عيار
  const purities = [
    { value: "24k", label: "24K", purity: "99.9%", color: "bg-amber-500" },
    { value: "22k", label: "22K", purity: "91.7%", color: "bg-amber-400" },
    { value: "21k", label: "21K", purity: "87.5%", color: "bg-amber-300" },
    { value: "18k", label: "18K", purity: "75.0%", color: "bg-amber-200" },
    { value: "14k", label: "14K", purity: "58.3%", color: "bg-amber-100" },
    { value: "12k", label: "12K", purity: "50.0%", color: "bg-amber-50" },
    { value: "10k", label: "10K", purity: "41.7%", color: "bg-gray-100" },
  ];

  return (
    <div className="space-y-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Diamond className="h-5 w-5 text-gold-500" />
          <h3 className="text-base font-medium">عيار الذهب</h3>
        </div>
        <div className="text-sm px-2 py-1 bg-gold-50 text-gold-700 dark:bg-gold-900 dark:text-gold-300 rounded-full font-semibold">
          {value.toUpperCase()}
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {purities.map((purity) => (
          <button
            key={purity.value}
            onClick={() => onValueChange(purity.value)}
            className={cn(
              "flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all",
              "hover:bg-gold-50 dark:hover:bg-gray-700",
              value === purity.value
                ? "bg-gold-500 text-white ring-2 ring-gold-300 dark:ring-gold-700"
                : "bg-white dark:bg-gray-800"
            )}
          >
            <span className="font-bold text-xs sm:text-sm">{purity.label}</span>
            <span className="text-[10px] sm:text-xs mt-1 opacity-80">{purity.purity}</span>
            <div className={cn("w-4 h-1 mt-1 rounded-full", purity.color)} />
          </button>
        ))}
      </div>
      
      <div className="text-xs text-muted-foreground mt-2 text-center">
        اختر عيار الذهب لمشاهدة الأسعار المناسبة
      </div>
    </div>
  );
}
