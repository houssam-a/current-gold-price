
import { Link } from "react-router-dom";
import { 
  Home, 
  Calculator, 
  Smartphone, 
  Newspaper, 
  HeartHandshake
} from "lucide-react";
import { 
  Sidebar as UISidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { useLanguage } from "@/context/LanguageContext";

export function Sidebar() {
  const { t } = useLanguage();
  
  const menuItems = [
    { 
      icon: Home, 
      label: "Home", 
      path: "/" 
    },
    { 
      icon: Calculator, 
      label: "Calculator", 
      path: "/calculator" 
    },
    { 
      icon: Smartphone, 
      label: "Mobile App", 
      path: "/mobile-app" 
    },
    { 
      icon: Newspaper, 
      label: "News", 
      path: "/news" 
    },
    { 
      icon: Newspaper, 
      label: "Mining News", 
      path: "/mining-news" 
    },
    { 
      icon: HeartHandshake, 
      label: "Contact US", 
      path: "/contact" 
    },
  ];

  return (
    <UISidebar side="left" variant="sidebar" collapsible="icon">
      <SidebarHeader className="border-b border-gold-300 dark:border-gold-800">
        <div className="flex items-center p-2">
          <div className="h-8 w-8 rounded-md bg-gold-500 text-black font-bold flex items-center justify-center">
            G
          </div>
          <span className="ml-2 font-bold text-lg">GoldRate</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton asChild tooltip={item.label}>
                <Link to={item.path} className="flex items-center">
                  <item.icon className="h-5 w-5" />
                  <span className="ml-2">{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </UISidebar>
  );
}
