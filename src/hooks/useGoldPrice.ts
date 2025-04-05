
import { useState, useEffect, useCallback, useRef } from 'react';
import { getGoldPrice, GoldPrice } from "@/lib/api";
import { countries, conversionFactors } from "@/lib/currency-data";
import { toast } from "sonner";

export function useGoldPrice(initialCountry: string = "MA") {
  // استخدم useRef لتخزين البيانات التي لا تسبب إعادة التصيير
  const priceDataRef = useRef<{[key: string]: GoldPrice}>({});
  const lastFetchTimeRef = useRef<{[key: string]: Date}>({});
  const autoRefreshIntervalRef = useRef<number | null>(null);
  const isFetchingRef = useRef<boolean>(false);
  
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [selectedUnit, setSelectedUnit] = useState("gram");
  const [selectedPurity, setSelectedPurity] = useState("24k"); // Default to 24k gold
  const [goldPrice, setGoldPrice] = useState<GoldPrice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGoldImage, setSelectedGoldImage] = useState("/lovable-uploads/ed8a2eb4-1bc0-45e6-b78c-5e2e303c06ef.png");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [sortedCountries, setSortedCountries] = useState<typeof countries>(countries);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(3 * 60 * 1000); // 3 دقائق كقيمة افتراضية
  
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
  
  // تنظيف المؤقتات عند إلغاء تحميل المكون
  useEffect(() => {
    return () => {
      if (autoRefreshIntervalRef.current) {
        clearInterval(autoRefreshIntervalRef.current);
      }
    };
  }, []);
  
  const fetchGoldPrice = useCallback(async (showToast = false) => {
    if (!country || isFetchingRef.current) return;
    
    try {
      // تعيين حالة الجلب لمنع الطلبات المتزامنة
      isFetchingRef.current = true;
      setIsLoading(true);
      
      // استخدم البيانات المخزنة مؤقتًا إذا كانت موجودة وحديثة
      const cacheKey = `${country.currency}-${selectedPurity}`;
      const cachedData = priceDataRef.current[cacheKey];
      const lastFetchTime = lastFetchTimeRef.current[cacheKey];
      
      const now = new Date();
      
      // استخدم البيانات المخزنة مؤقتًا إذا كانت موجودة وحديثة (أقل من دقيقة واحدة)
      const cacheValid = cachedData && lastFetchTime && 
                         (now.getTime() - lastFetchTime.getTime() < 60 * 1000);
      
      if (cacheValid) {
        setGoldPrice(cachedData);
        setIsLoading(false);
        isFetchingRef.current = false;
        return;
      }
      
      // جلب بيانات جديدة من API
      const data = await getGoldPrice(country.currency, selectedPurity);
      
      // تخزين البيانات ووقت الجلب
      priceDataRef.current[cacheKey] = data;
      lastFetchTimeRef.current[cacheKey] = now;
      
      setGoldPrice(data);
      setLastUpdated(now);
      
      if (showToast) {
        toast.success("تم تحديث أسعار الذهب");
      }
      
      if (data.price === 0 || !data.price) {
        toast.warning("تم استخدام بيانات احتياطية - قد يكون هناك مشكلة في جلب البيانات");
      }
    } catch (error) {
      console.error("Error fetching gold price:", error);
      if (showToast) {
        toast.error("فشل في جلب سعر الذهب");
      }
    } finally {
      setIsLoading(false);
      // تأخير إعادة تعيين حالة الجلب لتجنب طلبات متعددة
      setTimeout(() => {
        isFetchingRef.current = false;
      }, 500);
    }
  }, [country, selectedPurity]);
  
  // تعيين فترة التحديث التلقائي
  const updateRefreshInterval = useCallback((minutes: number) => {
    setRefreshInterval(minutes * 60 * 1000);
  }, []);
  
  // وظيفة لتمكين/تعطيل التحديث التلقائي
  const toggleAutoRefresh = useCallback(() => {
    setAutoRefreshEnabled(prev => !prev);
  }, []);
  
  // تأثير لإعداد التحديث التلقائي الدوري
  useEffect(() => {
    // إلغاء المؤقت الحالي إذا كان موجودًا
    if (autoRefreshIntervalRef.current) {
      clearInterval(autoRefreshIntervalRef.current);
      autoRefreshIntervalRef.current = null;
    }
    
    // إذا كان التحديث التلقائي ممكّنًا، قم بإعداد مؤقت جديد
    if (autoRefreshEnabled) {
      // أولاً، جلب الأسعار مباشرة
      fetchGoldPrice();
      
      // ثم إعداد مؤقت للتحديث بالفترة المحددة
      const intervalId = window.setInterval(() => {
        fetchGoldPrice();
      }, refreshInterval);
      
      autoRefreshIntervalRef.current = intervalId;
    }
    
    return () => {
      if (autoRefreshIntervalRef.current) {
        clearInterval(autoRefreshIntervalRef.current);
      }
    };
  }, [autoRefreshEnabled, fetchGoldPrice, refreshInterval, selectedCountry, selectedPurity]);
  
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
  
  // استخدم وظيفة مخزنة مؤقتًا لترتيب البلدان حسب سعر الذهب
  const sortCountriesByGoldPrice = useCallback(() => {
    // تأخير الترتيب لتحسين الأداء
    setTimeout(() => {
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
    }, 0);
  }, [sortDirection, selectedPurity]);
  
  const toggleSortDirection = useCallback(() => {
    setSortDirection(prev => prev === "asc" ? "desc" : "asc");
  }, []);
  
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
    lastUpdated,
    autoRefreshEnabled,
    toggleAutoRefresh,
    refreshInterval,
    updateRefreshInterval
  };
}
