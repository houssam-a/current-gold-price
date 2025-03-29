
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { countries, timeframes } from "@/lib/currency-data";

interface ChartSettingsProps {
  selectedCountry: string;
  selectedTimeframe: string;
  onCountryChange: (value: string) => void;
  onTimeframeChange: (value: string) => void;
  onDownloadData: () => void;
}

export function ChartSettings({
  selectedCountry,
  selectedTimeframe,
  onCountryChange,
  onTimeframeChange,
  onDownloadData,
}: ChartSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chart Settings</CardTitle>
        <CardDescription>Customize chart view</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">
            Country
          </label>
          <Select value={selectedCountry} onValueChange={onCountryChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  <span className="mr-2">{country.flag}</span>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">
            Timeframe
          </label>
          <Select value={selectedTimeframe} onValueChange={onTimeframeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              {timeframes.map((timeframe) => (
                <SelectItem key={timeframe.value} value={timeframe.value}>
                  {timeframe.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={onDownloadData} className="mt-2" variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download Data
        </Button>
      </CardContent>
    </Card>
  );
}
