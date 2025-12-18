"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export function ContactForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const formData = new FormData(event.currentTarget);

    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const phone = (formData.get("phone") || "").toString().trim();
    const destination = (formData.get("destination") || "").toString().trim();
    const message = (formData.get("message") || "").toString().trim();

    if (!name || !email || !phone || !message) {
      toast.error("Please fill in your name, email, phone, and message.");
      return;
    }

    try {
      setIsSubmitting(true);

      const body: any = {
        name,
        email,
        phone,
        message,
      };

      if (destination) {
        body.destination = destination;
      }

      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to submit enquiry");
      }

      toast.success("Enquiry sent! We will contact you shortly.");
      // Reset the form fields
      event.currentTarget.reset();

      // Redirect to thank you page that already exists
      router.push("/thank-you");
    } catch (error) {
      console.error("Error submitting contact enquiry:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gray-50/50 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6 max-w-5xl">
        
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-medium text-gray-900 tracking-tight">
            Send Us a Message
          </h2>
          <p className="text-gray-500 font-light text-xl max-w-2xl mx-auto">
             Tell us about your dream trip, and we'll make it happen.
          </p>
        </div>

        <Card className="border-none shadow-2xl shadow-gray-200/50 rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 md:p-14">
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label htmlFor="name" className="text-sm font-medium text-gray-900 tracking-wide uppercase">Full Name</label>
                  <Input 
                    id="name"
                    name="name"
                    placeholder="John Doe" 
                    className="bg-gray-50 border-gray-100 focus:bg-white focus:border-primary/20 transition-all h-14 rounded-xl text-lg font-light placeholder:text-gray-400" 
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="email" className="text-sm font-medium text-gray-900 tracking-wide uppercase">Email Address</label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com" 
                    className="bg-gray-50 border-gray-100 focus:bg-white focus:border-primary/20 transition-all h-14 rounded-xl text-lg font-light placeholder:text-gray-400" 
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-900 tracking-wide uppercase">Phone Number</label>
                  <Input 
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000" 
                    className="bg-gray-50 border-gray-100 focus:bg-white focus:border-primary/20 transition-all h-14 rounded-xl text-lg font-light placeholder:text-gray-400" 
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="destination" className="text-sm font-medium text-gray-900 tracking-wide uppercase">Destination</label>
                  <Input 
                    id="destination"
                    name="destination"
                    placeholder="e.g. Kenya, Tanzania" 
                    className="bg-gray-50 border-gray-100 focus:bg-white focus:border-primary/20 transition-all h-14 rounded-xl text-lg font-light placeholder:text-gray-400" 
                  />
                </div>
                <div className="col-span-1 md:col-span-2 space-y-3">
                  <label htmlFor="dates" className="text-sm font-medium text-gray-900 tracking-wide uppercase">Preferred Travel Dates</label>
                  <Input 
                    id="dates"
                    placeholder="e.g. June 2024" 
                    className="bg-gray-50 border-gray-100 focus:bg-white focus:border-primary/20 transition-all h-14 rounded-xl text-lg font-light placeholder:text-gray-400" 
                  />
                </div>
                <div className="col-span-1 md:col-span-2 space-y-3">
                  <label htmlFor="message" className="text-sm font-medium text-gray-900 tracking-wide uppercase">Your Message</label>
                  <Textarea 
                    id="message"
                    name="message"
                    placeholder="Tell us more about your preferences..." 
                    className="bg-gray-50 border-gray-100 focus:bg-white focus:border-primary/20 transition-all min-h-[180px] rounded-xl text-lg font-light placeholder:text-gray-400 resize-none p-4" 
                  />
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-6 pt-6">
                <Button
                  type="submit"
                  size="lg"
                  className="h-16 px-16 text-lg rounded-full tracking-wide w-full md:w-auto shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Enquiry"}
                </Button>
                <p className="text-gray-400 text-sm font-light flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Our travel experts usually respond within 24 hours.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
