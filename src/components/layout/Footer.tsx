import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-8 border-t">
      <div className="container mx-auto px-6 lg:px-8 text-center text-muted-foreground">
        <div className="flex justify-center space-x-6 mb-4">
          <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
            <Twitter className="h-6 w-6" />
          </Link>
          <Link href="#" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="h-6 w-6" />
          </Link>
          <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="h-6 w-6" />
          </Link>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Landing Spark. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Built with passion using Next.js and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
