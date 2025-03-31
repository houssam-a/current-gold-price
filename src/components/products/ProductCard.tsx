
import { Product, getSymbolForCurrency } from "@/lib/product-data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const handleProductClick = () => {
    window.open(product.link, "_blank", "noopener,noreferrer");
  };

  return (
    <Card 
      className="overflow-hidden transition-all hover:shadow-lg cursor-pointer border-gold-200 dark:border-gold-800 h-full flex flex-col"
      onClick={handleProductClick}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <img 
          src={product.image} 
          alt={product.name}
          className="object-cover w-full h-full transition-transform hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-gold-500/20 text-gold-700 dark:bg-gold-700/20 dark:text-gold-400">
            {product.category}
          </Badge>
        </div>
      </div>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg leading-tight">{product.name}</CardTitle>
          {product.platformLogo && (
            <img 
              src={product.platformLogo} 
              alt={product.platform} 
              className="h-5 w-auto rounded"
            />
          )}
        </div>
        <CardDescription className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-2 text-sm">
        <div className="flex flex-col gap-1">
          {product.weight && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Weight:</span>
              <span>{product.weight}</span>
            </div>
          )}
          {product.purity && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Purity:</span>
              <span>{product.purity}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Platform:</span>
            <span>{product.platform}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto flex justify-between items-center">
        <div className="text-xl font-bold text-gold-600 dark:text-gold-400">
          {getSymbolForCurrency(product.currency)}{product.price.toFixed(2)}
        </div>
        <Button size="sm" className="gap-1 bg-gold-500 hover:bg-gold-600 text-black">
          Buy <ExternalLink className="h-3.5 w-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
