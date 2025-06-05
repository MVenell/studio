
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google: ", error);
      // You could add a toast notification here for the user
    } finally {
      // setLoading(false); // onAuthStateChanged will handle this
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
      // You could add a toast notification here for the user
    } finally {
      // setLoading(false); // onAuthStateChanged will handle this
    }
  };

  return (
    <header className="py-4 shadow-sm sticky top-0 bg-background/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-headline font-bold text-primary">
          <Sparkles className="h-7 w-7" />
          Landing Spark
        </Link>
        
        <div className="flex items-center gap-2 sm:gap-4">
          {loading ? (
            <Button variant="outline" size="sm" disabled className="w-[100px] sm:w-auto">
              <LogIn className="mr-0 sm:mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Loading...</span>
            </Button>
          ) : user ? (
            <>
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.photoURL ?? undefined} alt={user.displayName ?? 'User'} />
                <AvatarFallback>{user.displayName ? user.displayName.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : 'U')}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-foreground hidden md:inline">
                {user.displayName || user.email}
              </span>
              <Button variant="ghost" size="icon" onClick={handleSignOut} aria-label="Sign out">
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Button onClick={handleSignIn} variant="outline" size="sm">
              <LogIn className="mr-2 h-4 w-4" />
              Sign in
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
