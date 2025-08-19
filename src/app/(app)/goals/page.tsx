import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlusCircle } from "lucide-react";

const goals = [
  {
    title: "Increase Product Adoption by 15%",
    description: "Drive key feature usage across all user segments.",
    owner: "Team",
    progress: 66,
    milestones: ["Q3 Objective", "Company Goal"],
  },
  {
    title: "Master New Design Software",
    description: "Complete Figma advanced course and apply to new projects.",
    owner: "Alex Turner",
    progress: 80,
    milestones: ["Personal Goal", "Q2 Development"],
  },
  {
    title: "Reduce Churn Rate by 5%",
    description: "Improve customer onboarding and support response times.",
    owner: "Team",
    progress: 45,
    milestones: ["Q3 Objective", "Customer Success"],
  },
  {
    title: "Ship Project Phoenix",
    description: "Successfully launch the new platform rewrite.",
    owner: "Team",
    progress: 95,
    milestones: ["Company Goal"],
  },
];

export default function GoalsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Goals & Milestones</h1>
          <p className="text-muted-foreground">
            Track your progress towards individual and team objectives.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Goal
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {goals.map((goal) => (
          <Card key={goal.title}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{goal.title}</CardTitle>
                <Badge variant={goal.owner === "Team" ? "secondary" : "outline"}>
                  {goal.owner}
                </Badge>
              </div>
              <CardDescription>{goal.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">{goal.progress}%</span>
              </div>
              <Progress value={goal.progress} />
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              {goal.milestones.map((milestone) => (
                <Badge key={milestone} variant="outline" className="font-normal">
                  {milestone}
                </Badge>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
