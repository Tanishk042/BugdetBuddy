
import { useBudget } from "@/contexts/BudgetContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";
import { calculateGoalProgress } from "@/data/default-data";
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  AlertTriangle, 
  CheckCircle, 
  Goal as GoalIcon 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const GoalsList = () => {
  const { goals, categories, expenses, deleteGoal } = useBudget();
  const navigate = useNavigate();

  // Filter for this month's expenses only
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);
  
  const thisMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= startOfMonth;
  });

  const getCategoryName = (categoryId: string) => {
    if (categoryId === 'overall') return 'Overall Spending';
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  const getCategoryColor = (categoryId: string) => {
    if (categoryId === 'overall') return '#4ade80'; // Default mint color
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : '#4ade80';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage > 95) return 'bg-red-500';
    if (percentage > 75) return 'bg-yellow-500';
    return 'bg-budget-mint';
  };

  const getMotivationalQuote = (percentage: number) => {
    if (percentage >= 100) {
      return "You've exceeded your budget. Let's adjust for next month!";
    }
    if (percentage > 75) {
      return `Only ${100 - percentage}% of your budget left – be careful!`;
    }
    if (percentage > 50) {
      return "You're halfway through your budget. Looking good!";
    }
    return "You're doing great with your spending!";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Spending Goals</h2>
        <Button onClick={() => navigate("/goals/create")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Goal
        </Button>
      </div>

      {goals.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-4">
              <GoalIcon className="h-12 w-12 text-muted-foreground/50" />
              <div className="space-y-2">
                <h3 className="text-xl font-medium">No Goals Set Yet</h3>
                <p className="text-muted-foreground">
                  Create spending limits to help manage your budget
                </p>
              </div>
              <Button onClick={() => navigate("/goals/create")}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Your First Goal
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal) => {
            const progress = calculateGoalProgress(thisMonthExpenses, goal, categories);
            const categoryName = getCategoryName(goal.category);
            const color = getCategoryColor(goal.category);

            return (
              <Card key={goal.id} className="animate-fade">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        {goal.category !== 'overall' && (
                          <span 
                            className="inline-block mr-2 text-lg"
                            style={{ color }}
                          >
                            {categories.find(c => c.id === goal.category)?.icon}
                          </span>
                        )}
                        {categoryName}
                      </CardTitle>
                      <CardDescription>
                        {goal.period === 'monthly' ? 'Monthly' : 'Weekly'} budget
                      </CardDescription>
                    </div>
                    <div className="flex space-x-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => deleteGoal(goal.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete goal</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        {progress.percentage >= 90 ? (
                          <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-budget-mint mr-1" />
                        )}
                        <span className="text-sm font-medium">
                          {progress.percentage}% used
                        </span>
                      </div>
                      <span className="text-sm">
                        {formatCurrency(progress.spent)} / {formatCurrency(goal.amount)}
                      </span>
                    </div>
                    
                    <Progress 
                      value={progress.percentage} 
                      className={getProgressColor(progress.percentage)}
                    />
                    
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>
                        {formatCurrency(progress.remaining)} remaining
                      </span>
                      {goal.period === 'monthly' && (
                        <span>
                          for {new Date().toLocaleString('default', { month: 'long' })}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-3 rounded-md text-sm italic text-center">
                    "{getMotivationalQuote(progress.percentage)}"
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GoalsList;
