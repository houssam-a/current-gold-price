
import React, { useState, useCallback, memo } from 'react';
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

export interface GoldPriceTableProps {
  selectedCountry: string;
  setSelectedCountry: (value: string) => void;
  goldPrice: GoldPrice | null;
  sortedCountries: typeof countries;
  sortDirection: "asc" | "desc";
  toggleSortDirection: () => void;
  selectedPurity: string;
  convertPrice: (price: number, unit: string) => string;
}

// تحويل الجدول إلى مكون مخزن مؤقتًا للحد من عمليات إعادة التصيير
export const GoldPriceTable = memo(function GoldPriceTable({ 
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
  const [activeTab, setActiveTab] = useState("gram");

  // استخدام useCallback لمعالجات الأحداث المختلفة
  const handleCountryClick = useCallback((countryCode: string) => {
    // استخدم setTimeout لتأجيل التحديث وتحسين الأداء
    setTimeout(() => {
      setSelectedCountry(countryCode);
    }, 0);
  }, [setSelectedCountry]);

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  // تحسين أداء الصفوف عن طريق نقلها إلى مكون منفصل
  const CountryRow = memo(({ 
    countryItem, 
    isSelected, 
    onSelect 
  }: { 
    countryItem: typeof countries[0], 
    isSelected: boolean,
    onSelect: () => void
  }) => (
    <TableRow 
      className={`cursor-pointer hover:bg-muted ${isSelected ? "bg-gold-50 dark:bg-gold-900 font-semibold" : ""}`} 
      onClick={onSelect}
    >
      <TableCell>
        <div className="flex items-center">
          <span className="text-2xl mr-2">{countryItem.flag}</span>
          <span>{countryItem.name}</span>
        </div>
      </TableCell>
      <TableCell>{countryItem.currency}</TableCell>
      <TableCell className="text-right font-medium">
        {countryItem.currency === country?.currency && goldPrice
          ? `${goldPrice.symbol} ${convertPrice(goldPrice.price, activeTab)}`
          : "-"}
      </TableCell>
    </TableRow>
  ));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{t("goldPriceByUnit")}</CardTitle>
          <CardDescription>
            {t("compareGoldPrices")} - {t("highlightedCountry")}: {country?.name}
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
        <Tabs defaultValue="gram" value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="gram">{t("gram")}</TabsTrigger>
            <TabsTrigger value="ounce">{t("ounce")}</TabsTrigger>
            <TabsTrigger value="kilo">{t("kilogram")}</TabsTrigger>
          </TabsList>
          
          {goldPrice ? (
            <TabsContent value={activeTab} className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("country")}</TableHead>
                    <TableHead>{t("currency")}</TableHead>
                    <TableHead className="text-right">
                      {t("priceOf")} 1 {t(activeTab)} ({selectedPurity})
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedCountries.map((c) => (
                    <CountryRow
                      key={c.code}
                      countryItem={c}
                      isSelected={c.code === selectedCountry}
                      onSelect={() => handleCountryClick(c.code)}
                    />
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          ) : (
            <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
});

// التصدير الافتراضي للمكون
export default GoldPriceTable;
