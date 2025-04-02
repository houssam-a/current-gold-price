
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

// Country data
export const countries = [
  {
    name: "United States",
    code: "US",
    currency: "USD",
    flag: "🇺🇸"
  },
  {
    name: "Euro Zone",
    code: "EU",
    currency: "EUR",
    flag: "🇪🇺"
  },
  {
    name: "United Kingdom",
    code: "GB",
    currency: "GBP",
    flag: "🇬🇧"
  },
  {
    name: "Japan",
    code: "JP",
    currency: "JPY",
    flag: "🇯🇵"
  },
  {
    name: "India",
    code: "IN",
    currency: "INR",
    flag: "🇮🇳"
  },
  {
    name: "Australia",
    code: "AU",
    currency: "AUD",
    flag: "🇦🇺"
  },
  {
    name: "Canada",
    code: "CA",
    currency: "CAD",
    flag: "🇨🇦"
  },
  {
    name: "Switzerland",
    code: "CH",
    currency: "CHF",
    flag: "🇨🇭"
  },
  {
    name: "China",
    code: "CN",
    currency: "CNY",
    flag: "🇨🇳"
  },
  {
    name: "Morocco",
    code: "MA",
    currency: "MAD",
    flag: "🇲🇦"
  },
  {
    name: "UAE",
    code: "AE",
    currency: "AED",
    flag: "🇦🇪"
  },
  {
    name: "Saudi Arabia",
    code: "SA",
    currency: "SAR",
    flag: "🇸🇦"
  },
  {
    name: "Egypt",
    code: "EG",
    currency: "EGP",
    flag: "🇪🇬"
  },
  {
    name: "Turkey",
    code: "TR",
    currency: "TRY",
    flag: "🇹🇷"
  },
  {
    name: "Russia",
    code: "RU",
    currency: "RUB",
    flag: "🇷🇺"
  },
  {
    name: "Brazil",
    code: "BR",
    currency: "BRL",
    flag: "🇧🇷"
  },
  {
    name: "Mexico",
    code: "MX",
    currency: "MXN",
    flag: "🇲🇽"
  },
  {
    name: "South Africa",
    code: "ZA",
    currency: "ZAR",
    flag: "🇿🇦"
  },
  {
    name: "Singapore",
    code: "SG",
    currency: "SGD",
    flag: "🇸🇬"
  },
  {
    name: "Hong Kong",
    code: "HK",
    currency: "HKD",
    flag: "🇭🇰"
  },
  {
    name: "Digital",
    code: "BTC",
    currency: "BTC",
    flag: "₿"
  },
  {
    name: "Ethereum",
    code: "ETH",
    currency: "ETH",
    flag: "Ξ"
  }
];

