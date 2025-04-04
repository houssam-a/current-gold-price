// Currency data for the application
// Contains currency codes, symbols, names, and flags

// Currency symbols mapping
export const currencySymbols: Record<string, string> = {
  USD: "US Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  JPY: "Japanese Yen",
  INR: "Indian Rupee",
  AUD: "Australian Dollar",
  CAD: "Canadian Dollar",
  CHF: "Swiss Franc",
  CNY: "Chinese Yuan",
  MAD: "Moroccan Dirham",
  AED: "UAE Dirham",
  SAR: "Saudi Riyal",
  EGP: "Egyptian Pound",
  TRY: "Turkish Lira",
  RUB: "Russian Ruble",
  BRL: "Brazilian Real",
  MXN: "Mexican Peso",
  ZAR: "South African Rand",
  SGD: "Singapore Dollar",
  HKD: "Hong Kong Dollar",
  BTC: "Bitcoin",
  ETH: "Ethereum"
};

// Timeframe options for charts
export const timeframes = [
  {
    label: "24 Hours",
    value: "1d"
  },
  {
    label: "7 Days",
    value: "1w"
  },
  {
    label: "1 Month",
    value: "1m"
  },
  {
    label: "6 Months",
    value: "6m"
  },
  {
    label: "1 Year",
    value: "1y"
  }
];

// Country data - expanded to include more countries
export const countries = [
  { 
    code: "MA", 
    name: "Morocco", 
    currency: "MAD", 
    flag: "🇲🇦", 
    priority: true
  },
  {
    code: "US",
    name: "United States",
    currency: "USD",
    flag: "🇺🇸"
  },
  {
    code: "EU",
    name: "Euro Zone",
    currency: "EUR",
    flag: "🇪🇺"
  },
  {
    code: "GB",
    name: "United Kingdom",
    currency: "GBP",
    flag: "🇬🇧"
  },
  {
    code: "JP",
    name: "Japan",
    currency: "JPY",
    flag: "🇯🇵"
  },
  {
    code: "IN",
    name: "India",
    currency: "INR",
    flag: "🇮🇳"
  },
  {
    code: "AU",
    name: "Australia",
    currency: "AUD",
    flag: "🇦🇺"
  },
  {
    code: "CA",
    name: "Canada",
    currency: "CAD",
    flag: "🇨🇦"
  },
  {
    code: "CH",
    name: "Switzerland",
    currency: "CHF",
    flag: "🇨🇭"
  },
  {
    code: "CN",
    name: "China",
    currency: "CNY",
    flag: "🇨🇳"
  },
  {
    code: "AE",
    name: "UAE",
    currency: "AED",
    flag: "🇦🇪"
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    currency: "SAR",
    flag: "🇸🇦"
  },
  {
    code: "EG",
    name: "Egypt",
    currency: "EGP",
    flag: "🇪🇬"
  },
  {
    code: "TR",
    name: "Turkey",
    currency: "TRY",
    flag: "🇹🇷"
  },
  {
    code: "RU",
    name: "Russia",
    currency: "RUB",
    flag: "🇷🇺"
  },
  {
    code: "BR",
    name: "Brazil",
    currency: "BRL",
    flag: "🇧🇷"
  },
  {
    code: "MX",
    name: "Mexico",
    currency: "MXN",
    flag: "🇲🇽"
  },
  {
    code: "ZA",
    name: "South Africa",
    currency: "ZAR",
    flag: "🇿🇦"
  },
  {
    code: "SG",
    name: "Singapore",
    currency: "SGD",
    flag: "🇸🇬"
  },
  {
    code: "HK",
    name: "Hong Kong",
    currency: "HKD",
    flag: "🇭🇰"
  },
  // Additional countries
  {
    code: "KR",
    name: "South Korea",
    currency: "KRW",
    flag: "🇰🇷"
  },
  {
    code: "ID",
    name: "Indonesia",
    currency: "IDR",
    flag: "🇮🇩"
  },
  {
    code: "MY",
    name: "Malaysia",
    currency: "MYR",
    flag: "🇲🇾"
  },
  {
    code: "TH",
    name: "Thailand",
    currency: "THB",
    flag: "🇹🇭"
  },
  {
    code: "PH",
    name: "Philippines",
    currency: "PHP",
    flag: "🇵🇭"
  },
  {
    code: "VN",
    name: "Vietnam",
    currency: "VND",
    flag: "🇻🇳"
  },
  {
    code: "NG",
    name: "Nigeria",
    currency: "NGN",
    flag: "🇳🇬"
  },
  {
    code: "DZ",
    name: "Algeria",
    currency: "DZD",
    flag: "🇩🇿"
  },
  {
    code: "TN",
    name: "Tunisia",
    currency: "TND",
    flag: "🇹🇳"
  },
  {
    code: "QA",
    name: "Qatar",
    currency: "QAR",
    flag: "🇶🇦"
  },
  {
    code: "KW",
    name: "Kuwait",
    currency: "KWD",
    flag: "🇰🇼"
  },
  {
    code: "OM",
    name: "Oman",
    currency: "OMR",
    flag: "🇴🇲"
  },
  {
    code: "BH",
    name: "Bahrain",
    currency: "BHD",
    flag: "🇧🇭"
  },
  {
    code: "LB",
    name: "Lebanon",
    currency: "LBP",
    flag: "🇱🇧"
  },
  {
    code: "IQ",
    name: "Iraq",
    currency: "IQD",
    flag: "🇮🇶"
  },
  {
    code: "JO",
    name: "Jordan",
    currency: "JOD",
    flag: "🇯🇴"
  },
  {
    code: "IL",
    name: "Israel",
    currency: "ILS",
    flag: "🇮🇱"
  },
  {
    code: "FR",
    name: "France",
    currency: "EUR",
    flag: "🇫🇷"
  },
  {
    code: "DE",
    name: "Germany",
    currency: "EUR",
    flag: "🇩🇪"
  },
  {
    code: "IT",
    name: "Italy",
    currency: "EUR",
    flag: "🇮🇹"
  },
  {
    code: "ES",
    name: "Spain",
    currency: "EUR",
    flag: "🇪🇸"
  },
  {
    code: "LY",
    name: "Libya",
    currency: "LYD",
    flag: "🇱🇾"
  }
].sort((a, b) => {
  if (a.priority && !b.priority) return -1;
  if (!a.priority && b.priority) return 1;
  return a.name.localeCompare(b.name);
});

