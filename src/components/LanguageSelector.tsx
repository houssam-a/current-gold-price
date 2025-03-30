
import { languages } from "@/lib/currency-data";
import { useLanguage } from "@/context/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { toast } from "sonner";

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();
  
  const currentLanguage = languages.find(lang => lang.code === language);
  
  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    const selectedLang = languages.find(lang => lang.code === langCode);
    if (selectedLang) {
      toast.success(`Language changed to ${selectedLang.name}`);
    }
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
          <span className="text-lg">{currentLanguage?.flag}</span>
          <span className="sr-only">{t("language")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="cursor-pointer"
          >
            <span className="mr-2 text-lg">{lang.flag}</span>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
