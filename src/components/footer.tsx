
"use client";

import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';

export function Footer() {
  const { user } = useAuth();
  const isRecruiter = user?.role === 'recruiter';

  const footerText = isRecruiter 
    ? "Connecting Gulf Recruiters with Skilled Workers from India."
    : "Connecting Talent with Opportunity.";

  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">About</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Contact</Link>
          </div>
          <p className="text-sm text-muted-foreground text-right">
            © 2025 GulfHired. {footerText}
          </p>
        </div>
      </div>
    </footer>
  );
}
