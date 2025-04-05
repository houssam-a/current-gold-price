
import { useState, useEffect, useCallback, useRef } from 'react';
import { getGoldPrice, GoldPrice } from "@/lib/api";
import { countries, conversionFactors } from "@/lib/currency-data";
import { toast } from "sonner";

export function useGoldPrice(initialCountry: string = "MA") {
  // استخدم useRef لتخزين البيانات التي لا تسبب إعادة التصيير
  const priceDataRef = useRef<{[key: string]: GoldPrice}>({});
  
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [selectedUnit, setSelectedUnit] = useState("gram");
  const [selectedPurity, setSelectedPurity] = useState("24k"); // Default to 24k gold
  const [goldPrice, setGoldPrice] = useState<GoldPrice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGoldImage, setSelectedGoldImage] = useState("/lovable-uploads/ed8a2eb4-1bc0-45e6-b78c-5e2e303c06ef.png");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [sortedCountries, setSortedCountries] = useState<typeof countries>(countries);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  
  const country = countries.find((c) => c.code === selectedCountry);
  
  // الحصول على مضاعف النقاء بناءً على النقاء المحدد
  const getPurityMultiplier = useCallback(() => {
    switch (selectedPurity) {
      case "24k": return 1;
      case "22k": return 0.917;
      case "21k": return 0.875;
      case "18k": return 0.75;
      case "14k": return 0.583;
      case "12k": return 0.5;
      case "10k": return 0.417;
      default: return 1;
    }
  }, [selectedPurity]);
  
  const fetchGoldPrice = useCallback(async () => {
    if (!country) return;
    
    setIsLoading(true);
    try {
      // استخدم البيانات المخزنة مؤقتًا إذا كانت موجودة وحديثة
      const cacheKey = `${country.currency}-${selectedPurity}`;
      const cachedData = priceDataRef.current[cacheKey];
      
      // استخدم البيانات المخزنة مؤقتًا إذا كانت موجودة وحديثة (أقل من ساعة)
      const now = new Date();
      const cacheValid = cachedData && lastUpdated && 
                         (now.getTime() - lastUpdated.getTime() < 60 * 60 * 1000);
      
      if (cacheValid) {
        setGoldPrice(cachedData);
        setIsLoading(false);
        return;
      }
      
      // جلب بيانات جديدة من API
      const data = await getGoldPrice(country.currency, selectedPurity);
      
      // تخزين البيانات مؤقتًا
      priceDataRef.current[cacheKey] = data;
      
      setGoldPrice(data);
      setLastUpdated(new Date());
      
      if (data.price === 0 || !data.price) {
        toast.warning("Using fallback data - API limit reached or unavailable");
      }
    } catch (error) {
      console.error("Error fetching gold price:", error);
      toast.error("Failed to fetch gold price");
    } finally {
      setIsLoading(false);
    }
  }, [country, selectedPurity, lastUpdated]);
  
  // وظيفة لتحديد ما إذا كنا بحاجة إلى تحديث الأسعار استنادًا إلى تغيير اليوم
  const shouldRefreshPrices = useCallback(() => {
    if (!lastUpdated) return true;
    
    const now = new Date();
    const lastDate = lastUpdated.getDate();
    const currentDate = now.getDate();
    
    // تحديث إذا تغير اليوم
    return lastDate !== currentDate;
  }, [lastUpdated]);
  
  // استخدم وظيفة مخزنة مؤقتًا لترتيب البلدان حسب سعر الذهب
  const sortCountriesByGoldPrice = useCallback(() => {
    // لا نحتاج إلى أن نكون مزامنين هنا، يمكننا استخدام البيانات المتوفرة فقط
    const sortable = countries.map(c => {
      // استخدم الأسعار المخزنة مؤقتًا إذا كانت موجودة
      const cacheKey = `${c.currency}-${selectedPurity}`;
      const price = priceDataRef.current[cacheKey]?.price || 0;
      return { ...c, price };
    });
    
    const sorted = sortable.sort((a, b) => {
      return sortDirection === "asc" ? a.price - b.price : b.price - a.price;
    });
    
    setSortedCountries(sorted);
  }, [sortDirection, selectedPurity]);
  
  const toggleSortDirection = useCallback(() => {
    setSortDirection(prev => prev === "asc" ? "desc" : "asc");
  }, []);
  
  // تأثير لجلب الأسعار عندما تتغير البلد أو عند تغيير اليوم أو عند تغيير النقاء
  useEffect(() => {
    fetchGoldPrice();
    
    // إعداد مؤقت للتحقق مما إذا كنا بحاجة إلى تحديث الأسعار (كل ساعة)
    const interval = setInterval(() => {
      if (shouldRefreshPrices()) {
        fetchGoldPrice();
      }
    }, 60 * 60 * 1000); // فحص كل ساعة
    
    return () => clearInterval(interval);
  }, [fetchGoldPrice, shouldRefreshPrices, selectedCountry, selectedPurity]);
  
  // تأثير لتحديث صورة الذهب
  useEffect(() => {
    // استخدام الصور الجديدة التي تم تحميلها
    const goldImages = [
      "/lovable-uploads/ed8a2eb4-1bc0-45e6-b78c-5e2e303c06ef.png",
      "/lovable-uploads/6fb8c3ed-1670-4df9-8394-4f7ac33d7206.png",
      "/lovable-uploads/7a7e2918-3118-4784-988d-4094552314c2.png"
    ];
    
    // استخدم نفس الصورة للبلد نفسه دائمًا (أكثر استقرارًا)
    const index = selectedCountry.charCodeAt(0) % goldImages.length;
    setSelectedGoldImage(goldImages[index]);
  }, [selectedCountry]);
  
  // تأثير لترتيب البلدان حسب السعر
  useEffect(() => {
    if (goldPrice) {
      sortCountriesByGoldPrice();
    }
  }, [goldPrice, sortCountriesByGoldPrice, sortDirection]);
  
  const convertPrice = useCallback((price: number, unit: string) => {
    const factor = conversionFactors[unit as keyof typeof conversionFactors] || 1;
    const purityFactor = getPurityMultiplier();
    return (price * factor * purityFactor).toFixed(2);
  }, [getPurityMultiplier]);

  return {
    selectedCountry,
    setSelectedCountry,
    selectedUnit,
    setSelectedUnit,
    selectedPurity,
    setSelectedPurity,
    goldPrice,
    isLoading,
    selectedGoldImage,
    sortDirection,
    sortedCountries, 
    fetchGoldPrice,
    toggleSortDirection,
    convertPrice,
    getPurityMultiplier,
    lastUpdated
  };
}
