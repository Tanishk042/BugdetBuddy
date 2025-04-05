
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex items-center h-16 px-6 border-b">
            <SidebarTrigger />
            <div className="ml-auto">
              <span className="text-sm text-muted-foreground">
                April 5, 2025
              </span>
            </div>
          </div>
          <main className="flex-1 overflow-y-auto px-6 py-4">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
