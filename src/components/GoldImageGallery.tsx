
import { useState, useEffect } from "react";
import { goldImages } from "@/lib/currency-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function GoldImageGallery() {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Function to move to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === goldImages.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  // Function to move to the previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? goldImages.length - 1 : prevIndex - 1
    );
  };
  
  // Auto-change image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const currentImage = goldImages[currentImageIndex];
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0 relative">
        <div className="aspect-[16/9] relative">
          <img 
            src={`${currentImage.src}?auto=format&fit=crop&w=800&h=450`}
            alt={currentImage.alt}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex items-end">
            <p className="text-white p-4 font-medium">{currentImage.alt}</p>
          </div>
        </div>
        
        <div className="absolute top-0 inset-x-0 flex justify-between p-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={prevImage}
            className="bg-white/80 hover:bg-white rounded-full"
            aria-label={t("previousImage")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={nextImage}
            className="bg-white/80 hover:bg-white rounded-full"
            aria-label={t("nextImage")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="absolute bottom-4 inset-x-0 flex justify-center gap-1">
          {goldImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImageIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentImageIndex ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
