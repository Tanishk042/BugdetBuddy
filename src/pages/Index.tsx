
import DashboardPage from "./DashboardPage";
import MainLayout from "@/components/layout/MainLayout";
import { BudgetProvider } from "@/contexts/BudgetContext";
import QuickAddButton from "@/components/common/QuickAddButton";

const Index = () => {
  return (
    <BudgetProvider>
      <MainLayout>
        <DashboardPage />
        <QuickAddButton />
      </MainLayout>
    </BudgetProvider>
  );
};

export default Index;
