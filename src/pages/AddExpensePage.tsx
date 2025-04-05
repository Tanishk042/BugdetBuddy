
import { Helmet } from "react-helmet";
import ExpenseForm from "@/components/forms/ExpenseForm";

const AddExpensePage = () => {
  return (
    <div className="container mx-auto max-w-4xl py-6">
      <Helmet>
        <title>Add Expense | BudgetBuddy</title>
      </Helmet>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Add Expense</h1>
        <p className="text-muted-foreground">
          Record a new expense to your budget tracker
        </p>
      </div>
      <ExpenseForm />
    </div>
  );
};

export default AddExpensePage;
