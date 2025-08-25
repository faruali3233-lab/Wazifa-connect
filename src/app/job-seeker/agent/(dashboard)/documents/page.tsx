
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const mockDocuments = [
    { candidate: 'Ravi Kumar', documentType: 'Passport', status: 'Verified' },
    { candidate: 'Ravi Kumar', documentType: 'Medical', status: 'Verified' },
    { candidate: 'Ravi Kumar', documentType: 'Wakala', status: 'Received (Read-only)' },
    { candidate: 'Ravi Kumar', documentType: 'Ticket/Travel Docs', status: 'Pending' },
];

export default function AgentDocumentsPage() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Documents Vault</CardTitle>
                    <CardDescription>Manage and upload required documents for your candidates.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 border rounded-lg">
                        <div className="md:col-span-1">
                             <Label htmlFor="candidate-select">Select Candidate</Label>
                             <Select>
                                 <SelectTrigger id="candidate-select">
                                    <SelectValue placeholder="Select a candidate..." />
                                 </SelectTrigger>
                                 <SelectContent>
                                     <SelectItem value="ravi">Ravi Kumar</SelectItem>
                                     <SelectItem value="aisha">Aisha Begum</SelectItem>
                                 </SelectContent>
                             </Select>
                        </div>
                        <div className="md:col-span-2">
                             <Label>Upload Ticket & Travel Docs</Label>
                            <div className="flex gap-2">
                                <Input type="file" multiple />
                                <Button><UploadCloud className="mr-2 h-4 w-4" /> Upload</Button>
                            </div>
                             <CardDescription className="text-xs mt-2">Upload ticket, visa, and itinerary to unlock final payment for the seeker.</CardDescription>
                        </div>
                    </div>
                    
                     <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Candidate</TableHead>
                                    <TableHead>Document Type</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockDocuments.map((doc, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="font-medium">{doc.candidate}</TableCell>
                                        <TableCell>{doc.documentType}</TableCell>
                                        <TableCell>{doc.status}</TableCell>
                                        <TableCell>
                                            <Button variant="outline" size="sm">View</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

