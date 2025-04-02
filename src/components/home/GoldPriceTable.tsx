
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { countries } from "@/lib/currency-data";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GoldPrice } from "@/lib/api";

interface GoldPriceTableProps {
  selectedCountry: string;
  setSelectedCountry: (value: string) => void;
  goldPrice: GoldPrice | null;
  sortedCountries: typeof countries;
  sortDirection: "asc" | "desc";
  toggleSortDirection: () => void;
  selectedPurity: string;
  convertPrice: (price: number, unit: string) => string;
}

export function GoldPriceTable({ 
  selectedCountry, 
  setSelectedCountry, 
  goldPrice, 
  sortedCountries, 
  sortDirection, 
  toggleSortDirection,
  selectedPurity,
  convertPrice
}: GoldPriceTableProps) {
  const { t } = useLanguage();
  const country = countries.find((c) => c.code === selectedCountry);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{t("goldPriceByUnit")}</CardTitle>
          <CardDescription>
            {t("compareGoldPrices")}
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleSortDirection}
          className="flex items-center gap-2"
        >
          {sortDirection === "asc" ? (
            <>
              <ArrowUpAZ className="h-4 w-4" />
              {t("sortAscending")}
            </>
          ) : (
            <>
              <ArrowDownAZ className="h-4 w-4" />
              {t("sortDescending")}
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="gram">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="gram">{t("gram")}</TabsTrigger>
            <TabsTrigger value="ounce">{t("ounce")}</TabsTrigger>
            <TabsTrigger value="kilo">{t("kilogram")}</TabsTrigger>
          </TabsList>
          
          {goldPrice ? (
            <>
              <TabsContent value="gram" className="space-y-4">
                <PriceTable 
                  sortedCountries={sortedCountries}
                  goldPrice={goldPrice}
                  country={country}
                  unit="gram"
                  selectedPurity={selectedPurity}
                  setSelectedCountry={setSelectedCountry}
                  convertPrice={convertPrice}
                  t={t}
                />
              </TabsContent>
              
              <TabsContent value="ounce" className="space-y-4">
                <PriceTable 
                  sortedCountries={sortedCountries}
                  goldPrice={goldPrice}
                  country={country}
                  unit="ounce"
                  selectedPurity={selectedPurity}
                  setSelectedCountry={setSelectedCountry}
                  convertPrice={convertPrice}
                  t={t}
                />
              </TabsContent>
              
              <TabsContent value="kilo" className="space-y-4">
                <PriceTable 
                  sortedCountries={sortedCountries}
                  goldPrice={goldPrice}
                  country={country}
                  unit="kilo"
                  selectedPurity={selectedPurity}
                  setSelectedCountry={setSelectedCountry}
                  convertPrice={convertPrice}
                  t={t}
                />
              </TabsContent>
            </>
          ) : (
            <div className="h-40 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}

// Helper component for the price tables
interface PriceTableProps {
  sortedCountries: typeof countries;
  goldPrice: GoldPrice;
  country: any;
  unit: string;
  selectedPurity: string;
  setSelectedCountry: (code: string) => void;
  convertPrice: (price: number, unit: string) => string;
  t: (key: string) => string;
}

function PriceTable({ 
  sortedCountries, 
  goldPrice, 
  country, 
  unit, 
  selectedPurity,
  setSelectedCountry,
  convertPrice,
  t
}: PriceTableProps) {
  const unitDisplay = unit === "gram" 
    ? t("pricePerGram") 
    : unit === "ounce" 
      ? t("pricePerOunce") 
      : t("pricePerKilo");

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("country")}</TableHead>
          <TableHead>{t("currency")}</TableHead>
          <TableHead className="text-right">{unitDisplay} ({selectedPurity})</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedCountries.map((c) => (
          <TableRow key={c.code} className="cursor-pointer hover:bg-muted" onClick={() => setSelectedCountry(c.code)}>
            <TableCell>
              <div className="flex items-center">
                <span className="text-2xl mr-2">{c.flag}</span>
                <span>{c.name}</span>
              </div>
            </TableCell>
            <TableCell>{c.currency}</TableCell>
            <TableCell className="text-right font-medium">
              {c.currency === country?.currency
                ? `${goldPrice.symbol} ${convertPrice(goldPrice.price, unit)}`
                : "-"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
