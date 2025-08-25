
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function JobSeekerSettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings /> Settings
        </CardTitle>
        <CardDescription>
          Manage your account and notification preferences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center text-muted-foreground py-12">
          <p>Account settings will be available here soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
