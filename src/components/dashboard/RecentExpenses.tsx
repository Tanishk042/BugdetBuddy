
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Expense, Category } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Clock, Trash2 } from "lucide-react";
import { useBudget } from "@/contexts/BudgetContext";

interface RecentExpensesProps {
  expenses: Expense[];
  categories: Category[];
}

const RecentExpenses = ({ expenses, categories }: RecentExpensesProps) => {
  const navigate = useNavigate();
  const { deleteExpense } = useBudget();

  // Sort expenses by date (newest first) and take the most recent 5
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const getCategoryInfo = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId) || {
      name: "Uncategorized",
      icon: "📁",
      color: "#6b7280",
    };
  };

  return (
    <Card className="animate-fade">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Expenses</CardTitle>
          <CardDescription>Your latest transactions</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate("/add-expense")}>
          Add New
        </Button>
      </CardHeader>
      <CardContent>
        {recentExpenses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No recent expenses</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => navigate("/add-expense")}
            >
              Add your first expense
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {recentExpenses.map((expense) => {
              const category = getCategoryInfo(expense.category);
              return (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-4 rounded-lg border expense-card-hover"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                      style={{ backgroundColor: category.color + "33" }} // Add transparency
                    >
                      {category.icon}
                    </div>
                    <div>
                      <p className="font-medium">{expense.description}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatDate(expense.date)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">
                      {formatCurrency(expense.amount)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteExpense(expense.id)}
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
            {expenses.length > 5 && (
              <Button 
                variant="ghost" 
                className="w-full mt-2"
                onClick={() => navigate("/insights")}
              >
                View all expenses
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentExpenses;
