
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
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

const mockUsers = {
  jobSeekers: [
    { id: 'JS001', name: 'Ravi Kumar', country: 'India', kyc: 'Verified', profile: 100, lastActive: '2h ago' },
    { id: 'JS002', name: 'Aarav Sharma', country: 'India', kyc: 'Pending', profile: 75, lastActive: '1d ago' },
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


export function UserDirectory() {
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
