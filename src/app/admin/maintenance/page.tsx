
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function MaintenancePage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="job-seekers">
                    <TabsList>
                        <TabsTrigger value="job-seekers">Job Seekers</TabsTrigger>
                        <TabsTrigger value="agents">Agents</TabsTrigger>
                        <TabsTrigger value="sub-agents">Sub-Agents</TabsTrigger>
                        <TabsTrigger value="recruiters">Recruiters</TabsTrigger>
                    </TabsList>
                    <TabsContent value="job-seekers" className="mt-4">
                        <div className="text-center text-muted-foreground py-12">
                            <p>Maintenance options for Job Seekers will be here.</p>
                        </div>
                    </TabsContent>
                    <TabsContent value="agents" className="mt-4">
                        <div className="text-center text-muted-foreground py-12">
                            <p>Maintenance options for Agents will be here.</p>
                        </div>
                    </TabsContent>
                    <TabsContent value="sub-agents" className="mt-4">
                        <div className="text-center text-muted-foreground py-12">
                            <p>Maintenance options for Sub-Agents will be here.</p>
                        </div>
                    </TabsContent>
                    <TabsContent value="recruiters" className="mt-4">
                        <div className="text-center text-muted-foreground py-12">
                            <p>Maintenance options for Recruiters will be here.</p>
                        </div>
                    </TabsContent>
                 </Tabs>
            </CardContent>
        </Card>
    );
}
