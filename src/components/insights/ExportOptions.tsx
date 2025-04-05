
import { useState } from "react";
import { useBudget } from "@/contexts/BudgetContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { downloadCSV } from "@/lib/utils";
import { 
  Download, 
  FileSpreadsheet, 
  Calendar,
  CheckCircle 
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ExportOptions = () => {
  const { expenses, categories } = useBudget();
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState<"all" | "month" | "year">("all");
  const [isExporting, setIsExporting] = useState(false);

  const getFilteredExpenses = () => {
    if (timeRange === "all") {
      return expenses;
    }

    const now = new Date();
    const filtered = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      if (timeRange === "month") {
        return (
          expenseDate.getMonth() === now.getMonth() && 
          expenseDate.getFullYear() === now.getFullYear()
        );
      } else if (timeRange === "year") {
        return expenseDate.getFullYear() === now.getFullYear();
      }
      return true;
    });
    
    return filtered;
  };

  const handleExport = () => {
    setIsExporting(true);
    
    try {
      const filteredExpenses = getFilteredExpenses();
      
      // Format data for CSV
      const csvData = filteredExpenses.map(expense => {
        const category = categories.find(cat => cat.id === expense.category);
        return {
          Date: expense.date,
          Description: expense.description,
          Category: category?.name || "Unknown",
          Amount: expense.amount.toFixed(2)
        };
      });
      
      // Generate filename with current date
      const date = new Date().toISOString().slice(0, 10);
      const filename = `budgetbuddy_expenses_${date}.csv`;
      
      // Download CSV
      downloadCSV(csvData, filename);
      
      toast({
        title: "Export successful",
        description: `${csvData.length} expenses exported to CSV`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "An error occurred while exporting your data",
        variant: "destructive",
      });
      console.error("Export error:", error);
    } finally {
      setIsExporting(false);
    }
  };
  
  const getExportText = () => {
    switch (timeRange) {
      case "month":
        return "Export This Month";
      case "year":
        return "Export This Year";
      default:
        return "Export All Data";
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Your Data</CardTitle>
        <CardDescription>
          Download your expense data as a CSV file
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h3 className="text-sm font-medium">Time Range</h3>
          <Select
            value={timeRange}
            onValueChange={(value) => setTimeRange(value as "all" | "month" | "year")}
          >
            <SelectTrigger className="w-full max-w-xs">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground mt-1">
            {timeRange === "all" ? (
              <>Export all your recorded expenses</>
            ) : timeRange === "month" ? (
              <>Export only expenses from the current month</>
            ) : (
              <>Export expenses from the current year</>
            )}
          </p>
        </div>
        
        <div className="flex flex-col space-y-2">
          <h3 className="text-sm font-medium">Export Format</h3>
          <div className="flex items-center space-x-2 bg-muted/50 p-3 rounded-md">
            <FileSpreadsheet className="h-5 w-5 text-muted-foreground" />
            <span>CSV (Comma Separated Values)</span>
            <CheckCircle className="h-4 w-4 ml-auto text-budget-mint" />
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            CSV files can be opened in Excel, Google Sheets, and other spreadsheet applications
          </p>
        </div>
        
        <div className="pt-2">
          <Button 
            onClick={handleExport}
            disabled={isExporting || expenses.length === 0}
            className="w-full sm:w-auto"
          >
            <Download className="mr-2 h-4 w-4" />
            {getExportText()}
          </Button>
          {expenses.length === 0 && (
            <p className="text-sm text-muted-foreground mt-2">
              You need to add some expenses before exporting
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportOptions;
