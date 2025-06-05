import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/landing/HeroSection';
import { BenefitShowcase } from '@/components/landing/BenefitShowcase';
import { TaglineGenerator } from '@/components/landing/TaglineGenerator';
import { CallToAction } from '@/components/landing/CallToAction';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <BenefitShowcase />
        <TaglineGenerator />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
