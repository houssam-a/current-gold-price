
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getGoldPrice, GoldPrice } from "@/lib/api";
import { conversionFactors, countries, goldUnits } from "@/lib/currency-data";
import { toast } from "sonner";
import { RefreshCw, Calculator } from "lucide-react";

export default function GoldCalculator() {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [selectedUnit, setSelectedUnit] = useState("gram");
  const [weight, setWeight] = useState<string>("1");
  const [purity, setPurity] = useState<string>("24"); // 24K gold is 99.9% pure
  const [goldPrice, setGoldPrice] = useState<GoldPrice | null>(null);
  const [calculatedValue, setCalculatedValue] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const country = countries.find((c) => c.code === selectedCountry);

  useEffect(() => {
    fetchGoldPrice();
  }, [selectedCountry]);

  const fetchGoldPrice = async () => {
    if (!country) return;
    
    setIsLoading(true);
    try {
      const data = await getGoldPrice(country.currency);
      setGoldPrice(data);
    } catch (error) {
      console.error("Error fetching gold price:", error);
      toast.error("Failed to fetch gold price");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCalculate = () => {
    if (!goldPrice || !weight || !purity || isNaN(Number(weight)) || isNaN(Number(purity))) {
      toast.error("Please enter valid weight and purity");
      return;
    }

    const weightNum = Number(weight);
    const purityPercentage = Number(purity) / 24; // Convert karat to percentage (24K = 100%)
    
    // Convert gold price to the selected unit
    const factor = conversionFactors[selectedUnit as keyof typeof conversionFactors] || 1;
    const pricePerUnit = goldPrice.price / factor;
    
    // Calculate the value
    const value = weightNum * pricePerUnit * purityPercentage;
    setCalculatedValue(Number(value.toFixed(2)));
  };

  // Purity options in karats
  const purityOptions = [
    { value: "24", label: "24K - 99.9% Pure" },
    { value: "22", label: "22K - 91.7% Pure" },
    { value: "18", label: "18K - 75.0% Pure" },
    { value: "14", label: "14K - 58.3% Pure" },
    { value: "10", label: "10K - 41.7% Pure" }
  ];

  return (
    <div className="container py-8 max-w-screen-lg">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Gold Value Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate the value of gold based on weight, purity, and current price
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="gold-card">
          <CardHeader>
            <CardTitle>Gold Calculator</CardTitle>
            <CardDescription>
              Enter details to calculate gold value
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Country
                  </label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <span className="mr-2">{country.flag}</span>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Gold Unit
                  </label>
                  <Select value={selectedUnit} onValueChange={setSelectedUnit}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {goldUnits.map((unit) => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Weight ({selectedUnit})
                  </label>
                  <Input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder={`Enter weight in ${selectedUnit}`}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Purity
                  </label>
                  <Select value={purity} onValueChange={setPurity}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select purity" />
                    </SelectTrigger>
                    <SelectContent>
                      {purityOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Current Gold Price
                  </label>
                  <div className="flex">
                    <Input
                      type="text"
                      value={
                        goldPrice
                          ? `${goldPrice.price} ${goldPrice.currency}/${
                              goldUnits.find((u) => u.value === "ounce")?.label
                            }`
                          : "Loading..."
                      }
                      readOnly
                      disabled={isLoading}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-2"
                      onClick={fetchGoldPrice}
                      disabled={isLoading}
                    >
                      <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                      <span className="sr-only">Refresh price</span>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last updated:{" "}
                    {goldPrice
                      ? new Date(goldPrice.timestamp).toLocaleString()
                      : "Loading..."}
                  </p>
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={handleCalculate}
                    className="w-full gold-gradient"
                    disabled={isLoading}
                  >
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate Value
                  </Button>
                </div>
              </div>

              {calculatedValue !== null && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
                  <div className="text-lg text-muted-foreground mb-1">
                    Calculated Gold Value
                  </div>
                  <div className="text-3xl font-bold">
                    {goldPrice?.currency} {calculatedValue.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Based on {weight} {selectedUnit} of {purity}K gold
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gold Purity Reference</CardTitle>
            <CardDescription>
              Understanding gold purity and its value
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="py-2 px-3 text-left">Karat</th>
                      <th className="py-2 px-3 text-left">Purity %</th>
                      <th className="py-2 px-3 text-left">Typical Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="py-2 px-3">24K</td>
                      <td className="py-2 px-3">99.9%</td>
                      <td className="py-2 px-3">Investment, bullion</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2 px-3">22K</td>
                      <td className="py-2 px-3">91.7%</td>
                      <td className="py-2 px-3">High-end jewelry</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2 px-3">18K</td>
                      <td className="py-2 px-3">75.0%</td>
                      <td className="py-2 px-3">Luxury jewelry</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2 px-3">14K</td>
                      <td className="py-2 px-3">58.3%</td>
                      <td className="py-2 px-3">Common jewelry</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2 px-3">10K</td>
                      <td className="py-2 px-3">41.7%</td>
                      <td className="py-2 px-3">Affordable jewelry</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2">How Gold Value Is Calculated</h3>
                <p className="text-sm text-muted-foreground">
                  The formula used is:
                  <br />
                  <span className="font-mono bg-background p-1 rounded my-1 inline-block">
                    Value = Weight × Gold Price × Purity Percentage
                  </span>
                  <br />
                  For example, 10 grams of 18K gold with a current gold price of $60 per gram:
                  <br />
                  10g × $60/g × (18/24) = $450
                </p>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2">Gold Weight Conversion</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>1 Troy Ounce = 31.1035 grams</li>
                  <li>1 Kilogram = 1,000 grams</li>
                  <li>1 Troy Ounce = 0.0311035 kilograms</li>
                  <li>1 Kilogram = 32.1507 troy ounces</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Gold Investment Tips</CardTitle>
          <CardDescription>
            Basic guidance for gold investors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Physical Gold</h3>
              <p className="text-sm text-muted-foreground">
                Physical gold (coins, bars, jewelry) offers direct ownership but may have storage and security costs. Consider premium over spot price when buying.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Gold ETFs</h3>
              <p className="text-sm text-muted-foreground">
                Exchange-traded funds provide exposure to gold prices without physical ownership. They're liquid and have lower transaction costs.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Market Timing</h3>
              <p className="text-sm text-muted-foreground">
                Gold often performs well during economic uncertainty and inflation. Monitor economic indicators and central bank policies.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
