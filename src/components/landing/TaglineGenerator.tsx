"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { suggestTagline, type SuggestTaglineInput } from '@/ai/flows/suggest-tagline';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Lightbulb, Loader2 } from 'lucide-react';

const formSchema = z.object({
  appDescription: z.string().min(10, { message: "Description must be at least 10 characters." }).max(500, { message: "Description must not exceed 500 characters." }),
});

type FormData = z.infer<typeof formSchema>;

export function TaglineGenerator() {
  const [tagline, setTagline] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      appDescription: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setTagline(null);
    try {
      const inputData: SuggestTaglineInput = { appDescription: data.appDescription };
      const result = await suggestTagline(inputData);
      setTagline(result.tagline);
      toast({
        title: "Tagline Generated!",
        description: "A new tagline has been suggested.",
      });
    } catch (error) {
      console.error("Error generating tagline:", error);
      toast({
        title: "Error",
        description: "Failed to generate tagline. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-8">
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader className="text-center">
            <Lightbulb className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle className="font-headline text-3xl md:text-4xl">Generate Your Perfect Tagline</CardTitle>
            <CardDescription className="text-lg">
              Let our AI craft a catchy tagline for your app. Just describe it below!
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="appDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="appDescription" className="text-base font-semibold">App Description</FormLabel>
                      <FormControl>
                        <Textarea
                          id="appDescription"
                          placeholder="e.g., A mobile app that helps users find local coffee shops..."
                          rows={5}
                          className="resize-none text-base"
                          {...field}
                          aria-describedby="appDescription-message"
                        />
                      </FormControl>
                      <FormMessage id="appDescription-message" />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex flex-col items-center">
                <Button type="submit" disabled={isLoading} size="lg" className="w-full md:w-auto">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Suggest Tagline'
                  )}
                </Button>
                {tagline && !isLoading && (
                  <div className="mt-8 p-6 bg-primary/10 rounded-lg w-full text-center">
                    <p className="text-sm text-primary font-semibold mb-2 font-headline">Suggested Tagline:</p>
                    <p className="text-2xl font-headline text-primary font-bold">"{tagline}"</p>
                  </div>
                )}
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </section>
  );
}
