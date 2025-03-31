import React, { createContext, useContext, useState, ReactNode } from "react";

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  availableLanguages: { code: string; name: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations: Record<string, Record<string, string>> = {
  en: {
    goldPriceTracker: "Gold Price Tracker",
    trackRealTime: "Track real-time gold prices in different currencies",
    currentGoldPrice: "Current Gold Price",
    country: "Country",
    unit: "Unit",
    selectCountry: "Select Country",
    selectUnit: "Select Unit",
    priceOf: "Price of",
    lastUpdated: "Last Updated",
    priceTrend: "Price Trend",
    days: "Days",
    historicalGoldPrice: "Historical gold price in",
    goldPriceByUnit: "Gold Price by Unit",
    compareGoldPrices: "Compare gold prices in different units",
    gram: "Gram",
    ounce: "Ounce",
    kilogram: "Kilogram",
    sortAscending: "Sort Ascending",
    sortDescending: "Sort Descending",
    search: "Search",
    currencyConverter: "Currency Converter",
    charts: "Charts",
    calculator: "Calculator",
    notFound: "404 Not Found",
    pageNotFound: "Oops! Page not found.",
    goHome: "Go Home",
    convertCurrency: "Convert Currency",
    enterAmountDesc: "Enter the amount to convert between currencies",
    amount: "Amount",
    from: "From",
    to: "To",
    selectCurrency: "Select Currency",
    swapCurrencies: "Swap Currencies",
    enterAmount: "Enter Amount",
    convert: "Convert",
    converting: "Converting",
    result: "Result",
    disclaimer: "Disclaimer",
    ratesRealTime: "Exchange rates are near real-time and may slightly differ.",
    tryAgain: "Try Again",
    
    // Product related translations
    buyGoldProducts: "Gold Products",
    browseGoldProducts: "Browse and purchase gold products from various retailers",
    all: "All Products",
    coins: "Coins",
    bars: "Bars",
    jewelry: "Jewelry",
    other: "Other",
    priceLowToHigh: "Price: Low to High",
    priceHighToLow: "Price: High to Low",
    noProductsFound: "No products found",
    buyNow: "Buy Now",
    weight: "Weight",
    purity: "Purity",
    platform: "Platform"
  },
  fr: {
    goldPriceTracker: "Suivi du Prix de l'Or",
    trackRealTime: "Suivez les prix de l'or en temps réel dans différentes devises",
    currentGoldPrice: "Prix Actuel de l'Or",
    country: "Pays",
    unit: "Unité",
    selectCountry: "Sélectionner un Pays",
    selectUnit: "Sélectionner une Unité",
    priceOf: "Prix de",
    lastUpdated: "Dernière Mise à Jour",
    priceTrend: "Tendance des Prix",
    days: "Jours",
    historicalGoldPrice: "Prix historique de l'or en",
    goldPriceByUnit: "Prix de l'Or par Unité",
    compareGoldPrices: "Comparer les prix de l'or dans différentes unités",
    gram: "Gramme",
    ounce: "Once",
    kilogram: "Kilogramme",
    sortAscending: "Tri Ascendant",
    sortDescending: "Tri Descendant",
    search: "Rechercher",
    currencyConverter: "Convertisseur de Devises",
    charts: "Graphiques",
    calculator: "Calculatrice",
    notFound: "404 Non Trouvé",
    pageNotFound: "Oops! Page non trouvée.",
    goHome: "Retour à l'Accueil",
    convertCurrency: "Convertir une Devise",
    enterAmountDesc: "Entrez le montant à convertir entre les devises",
    amount: "Montant",
    from: "De",
    to: "À",
    selectCurrency: "Sélectionner une Devise",
    swapCurrencies: "Inverser les Devises",
    enterAmount: "Entrer le Montant",
    convert: "Convertir",
    converting: "Conversion",
    result: "Résultat",
    disclaimer: "Avertissement",
    ratesRealTime: "Les taux de change sont presque en temps réel et peuvent légèrement différer.",
    tryAgain: "Réessayer",
    
    // Product related translations
    buyGoldProducts: "Produits en Or",
    browseGoldProducts: "Parcourir et acheter des produits en or de différents détaillants",
    all: "Tous les Produits",
    coins: "Pièces",
    bars: "Lingots",
    jewelry: "Bijoux",
    other: "Autres",
    priceLowToHigh: "Prix: Croissant",
    priceHighToLow: "Prix: Décroissant",
    noProductsFound: "Aucun produit trouvé",
    buyNow: "Acheter",
    weight: "Poids",
    purity: "Pureté",
    platform: "Plateforme"
  },
  es: {
    goldPriceTracker: "Seguidor del Precio del Oro",
    trackRealTime: "Siga los precios del oro en tiempo real en diferentes monedas",
    currentGoldPrice: "Precio Actual del Oro",
    country: "País",
    unit: "Unidad",
    selectCountry: "Seleccionar País",
    selectUnit: "Seleccionar Unidad",
    priceOf: "Precio de",
    lastUpdated: "Última Actualización",
    priceTrend: "Tendencia del Precio",
    days: "Días",
    historicalGoldPrice: "Precio histórico del oro en",
    goldPriceByUnit: "Precio del Oro por Unidad",
    compareGoldPrices: "Comparar precios del oro en diferentes unidades",
    gram: "Gramo",
    ounce: "Onza",
    kilogram: "Kilogramo",
    sortAscending: "Ordenar Ascendente",
    sortDescending: "Ordenar Descendente",
    search: "Buscar",
    currencyConverter: "Convertidor de Divisas",
    charts: "Gráficos",
    calculator: "Calculadora",
    notFound: "404 No Encontrado",
    pageNotFound: "¡Oops! Página no encontrada.",
    goHome: "Ir a la Página Principal",
    convertCurrency: "Convertir Divisa",
    enterAmountDesc: "Ingrese la cantidad para convertir entre divisas",
    amount: "Cantidad",
    from: "De",
    to: "A",
    selectCurrency: "Seleccionar Divisa",
    swapCurrencies: "Intercambiar Divisas",
    enterAmount: "Ingresar Cantidad",
    convert: "Convertir",
    converting: "Convirtiendo",
    result: "Resultado",
    disclaimer: "Descargo de Responsabilidad",
    ratesRealTime: "Los tipos de cambio son casi en tiempo real y pueden diferir ligeramente.",
    tryAgain: "Intentar de Nuevo",
    
    // Product related translations
    buyGoldProducts: "Productos de Oro",
    browseGoldProducts: "Explore y compre productos de oro de varios minoristas",
    all: "Todos los Productos",
    coins: "Monedas",
    bars: "Lingotes",
    jewelry: "Joyería",
    other: "Otros",
    priceLowToHigh: "Precio: De Menor a Mayor",
    priceHighToLow: "Precio: De Mayor a Menor",
    noProductsFound: "No se encontraron productos",
    buyNow: "Comprar Ahora",
    weight: "Peso",
    purity: "Pureza",
    platform: "Plataforma"
  },
  ar: {
    goldPriceTracker: "متتبع أسعار الذهب",
    trackRealTime: "تتبع أسعار الذهب في الوقت الفعلي بعملات مختلفة",
    currentGoldPrice: "سعر الذهب الحالي",
    country: "الدولة",
    unit: "الوحدة",
    selectCountry: "اختر الدولة",
    selectUnit: "اختر الوحدة",
    priceOf: "سعر",
    lastUpdated: "آخر تحديث",
    priceTrend: "اتجاه السعر",
    days: "أيام",
    historicalGoldPrice: "سعر الذهب التاريخي في",
    goldPriceByUnit: "سعر الذهب بالوحدة",
    compareGoldPrices: "قارن أسعار الذهب بوحدات مختلفة",
    gram: "غرام",
    ounce: "أوقية",
    kilogram: "كيلوغرام",
    sortAscending: "فرز تصاعدي",
    sortDescending: "فرز تنازلي",
    search: "بحث",
    currencyConverter: "محول العملات",
    charts: "الرسوم البيانية",
    calculator: "آلة حاسبة",
    notFound: "404 غير موجود",
    pageNotFound: "عذرًا! الصفحة غير موجودة.",
    goHome: "العودة إلى الصفحة الرئيسية",
    convertCurrency: "تحويل العملة",
    enterAmountDesc: "أدخل المبلغ المراد تحويله بين العملات",
    amount: "المبلغ",
    from: "من",
    to: "إلى",
    selectCurrency: "اختر العملة",
    swapCurrencies: "تبديل العملات",
    enterAmount: "أدخل المبلغ",
    convert: "حوّل",
    converting: "جار التحويل",
    result: "النتيجة",
    disclaimer: "تنصل",
    ratesRealTime: "أسعار الصرف قريبة من الوقت الفعلي وقد تختلف قليلاً.",
    tryAgain: "حاول مرة أخرى",
    
    // Product related translations
    buyGoldProducts: "منتجات الذهب",
    browseGoldProducts: "تصفح وشراء منتجات الذهب من مختلف تجار التجزئة",
    all: "جميع المنتجات",
    coins: "العملات المعدنية",
    bars: "سبائك",
    jewelry: "مجوهرات",
    other: "أخرى",
    priceLowToHigh: "السعر: من الأدنى إلى الأعلى",
    priceHighToLow: "السعر: من الأعلى إلى الأدنى",
    noProductsFound: "لم يتم العثور على منتجات",
    buyNow: "اشتر الآن",
    weight: "الوزن",
    purity: "النقاء",
    platform: "المنصة"
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>(localStorage.getItem('lang') || 'en');

  useEffect(() => {
    localStorage.setItem('lang', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  const availableLanguages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' },
    { code: 'ar', name: 'العربية' },
  ];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
