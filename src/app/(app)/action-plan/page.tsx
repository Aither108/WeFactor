import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award } from "lucide-react";

const tasks = {
  todo: [
    { title: "Review Q2 survey results", points: 20 },
    { title: "Draft personal development goals", points: 40 },
  ],
  doing: [
    { title: "Finalize Q3 OKRs", points: 50 },
    { title: "Prepare for 1-on-1 with Sarah", points: 10 },
  ],
  done: [
    { title: "Complete engagement survey", points: 25 },
    { title: "Onboard new team member", points: 100 },
    { title: "Submit project retrospective", points: 30 },
  ],
};

const TaskCard = ({ title, points }: { title: string; points: number }) => (
  <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
    <CardContent className="p-4">
      <p className="font-medium">{title}</p>
      <Badge variant="secondary" className="mt-2">+{points} pts</Badge>
    </CardContent>
  </Card>
);

export default function ActionPlanPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Action Plan & Points</h1>
        <p className="text-muted-foreground">
          Manage your tasks and watch your level-up points grow.
        </p>
      </div>

      <Card>
        <CardHeader className="flex-row items-center gap-4 space-y-0">
          <Award className="h-10 w-10 text-yellow-500" />
          <div>
            <CardTitle>Gold Tier</CardTitle>
            <CardDescription>1,250 Total Points</CardDescription>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">To Do ({tasks.todo.length})</h2>
          <div className="space-y-3 rounded-lg bg-muted/50 p-4 h-full">
            {tasks.todo.map(task => <TaskCard key={task.title} {...task} />)}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Doing ({tasks.doing.length})</h2>
          <div className="space-y-3 rounded-lg bg-muted/50 p-4 h-full">
            {tasks.doing.map(task => <TaskCard key={task.title} {...task} />)}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Done ({tasks.done.length})</h2>
          <div className="space-y-3 rounded-lg bg-muted/50 p-4 h-full">
            {tasks.done.map(task => <TaskCard key={task.title} {...task} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
