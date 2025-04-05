
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBudget } from "@/contexts/BudgetContext";
import CategoryDistributionChart from "@/components/dashboard/CategoryDistributionChart";
import MonthlySpendingChart from "@/components/dashboard/MonthlySpendingChart";
import ExpenseList from "@/components/insights/ExpenseList";

const InsightsPage = () => {
  const { expenses, categories } = useBudget();

  // Filter for this month's expenses
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const thisMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
  });

  return (
    <div className="container mx-auto max-w-7xl py-6">
      <Helmet>
        <title>Insights | BudgetBuddy</title>
      </Helmet>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Insights</h1>
        <p className="text-muted-foreground">
          Analyze your spending patterns and track your financial behavior
        </p>
      </div>

      <Tabs defaultValue="charts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="charts">Charts & Analytics</TabsTrigger>
          <TabsTrigger value="expenses">All Expenses</TabsTrigger>
        </TabsList>

        <TabsContent value="charts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CategoryDistributionChart expenses={thisMonthExpenses} categories={categories} />
            <MonthlySpendingChart expenses={expenses} />
          </div>
          
          <div className="flex justify-center pt-4">
            <div className="text-center max-w-2xl space-y-4">
              <h3 className="text-xl font-bold">Spending Insights</h3>
              <div className="text-muted-foreground">
                {expenses.length === 0 ? (
                  <p>
                    Add some expenses to see your spending insights and track your financial behavior over time.
                  </p>
                ) : (
                  <div className="space-y-2">
                    <p>
                      Your top spending category is{" "}
                      <span className="font-medium">
                        {categories.map(cat => ({
                          id: cat.id,
                          name: cat.name,
                          amount: thisMonthExpenses
                            .filter(exp => exp.category === cat.id)
                            .reduce((sum, exp) => sum + exp.amount, 0)
                        }))
                        .sort((a, b) => b.amount - a.amount)[0]?.name || "None"}
                      </span>
                      .
                    </p>
                    <p>
                      Compare your monthly trends to identify patterns and optimize your financial habits.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="expenses">
          <ExpenseList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InsightsPage;
