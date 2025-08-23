import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, MapPin } from "lucide-react";
import type { JobRecommendationsOutput } from "@/ai/flows/job-recommendations";

type Job = JobRecommendationsOutput["recommendations"][0];

export function JobCard({ job }: { job: Job }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{job.jobTitle}</CardTitle>
        <CardDescription className="flex items-center gap-2 pt-1">
            <Building className="h-4 w-4" /> {job.company}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">{job.description}</p>
        <div className="flex items-center gap-2 mt-4">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <Badge variant="secondary">{job.location}</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
            <a href={job.url} target="_blank" rel="noopener noreferrer">View & Apply</a>
        </Button>
      </CardFooter>
    </Card>
  );
}
