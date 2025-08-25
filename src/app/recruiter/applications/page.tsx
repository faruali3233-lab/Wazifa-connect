"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stages = ["Applied", "Interested", "Medical", "Wakala", "Ticket", "Ready to Fly", "Hired"];

const mockApplications = [
    { id: 1, name: "Ravi K.", job: "Heavy Duty Driver", stage: "Applied" },
    { id: 2, name: "Aisha B.", job: "Household Cook", stage: "Interested" },
    { id: 3, name: "Manoj V.", job: "Construction Painter", stage: "Wakala" },
    { id: 4, name: "Sunita S.", job: "Delivery Driver", stage: "Applied" },
];

export default function RecruiterApplicationsPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <CardHeader className="p-0 mb-4">
            <CardTitle className="flex items-center gap-2 text-3xl">
                Applications Pipeline
            </CardTitle>
            <CardDescription>
                Manage all candidates who have applied to your jobs.
            </CardDescription>
        </CardHeader>
      </div>

      <div className="flex-1 overflow-x-auto">
        <div className="inline-grid grid-flow-col auto-cols-max gap-4 p-6 pt-0">
          {stages.map(stage => (
            <div key={stage} className="w-72 bg-muted/50 rounded-lg">
              <h3 className="font-semibold p-3 border-b">{stage} ({mockApplications.filter(a => a.stage === stage).length})</h3>
              <div className="p-3 space-y-3 overflow-y-auto">
                {mockApplications
                  .filter(app => app.stage === stage)
                  .map(app => (
                    <Card key={app.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-3">
                        <p className="font-semibold text-sm">{app.name}</p>
                        <p className="text-xs text-muted-foreground">{app.job}</p>
                        <div className="mt-2">
                            {stage === 'Applied' && (
                                <Button size="sm" className="w-full">Mark Interested</Button>
                            )}
                             {stage === 'Medical' && (
                                <Button size="sm" variant="outline" className="w-full">Request Info</Button>
                            )}
                             {stage === 'Wakala' && (
                                <Button size="sm" className="w-full">Upload Wakala</Button>
                            )}
                        </div>
                      </CardContent>
                    </Card>
                ))}
                 {mockApplications.filter(a => a.stage === stage).length === 0 && (
                    <div className="text-center py-10 text-xs text-muted-foreground">
                        <p>No applications in this stage.</p>
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
