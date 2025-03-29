
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { CircleDollarSign, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center mr-4">
          <Link to="/" className="flex items-center space-x-2">
            <CircleDollarSign className="h-6 w-6 text-gold-500" />
            <span className="font-bold text-lg">Gold Navigator</span>
          </Link>
        </div>

        <Button
          variant="ghost"
          className="md:hidden"
          size="icon"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle menu</span>
        </Button>

        <nav
          className={`${
            isMenuOpen
              ? "absolute top-14 left-0 right-0 border-b bg-background p-4 md:p-0 md:relative md:top-0 md:border-0 animate-fade-in"
              : "hidden"
          } md:flex md:flex-1 md:items-center md:justify-between`}
        >
          <ul className="flex flex-col md:flex-row md:items-center md:gap-6">
            <li>
              <Link
                to="/"
                className="block py-2 text-sm font-medium text-foreground hover:text-gold-500 md:py-0"
                onClick={() => setIsMenuOpen(false)}
              >
                Gold Price
              </Link>
            </li>
            <li>
              <Link
                to="/converter"
                className="block py-2 text-sm font-medium text-foreground hover:text-gold-500 md:py-0"
                onClick={() => setIsMenuOpen(false)}
              >
                Currency Converter
              </Link>
            </li>
            <li>
              <Link
                to="/charts"
                className="block py-2 text-sm font-medium text-foreground hover:text-gold-500 md:py-0"
                onClick={() => setIsMenuOpen(false)}
              >
                Charts
              </Link>
            </li>
            <li>
              <Link
                to="/calculator"
                className="block py-2 text-sm font-medium text-foreground hover:text-gold-500 md:py-0"
                onClick={() => setIsMenuOpen(false)}
              >
                Calculator
              </Link>
            </li>
          </ul>
          <div className="mt-4 md:mt-0">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
