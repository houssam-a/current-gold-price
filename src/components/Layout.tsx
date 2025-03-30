
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import { SidebarProvider, SidebarRail, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Sidebar } from "./Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";

export function Layout() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="gold-currency-theme">
      <LanguageProvider>
        <SidebarProvider>
          <div className="flex min-h-screen flex-col">
            <div className="flex flex-1">
              <Sidebar />
              <SidebarRail />
              
              <div className="flex-1 flex flex-col">
                <header className="h-14 border-b flex items-center px-4 justify-end gap-2">
                  <LanguageSelector />
                  <ThemeToggle />
                </header>
                
                <main className="flex-1 p-4">
                  <Outlet />
                </main>
                
                <footer className="border-t py-4 md:py-0">
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
            </div>
          </div>
        </SidebarProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
