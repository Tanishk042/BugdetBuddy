
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { BudgetProvider } from "./contexts/BudgetContext";
import MainLayout from "./components/layout/MainLayout";
import AddExpensePage from "./pages/AddExpensePage";
import InsightsPage from "./pages/InsightsPage";
import GoalsPage from "./pages/GoalsPage";
import CreateGoalPage from "./pages/CreateGoalPage";
import ExportPage from "./pages/ExportPage";
import SettingsPage from "./pages/SettingsPage";
import { Helmet } from "react-helmet";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Helmet>
        <title>BudgetBuddy | Expense Tracker</title>
        <meta name="description" content="Track your expenses, set goals, and gain financial insights with BudgetBuddy." />
      </Helmet>

      <Toaster />
      <Sonner />
      <BrowserRouter>
        <BudgetProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/add-expense" element={
              <MainLayout>
                <AddExpensePage />
                <QuickAddButton />
              </MainLayout>
            } />
            <Route path="/insights" element={
              <MainLayout>
                <InsightsPage />
                <QuickAddButton />
              </MainLayout>
            } />
            <Route path="/goals" element={
              <MainLayout>
                <GoalsPage />
                <QuickAddButton />
              </MainLayout>
            } />
            <Route path="/goals/create" element={
              <MainLayout>
                <CreateGoalPage />
                <QuickAddButton />
              </MainLayout>
            } />
            <Route path="/export" element={
              <MainLayout>
                <ExportPage />
                <QuickAddButton />
              </MainLayout>
            } />
            <Route path="/settings" element={
              <MainLayout>
                <SettingsPage />
                <QuickAddButton />
              </MainLayout>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BudgetProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import QuickAddButton from "./components/common/QuickAddButton";
