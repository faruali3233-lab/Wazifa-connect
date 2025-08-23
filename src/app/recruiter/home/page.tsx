
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Car, Home, Paintbrush, Wrench, ChefHat } from 'lucide-react';
import Image from 'next/image';

const categories = [
  { name: "Driver", icon: <Car className="w-12 h-12 text-primary mb-4" />, description: "Experienced drivers for Saudi & Gulf households." },
  { name: "House Helper", icon: <Home className="w-12 h-12 text-primary mb-4" />, description: "Reliable helpers for daily home tasks." },
  { name: "Painter", icon: <Paintbrush className="w-12 h-12 text-primary mb-4" />, description: "Skilled painters for residential and commercial projects." },
  { name: "Technician", icon: <Wrench className="w-12 h-12 text-primary mb-4" />, description: "Certified technicians for maintenance and repairs." },
  { name: "Cook", icon: <ChefHat className="w-12 h-12 text-primary mb-4" />, description: "Professional cooks for homes and businesses." },
];

export default function RecruiterHomePage() {
  const { user, isProfileComplete } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isProfileComplete) {
      router.replace('/recruiter/dashboard');
    }
  }, [isProfileComplete, router]);

  const handleCompleteProfile = () => {
    router.push('/recruiter/profile');
  };

  if (!user) return null;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
              Find Trusted Workers from India
            </h1>
            <p className="text-lg text-muted-foreground">
              Hire reliable drivers, house helpers, painters, and more — screened and ready for work in the Gulf.
            </p>
            <Button size="lg" onClick={handleCompleteProfile}>
              Complete Profile to Start Hiring <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div>
            <Image 
              src="https://placehold.co/600x600.png"
              alt="Professional workers and Saudi recruiter handshake"
              width={600}
              height={600}
              className="rounded-lg shadow-lg"
              data-ai-hint="workers handshake"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Hire Skilled & Domestic Workers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {categories.map((category) => (
              <Card key={category.name} className="text-center hover:shadow-xl transition-shadow border-0 bg-white">
                <CardHeader className="items-center">
                  {category.icon}
                  <CardTitle>{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">Why Gulf Recruiters Trust Us</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="border-0 shadow-none">
              <CardContent className="flex flex-col items-center text-center p-6">
                <CheckCircle className="w-12 h-12 text-primary mb-4"/>
                <h3 className="text-xl font-semibold mb-2">Verified Indian Workers</h3>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-none">
              <CardContent className="flex flex-col items-center text-center p-6">
                <CheckCircle className="w-12 h-12 text-primary mb-4"/>
                <h3 className="text-xl font-semibold mb-2">Fast & Easy Recruitment</h3>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-none">
              <CardContent className="flex flex-col items-center text-center p-6">
                <CheckCircle className="w-12 h-12 text-primary mb-4"/>
                <h3 className="text-xl font-semibold mb-2">Direct Hiring Pipeline</h3>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-none">
              <CardContent className="flex flex-col items-center text-center p-6">
                <CheckCircle className="w-12 h-12 text-primary mb-4"/>
                <h3 className="text-xl font-semibold mb-2">Support Until Worker Joins</h3>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="space-y-2">
              <span className="text-primary font-bold text-lg">Step 1</span>
              <h3 className="text-xl font-semibold">Complete Profile</h3>
              <p className="text-muted-foreground">Share your requirements.</p>
            </div>
            <div className="space-y-2">
              <span className="text-primary font-bold text-lg">Step 2</span>
              <h3 className="text-xl font-semibold">Match & Shortlist</h3>
              <p className="text-muted-foreground">Get worker profiles from India.</p>
            </div>
            <div className="space-y-2">
              <span className="text-primary font-bold text-lg">Step 3</span>
              <h3 className="text-xl font-semibold">Hire with Confidence</h3>
              <p className="text-muted-foreground">We handle the process.</p>
            </div>
          </div>
          <Button size="lg" className="mt-12" onClick={handleCompleteProfile}>Complete Profile Now</Button>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 py-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Hire Skilled Workers from India?</h2>
          <Button variant="secondary" size="lg" onClick={handleCompleteProfile} className="text-primary bg-white hover:bg-gray-200">
            Complete Your Profile
          </Button>
        </div>
      </section>
    </div>
  );
}
