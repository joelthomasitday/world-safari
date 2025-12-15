"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function ContactInfo() {
  return (
    <section className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Contact Cards */}
          <div className="w-full lg:w-5/12 space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-8 tracking-tight">
                Contact Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              
              {/* Office Card */}
              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 group overflow-hidden">
                <CardContent className="p-6 flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-primary/5 group-hover:bg-primary/10 flex items-center justify-center text-primary transition-colors shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 text-lg">Our Office</h4>
                    <p className="text-gray-500 font-light leading-relaxed">
                      123 Safari Avenue, Level 4,<br />
                      Cape Town, 8001,<br />
                      South Africa
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Methods Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 group">
                  <CardContent className="p-5 flex flex-col gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/5 group-hover:bg-primary/10 flex items-center justify-center text-primary transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Phone</h4>
                      <p className="text-sm text-gray-500 font-light">
                        +27 (0) 21 123 4567<br />
                        <span className="text-xs text-gray-400 mt-1 block">Toll Free: 1-800-SAFARI</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 group">
                  <CardContent className="p-5 flex flex-col gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/5 group-hover:bg-primary/10 flex items-center justify-center text-primary transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Email</h4>
                      <p className="text-sm text-gray-500 font-light break-words">
                        hello@worldsafari.com<br />
                        support@worldsafari.com
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Business Hours */}
              <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 group">
                <CardContent className="p-6 flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-primary/5 group-hover:bg-primary/10 flex items-center justify-center text-primary transition-colors shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Business Hours</h4>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-gray-500 font-light">
                      <span>Mon - Fri:</span>
                      <span>9:00 AM - 6:00 PM</span>
                      <span>Sat:</span>
                      <span>10:00 AM - 2:00 PM</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>

          {/* Right Column: Map */}
          <div className="w-full lg:w-7/12 min-h-[500px] lg:h-auto">
            <Card className="h-full border-none shadow-lg overflow-hidden rounded-3xl relative group">
              <div className="absolute inset-0 z-0 bg-gray-200 animate-pulse" /> {/* Placeholder/Loading state visual */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.633129665984!2d18.42198037648356!3d-33.92473202179831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc676251b181a3%3A0xc3191d8e178553!2sCape%20Town%20City%20Centre%2C%20Cape%20Town%2C%20South%20Africa!5e0!3m2!1sen!2sus!4v1703649182046!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[10%] group-hover:grayscale-0 transition-all duration-700 ease-in-out z-10 relative"
              ></iframe>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}
