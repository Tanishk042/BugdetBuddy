
import { Helmet } from "react-helmet";
import GoalForm from "@/components/forms/GoalForm";

const CreateGoalPage = () => {
  return (
    <div className="container mx-auto max-w-4xl py-6">
      <Helmet>
        <title>Create Goal | BudgetBuddy</title>
      </Helmet>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Create a Spending Goal</h1>
        <p className="text-muted-foreground">
          Set realistic financial targets to guide your spending habits
        </p>
      </div>
      <GoalForm />
    </div>
  );
};

export default CreateGoalPage;
