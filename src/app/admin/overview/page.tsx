
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AdminOverviewPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Key Performance Indicators (KPIs), widgets for funnels, heatmaps, and alerts will be displayed here.</p>
            </CardContent>
        </Card>
    );
}
