import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';

export function CallToAction() {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 lg:px-8 text-center">
        <Rocket className="h-16 w-16 mx-auto mb-6 opacity-80" />
        <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6">
          Ready to Elevate Your App?
        </h2>
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto opacity-90">
          Join thousands of satisfied users who are already benefiting from Landing Spark. Don't miss out on the opportunity to transform your web presence.
        </p>
        <Button variant="secondary" size="lg" className="transform transition-transform duration-300 hover:scale-105 shadow-lg text-lg px-10 py-6">
          Sign Up Now &amp; Spark Your Success!
        </Button>
      </div>
    </section>
  );
}
