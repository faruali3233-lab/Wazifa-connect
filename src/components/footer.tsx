import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center">
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">About</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Contact</Link>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 GulfHire. Connecting Talent with Opportunity.
          </p>
        </div>
      </div>
    </footer>
  );
}
