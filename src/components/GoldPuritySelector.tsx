
import React from "react";
import { cn } from "@/lib/utils";
import { Diamond, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface GoldPuritySelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function GoldPuritySelector({
  value,
  onValueChange,
}: GoldPuritySelectorProps) {
  const { t } = useLanguage();
  
  // Gold purity data with additional information for each karat
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
    <div className="space-y-3 bg-gradient-to-br from-white to-gold-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg shadow-md border border-gold-100 dark:border-gray-600">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Diamond className="h-5 w-5 text-gold-500" />
          <h3 className="text-base font-medium text-gold-700 dark:text-gold-300">{t("goldPurity")}</h3>
        </div>
        <Badge variant="outline" className="bg-gold-100 text-gold-700 dark:bg-gold-900 dark:text-gold-300 font-semibold border border-gold-200 dark:border-gold-700">
          {value.toUpperCase()}
        </Badge>
      </div>
      
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {purities.map((purity) => (
          <motion.button
            key={purity.value}
            onClick={() => onValueChange(purity.value)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "flex flex-col items-center justify-center p-2 rounded-lg transition-all relative",
              "hover:bg-gold-50 dark:hover:bg-gray-700 hover:shadow-md",
              value === purity.value
                ? "bg-gradient-to-r from-gold-500 to-gold-400 text-white shadow-lg ring-2 ring-gold-300 dark:ring-gold-700"
                : "bg-white dark:bg-gray-800 border border-gold-100 dark:border-gray-700"
            )}
          >
            {value === purity.value && (
              <motion.div 
                className="absolute top-1 right-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <Check className="h-3 w-3" />
              </motion.div>
            )}
            <span className="font-bold text-xs sm:text-sm">{purity.label}</span>
            <span className="text-[10px] sm:text-xs mt-1 opacity-80">{purity.purity}</span>
            <div className={cn("w-6 h-1.5 mt-1 rounded-full", purity.color)} />
          </motion.button>
        ))}
      </div>
      
      <div className="text-xs text-gold-600 dark:text-gold-300 mt-2 text-center">
        {t("selectGoldPurityToViewPrices")}
      </div>
    </div>
  );
}
