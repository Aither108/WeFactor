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
import Link from "next/link";
import { surveysData } from "@/lib/surveys";

const surveys = surveysData;

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
                {(() => { const statusVariant: 'default' | 'secondary' = survey.status === 'Open' ? 'default' : 'secondary'; return (
                  <Badge variant={statusVariant}>
                  {survey.status}
                  </Badge>
                ); })()}
                {survey.isAnonymous && <Badge variant="outline">Anonymous</Badge>}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" disabled={survey.status === 'Closed'}>
                <Link href={`/surveys/${survey.slug}`}>
                  {survey.status === 'Open' ? 'Start Survey' : 'View Results'}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
