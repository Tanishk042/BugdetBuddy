
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Expense, SpendingGoal, Category } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { calculateGoalProgress } from "@/data/default-data";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface GoalProgressProps {
  expenses: Expense[];
  goals: SpendingGoal[];
  categories: Category[];
}

const GoalProgress = ({ expenses, goals, categories }: GoalProgressProps) => {
  // Filter for this month's expenses only
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);
  
  const thisMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= startOfMonth;
  });

  // Get overall goal if it exists
  const overallGoal = goals.find(goal => goal.category === 'overall');

  const getCategoryName = (categoryId: string) => {
    if (categoryId === 'overall') return 'Overall Spending';
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  return (
    <Card className="animate-fade">
      <CardHeader>
        <CardTitle>Budget Goals</CardTitle>
        <CardDescription>Track your monthly spending limits</CardDescription>
      </CardHeader>
      <CardContent>
        {goals.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No goals set</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Show overall goal first if it exists */}
            {overallGoal && (
              <GoalItem 
                goal={overallGoal} 
                expenses={thisMonthExpenses} 
                categories={categories} 
              />
            )}
            
            {/* Then show category-specific goals */}
            {goals
              .filter(goal => goal.category !== 'overall')
              .map(goal => (
                <GoalItem 
                  key={goal.id} 
                  goal={goal} 
                  expenses={thisMonthExpenses} 
                  categories={categories} 
                />
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface GoalItemProps {
  goal: SpendingGoal;
  expenses: Expense[];
  categories: Category[];
}

const GoalItem = ({ goal, expenses, categories }: GoalItemProps) => {
  const progress = calculateGoalProgress(expenses, goal, categories);
  const categoryName = goal.category === 'overall' 
    ? 'Overall Spending' 
    : categories.find(cat => cat.id === goal.category)?.name || 'Unknown';

  const getProgressColor = (percentage: number) => {
    if (percentage > 95) return 'bg-red-500';
    if (percentage > 75) return 'bg-yellow-500';
    return 'bg-budget-mint';
  };

  const getStatusIcon = (percentage: number) => {
    if (percentage >= 100) {
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    }
    if (percentage > 75) {
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
    return <CheckCircle className="h-5 w-5 text-budget-mint" />;
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getStatusIcon(progress.percentage)}
          <span className="font-medium">{categoryName}</span>
        </div>
        <div className="text-sm">
          {formatCurrency(progress.spent)} / {formatCurrency(goal.amount)}
        </div>
      </div>
      <Progress value={progress.percentage} className={getProgressColor(progress.percentage)} />
      <div className="text-xs text-muted-foreground">
        {progress.percentage >= 100 
          ? 'You have exceeded your budget!' 
          : `${formatCurrency(progress.remaining)} remaining`}
      </div>
    </div>
  );
};

export default GoalProgress;
