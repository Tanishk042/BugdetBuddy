
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useBudget } from "@/contexts/BudgetContext";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, BadgeInfo, Trash2, RefreshCw } from "lucide-react";

const SettingsPage = () => {
  const { resetToDefault } = useBudget();

  return (
    <div className="container mx-auto max-w-4xl py-6">
      <Helmet>
        <title>Settings | BudgetBuddy</title>
      </Helmet>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Configure your BudgetBuddy experience
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="data">Data Management</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how BudgetBuddy looks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Currency Display</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Currently set to USD ($). Currency display options coming in a future update.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                Data Management
              </CardTitle>
              <CardDescription>
                Manage your BudgetBuddy data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Reset to Default</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  This will reset all your data to the default values, including expenses, categories, and goals.
                </p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset to Default
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will reset all your data to the default values.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={resetToDefault}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <div>
                <h3 className="font-medium mb-1">Storage Location</h3>
                <p className="text-sm text-muted-foreground">
                  BudgetBuddy stores all your data locally in your browser's storage. 
                  No data is sent to any server.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BadgeInfo className="h-5 w-5 mr-2 text-budget-blue" />
                About BudgetBuddy
              </CardTitle>
              <CardDescription>
                Application information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Version</h3>
                <p className="text-sm text-muted-foreground">
                  BudgetBuddy v1.0.0
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">About</h3>
                <p className="text-sm text-muted-foreground">
                  BudgetBuddy is a personal finance web application designed to help you track expenses,
                  categorize spending, and meet financial goals. All your data is stored locally in your browser.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
