
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

interface GoldPuritySelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function GoldPuritySelector({
  value,
  onValueChange,
}: GoldPuritySelectorProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Gold Purity</div>
        <div className="text-xs text-muted-foreground">
          Selected: {value}
        </div>
      </div>
      <ToggleGroup
        type="single"
        className="grid grid-cols-4 md:grid-cols-7 gap-2"
        value={value}
        onValueChange={(value) => {
          if (value) onValueChange(value);
        }}
      >
        <ToggleGroupItem
          value="24k"
          className={cn(
            "flex-1 text-xs",
            value === "24k" && "bg-gold-500 text-white"
          )}
        >
          24K (99.9%)
        </ToggleGroupItem>
        <ToggleGroupItem
          value="22k"
          className={cn(
            "flex-1 text-xs",
            value === "22k" && "bg-gold-500 text-white"
          )}
        >
          22K (91.7%)
        </ToggleGroupItem>
        <ToggleGroupItem
          value="21k"
          className={cn(
            "flex-1 text-xs",
            value === "21k" && "bg-gold-500 text-white"
          )}
        >
          21K (87.5%)
        </ToggleGroupItem>
        <ToggleGroupItem
          value="18k"
          className={cn(
            "flex-1 text-xs",
            value === "18k" && "bg-gold-500 text-white"
          )}
        >
          18K (75%)
        </ToggleGroupItem>
        <ToggleGroupItem
          value="14k"
          className={cn(
            "flex-1 text-xs",
            value === "14k" && "bg-gold-500 text-white"
          )}
        >
          14K (58.3%)
        </ToggleGroupItem>
        <ToggleGroupItem
          value="12k"
          className={cn(
            "flex-1 text-xs",
            value === "12k" && "bg-gold-500 text-white"
          )}
        >
          12K (50%)
        </ToggleGroupItem>
        <ToggleGroupItem
          value="10k"
          className={cn(
            "flex-1 text-xs",
            value === "10k" && "bg-gold-500 text-white"
          )}
        >
          10K (41.7%)
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
