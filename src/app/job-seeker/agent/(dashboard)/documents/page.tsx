
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const mockDocs = [
    { candidate: 'Ravi Kumar', docType: 'Ticket', uploadedBy: 'You', date: '2024-08-20' },
    { candidate: 'Manoj Verma', docType: 'Wakala', uploadedBy: 'Recruiter', date: '2024-08-18' },
];

export default function AgentDocumentsKycPage() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Candidate Documents Vault</CardTitle>
                        <CardDescription>Upload and manage travel documents for your candidates.</CardDescription>
                    </div>
                    <Button>
                        <UploadCloud className="mr-2 h-4 w-4" />
                        Upload Ticket/Docs
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Candidate</TableHead>
                                    <TableHead>Document Type</TableHead>
                                    <TableHead>Uploaded By</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockDocs.map((doc, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{doc.candidate}</TableCell>
                                        <TableCell>{doc.docType}</TableCell>
                                        <TableCell>{doc.uploadedBy}</TableCell>
                                        <TableCell>{doc.date}</TableCell>
                                        <TableCell>
                                            <Button variant="outline" size="sm">View/Replace</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                 {mockDocs.length === 0 && (
                                     <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center">
                                            No documents uploaded yet.
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
                    <CardTitle>My Agency KYC Documents</CardTitle>
                     <CardDescription>Manage your own business and compliance documents.</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="text-center text-muted-foreground py-12">
                        <p>Your KYC documents (License, ID) are managed from your profile.</p>
                        <Button variant="secondary" className="mt-4">Go to My Profile</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

    