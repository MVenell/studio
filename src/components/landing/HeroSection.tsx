import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-background to-secondary/30">
      <div className="container mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-headline font-bold leading-tight mb-6">
            My Brand New Web App
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0">
            Discover the future of web applications. Landing Spark provides innovative solutions to elevate your online presence and engagement.
          </p>
          <Button size="lg" className="group">
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
        <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
          <Image
            src="https://placehold.co/1200x675.png"
            alt="Web App Showcase"
            layout="fill"
            objectFit="cover"
            data-ai-hint="modern abstract"
            className="transform transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}
