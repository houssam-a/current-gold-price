
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";

const goldPurities = [
  { value: "24k", label: "24K (99.9%)", description: "Pure Gold", color: "bg-amber-400" },
  { value: "22k", label: "22K (91.7%)", description: "Jewelry Standard", color: "bg-amber-300" },
  { value: "18k", label: "18K (75.0%)", description: "Common Jewelry", color: "bg-yellow-300" },
  { value: "14k", label: "14K (58.3%)", description: "Affordable Jewelry", color: "bg-yellow-200" },
  { value: "10k", label: "10K (41.7%)", description: "Budget Jewelry", color: "bg-yellow-100" },
];

interface GoldPuritySelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function GoldPuritySelector({ value, onValueChange }: GoldPuritySelectorProps) {
  const { t } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("goldPurity")}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={value} onValueChange={onValueChange} className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {goldPurities.map((purity) => (
            <div key={purity.value} className="flex items-center space-x-2">
              <RadioGroupItem value={purity.value} id={`purity-${purity.value}`} />
              <div className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded-full ${purity.color} border border-amber-600`}></div>
                <Label htmlFor={`purity-${purity.value}`} className="cursor-pointer">
                  <div>{purity.label}</div>
                  <div className="text-xs text-muted-foreground">{purity.description}</div>
                </Label>
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
