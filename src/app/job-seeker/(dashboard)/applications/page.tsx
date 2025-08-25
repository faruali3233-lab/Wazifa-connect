
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function JobSeekerApplicationsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText /> My Applications
        </CardTitle>
        <CardDescription>
          Track the status of all the jobs you've applied for.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center text-muted-foreground py-12">
          <p>When you apply for jobs, they will appear here.</p>
        </div>
      </CardContent>
    </Card>
  );
}
