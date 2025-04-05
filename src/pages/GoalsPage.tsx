
import { Helmet } from "react-helmet";
import GoalsList from "@/components/goals/GoalsList";

const GoalsPage = () => {
  return (
    <div className="container mx-auto max-w-6xl py-6">
      <Helmet>
        <title>Goals | BudgetBuddy</title>
      </Helmet>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Spending Goals</h1>
        <p className="text-muted-foreground">
          Set and track your financial targets
        </p>
      </div>
      
      <GoalsList />
    </div>
  );
};

export default GoalsPage;
