import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Laptop, Rocket, ShieldCheck, ZapIcon } from 'lucide-react'; // Corrected Zap to ZapIcon if that was the intent or ensure Zap exists

const benefits = [
  {
    icon: <ZapIcon className="h-10 w-10 text-primary mb-4" />, // Using ZapIcon as Zap might not exist, adjust if Zap is correct
    title: 'Lightning Fast',
    description: 'Experience blazing speed and performance with our optimized platform.',
    dataAiHint: 'speed performance'
  },
  {
    icon: <Laptop className="h-10 w-10 text-primary mb-4" />,
    title: 'User Friendly',
    description: 'Intuitive design and easy-to-use interface for seamless navigation.',
    dataAiHint: 'interface usability'
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary mb-4" />,
    title: 'Always Secure',
    description: 'Robust security measures to protect your data and ensure privacy.',
    dataAiHint: 'security protection'
  },
];

export function BenefitShowcase() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-headline font-bold mb-4">Why Choose Our App?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide a suite of powerful features designed to help you succeed and make your digital life easier.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col">
              <CardHeader className="items-center">
                {benefit.icon}
                <CardTitle className="font-headline text-2xl">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