// Gold unit conversions
export const goldUnits = [
  {
    name: "Gram",
    value: "gram"
  },
  {
    name: "Ounce",
    value: "ounce"
  },
  {
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
    todayVsYesterday: "Today vs. Yesterday"
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
    todayVsYesterday: "اليوم مقابل الأمس"
  },
  es: {
    goldPriceTracker: "Precio del oro actual",
    trackRealTime: "Siga los precios del oro en tiempo real en diferentes monedas",
    currentGoldPrice: "Precio actual del oro",
    goldPriceByUnit: "Precio del oro por unidad",
    compareGoldPrices: "Comparar los precios del oro en diferentes unidades y monedas",
    priceTrend: "Tendencia de precios",
    historicalGoldPrice: "Precio histórico del oro en",
    lastUpdated: "Última actualización",
    priceOf: "Precio de",
    gram: "gramo",
    ounce: "onza",
    kilogram: "kilogramo",
    days: "días",
    country: "País",
    currency: "Moneda",
    pricePerGram: "Precio por gramo",
    pricePerOunce: "Precio por onza",
    pricePerKilo: "Precio por kilogramo",
    refresh: "Actualizar",
    search: "Buscar",
    selectCountry: "Seleccionar país",
    selectUnit: "Seleccionar unidad",
    sortAscending: "Ordenar ascendente",
    sortDescending: "Ordenar descendente",
    home: "Inicio",
    charts: "Gráficos",
    calculator: "Calculadora",
    currency: "Moneda",
    average: "Promedio",
    minimum: "Mínimo",
    maximum: "Máximo",
    change: "Cambio",
    priceStatistics: "Estadísticas de precios",
    keyMetrics: "Métricas clave en",
    day: "Día",
    week: "Semana",
    month: "Mes",
    months: "Meses",
    year: "Año",
    dailyChange: "Cambio diario",
    todayVsYesterday: "Hoy vs. Ayer"
  },
  fr: {
    goldPriceTracker: "Prix actuel de l'or",
    trackRealTime: "Suivez les prix de l'or en temps réel dans différentes devises",
    currentGoldPrice: "Prix actuel de l'or",
    goldPriceByUnit: "Prix de l'or par unité",
    compareGoldPrices: "Comparer les prix de l'or dans différentes unités et devises",
    priceTrend: "Tendance des prix",
    historicalGoldPrice: "Prix historique de l'or en",
    lastUpdated: "Dernière mise à jour",
    priceOf: "Prix de",
    gram: "gramme",
    ounce: "once",
    kilogram: "kilogramme",
    days: "jours",
    country: "Pays",
    currency: "Devise",
    pricePerGram: "Prix par gramme",
    pricePerOunce: "Prix par once",
    pricePerKilo: "Prix par kilogramme",
    refresh: "Actualiser",
    search: "Rechercher",
    selectCountry: "Sélectionner un pays",
    selectUnit: "Sélectionner une unité",
    sortAscending: "Tri ascendant",
    sortDescending: "Tri descendant",
    home: "Accueil",
    charts: "Graphiques",
    calculator: "Calculatrice",
    currency: "Devise",
    average: "Moyenne",
    minimum: "Minimum",
    maximum: "Maximum",
    change: "Changement",
    priceStatistics: "Statistiques des prix",
    keyMetrics: "Indicateurs clés en",
    day: "Jour",
    week: "Semaine",
    month: "Mois",
    months: "Mois",
    year: "An",
    dailyChange: "Changement quotidien",
    todayVsYesterday: "Aujourd'hui vs. Hier"
  },
  de: {
    goldPriceTracker: "Aktueller Goldpreis",
    trackRealTime: "Verfolgen Sie die Goldpreise in Echtzeit in verschiedenen Währungen",
    currentGoldPrice: "Aktueller Goldpreis",
    goldPriceByUnit: "Goldpreis pro Einheit",
    compareGoldPrices: "Vergleichen Sie die Goldpreise in verschiedenen Einheiten und Währungen",
    priceTrend: "Preistrend",
    historicalGoldPrice: "Historischer Goldpreis in",
    lastUpdated: "Letzte Aktualisierung",
    priceOf: "Preis von",
    gram: "Gramm",
    ounce: "Unze",
    kilogram: "Kilogramm",
    days: "Tage",
    country: "Land",
    currency: "Währung",
    pricePerGram: "Preis pro Gramm",
    pricePerOunce: "Preis pro Unze",
    pricePerKilo: "Preis pro Kilogramm",
    refresh: "Aktualisieren",
    search: "Suchen",
    selectCountry: "Land auswählen",
    selectUnit: "Einheit auswählen",
    sortAscending: "Aufsteigend sortieren",
    sortDescending: "Absteigend sortieren",
    home: "Startseite",
    charts: "Diagramme",
    calculator: "Rechner",
    currency: "Währung",
    average: "Durchschnitt",
    minimum: "Minimum",
    maximum: "Maximum",
    change: "Änderung",
    priceStatistics: "Preisstatistiken",
    keyMetrics: "Kennzahlen in",
    day: "Tag",
    week: "Woche",
    month: "Monat",
    months: "Monate",
    year: "Jahr",
    dailyChange: "Tägliche Veränderung",
    todayVsYesterday: "Heute vs. Gestern"
  },
  zh: {
    goldPriceTracker: "当前金价",
    trackRealTime: "追踪不同货币的实时金价",
    currentGoldPrice: "当前金价",
    goldPriceByUnit: "单位金价",
    compareGoldPrices: "比较不同单位和货币的金价",
    priceTrend: "价格趋势",
    historicalGoldPrice: "历史金价（单位：",
    lastUpdated: "最近更新",
    priceOf: "价格",
    gram: "克",
    ounce: "盎司",
    kilogram: "千克",
    days: "天",
    country: "国家",
    currency: "货币",
    pricePerGram: "每克价格",
    pricePerOunce: "每盎司价格",
    pricePerKilo: "每千克价格",
    refresh: "刷新",
    search: "搜索",
    selectCountry: "选择国家",
    selectUnit: "选择单位",
    sortAscending: "升序",
    sortDescending: "降序",
    home: "首页",
    charts: "图表",
    calculator: "计算器",
    currency: "货币",
    average: "平均",
    minimum: "最小值",
    maximum: "最大值",
    change: "变化",
    priceStatistics: "价格统计",
    keyMetrics: "关键指标（单位：",
    day: "天",
    week: "周",
    month: "月",
    months: "月",
    year: "年",
    dailyChange: "每日变化",
    todayVsYesterday: "今天 vs. 昨天"
  },
  hi: {
    goldPriceTracker: "वर्तमान सोने की कीमत",
    trackRealTime: "विभिन्न मुद्राओं में वास्तविक समय में सोने की कीमतों को ट्रैक करें",
    currentGoldPrice: "वर्तमान सोने की कीमत",
    goldPriceByUnit: "इकाई के अनुसार सोने की कीमत",
    compareGoldPrices: "विभिन्न इकाइयों और मुद्राओं में सोने की कीमतों की तुलना करें",
    priceTrend: "कीमत का रुझान",
    historicalGoldPrice: "में ऐतिहासिक सोने की कीमत",
    lastUpdated: "अंतिम अद्यतन",
    priceOf: "की कीमत",
    gram: "ग्राम",
    ounce: "औंस",
    kilogram: "किलोग्राम",
    days: "दिन",
    country: "देश",
    currency: "मुद्रा",
    pricePerGram: "प्रति ग्राम कीमत",
    pricePerOunce: "प्रति औंस कीमत",
    pricePerKilo: "प्रति किलोग्राम कीमत",
    refresh: "ताज़ा करें",
    search: "खोजें",
    selectCountry: "देश चुनें",
    selectUnit: "इकाई चुनें",
    sortAscending: "आरोही क्रम में छाँटें",
    sortDescending: "अवरोही क्रम में छाँटें",
    home: "होम",
    charts: "चार्ट",
    calculator: "कैलकुलेटर",
    currency: "मुद्रा",
    average: "औसत",
    minimum: "न्यूनतम",
    maximum: "अधिकतम",
    change: "परिवर्तन",
    priceStatistics: "मूल्य सांख्यिकी",
    keyMetrics: "में मुख्य मेट्रिक्स",
    day: "दिन",
    week: "सप्ताह",
    month: "महीना",
    months: "महीने",
    year: "वर्ष",
    dailyChange: "दैनिक परिवर्तन",
    todayVsYesterday: "आज बनाम कल"
  },
  ja: {
    goldPriceTracker: "現在の金価格",
    trackRealTime: "さまざまな通貨でのリアルタイムの金価格を追跡",
    currentGoldPrice: "現在の金価格",
    goldPriceByUnit: "単位あたりの金価格",
    compareGoldPrices: "異なる単位と通貨での金価格を比較する",
    priceTrend: "価格動向",
    historicalGoldPrice: "の過去の金価格",
    lastUpdated: "最終更新日",
    priceOf: "の価格",
    gram: "グラム",
    ounce: "オンス",
    kilogram: "キログラム",
    days: "日",
    country: "国",
    currency: "通貨",
    pricePerGram: "1グラムあたりの価格",
    pricePerOunce: "1オンスあたりの価格",
    pricePerKilo: "1キログラムあたりの価格",
    refresh: "更新",
    search: "検索",
    selectCountry: "国を選択",
    selectUnit: "単位を選択",
    sortAscending: "昇順にソート",
    sortDescending: "降順にソート",
    home: "ホーム",
    charts: "チャート",
    calculator: "計算機",
    currency: "通貨",
    average: "平均",
    minimum: "最小",
    maximum: "最大",
    change: "変化",
    priceStatistics: "価格統計",
    keyMetrics: "の主要指標",
    day: "日",
    week: "週",
    month: "月",
    months: "ヶ月",
    year: "年",
    dailyChange: "毎日の変化",
    todayVsYesterday: "今日 vs 昨日"
  },
  ru: {
    goldPriceTracker: "Текущая цена на золото",
    trackRealTime: "Отслеживайте цены на золото в реальном времени в разных валютах",
    currentGoldPrice: "Текущая цена на золото",
    goldPriceByUnit: "Цена золота за единицу",
    compareGoldPrices: "Сравните цены на золото в разных единицах и валютах",
    priceTrend: "Тенденция цены",
    historicalGoldPrice: "Историческая цена на золото в",
    lastUpdated: "Последнее обновление",
    priceOf: "Цена",
    gram: "грамм",
    ounce: "унция",
    kilogram: "килограмм",
    days: "дни",
    country: "Страна",
    currency: "Валюта",
    pricePerGram: "Цена за грамм",
    pricePerOunce: "Цена за унцию",
    pricePerKilo: "Цена за килограмм",
    refresh: "Обновить",
    search: "Поиск",
    selectCountry: "Выберите страну",
    selectUnit: "Выберите единицу",
    sortAscending: "Сортировать по возрастанию",
    sortDescending: "Сортировать по убыванию",
    home: "Главная",
    charts: "Графики",
    calculator: "Калькулятор",
    currency: "Валюта",
    average: "Среднее",
    minimum: "Минимум",
    maximum: "Максимум",
    change: "Изменение",
    priceStatistics: "Статистика цен",
    keyMetrics: "Ключевые показатели в",
    day: "День",
    week: "Неделя",
    month: "Месяц",
    months: "Месяцы",
    year: "Год",
    dailyChange: "Ежедневное изменение",
    todayVsYesterday: "Сегодня vs. Вчера"
  }
};
