
"use client";

import { useRouter } from 'next/navigation';
import { useAuth, type UserRole } from '@/hooks/use-auth';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, UserCheck, Briefcase } from 'lucide-react';

const RoleCard = ({ icon, title, description, onClick }: { icon: React.ReactNode, title: string, description: string, onClick: () => void }) => (
  <Card className="hover:shadow-xl hover:border-primary transition-all cursor-pointer group" onClick={onClick}>
    <CardHeader>
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 text-primary p-3 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
          {icon}
        </div>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <Button variant="link" className="p-0">Select Role →</Button>
    </CardContent>
  </Card>
);

export default function JobSeekerHomePage() {
  const { setUserRole } = useAuth();
  const router = useRouter();

  const handleRoleSelection = (role: UserRole) => {
    setUserRole(role);
    let profilePath = '/job-seeker/profile';
    if (role === 'subAgent') {
      profilePath = '/job-seeker/sub-agent/profile';
    } else if (role === 'agent') {
      profilePath = '/job-seeker/agent/profile';
    }
    router.push(profilePath);
  };
  
  return (
    <div className="container mx-auto px-6 py-24">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Choose Your Role</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Select how you want to use GulfHired. Your choice will determine your dashboard and features.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <RoleCard
          icon={<User className="h-6 w-6" />}
          title="Job Seeker"
          description="Find your next job opportunity in the Gulf region."
          onClick={() => handleRoleSelection('jobSeeker')}
        />
        <RoleCard
          icon={<Briefcase className="h-6 w-6" />}
          title="Agent"
          description="Manage candidates and connect them with recruiters."
          onClick={() => handleRoleSelection('agent')}
        />
        <RoleCard
          icon={<UserCheck className="h-6 w-6" />}
          title="Sub Agent"
          description="Assist agents in the recruitment process."
          onClick={() => handleRoleSelection('subAgent')}
        />
      </div>
    </div>
  );
}
