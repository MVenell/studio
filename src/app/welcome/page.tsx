
"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, ShieldAlert, Home, PartyPopper } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function WelcomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center bg-background">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">Loading your experience...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center bg-secondary/30 p-4">
          <Card className="w-full max-w-md shadow-xl">
            <CardHeader className="text-center">
              <ShieldAlert className="h-16 w-16 mx-auto text-destructive mb-4" />
              <CardTitle className="text-3xl font-headline">Access Denied</CardTitle>
              <CardDescription className="text-lg text-muted-foreground mt-2">
                You need to be signed in to access this page.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <p className="text-center text-sm text-muted-foreground">
                Please sign in to continue or return to the homepage.
              </p>
              <Button onClick={() => router.push('/')} variant="outline" className="w-full">
                <Home className="mr-2 h-4 w-4" />
                Go to Homepage
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-6 lg:px-8 py-12">
        <div className="text-center bg-card p-8 md:p-12 rounded-xl shadow-lg">
          <PartyPopper className="h-20 w-20 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6">
            Welcome, {user.displayName || user.email}!
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're thrilled to have you here at Landing Spark. Get ready to explore all the amazing features we've prepared for you.
          </p>
          <div className="relative aspect-video max-w-2xl mx-auto rounded-lg overflow-hidden shadow-md mb-8">
            <Image
              src="https://placehold.co/800x450.png"
              alt="Welcome illustration"
              layout="fill"
              objectFit="cover"
              data-ai-hint="celebration confetti"
            />
          </div>
          <p className="text-md text-muted-foreground">
            Start by exploring your dashboard or checking out our latest updates.
          </p>
          <Button onClick={() => router.push('/')} className="mt-8" size="lg">
             Explore Features
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
