
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsData {
  avg: number;
  min: number;
  max: number;
  change: number;
}

interface PriceStatisticsProps {
  stats: StatsData;
  currency: string;
}

export function PriceStatistics({ stats, currency }: PriceStatisticsProps) {
  return (
    <Card className="gold-card">
      <CardHeader>
        <CardTitle>Price Statistics</CardTitle>
        <CardDescription>
          Key metrics for gold price in {currency}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-sm text-muted-foreground mb-1">Average</div>
            <div className="text-xl font-bold">{stats.avg.toFixed(2)}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-sm text-muted-foreground mb-1">Minimum</div>
            <div className="text-xl font-bold">{stats.min.toFixed(2)}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-sm text-muted-foreground mb-1">Maximum</div>
            <div className="text-xl font-bold">{stats.max.toFixed(2)}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-sm text-muted-foreground mb-1">Change</div>
            <div className={`text-xl font-bold ${stats.change > 0 ? "text-green-500" : stats.change < 0 ? "text-red-500" : ""}`}>
              {stats.change > 0 ? "+" : ""}
              {stats.change.toFixed(2)}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
