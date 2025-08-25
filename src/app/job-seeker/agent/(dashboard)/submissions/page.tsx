
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stages = ["Submitted", "Shortlisted", "Selected", "Offer", "Ticketed", "Hired"];

const mockSubmissions = [
    { id: 1, candidate: "Ravi Kumar", job: "Heavy Duty Driver", stage: "Selected", owner: "You" },
    { id: 2, candidate: "Aisha Begum", job: "Household Cook", stage: "Submitted", owner: "SA-01" },
    { id: 3, candidate: "Manoj Verma", job: "Construction Painter", stage: "Shortlisted", owner: "You" },
    { id: 4, candidate: "Sunita Singh", job: "Nanny", stage: "Ticketed", owner: "SA-02" },
    { id: 5, candidate: "Arjun Reddy", job: "AC Technician", stage: "Submitted", owner: "SA-01" },
     { id: 6, candidate: "Priya Sharma", job: "Heavy Duty Driver", stage: "Hired", owner: "You" },
];

export default function AgentSubmissionsPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <CardHeader className="p-0 mb-4">
            <CardTitle className="flex items-center gap-2 text-3xl">
                Submissions Pipeline
            </CardTitle>
            <CardDescription>
                Track candidates submitted by you and your sub-agents through the hiring process.
            </CardDescription>
        </CardHeader>
      </div>

      <div className="flex-1 overflow-x-auto">
        <div className="inline-grid grid-flow-col auto-cols-max gap-4 p-6 pt-0">
          {stages.map(stage => (
            <div key={stage} className="w-72 bg-muted/50 rounded-lg">
              <h3 className="font-semibold p-3 border-b">{stage} ({mockSubmissions.filter(a => a.stage === stage).length})</h3>
              <div className="p-3 space-y-3 overflow-y-auto">
                {mockSubmissions
                  .filter(app => app.stage === stage)
                  .map(app => (
                    <Card key={app.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-3">
                        <p className="font-semibold text-sm">{app.candidate}</p>
                        <p className="text-xs text-muted-foreground">{app.job}</p>
                        <Badge variant="secondary" className="mt-2">Owner: {app.owner}</Badge>
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
    </div>
  );
}

    