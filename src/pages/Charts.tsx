
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { timeframes } from "@/lib/currency-data";
import { ChartSettings } from "@/components/charts/ChartSettings";
import { PriceStatistics } from "@/components/charts/PriceStatistics";
import { GoldCharts } from "@/components/charts/GoldCharts";
import { useChartData } from "@/hooks/useChartData";

export default function Charts() {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [selectedTimeframe, setSelectedTimeframe] = useState("1m");
  
  const { chartData, isLoading, country, stats, handleDownloadData } = useChartData(selectedCountry, selectedTimeframe);

  return (
    <div className="container py-8 max-w-screen-lg">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Gold Price Charts</h1>
        <p className="text-muted-foreground mt-2">
          Visualize gold price trends over time
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="md:col-span-1">
          <ChartSettings
            selectedCountry={selectedCountry}
            selectedTimeframe={selectedTimeframe}
            onCountryChange={setSelectedCountry}
            onTimeframeChange={setSelectedTimeframe}
            onDownloadData={handleDownloadData}
          />
        </div>

        <div className="md:col-span-3">
          <PriceStatistics
            stats={stats}
            currency={country?.currency || ''}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gold Price Chart</CardTitle>
          <CardDescription>
            {country?.name} ({country?.currency}) - {timeframes.find(t => t.value === selectedTimeframe)?.label}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GoldCharts
            chartData={chartData}
            isLoading={isLoading}
            currencyCode={country?.currency || ''}
          />
        </CardContent>
      </Card>
    </div>
  );
}
