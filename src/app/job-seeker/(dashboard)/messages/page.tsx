
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MessageSquare } from "lucide-react";

export default function JobSeekerMessagesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare /> Messages
        </CardTitle>
        <CardDescription>
          Conversations with recruiters, agents, and admins will appear here. Recruiter messages are moderated for your safety.
        </CardDescription>
      </CardHeader>
      <CardContent>
         <Tabs defaultValue="all">
            <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
                <TabsTrigger value="recruiter">Recruiter Requests</TabsTrigger>
                <TabsTrigger value="agent">Agent/Sub-Agent</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
                <div className="text-center text-muted-foreground py-12">
                  <p>You have no messages yet.</p>
                </div>
            </TabsContent>
         </Tabs>
      </CardContent>
    </Card>
  );
}
