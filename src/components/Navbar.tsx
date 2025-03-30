
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";
import { SidebarTrigger } from "./ui/sidebar";

export function Navbar() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <SidebarTrigger className="mr-2" />
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Gold Currency Navigator
            </span>
          </Link>
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
