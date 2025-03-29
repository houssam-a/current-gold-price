
import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./ThemeProvider";

export function Layout() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="gold-currency-theme">
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <footer className="border-t py-6 md:py-0">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Gold Currency Navigator. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with Lovable
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
