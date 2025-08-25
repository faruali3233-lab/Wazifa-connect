
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "./ui/badge";

const stages = ["Submitted", "Shortlisted", "Selected", "Offer", "Ticketed", "Hired"];

const mockSubmissions = [
    { name: "Ravi Kumar", job: "Heavy Duty Driver", stage: "Shortlisted", subAgent: "SA01", recruiter: "Al-Futtaim" },
    { name: "Aarav Sharma", job: "Household Cook", stage: "Submitted", subAgent: "SA02", recruiter: "Private Villa" },
    { name: "Vijay Singh", job: "Construction Painter", stage: "Offer", subAgent: "SA01", recruiter: "Emaar" },
    { name: "Sunita Devi", job: "Nanny", stage: "Hired", subAgent: "You", recruiter: "Confidential" },
    { name: "Manoj Kumar", job: "AC Technician", stage: "Submitted", subAgent: "You", recruiter: "Carrier" },
    { name: "Priya Patel", job: "Delivery Driver", stage: "Selected", subAgent: "SA03", recruiter: "Aramark" },
]

export function AgentSubmissionsPipeline() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Submissions Pipeline Snapshot</CardTitle>
                <CardDescription>A quick overview of your candidate submission stages.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                    {stages.map(stage => (
                        <div key={stage} className="p-3 rounded-lg bg-muted/50">
                            <h3 className="text-sm font-medium text-muted-foreground">{stage}</h3>
                            <p className="text-3xl font-bold">{mockSubmissions.filter(s => s.stage === stage).length}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

export function FullSubmissionsPipeline() {
  return (
    <div className="flex-1 overflow-x-auto">
      <div className="inline-grid grid-flow-col auto-cols-max gap-4 p-1">
        {stages.map(stage => (
          <div key={stage} className="w-72 bg-muted/50 rounded-lg">
            <h3 className="font-semibold p-3 border-b text-sm">{stage} ({mockSubmissions.filter(a => a.stage === stage).length})</h3>
            <div className="p-3 space-y-3 overflow-y-auto">
              {mockSubmissions
                .filter(app => app.stage === stage)
                .map(app => (
                  <Card key={app.name} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-3 space-y-2">
                      <p className="font-semibold text-sm">{app.name}</p>
                      <p className="text-xs text-muted-foreground">{app.job} @ {app.recruiter}</p>
                      <div className="flex justify-between items-center text-xs">
                        <Badge variant="secondary" className="text-xs">Owner: {app.subAgent}</Badge>
                         <div className="flex items-center gap-1">
                           <Badge variant="outline" className="border-green-300 bg-green-50 text-green-800">Docs</Badge>
                           <Badge variant="outline" className="border-green-300 bg-green-50 text-green-800">Med</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
              ))}
               {mockSubmissions.filter(a => a.stage === stage).length === 0 && (
                  <div className="text-center py-10 text-xs text-muted-foreground">
                      <p>No submissions in this stage.</p>
                  </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
