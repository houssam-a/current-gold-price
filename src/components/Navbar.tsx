
import { Link } from "react-router-dom";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";
import { Diamond } from "lucide-react";

export function Navbar() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <Diamond className="h-6 w-6 text-primary/80" />
            <span className="hidden font-bold sm:inline-block text-2xl bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
              Gold Currency Navigator
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              to="/"
              className={navigationMenuTriggerStyle()}
            >
              Home
            </Link>
            <Link
              to="/charts"
              className={navigationMenuTriggerStyle()}
            >
              Charts
            </Link>
            <Link
              to="/calculator"
              className={navigationMenuTriggerStyle()}
            >
              Calculator
            </Link>
            <Link
              to="/currency-converter"
              className={navigationMenuTriggerStyle()}
            >
              Currency
            </Link>
          </nav>
        </div>
        <div className="flex-1" />
        <div className="flex items-center justify-end space-x-2">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
