"use client";

import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ContactInfo() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          setSettings(data);
        }
      } catch (error) {
        console.error("Error fetching contact settings:", error);
      }
    };
    fetchSettings();
  }, []);

  // Safe Fallbacks
  const address = settings?.address || "World Safari Tours\nEl Tower,\nJustice K. J Joseph Lane \nOff Diwan's Road \nErnakulam \nKochi - 682 016\nKerala, South India";
  const phone = settings?.phone || "9947247200";
  const email = settings?.email || "goworldsafari@gmail.com\nmail@worldsafari.in";
  const website = settings?.website || "https://www.worldsafari.in/";
  const hoursWeekday = settings?.businessHoursWeekday || "9:00 AM - 6:00 PM";
  const hoursWeekend = settings?.businessHoursWeekend || "10:00 AM - 2:00 PM";
  const mapUrl = settings?.mapEmbedUrl || "https://maps.google.com/maps?q=El+Tower,+Justice+K.+J+Joseph+Lane,+Off+Diwan's+Road,+Ernakulam,+Kochi,+Kerala&t=&z=15&ie=UTF8&iwloc=&output=embed";

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
                    <p className="text-gray-500 font-light leading-relaxed whitespace-pre-line">
                      {address}
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
                        {phone}
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
                      <p className="text-sm text-gray-500 font-light wrap-break-word whitespace-pre-line">
                        {email}
                        {website && (
                          <>
                            <br />
                            <a href={website} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                              {website}
                            </a>
                          </>
                        )}
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
                      <span>{hoursWeekday}</span>
                      <span>Sat:</span>
                      <span>{hoursWeekend}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>

          {/* Right Column: Map */}
          <div className="w-full lg:w-7/12 min-h-[500px] lg:h-auto">
            <Card className="h-full border-none shadow-lg overflow-hidden rounded-3xl relative group">
              <div className="absolute inset-0 z-0 bg-gray-200 animate-pulse" />
              <iframe 
                src={mapUrl} 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale transition-all duration-700 ease-in-out z-10 relative"
              ></iframe>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}
