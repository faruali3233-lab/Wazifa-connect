
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function AdminSettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Settings</h1>
                <p className="text-muted-foreground">Manage platform-wide policies, templates, and configurations.</p>
            </div>
             <Tabs defaultValue="policies" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="policies">Policies</TabsTrigger>
                    <TabsTrigger value="sla">SLA</TabsTrigger>
                    <TabsTrigger value="templates">Templates</TabsTrigger>
                    <TabsTrigger value="flags">Feature Flags</TabsTrigger>
                </TabsList>
                <TabsContent value="policies">
                    <Card>
                    <CardHeader>
                        <CardTitle>Fee & Document Policies</CardTitle>
                        <CardDescription>Set rules for payment caps and required documents per role.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-center text-muted-foreground py-12">
                             <p>Policy configuration form will be here.</p>
                             <Button variant="outline" className="mt-4">Edit Policies</Button>
                        </div>
                    </CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="templates">
                    <Card>
                    <CardHeader>
                        <CardTitle>Communication Templates</CardTitle>
                        <CardDescription>Manage rejection reasons, broadcast messages, and canned replies.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-center text-muted-foreground py-12">
                             <p>Template editor will be here.</p>
                             <Button variant="outline" className="mt-4">Manage Templates</Button>
                        </div>
                    </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
