
import { useState, useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { Product, products } from "@/lib/product-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpDown, Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function ProductList() {
  const { t } = useLanguage();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Sort and filter products
  const filteredProducts = useMemo(() => {
    // First filter by search query
    let filtered = products.filter(product => {
      const searchLower = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.platform.toLowerCase().includes(searchLower)
      );
    });
    
    // Then filter by category if not "all"
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Then sort by price
    return filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }, [products, sortOrder, searchQuery, selectedCategory]);
  
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`${t("search")}...`}
            className="pl-8 border-gold-200 dark:border-gold-800 focus-visible:ring-gold-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          onClick={toggleSortOrder}
          className="flex items-center gap-2 border-gold-200 dark:border-gold-800"
        >
          <ArrowUpDown className="h-4 w-4" />
          {sortOrder === "asc" ? t("priceLowToHigh") : t("priceHighToLow")}
        </Button>
      </div>
      
      <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="mb-6 bg-muted/50">
          <TabsTrigger value="all">{t("all")}</TabsTrigger>
          <TabsTrigger value="coin">{t("coins")}</TabsTrigger>
          <TabsTrigger value="bar">{t("bars")}</TabsTrigger>
          <TabsTrigger value="jewelry">{t("jewelry")}</TabsTrigger>
          <TabsTrigger value="other">{t("other")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value={selectedCategory} className="mt-0">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">{t("noProductsFound")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
