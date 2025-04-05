
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Expense, Category } from "@/types";
import { getPieChartData } from "@/data/default-data";
import { formatCurrency } from "@/lib/utils";

interface CategoryDistributionChartProps {
  expenses: Expense[];
  categories: Category[];
}

const CategoryDistributionChart = ({ expenses, categories }: CategoryDistributionChartProps) => {
  const data = getPieChartData(expenses, categories);

  return (
    <Card className="animate-fade">
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
        <CardDescription>How your money is distributed</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">No data available</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryDistributionChart;
