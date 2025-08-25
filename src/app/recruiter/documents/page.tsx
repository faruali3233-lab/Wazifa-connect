
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilePlus, UploadCloud } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockWakalas = [
    { id: 'WAK-001', candidate: 'Manoj V.', job: 'Construction Painter', uploadedBy: 'You', date: '2024-08-18' },
];

export default function RecruiterDocumentsPage() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Wakala Management</CardTitle>
                        <CardDescription>Upload and manage Wakalas for your selected candidates.</CardDescription>
                    </div>
                    <Button>
                        <UploadCloud className="mr-2 h-4 w-4" />
                        Upload Wakala
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Candidate</TableHead>
                                    <TableHead>Job</TableHead>
                                    <TableHead>Uploaded By</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockWakalas.map((wakala) => (
                                    <TableRow key={wakala.id}>
                                        <TableCell className="font-medium">{wakala.candidate}</TableCell>
                                        <TableCell>{wakala.job}</TableCell>
                                        <TableCell>{wakala.uploadedBy}</TableCell>
                                        <TableCell>{wakala.date}</TableCell>
                                        <TableCell>
                                            <Button variant="outline" size="sm">View/Replace</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                 {mockWakalas.length === 0 && (
                                     <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center">
                                            No Wakalas uploaded yet.
                                        </TableCell>
                                    </TableRow>
                                 )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Document Templates</CardTitle>
                     <CardDescription>Manage your company's document templates (e.g., Offer Letter).</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="text-center text-muted-foreground py-12">
                        <p>Template management will be available here.</p>
                        <Button variant="secondary" className="mt-4">Upload Template</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
