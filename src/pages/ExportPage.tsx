
import { Helmet } from "react-helmet";
import ExportOptions from "@/components/insights/ExportOptions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

const ExportPage = () => {
  return (
    <div className="container mx-auto max-w-4xl py-6">
      <Helmet>
        <title>Export Data | BudgetBuddy</title>
      </Helmet>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Export Data</h1>
        <p className="text-muted-foreground">
          Download your expense data for external analysis
        </p>
      </div>

      <div className="grid gap-6">
        <ExportOptions />
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Export Tips</CardTitle>
            </div>
            <CardDescription>
              Get the most out of your exported data
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <h3 className="font-medium mb-1">Working with CSV files</h3>
              <p className="text-sm text-muted-foreground">
                CSV files can be opened with spreadsheet software like Microsoft Excel or Google Sheets for 
                further analysis and visualization of your spending data.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Data Privacy</h3>
              <p className="text-sm text-muted-foreground">
                Your BudgetBuddy data is stored locally in your browser. Exporting creates a copy that you 
                can save to your device. No data is sent to our servers during export.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Regular Exports</h3>
              <p className="text-sm text-muted-foreground">
                Consider exporting your data regularly as a backup. This ensures you always have access to 
                your financial history even if your browser data is cleared.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExportPage;
