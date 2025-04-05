
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useBudget } from "@/contexts/BudgetContext";
import { formatCurrency } from "@/lib/utils";
import RecentExpenses from "@/components/dashboard/RecentExpenses";
import CategoryDistributionChart from "@/components/dashboard/CategoryDistributionChart";
import MonthlySpendingChart from "@/components/dashboard/MonthlySpendingChart";
import GoalProgress from "@/components/dashboard/GoalProgress";
import { ArrowDownCircle, ArrowUpCircle, Calculator, PiggyBank } from "lucide-react";

const DashboardPage = () => {
  const { expenses, categories, goals } = useBudget();

  // Filter for this month's expenses
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const thisMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
  });

  const previousMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    return expenseDate.getMonth() === prevMonth && expenseDate.getFullYear() === prevYear;
  });

  // Calculate total expenses
  const totalMonthlyExpense = thisMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalPreviousMonthExpense = previousMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Calculate month-over-month change
  const percentageChange = totalPreviousMonthExpense === 0 
    ? 100 
    : ((totalMonthlyExpense - totalPreviousMonthExpense) / totalPreviousMonthExpense) * 100;
  
  // Get current month name
  const currentMonthName = new Date().toLocaleString('default', { month: 'long' });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to BudgetBuddy! Track your expenses and meet your financial goals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="animate-fade">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total {currentMonthName} Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {formatCurrency(totalMonthlyExpense)}
              </div>
              <div className={`flex items-center ${percentageChange > 0 ? 'text-red-500' : 'text-budget-mint'}`}>
                {percentageChange > 0 ? (
                  <ArrowUpCircle className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownCircle className="h-4 w-4 mr-1" />
                )}
                <span className="text-sm">
                  {Math.abs(percentageChange).toFixed(1)}% {percentageChange > 0 ? 'increase' : 'decrease'}
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Compared to last month
            </p>
          </CardContent>
        </Card>

        <Card className="animate-fade">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Average Daily Spend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                totalMonthlyExpense / 
                (thisMonthExpenses.length ? thisMonthExpenses.length : 1)
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Per transaction this month
            </p>
          </CardContent>
        </Card>

        <Card className="animate-fade">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">
                {thisMonthExpenses.length}
              </div>
              <Calculator className="h-5 w-5 ml-2 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              This month
            </p>
          </CardContent>
        </Card>

        <Card className="animate-fade">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Savings Goal Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">
                {goals.length > 0 ? `${goals.length} Active` : "No Goals"}
              </div>
              <PiggyBank className="h-5 w-5 ml-2 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Budget targets set
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentExpenses expenses={expenses} categories={categories} />
        </div>
        <div>
          <GoalProgress expenses={thisMonthExpenses} goals={goals} categories={categories} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CategoryDistributionChart expenses={thisMonthExpenses} categories={categories} />
        <MonthlySpendingChart expenses={expenses} />
      </div>
    </div>
  );
};

export default DashboardPage;
