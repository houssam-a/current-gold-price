
import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";

export function Layout() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="gold-currency-theme">
      <LanguageProvider>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
          <footer className="border-t py-3">
            <div className="container flex flex-col items-center justify-between gap-2 md:h-10 md:flex-row">
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} Current Gold Price
              </p>
            </div>
          </footer>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
