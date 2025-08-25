
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

const stages = ["Applied", "Interested", "Medical", "Wakala", "Phase-1", "Ticket", "Final", "Ready to Fly", "Hired"];

const mockApplications = [
    { id: 1, jobTitle: "Heavy Duty Driver", company: "Al-Futtaim Logistics", location: "Dubai, UAE", stage: "Wakala" },
    { id: 2, jobTitle: "Construction Painter", company: "Emaar Properties", location: "Abu Dhabi, UAE", stage: "Medical" },
    { id: 3, jobTitle: "Household Cook", company: "Private Villa", location: "Riyadh, KSA", stage: "Interested" },
    { id: 4, jobTitle: "Delivery Driver", company: "Aramark", location: "Doha, Qatar", stage: "Applied" },
    { id: 5, jobTitle: "AC Technician", company: "Carrier", location: "Dubai, UAE", stage: "Applied" },
];

export default function JobSeekerApplicationsPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <CardHeader className="p-0 mb-4">
            <CardTitle className="flex items-center gap-2 text-3xl">
                <FileText /> My Applications
            </CardTitle>
            <CardDescription>
                Track the status of all the jobs you've applied for, from start to finish.
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
                        <p className="font-semibold text-sm">{app.jobTitle}</p>
                        <p className="text-xs text-muted-foreground">{app.company} - {app.location}</p>
                        <Badge variant="secondary" className="mt-2">{app.stage}</Badge>
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
