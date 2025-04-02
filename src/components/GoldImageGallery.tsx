
import { useState, useEffect } from "react";
import { goldImages } from "@/lib/currency-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

export function GoldImageGallery() {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const isMobile = useIsMobile();
  
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
  
  // Toggle auto-play
  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };
  
  // Auto-change image every 5 seconds if auto-play is enabled
  useEffect(() => {
    let interval: number | undefined;
    
    if (isAutoPlaying) {
      interval = window.setInterval(() => {
        nextImage();
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying]);
  
  const currentImage = goldImages[currentImageIndex];
  
  // Use smaller images on mobile to improve performance
  const imageSize = isMobile ? "?auto=format&fit=crop&w=400&h=225" : "?auto=format&fit=crop&w=800&h=450";
  
  return (
    <Card className="overflow-hidden shadow-lg border-gold-200 dark:border-gold-800">
      <CardContent className="p-0 relative">
        <div className="aspect-[16/9] relative">
          <img 
            src={`${currentImage.src}${imageSize}`}
            alt={currentImage.alt}
            className="w-full h-full object-cover transition-opacity duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex items-end">
            <p className="text-white p-4 font-medium text-center w-full">{currentImage.alt}</p>
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
            onClick={toggleAutoPlay}
            className="bg-white/80 hover:bg-white rounded-full mx-1"
            aria-label={isAutoPlaying ? t("pauseSlideshow") : t("playSlideshow")}
          >
            {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
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