// Gold unit conversions
export const goldUnits = [
  {
    label: "Gram",
    name: "Gram",
    value: "gram"
  },
  {
    label: "Ounce",
    name: "Ounce",
    value: "ounce"
  },
  {
    label: "Kilogram",
    name: "Kilogram",
    value: "kilo"
  }
];

// Conversion factors for different units
export const conversionFactors = {
  gram: 1,
  ounce: 31.1035, // Troy ounce conversion
  kilo: 1000
};

// Gold images for the app - gold bars and coins
export const goldImages = [
  {
    src: "public/lovable-uploads/fd3e9720-0ce6-4d39-bd25-2179a6ecc4ea.png",
    alt: "Gold Bar"
  },
  {
    src: "public/lovable-uploads/dba310bb-687f-4abf-9492-5498981fab0c.png",
    alt: "Gold Coin"
  },
  {
    src: "public/lovable-uploads/b7db9dba-cfe2-4a05-9dcd-9ec276bd6854.png",
    alt: "Gold Bars Stack"
  },
  {
    src: "public/lovable-uploads/a1d132b9-6145-4ec1-9efa-d48d5108d880.png",
    alt: "Gold Coins Stack"
  }
];

// Default language options
export const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ru", name: "Русский", flag: "🇷🇺" }
];

