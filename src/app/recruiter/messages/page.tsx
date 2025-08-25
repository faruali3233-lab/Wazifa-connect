
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export default function RecruiterMessagesPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Communicate with agents and job seekers (via moderation).</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center text-muted-foreground py-12">
                    <p>Your message threads will appear here.</p>
                </div>
            </CardContent>
        </Card>
    );
}
