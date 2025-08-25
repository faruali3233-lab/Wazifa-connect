
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Download, Eye } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";

const mockUsers = {
  jobSeekers: [
    { id: 'JS001', name: 'Ravi Kumar', country: 'India', kyc: 'Verified', profile: 100, lastActive: '2h ago', aadhaarLast4: '1234', submissionTime: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    { id: 'JS002', name: 'Aarav Sharma', country: 'India', kyc: 'Pending', profile: 75, lastActive: '1d ago', aadhaarLast4: '5678', submissionTime: new Date(Date.now() - 24 * 60 * 60 * 1000) },
  ],
  recruiters: [
    { id: 'REC01', name: 'Ahmed Al-Fahim', country: 'UAE', kyc: 'Verified', profile: 100, lastActive: '5m ago' },
    { id: 'REC02', name: 'Fatima Al-Mansoori', country: 'Saudi Arabia', kyc: 'Verified', profile: 90, lastActive: '5h ago' },
  ],
  agents: [
    { id: 'AGT01', name: 'Sanjay Patel', country: 'India', kyc: 'Verified', profile: 100, lastActive: '1h ago' },
  ],
  subAgents: [
     { id: 'SUB01', name: 'Vijay Singh', country: 'India', kyc: 'Needs Review', profile: 80, lastActive: '3d ago' },
  ],
};

const KycQueueTable = ({ users }: { users: any[] }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Candidate ID</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Aadhaar (Last 4)</TableHead>
        <TableHead>Submitted</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {users.filter(u => u.kyc === 'Pending').map((user) => (
        <TableRow key={user.id}>
          <TableCell>{user.id}</TableCell>
          <TableCell className="font-medium">{user.name}</TableCell>
          <TableCell className="font-mono">{user.aadhaarLast4}</TableCell>
          <TableCell>{formatDistanceToNow(user.submissionTime, { addSuffix: true })}</TableCell>
          <TableCell>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" /> View Aadhaar (Front)
                    </DropdownMenuItem>
                     <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" /> View Aadhaar (Back)
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-green-600 focus:text-green-700">Approve</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive focus:text-destructive/90">Reject</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);


const UserTable = ({ users }: { users: any[] }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>User ID</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Country</TableHead>
        <TableHead>KYC Status</TableHead>
        <TableHead>Profile %</TableHead>
        <TableHead>Last Active</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {users.map((user) => (
        <TableRow key={user.id}>
          <TableCell>{user.id}</TableCell>
          <TableCell className="font-medium">{user.name}</TableCell>
          <TableCell>{user.country}</TableCell>
          <TableCell>
             <Badge variant={user.kyc === 'Verified' ? 'default' : 'secondary'} className={user.kyc === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                {user.kyc}
            </Badge>
          </TableCell>
          <TableCell>{user.profile}%</TableCell>
          <TableCell>{user.lastActive}</TableCell>
          <TableCell>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Impersonate</DropdownMenuItem>
                    <DropdownMenuItem>Suspend User</DropdownMenuItem>
                    <DropdownMenuItem>View Audit Trail</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);


export function UserDirectory({ showKycQueue = false }: { showKycQueue?: boolean }) {
  if(showKycQueue) {
    return <KycQueueTable users={mockUsers.jobSeekers} />
  }

  return (
    <Tabs defaultValue="jobSeekers">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="jobSeekers">Job Seekers</TabsTrigger>
        <TabsTrigger value="recruiters">Recruiters</TabsTrigger>
        <TabsTrigger value="agents">Agents</TabsTrigger>
        <TabsTrigger value="subAgents">Sub Agents</TabsTrigger>
      </TabsList>
      <TabsContent value="jobSeekers">
        <UserTable users={mockUsers.jobSeekers} />
      </TabsContent>
      <TabsContent value="recruiters">
        <UserTable users={mockUsers.recruiters} />
      </TabsContent>
      <TabsContent value="agents">
        <UserTable users={mockUsers.agents} />
      </TabsContent>
      <TabsContent value="subAgents">
        <UserTable users={mockUsers.subAgents} />
      </TabsContent>
    </Tabs>
  );
}
