
export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface SpendingGoal {
  id: string;
  category: string | 'overall';
  amount: number;
  period: 'monthly' | 'weekly';
}

export type ChartData = {
  name: string;
  value: number;
  color: string;
};
