"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarIcon, Loader2, Send, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    travelStartDate: z.date({
      message: "Start date is required",
    }),
    travelEndDate: z.date({
      message: "End date is required",
    }),
    travelers: z.string().min(1, "Number of travelers is required"),
    message: z.string().optional(),
  })
  .refine(
    (data) => data.travelEndDate >= data.travelStartDate,
    {
      path: ["travelEndDate"],
      message: "End date cannot be before start date",
    }
  );

export function EnquiryForm({ packageTitle }: { packageTitle: string }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      travelers: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          destination: packageTitle,
          travelDates: {
            startDate: values.travelStartDate,
            endDate: values.travelEndDate,
          },
          numberOfPeople: Number(values.travelers),
          message: values.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit enquiry");
      }

      toast.success("Enquiry received! We will contact you shortly.");

      const whatsappMessage = `*New Enquiry for ${packageTitle}*\n` +
        `Name: ${values.name}\n` +
        `Email: ${values.email}\n` +
        `Phone: ${values.phone}\n` +
        `Travel Dates: ${format(values.travelStartDate, "PPP")} - ${format(values.travelEndDate, "PPP")}\n` +
        `Travelers: ${values.travelers}\n` +
        `Message: ${values.message || ""}`;

      window.location.href = `https://wa.me/919947247200?text=${encodeURIComponent(whatsappMessage)}`;
      
      form.reset();
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="py-16 md:py-24 bg-white" id="enquire-now">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-gray-900 mb-4 tracking-tight">
            Plan This Trip
          </h2>
          <p className="text-gray-600">
            Tell us your preferences and we'll craft the perfect journey for you.
          </p>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 000-0000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="travelers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>No. of Travelers</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" placeholder="2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900">Preferred Travel Dates</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="travelStartDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date: Date) =>
                                date < new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                              captionLayout="dropdown"
                              fromYear={new Date().getFullYear()}
                              toYear={new Date().getFullYear() + 10}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="travelEndDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>End Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date: Date) =>
                                date < new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                              captionLayout="dropdown"
                              fromYear={new Date().getFullYear()}
                              toYear={new Date().getFullYear() + 10}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your preferences, special requirements, or any questions you have."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-black hover:bg-black/80 text-white rounded-full py-6 text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Submit Enquiry
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700 rounded-full py-6 text-lg"
                onClick={() => {
                  const text = `Hi, I'm interested in booking the ${packageTitle} package. Can you please help me with the details?`;
                  window.open(`https://wa.me/919947247200?text=${encodeURIComponent(text)}`, '_blank');
                }}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat on WhatsApp
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
