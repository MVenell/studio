import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="py-4 shadow-sm sticky top-0 bg-background/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-headline font-bold text-primary">
          <Sparkles className="h-7 w-7" />
          Landing Spark
        </Link>
        {/* Navigation items can be added here if needed */}
      </div>
    </header>
  );
}
