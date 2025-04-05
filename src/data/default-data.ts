
import { Category, Expense, SpendingGoal } from "@/types";
import { generateId } from "@/lib/utils";

export const defaultCategories: Category[] = [
  { id: "food", name: "Food & Dining", icon: "🍔", color: "#4ade80" },
  { id: "transport", name: "Transportation", icon: "🚗", color: "#93c5fd" },
  { id: "shopping", name: "Shopping", icon: "🛍️", color: "#fecaca" },
  { id: "bills", name: "Bills & Utilities", icon: "📱", color: "#a78bfa" },
  { id: "entertainment", name: "Entertainment", icon: "🎬", color: "#fbbf24" },
  { id: "health", name: "Health & Fitness", icon: "💊", color: "#34d399" },
  { id: "travel", name: "Travel", icon: "✈️", color: "#f472b6" },
  { id: "education", name: "Education", icon: "📚", color: "#60a5fa" },
  { id: "personal", name: "Personal Care", icon: "💆", color: "#9ca3af" },
  { id: "others", name: "Others", icon: "📦", color: "#6b7280" },
];

export const defaultGoals: SpendingGoal[] = [
  { id: generateId(), category: "overall", amount: 2000, period: "monthly" },
  { id: generateId(), category: "food", amount: 400, period: "monthly" },
  { id: generateId(), category: "transport", amount: 150, period: "monthly" },
];

// Sample expenses for demo purposes
export const sampleExpenses: Expense[] = [
  {
    id: generateId(),
    amount: 25.50,
    category: "food",
    date: "2025-04-04",
    description: "Lunch at cafe"
  },
  {
    id: generateId(),
    amount: 45.75,
    category: "transport",
    date: "2025-04-03",
    description: "Gas refill"
  },
  {
    id: generateId(),
    amount: 120.00,
    category: "shopping",
    date: "2025-04-02",
    description: "New clothes"
  },
  {
    id: generateId(),
    amount: 85.20,
    category: "bills",
    date: "2025-04-01",
    description: "Internet bill"
  },
  {
    id: generateId(),
    amount: 32.40,
    category: "entertainment",
    date: "2025-03-30",
    description: "Movie tickets"
  },
  {
    id: generateId(),
    amount: 17.80,
    category: "food",
    date: "2025-03-29",
    description: "Coffee and pastries"
  },
  {
    id: generateId(),
    amount: 65.30,
    category: "health",
    date: "2025-03-28",
    description: "Pharmacy"
  },
  {
    id: generateId(),
    amount: 56.90,
    category: "transport",
    date: "2025-03-27",
    description: "Uber rides"
  },
  {
    id: generateId(),
    amount: 215.50,
    category: "shopping",
    date: "2025-03-26",
    description: "Electronics"
  },
  {
    id: generateId(),
    amount: 8.40,
    category: "food",
    date: "2025-03-25",
    description: "Snacks"
  }
];

// Function to get the total expenses for a period and category
export const getTotalExpensesByCategory = (expenses: Expense[], categoryId: string): number => {
  return expenses
    .filter(expense => expense.category === categoryId)
    .reduce((sum, expense) => sum + expense.amount, 0);
};

// Function to get the data for pie chart
export const getPieChartData = (expenses: Expense[], categories: Category[]): any[] => {
  const data: any[] = [];

  categories.forEach(category => {
    const total = getTotalExpensesByCategory(expenses, category.id);
    if (total > 0) {
      data.push({
        name: category.name,
        value: total,
        color: category.color,
      });
    }
  });

  return data;
};

// Function to get monthly expenses data for bar chart
export const getMonthlyData = (expenses: Expense[]): any[] => {
  // Group expenses by month
  const monthlyData: Record<string, number> = {};
  
  expenses.forEach(expense => {
    const date = new Date(expense.date);
    const month = date.toLocaleString('default', { month: 'short' });
    
    if (!monthlyData[month]) {
      monthlyData[month] = 0;
    }
    
    monthlyData[month] += expense.amount;
  });
  
  // Convert to array format for recharts
  return Object.entries(monthlyData).map(([month, amount]) => ({
    month,
    amount,
  }));
};

// Function to calculate progress towards a spending goal
export const calculateGoalProgress = (
  expenses: Expense[], 
  goal: SpendingGoal,
  categories: Category[]
): { spent: number; remaining: number; percentage: number } => {
  let spent = 0;
  
  if (goal.category === 'overall') {
    // Calculate total spending
    spent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  } else {
    // Calculate spending for specific category
    spent = getTotalExpensesByCategory(expenses, goal.category);
  }
  
  const remaining = Math.max(0, goal.amount - spent);
  const percentage = Math.min(100, Math.round((spent / goal.amount) * 100));
  
  return { spent, remaining, percentage };
};
