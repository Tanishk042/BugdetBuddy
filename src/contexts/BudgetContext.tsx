
import React, { createContext, useContext, ReactNode } from "react";
import { Expense, Category, SpendingGoal } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { defaultCategories, defaultGoals, sampleExpenses } from "@/data/default-data";
import { generateId } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface BudgetContextType {
  expenses: Expense[];
  categories: Category[];
  goals: SpendingGoal[];
  addExpense: (expense: Omit<Expense, "id">) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  addCategory: (category: Omit<Category, "id">) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  addGoal: (goal: Omit<SpendingGoal, "id">) => void;
  updateGoal: (goal: SpendingGoal) => void;
  deleteGoal: (id: string) => void;
  resetToDefault: () => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>("budgetbuddy-expenses", sampleExpenses);
  const [categories, setCategories] = useLocalStorage<Category[]>("budgetbuddy-categories", defaultCategories);
  const [goals, setGoals] = useLocalStorage<SpendingGoal[]>("budgetbuddy-goals", defaultGoals);

  // Expense functions
  const addExpense = (expenseData: Omit<Expense, "id">) => {
    const newExpense = { ...expenseData, id: generateId() };
    setExpenses([...expenses, newExpense]);
    toast({
      title: "Expense added",
      description: `$${expenseData.amount.toFixed(2)} added to ${
        categories.find(c => c.id === expenseData.category)?.name || expenseData.category
      }`,
    });
  };

  const updateExpense = (updatedExpense: Expense) => {
    setExpenses(expenses.map(exp => (exp.id === updatedExpense.id ? updatedExpense : exp)));
    toast({
      title: "Expense updated",
      description: "Your expense has been updated successfully.",
    });
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
    toast({
      title: "Expense deleted",
      description: "Your expense has been removed.",
      variant: "destructive",
    });
  };

  // Category functions
  const addCategory = (categoryData: Omit<Category, "id">) => {
    const id = categoryData.name.toLowerCase().replace(/\s+/g, '-');
    const newCategory = { ...categoryData, id };
    setCategories([...categories, newCategory]);
    toast({
      title: "Category created",
      description: `"${categoryData.name}" category has been added.`,
    });
  };

  const updateCategory = (updatedCategory: Category) => {
    setCategories(
      categories.map(cat => (cat.id === updatedCategory.id ? updatedCategory : cat))
    );
    toast({
      title: "Category updated",
      description: `"${updatedCategory.name}" category has been updated.`,
    });
  };

  const deleteCategory = (id: string) => {
    // Check if there are expenses using this category
    const hasExpenses = expenses.some(exp => exp.id === id);
    
    if (hasExpenses) {
      toast({
        title: "Cannot delete category",
        description: "This category is being used by existing expenses.",
        variant: "destructive",
      });
      return;
    }
    
    setCategories(categories.filter(cat => cat.id !== id));
    setGoals(goals.filter(goal => goal.category !== id));
    
    toast({
      title: "Category deleted",
      description: "Category has been removed.",
      variant: "destructive",
    });
  };

  // Goal functions
  const addGoal = (goalData: Omit<SpendingGoal, "id">) => {
    const newGoal = { ...goalData, id: generateId() };
    setGoals([...goals, newGoal]);
    toast({
      title: "Goal created",
      description: "Your new spending goal has been added.",
    });
  };

  const updateGoal = (updatedGoal: SpendingGoal) => {
    setGoals(goals.map(goal => (goal.id === updatedGoal.id ? updatedGoal : goal)));
    toast({
      title: "Goal updated",
      description: "Your spending goal has been updated.",
    });
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
    toast({
      title: "Goal deleted",
      description: "Your spending goal has been removed.",
      variant: "destructive",
    });
  };

  const resetToDefault = () => {
    setExpenses(sampleExpenses);
    setCategories(defaultCategories);
    setGoals(defaultGoals);
    toast({
      title: "Reset to default",
      description: "All data has been reset to default values.",
    });
  };

  const value = {
    expenses,
    categories,
    goals,
    addExpense,
    updateExpense,
    deleteExpense,
    addCategory,
    updateCategory,
    deleteCategory,
    addGoal,
    updateGoal,
    deleteGoal,
    resetToDefault,
  };

  return <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>;
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }
  return context;
};
