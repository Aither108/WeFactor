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

const surveys = [
  {
    title: "Q2 Team Engagement Survey",
    dueDate: "June 30, 2024",
    status: "Open",
    isAnonymous: true,
  },
  {
    title: "Product Feedback - New Feature",
    dueDate: "June 25, 2024",
    status: "Open",
    isAnonymous: false,
  },
  {
    title: "Q1 Wellness Check-in",
    dueDate: "March 31, 2024",
    status: "Closed",
    isAnonymous: true,
  },
  {
    title: "Communication Effectiveness Poll",
    dueDate: "May 15, 2024",
    status: "Closed",
    isAnonymous: true,
  },
];

export default function SurveysPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">Surveys</h1>
        <p className="text-muted-foreground">
          Provide your valuable feedback to help us grow.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {surveys.map((survey) => (
          <Card key={survey.title}>
            <CardHeader>
              <CardTitle>{survey.title}</CardTitle>
              <CardDescription>Due: {survey.dueDate}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge variant={survey.status === 'Open' ? 'default' : 'secondary'}>
                  {survey.status}
                </Badge>
                {survey.isAnonymous && <Badge variant="outline">Anonymous</Badge>}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={survey.status === 'Closed'}>
                {survey.status === 'Open' ? 'Start Survey' : 'View Results'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
