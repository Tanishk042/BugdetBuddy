
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  PlusCircle, 
  DollarSign, 
  Goal, 
  BarChart3 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const QuickAddButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            size="lg"
            className={cn(
              "h-14 w-14 rounded-full shadow-lg transition-all duration-200",
              isOpen ? "bg-primary/90 rotate-45" : "bg-primary"
            )}
          >
            <PlusCircle className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end"
          className="min-w-[180px] p-2"
        >
          <DropdownMenuItem onClick={() => handleNavigate("/add-expense")}>
            <DollarSign className="h-4 w-4 mr-2" />
            Add Expense
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleNavigate("/goals/create")}>
            <Goal className="h-4 w-4 mr-2" />
            Create Goal
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleNavigate("/insights")}>
            <BarChart3 className="h-4 w-4 mr-2" />
            View Insights
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default QuickAddButton;