// Default translations
export const translations = {
  en: {
    // General
    goldPriceTracker: "Current Gold Price",
    trackRealTime: "Track real-time gold prices in different currencies",
    currentGoldPrice: "Current Gold Price",
    goldPriceByUnit: "Gold Price by Unit",
    compareGoldPrices: "Compare gold prices in different units and currencies",
    priceTrend: "Price Trend",
    historicalGoldPrice: "Historical gold price in",
    lastUpdated: "Last updated",
    priceOf: "Price of",
    goldPurity: "Gold Purity",
    inCountry: "in {{country}}",
    morocco: "Morocco",
    highlightedCountry: "Highlighted Country",
    
    // Units
    gram: "gram",
    ounce: "ounce",
    kilogram: "kilogram",
    days: "days",
    
    // Countries and Currencies
    country: "Country",
    currency: "Currency",
    pricePerGram: "Price per Gram",
    pricePerOunce: "Price per Ounce",
    pricePerKilo: "Price per Kilogram",
    
    // UI Actions
    refresh: "Refresh",
    search: "Search",
    selectCountry: "Select country",
    selectUnit: "Select unit",
    sortAscending: "Sort ascending",
    sortDescending: "Sort descending",
    
    // Navigation
    home: "Home",
    charts: "Charts",
    calculator: "Calculator",
    currency: "Currency",
    
    // Chart labels
    average: "Average",
    minimum: "Minimum",
    maximum: "Maximum",
    change: "Change",
    priceStatistics: "Price Statistics",
    keyMetrics: "Key metrics in",
    
    // Time periods
    day: "Day",
    week: "Week",
    month: "Month",
    months: "Months",
    year: "Year",
    
    // Daily change
    dailyChange: "Daily Change",
    todayVsYesterday: "Today vs. Yesterday",
    
    // Currency Converter
    currencyConverter: "Gold Currency Converter",
    convertRealTime: "Convert gold prices between different currencies in real-time",
    goldImageGallery: "Gold Image Gallery",
    
    // Favorites
    favoriteCurrencies: "Favorite Currencies",
    quickAccess: "Quick access to your frequently used currencies",
    noFavorites: "No favorites yet. Add some below!",
    addFavorite: "Add a favorite currency",
    
    // Conversion Form
    convertCurrency: "Convert Gold Currency",
    enterAmountDesc: "Enter an amount to convert between currencies",
    amount: "Amount",
    enterAmount: "Enter amount",
    from: "From",
    to: "To",
    selectCurrency: "Select currency",
    swapCurrencies: "Swap currencies",
    converting: "Converting...",
    convert: "Convert",

    // Language
    languageChanged: "Language changed to"
  },
  ar: {
    // General
    goldPriceTracker: "سعر الذهب الحالي",
    trackRealTime: "تتبع أسعار الذهب في الوقت الحقيقي بعملات مختلفة",
    currentGoldPrice: "سعر الذهب الحالي",
    goldPriceByUnit: "سعر الذهب حسب الوحدة",
    compareGoldPrices: "مقارنة أسعار الذهب بوحدات وعملات مختلفة",
    priceTrend: "اتجاه السعر",
    historicalGoldPrice: "سعر الذهب التاريخي بـ",
    lastUpdated: "آخر تحديث",
    priceOf: "سعر",
    goldPurity: "نقاء الذهب",
    inCountry: "في {{country}}",
    morocco: "المغرب",
    highlightedCountry: "البلد المميز",
    
    // Units
    gram: "جرام",
    ounce: "أوقية",
    kilogram: "كيلوجرام",
    days: "أيام",
    
    // Countries and Currencies
    country: "البلد",
    currency: "العملة",
    pricePerGram: "السعر لكل جرام",
    pricePerOunce: "السعر لكل أوقية",
    pricePerKilo: "السعر لكل كيلوجرام",
    
    // UI Actions
    refresh: "تحديث",
    search: "بحث",
    selectCountry: "اختر البلد",
    selectUnit: "اختر الوحدة",
    sortAscending: "ترتيب تصاعدي",
    sortDescending: "ترتيب تنازلي",
    
    // Navigation
    home: "الرئيسية",
    charts: "الرسوم البيانية",
    calculator: "الحاسبة",
    currency: "العملات",
    
    // Chart labels
    average: "المتوسط",
    minimum: "الحد الأدنى",
    maximum: "الحد الأقصى",
    change: "التغيير",
    priceStatistics: "إحصائيات الأسعار",
    keyMetrics: "المقاييس الرئيسية بـ",
    
    // Time periods
    day: "يوم",
    week: "أسبوع",
    month: "شهر",
    months: "أشهر",
    year: "سنة",
    
    // Daily change
    dailyChange: "التغير اليومي",
    todayVsYesterday: "اليوم مقابل الأمس",
    
    // Currency Converter
    currencyConverter: "محول عملات الذهب",
    convertRealTime: "تحويل أسعار الذهب بين العملات المختلفة في الوقت الحقيقي",
    goldImageGallery: "معرض صور الذهب",
    
    // Favorites
    favoriteCurrencies: "العملات المفضلة",
    quickAccess: "وصول سريع للعملات التي تستخدمها كثيرًا",
    noFavorites: "لا توجد مفضلات حتى الآن. أضف بعضها أدناه!",
    addFavorite: "إضافة عملة مفضلة",
    
    // Conversion Form
    convertCurrency: "تحويل عملات الذهب",
    enterAmountDesc: "أدخل مبلغًا للتحويل بين العملات",
    amount: "المبلغ",
    enterAmount: "أدخل المبلغ",
    from: "من",
    to: "إلى",
    selectCurrency: "اختر العملة",
    swapCurrencies: "تبديل العملات",
    converting: "جاري التحويل...",
    convert: "تحويل",

    // Language
    languageChanged: "تم تغيير اللغة إلى"
  },
  es: {
    // General
    goldPriceTracker: "Precio del oro actual",
    trackRealTime: "Siga los precios del oro en tiempo real en diferentes monedas",
    currentGoldPrice: "Precio actual del oro",
    goldPriceByUnit: "Precio del oro por unidad",
    compareGoldPrices: "Comparar los precios del oro en diferentes unidades y monedas",
    priceTrend: "Tendencia de precios",
    historicalGoldPrice: "Precio histórico del oro en",
    lastUpdated: "Última actualización",
    priceOf: "Precio de",
    goldPurity: "Pureza del oro",
    inCountry: "en {{country}}",
    morocco: "Marruecos",
    highlightedCountry: "País destacado",
    
    // Units
    gram: "gramo",
    ounce: "onza",
    kilogram: "kilogramo",
    days: "días",
    
    // Countries and Currencies
    country: "País",
    currency: "Moneda",
    pricePerGram: "Precio por gramo",
    pricePerOunce: "Precio por onza",
    pricePerKilo: "Precio por kilogramo",
    
    // UI Actions
    refresh: "Actualizar",
    search: "Buscar",
    selectCountry: "Seleccionar país",
    selectUnit: "Seleccionar unidad",
    sortAscending: "Ordenar ascendente",
    sortDescending: "Ordenar descendente",
    
    // Navigation
    home: "Inicio",
    charts: "Gráficos",
    calculator: "Calculadora",
    currency: "Moneda",
    
    // Chart labels
    average: "Promedio",
    minimum: "Mínimo",
    maximum: "Máximo",
    change: "Cambio",
    priceStatistics: "Estadísticas de precios",
    keyMetrics: "Métricas clave en",
    
    // Time periods
    day: "Día",
    week: "Semana",
    month: "Mes",
    months: "Meses",
    year: "Año",
    
    // Daily change
    dailyChange: "Cambio diario",
    todayVsYesterday: "Hoy vs. Ayer",
    
    // Currency Converter
    currencyConverter: "Conversor de Monedas de Oro",
    convertRealTime: "Convierte precios de oro entre diferentes monedas en tiempo real",
    goldImageGallery: "Galería de Imágenes de Oro",
    
    // Favorites
    favoriteCurrencies: "Monedas Favoritas",
    quickAccess: "Acceso rápido a tus monedas de uso frecuente",
    noFavorites: "Aún no hay favoritos. ¡Añade algunos abajo!",
    addFavorite: "Añadir moneda favorita",
    
    // Conversion Form
    convertCurrency: "Convertir Moneda de Oro",
    enterAmountDesc: "Ingresa una cantidad para convertir entre monedas",
    amount: "Cantidad",
    enterAmount: "Ingresa cantidad",
    from: "De",
    to: "A",
    selectCurrency: "Seleccionar moneda",
    swapCurrencies: "Intercambiar monedas",
    converting: "Convirtiendo...",
    convert: "Convertir",

    // Language
    languageChanged: "Idioma cambiado a"
  },
  fr: {
    // General
    goldPriceTracker: "Prix actuel de l'or",
    trackRealTime: "Suivez les prix de l'or en temps réel dans différentes devises",
    currentGoldPrice: "Prix actuel de l'or",
    goldPriceByUnit: "Prix de l'or par unité",
    compareGoldPrices: "Comparer les prix de l'or dans différentes unités et devises",
    priceTrend: "Tendance des prix",
    historicalGoldPrice: "Prix historique de l'or en",
    lastUpdated: "Dernière mise à jour",
    priceOf: "Prix de",
    goldPurity: "Pureté de l'or",
    inCountry: "en {{country}}",
    morocco: "Maroc",
    highlightedCountry: "Pays mis en évidence",
    
    // Units
    gram: "gramme",
    ounce: "once",
    kilogram: "kilogramme",
    days: "jours",
    
    // Countries and Currencies
    country: "Pays",
    currency: "Devise",
    pricePerGram: "Prix par gramme",
    pricePerOunce: "Prix par once",
    pricePerKilo: "Prix par kilogramme",
    
    // UI Actions
    refresh: "Actualiser",
    search: "Rechercher",
    selectCountry: "Sélectionner un pays",
    selectUnit: "Sélectionner une unité",
    sortAscending: "Tri ascendant",
    sortDescending: "Tri descendant",
    
    // Navigation
    home: "Accueil",
    charts: "Graphiques",
    calculator: "Calculatrice",
    currency: "Devise",
    
    // Chart labels
    average: "Moyenne",
    minimum: "Minimum",
    maximum: "Maximum",
    change: "Changement",
    priceStatistics: "Statistiques des prix",
    keyMetrics: "Indicateurs clés en",
    
    // Time periods
    day: "Jour",
    week: "Semaine",
    month: "Mois",
    months: "Mois",
    year: "An",
    
    // Daily change
    dailyChange: "Changement quotidien",
    todayVsYesterday: "Aujourd'hui vs. Hier",
    
    // Currency Converter
    currencyConverter: "Convertisseur de Devises Or",
    convertRealTime: "Convertir les prix de l'or entre différentes devises en temps réel",
    goldImageGallery: "Galerie d'Images d'Or",
    
    // Favorites
    favoriteCurrencies: "Devises Favorites",
    quickAccess: "Accès rapide à vos devises fréquemment utilisées",
    noFavorites: "Pas encore de favoris. Ajoutez-en ci-dessous!",
    addFavorite: "Ajouter une devise favorite",
    
    // Conversion Form
    convertCurrency: "Convertir Devise Or",
    enterAmountDesc: "Entrez un montant pour convertir entre les devises",
    amount: "Montant",
    enterAmount: "Entrer le montant",
    from: "De",
    to: "À",
    selectCurrency: "Sélectionner devise",
    swapCurrencies: "Échanger les devises",
    converting: "Conversion en cours...",
    convert: "Convertir",

    // Language
    languageChanged: "Langue changée en"
  },
  de: {
    // General
    goldPriceTracker: "Aktueller Goldpreis",
    trackRealTime: "Verfolgen Sie die Goldpreise in Echtzeit in verschiedenen Währungen",
    currentGoldPrice: "Aktueller Goldpreis",
    goldPriceByUnit: "Goldpreis pro Einheit",
    compareGoldPrices: "Vergleichen Sie die Goldpreise in verschiedenen Einheiten und Währungen",
    priceTrend: "Preistrend",
    historicalGoldPrice: "Historischer Goldpreis in",
    lastUpdated: "Letzte Aktualisierung",
    priceOf: "Preis von",
    goldPurity: "Goldgehalt",
    inCountry: "in {{country}}",
    morocco: "Marokko",
    highlightedCountry: "Hervorgehobenes Land",
    
    // Units
    gram: "Gramm",
    ounce: "Unze",
    kilogram: "Kilogramm",
    days: "Tage",
    
    // Countries and Currencies
    country: "Land",
    currency: "Währung",
    pricePerGram: "Preis pro Gramm",
    pricePerOunce: "Preis pro Unze",
    pricePerKilo: "Preis pro Kilogramm",
    
    // UI Actions
    refresh: "Aktualisieren",
    search: "Suchen",
    selectCountry: "Land auswählen",
    selectUnit: "Einheit auswählen",
    sortAscending: "Aufsteigend sortieren",
    sortDescending: "Absteigend sortieren",
    
    // Navigation
    home: "Startseite",
    charts: "Diagramme",
    calculator: "Rechner",
    currency: "Währung",
    
    // Chart labels
    average: "Durchschnitt",
    minimum: "Minimum",
    maximum: "Maximum",
    change: "Änderung",
    priceStatistics: "Preisstatistiken",
    keyMetrics: "Schlüsselkennzahlen in",
    
    // Time periods
    day: "Tag",
    week: "Woche",
    month: "Monat",
    months: "Monate",
    year: "Jahr",
    
    // Daily change
    dailyChange: "Tägliche Veränderung",
    todayVsYesterday: "Heute vs. Gestern",
    
    // Currency Converter
    currencyConverter: "Gold-Währungsrechner",
    convertRealTime: "Konvertieren Sie Goldpreise zwischen verschiedenen Währungen in Echtzeit",
    goldImageGallery: "Gold-Bildergalerie",
    
    // Favorites
    favoriteCurrencies: "Lieblingswährungen",
    quickAccess: "Schneller Zugriff auf Ihre häufig verwendeten Währungen",
    noFavorites: "Noch keine Favoriten. Fügen Sie unten welche hinzu!",
    addFavorite: "Füge eine Lieblingswährung hinzu",
    
    // Conversion Form
    convertCurrency: "Gold-Währung konvertieren",
    enterAmountDesc: "Geben Sie einen Betrag ein, um zwischen Währungen zu konvertieren",
    amount: "Betrag",
    enterAmount: "Betrag eingeben",
    from: "Von",
    to: "Nach",
    selectCurrency: "Währung auswählen",
    swapCurrencies: "Währungen tauschen",
    converting: "Konvertiere...",
    convert: "Konvertieren",

    // Language
    languageChanged: "Sprache geändert zu"
  },
  zh: {
    // General
    goldPriceTracker: "当前金价",
    trackRealTime: "追踪不同货币的实时金价",
    currentGoldPrice: "当前金价",
    goldPriceByUnit: "单位金价",
    compareGoldPrices: "比较不同单位和货币的金价",
    priceTrend: "价格趋势",
    historicalGoldPrice: "历史金价（单位：",
    lastUpdated: "最近更新",
    priceOf: "价格",
    goldPurity: "黄金纯度",
    inCountry: "在{{country}}",
    morocco: "摩洛哥",
    highlightedCountry: "突出显示的国家",
    
    // Units
    gram: "克",
    ounce: "盎司",
    kilogram: "千克",
    days: "天",
    
    // Countries and Currencies
    country: "国家",
    currency: "货币",
    pricePerGram: "每克价格",
    pricePerOunce: "每盎司价格",
    pricePerKilo: "每千克价格",
    
    // UI Actions
    refresh: "刷新",
    search: "搜索",
    selectCountry: "选择国家",
    selectUnit: "选择单位",
    sortAscending: "升序",
    sortDescending: "降序",
    
    // Navigation
    home: "首页",
    charts: "图表",
    calculator: "计算器",
    currency: "货币",
    
    // Chart labels
    average: "平均",
    minimum: "最小值",
    maximum: "最大值",
    change: "变化",
    priceStatistics: "价格统计",
    keyMetrics: "关键指标（单位：",
    
    // Time periods
    day: "天",
    week: "周",
    month: "月",
    months: "月",
    year: "年",
    
    // Daily change
    dailyChange: "每日变化",
    todayVsYesterday: "今天 vs. 昨天",
    
    // Currency Converter
    currencyConverter: "黄金货币转换器",
    convertRealTime: "实时转换不同���币之间的黄金价格",
    goldImageGallery: "黄金图片库",
    
    // Favorites
    favoriteCurrencies: "收藏货币",
    quickAccess: "快速访问您常用的货币",
    noFavorites: "暂无收藏货币。请在下方添加！",
    addFavorite: "添加收藏货币",
    
    // Conversion Form
    convertCurrency: "转换黄金货币",
    enterAmountDesc: "输入金额以在不同货币之间转换",
    amount: "金额",
    enterAmount: "输入金额",
    from: "从",
    to: "到",
    selectCurrency: "选择货币",
    swapCurrencies: "互换货币",
    converting: "转换中...",
    convert: "转换",

    // Language
    languageChanged: "语言已更改为"
  },
  hi: {
    // General
    goldPriceTracker: "वर्तमान सोने की कीमत",
    trackRealTime: "विभिन्न मुद्राओं में वास्तविक समय में सोने की कीमतों को ट्रैक करें",
    currentGoldPrice: "वर्तमान सोने की कीमत",
    goldPriceByUnit: "इकाई के अनुसार सोने की कीमत",
    compareGoldPrices: "विभिन्न इकाइयों और मुद्राओं में सोने की कीमतों की तुलना करें",
    priceTrend: "कीमत का रुझान",
    historicalGoldPrice: "में ऐतिहासिक सोने की कीमत",
    lastUpdated: "अंतिम अद्यतन",
    priceOf: "की कीमत",
    goldPurity: "सोने की शुद्धता",
    inCountry: "में {{country}}",
    morocco: "मोरक्को",
    highlightedCountry: "हाइलाइट किया गया देश",
    
    // Units
    gram: "ग्राम",
    ounce: "औंस",
    kilogram: "किलोग्राम",
    days: "दिन",
    
    // Countries and Currencies
    country: "देश",
    currency: "मुद्रा",
    pricePerGram: "प्रति ग्राम कीमत",
    pricePerOunce: "प्रति औंस कीमत",
    pricePerKilo: "प्रति किलोग्राम कीमत",
    
    // UI Actions
    refresh: "ताज़ा करें",
    search: "खोजें",
    selectCountry: "देश चुनें",
    selectUnit: "इकाई चुनें",
    sortAscending: "आरोही क्रम में छाँटें",
    sortDescending: "अवरोही क्रम में छाँटें",
    
    // Navigation
    home: "होम",
    charts: "चार्ट",
    calculator: "कैलकुलेटर",
    currency: "मुद्रा",
    
    // Chart labels
    average: "औसत",
    minimum: "न्यूनतम",
    maximum: "अधिकतम",
    change: "परिवर्तन",
    priceStatistics: "मूल्य सांख्यिकी",
    keyMetrics: "में मुख्य मेट्रिक्स",
    
    // Time periods
    day: "दिन",
    week: "सप्ताह",
    month: "महीना",
    months: "महीने",
    year: "वर्ष",
    
    // Daily change
    dailyChange: "दैनिक परिवर्तन",
    todayVsYesterday: "आज बनाम कल",
    
    // Currency Converter
    currencyConverter: "सोना मुद्रा कनवर्टर",
    convertRealTime: "वास्तविक समय में विभिन्न मुद्राओं के बीच सोने की कीमतों को परिवर्तित करें",
    goldImageGallery: "सोना छवि गैलरी",
    
    // Favorites
    favoriteCurrencies: "पसंदीदा मुद्राएँ",
    quickAccess: "अपनी अक्सर उपयोग की जाने वाली मुद्राओं तक त्वरित पहुंच",
    noFavorites: "अभी तक कोई पसंदीदा नहीं है। नीचे कुछ जोड़ें!",
    addFavorite: "पसंदीदा मुद्रा जोड़ें",
    
    // Conversion Form
    convertCurrency: "सोना मुद्रा परिवर्तन",
    enterAmountDesc: "मुद्राओं के बीच परिवर्तित करने के लिए राशि दर्ज करें",
    amount: "राशि",
    enterAmount: "राशि दर्ज करें",
    from: "से",
    to: "तक",
    selectCurrency: "मुद्रा चुनें",
    swapCurrencies: "मुद्राएँ स्वैप करें",
    converting: "परिवर्तित हो रहा है...",
    convert: "परिवर्तित करें",

    // Language
    languageChanged: "भाषा बदली गई है"
  },
  ja: {
    // General
    goldPriceTracker: "現在の金価格",
    trackRealTime: "さまざまな通貨でのリアルタイムの金価格を追跡",
    currentGoldPrice: "現在の金価格",
    goldPriceByUnit: "単位あたりの金価格",
    compareGoldPrices: "異なる単位と通貨での金価格を比較する",
    priceTrend: "価格動向",
    historicalGoldPrice: "の過去の金価格",
    lastUpdated: "最終更新日",
    priceOf: "の価格",
    goldPurity: "金の純度",
    inCountry: "{{country}}の",
    morocco: "モロッコ",
    highlightedCountry: "強調表示された国",
    
    // Units
    gram: "グラム",
    ounce: "オンス",
    kilogram: "キログラム",
    days: "日",
    
    // Countries and Currencies
    country: "国",
    currency: "通貨",
    pricePerGram: "1グラムあたりの価格",
    pricePerOunce: "1オンスあたりの価格",
    pricePerKilo: "1キログラムあたりの価格",
    
    // UI Actions
    refresh: "更新",
    search: "検索",
    selectCountry: "国を選択",
    selectUnit: "単位を選択",
    sortAscending: "昇順にソート",
    sortDescending: "降順にソート",
    
    // Navigation
    home: "ホーム",
    charts: "チャート",
    calculator: "計算機",
    currency: "通貨",
    
    // Chart labels
    average: "平均",
    minimum: "最小",
    maximum: "最大",
    change: "変化",
    priceStatistics: "価格統計",
    keyMetrics: "主要指標",
    
    // Time periods
    day: "日",
    week: "週間",
    month: "月",
    months: "ヶ月",
    year: "年",
    
    // Daily change
    dailyChange: "日次変化",
    todayVsYesterday: "今日 vs. 昨日",
    
    // Currency Converter
    currencyConverter: "金通貨コンバーター",
    convertRealTime: "リアルタイムで異なる通貨間の金価格を変換する",
    goldImageGallery: "金のイメージギャラリー",
    
    // Favorites
    favoriteCurrencies: "お気に入りの通貨",
    quickAccess: "よく使用する通貨へのクイックアクセス",
    noFavorites: "まだお気に入りはありません。下に追加してください！",
    addFavorite: "お気に入りの通貨を追加",
    
    // Conversion Form
    convertCurrency: "金通貨を変換",
    enterAmountDesc: "通貨間で変換する金額を入力してください",
    amount: "金額",
    enterAmount: "金額を入力",
    from: "から",
    to: "へ",
    selectCurrency: "通貨を選択",
    swapCurrencies: "通貨を交換",
    converting: "変換中...",
    convert: "変換",

    // Language
    languageChanged: "言語が��に変更されました："
  },
  ru: {
    // General
    goldPriceTracker: "Текущая цена золота",
    trackRealTime: "Отслеживайте цены на золото в режиме реального времени в разных валютах",
    currentGoldPrice: "Текущая цена золота",
    goldPriceByUnit: "Цена золота по единицам",
    compareGoldPrices: "Сравните цены на золото в различных единицах и валютах",
    priceTrend: "Тенденция цен",
    historicalGoldPrice: "Историческая цена золота в",
    lastUpdated: "Последнее обновление",
    priceOf: "Цена",
    goldPurity: "Чистота золота",
    inCountry: "в {{country}}",
    morocco: "Марокко",
    highlightedCountry: "Выделенная страна",
    
    // Units
    gram: "грамм",
    ounce: "унция",
    kilogram: "килограмм",
    days: "дни",
    
    // Countries and Currencies
    country: "Страна",
    currency: "Валюта",
    pricePerGram: "Цена за грамм",
    pricePerOunce: "Цена за унцию",
    pricePerKilo: "Цена за килограмм",
    
    // UI Actions
    refresh: "Обновить",
    search: "Поиск",
    selectCountry: "Выбрать страну",
    selectUnit: "Выбрать единицу",
    sortAscending: "Сортировать по возрастанию",
    sortDescending: "Сортировать по убыванию",
    
    // Navigation
    home: "Главная",
    charts: "Графики",
    calculator: "Калькулятор",
    currency: "Валюта",
    
    // Chart labels
    average: "Среднее",
    minimum: "Минимум",
    maximum: "Максимум",
    change: "Изменение",
    priceStatistics: "Статистика цен",
    keyMetrics: "Ключевые показатели в",
    
    // Time periods
    day: "День",
    week: "Неделя",
    month: "Месяц",
    months: "Месяцы",
    year: "Год",
    
    // Daily change
    dailyChange: "Ежедневное изменение",
    todayVsYesterday: "Сегодня vs. Вчера",
    
    // Currency Converter
    currencyConverter: "Конвертер золотой валюты",
    convertRealTime: "Конвертируйте цены на золото между различными валютами в реальном времени",
    goldImageGallery: "Галерея изображений золота",
    
    // Favorites
    favoriteCurrencies: "Избранные валюты",
    quickAccess: "Быстрый доступ к часто используемым валютам",
    noFavorites: "Пока нет избранных. Добавьте несколько ниже!",
    addFavorite: "Добавить избранную валюту",
    
    // Conversion Form
    convertCurrency: "Конвертировать золотую валюту",
    enterAmountDesc: "Введите сумму для конвертации между валютами",
    amount: "Сумма",
    enterAmount: "Введите сумму",
    from: "Из",
    to: "В",
    selectCurrency: "Выберите валюту",
    swapCurrencies: "Поменять валюты местами",
    converting: "Конвертация...",
    convert: "Конвертировать",

    // Language
    languageChanged: "Язык изменен на"
  }
};
