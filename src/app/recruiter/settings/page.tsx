
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RecruiterSettingsPage() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Settings</CardTitle>
                    <CardDescription>Manage your company profile and notification preferences.</CardDescription>
                </div>
                 <Button>Save Changes</Button>
            </CardHeader>
            <CardContent>
                <div className="text-center text-muted-foreground py-12">
                    <p>Your account settings will be managed here.</p>
                </div>
            </CardContent>
        </Card>
    );
}
