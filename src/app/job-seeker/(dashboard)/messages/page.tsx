
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default function JobSeekerMessagesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare /> Messages
        </CardTitle>
        <CardDescription>
          Conversations with recruiters and agents will appear here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center text-muted-foreground py-12">
          <p>You have no messages yet.</p>
        </div>
      </CardContent>
    </Card>
  );
}
