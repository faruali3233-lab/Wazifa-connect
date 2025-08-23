"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, Briefcase, CheckCircle, Search, Verified, Zap } from 'lucide-react';
import Image from 'next/image';

const jobListings = [
  { title: "AI Engineer", companyLogo: "https://placehold.co/40x40.png", salary: "Competitive" },
  { title: "Finance Analyst", companyLogo: "https://placehold.co/40x40.png", salary: "$120,000" },
  { title: "Petroleum Engineer", companyLogo: "https://placehold.co/40x40.png", salary: "High" },
  { title: "Project Manager", companyLogo: "https://placehold.co/40x40.png", salary: "$150,000" },
];

export default function JobSeekerHomePage() {
  const { user, isProfileComplete } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isProfileComplete) {
      router.replace('/job-seeker/dashboard');
    }
  }, [isProfileComplete, router]);

  if (isProfileComplete) {
    // Render nothing or a loading state while redirecting
    return null;
  }
  
  const handleCompleteProfile = () => {
    router.push('/job-seeker/profile');
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
              Find Your Next Opportunity in the Gulf
            </h1>
            <p className="text-lg text-muted-foreground">
              Top recruiters in Saudi Arabia and across the Gulf are looking for talent like you.
            </p>
            <Button size="lg" onClick={handleCompleteProfile}>
              Complete Profile to Get Jobs <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div>
            <Image 
              src="https://placehold.co/600x600.png"
              alt="Professional Saudi man in thobe"
              width={600}
              height={600}
              className="rounded-lg shadow-lg"
              data-ai-hint="professional saudi man"
            />
          </div>
        </div>
      </section>

      {/* Gulf Jobs Section */}
      <section id="gulf-jobs" className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Explore Gulf Opportunities</h2>
          <div className="flex justify-center items-center gap-4 mb-12">
            <Select defaultValue="sa">
              <SelectTrigger className="w-[180px] bg-white"><SelectValue placeholder="Country" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="sa">Saudi Arabia</SelectItem>
                <SelectItem value="uae">UAE</SelectItem>
                <SelectItem value="qa">Qatar</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="tech">
              <SelectTrigger className="w-[180px] bg-white"><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="tech">AI/Tech</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="oil">Oil & Gas</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon"><Search className="h-4 w-4"/></Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobListings.map((job, index) => (
              <Card key={index} className="bg-white hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image src={job.companyLogo} alt="Company Logo" width={40} height={40} />
                    <CardTitle className="text-lg">{job.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Salary: {job.salary}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Roles / Importance Section */}
      <section id="featured-roles" className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">Why Gulf Companies Choose Talent Here</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-none">
              <CardContent className="flex flex-col items-center text-center p-6">
                <Verified className="w-12 h-12 text-primary mb-4"/>
                <h3 className="text-xl font-semibold mb-2">Verified Recruiters</h3>
                <p className="text-muted-foreground">Connect with trusted and vetted companies.</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-none">
              <CardContent className="flex flex-col items-center text-center p-6">
                <Briefcase className="w-12 h-12 text-primary mb-4"/>
                <h3 className="text-xl font-semibold mb-2">High Demand Sectors</h3>
                <p className="text-muted-foreground">Growth in AI/Tech, Oil & Finance.</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-none">
              <CardContent className="flex flex-col items-center text-center p-6">
                <Zap className="w-12 h-12 text-primary mb-4"/>
                <h3 className="text-xl font-semibold mb-2">Trusted Career Platform</h3>
                <p className="text-muted-foreground">A reliable path to your career goals.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Complete Your Profile Section */}
      <section id="why-complete-profile" className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image 
                src="https://placehold.co/600x400.png" 
                alt="Profile completion progress bar" 
                width={600} 
                height={400} 
                className="rounded-lg shadow-lg"
                data-ai-hint="progress bar"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Complete your profile to unlock full access to recruiters in Saudi & the Gulf.</h2>
              <ul className="space-y-3">
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary" /> Get seen by top companies</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary" /> Priority in job matching</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary" /> Build trust with recruiters</li>
              </ul>
              <Button size="lg" onClick={handleCompleteProfile}>
                Complete Profile Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
