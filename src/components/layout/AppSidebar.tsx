
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  Home, 
  PlusCircle, 
  Goal, 
  Download, 
  Settings,
  PiggyBank
} from "lucide-react";

export function AppSidebar() {
  const location = useLocation();
  const [selectedLabel, setSelectedLabel] = useState(location.pathname);

  return (
    <Sidebar>
      <SidebarHeader className="h-20 flex items-center px-6">
        <div className="flex items-center space-x-2">
          <PiggyBank className="text-primary h-8 w-8" />
          <div>
            <div className="text-xl font-bold">BudgetBuddy</div>
            <div className="text-xs text-muted-foreground">Expense Tracker</div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === "/"}
                >
                  <Link to="/" onClick={() => setSelectedLabel("/")}>
                    <Home className="h-5 w-5 mr-3" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === "/add-expense"}
                >
                  <Link to="/add-expense" onClick={() => setSelectedLabel("/add-expense")}>
                    <PlusCircle className="h-5 w-5 mr-3" />
                    <span>Add Expense</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === "/insights"}
                >
                  <Link to="/insights" onClick={() => setSelectedLabel("/insights")}>
                    <BarChart3 className="h-5 w-5 mr-3" />
                    <span>Insights</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === "/goals"}
                >
                  <Link to="/goals" onClick={() => setSelectedLabel("/goals")}>
                    <Goal className="h-5 w-5 mr-3" />
                    <span>Goals</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === "/export"}
                >
                  <Link to="/export" onClick={() => setSelectedLabel("/export")}>
                    <Download className="h-5 w-5 mr-3" />
                    <span>Export Data</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === "/settings"}
                >
                  <Link to="/settings" onClick={() => setSelectedLabel("/settings")}>
                    <Settings className="h-5 w-5 mr-3" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-6 py-3">
        <div className="text-xs text-muted-foreground">
          <p>© 2025 BudgetBuddy</p>
          <p>Make your money work for you</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
