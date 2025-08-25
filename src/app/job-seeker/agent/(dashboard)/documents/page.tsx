
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FilePlus, UploadCloud } from "lucide-react";

export default function AgentDocumentsPage() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Candidate Document Vault</CardTitle>
                        <CardDescription>Manage and upload required documents for your candidates.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                     <Tabs defaultValue="all">
                        <TabsList>
                            <TabsTrigger value="all">All Documents</TabsTrigger>
                            <TabsTrigger value="passports">Passports/IDs</TabsTrigger>
                            <TabsTrigger value="medical">Medical Reports</TabsTrigger>
                            <TabsTrigger value="wakalas">Wakalas</TabsTrigger>
                            <TabsTrigger value="travel">Tickets & Travel Docs</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all" className="mt-4">
                            <div className="text-center text-muted-foreground py-12">
                                <p>Candidate documents will appear here.</p>
                                <Button variant="secondary" className="mt-4"><FilePlus className="mr-2 h-4 w-4" /> Upload Document</Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Upload Ticket & Travel Docs</CardTitle>
                        <CardDescription>Upload these to unlock the final payment for the seeker.</CardDescription>
                    </div>
                     <Button><UploadCloud className="mr-2 h-4 w-4" /> Upload</Button>
                </CardHeader>
                <CardContent>
                     <p className="text-sm text-center text-muted-foreground py-8">Select a candidate from the submissions pipeline to upload their travel documents.</p>
                </CardContent>
            </Card>
        </div>
    );
}
