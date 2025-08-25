
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AdminSystemHealthPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>System Health</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Real-time status of services, error rates, latencies, and feature flags will be monitored here.</p>
            </CardContent>
        </Card>
    );
}
