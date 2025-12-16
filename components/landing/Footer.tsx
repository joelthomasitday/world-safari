"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Phone, Mail, Linkedin } from "lucide-react";

const SOCIAL_LINKS = [
  {
    Icon: Facebook,
    href: "https://www.facebook.com/worldsafaritoursandtravels/",
    label: "World Safari Tours and Travels on Facebook",
    name: "Facebook",
  },
  {
    Icon: Phone,
    href: "https://wa.me/919947247200",
    label: "Chat on WhatsApp",
    name: "WhatsApp",
  },
  {
    Icon: Instagram,
    href: "https://www.instagram.com/worldsafaritours",
    label: "World Safari Tours on Instagram",
    name: "Instagram",
  },
  {
    Icon: Linkedin,
    href: "https://www.linkedin.com/in/shajiworldsafaritours/",
    label: "World Safari Tours on LinkedIn",
    name: "LinkedIn",
  },
  {
    Icon: Mail,
    href: "mailto:mail@worldsafari.in",
    label: "Email Us",
    name: "Email",
  },
];

export function Footer() {
  return (
    <footer className="bg-white text-gray-900 border-t border-gray-100 pt-10 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
               <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                 W
               </div>
               <span className="text-xl font-bold tracking-wide">World Safari</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Crafting unforgettable luxury safaris and travel experiences since 2008.
            </p>
            <div className="mt-4">
              <Image 
                src="/world-safari-logo-full.png" 
                alt="World Safari Tours Logo" 
                width={160} 
                height={160}
                className="object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

          {/* Links - Column 1 */}
          <div>
            <h4 className="font-sans font-bold text-sm uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-2">
              {["About Us", "Careers", "Press", "Blog"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "About Us" ? "/about" : "#"}
                    className="text-gray-500 hover:text-primary transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links - Column 2 */}
          <div>
            <h4 className="font-sans font-bold text-sm uppercase tracking-widest mb-4">Support</h4>
            <ul className="space-y-2">
              {["Contact Us", "Terms & Conditions", "Privacy Policy", "Sitemap"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Contact Us" ? "/contact" : "#"}
                    className="text-gray-500 hover:text-primary transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
              <li>
                 <Link
                   href="/admin/login"
                   className="text-gray-500 hover:text-primary transition-colors text-sm"
                 >
                   Staff Login
                 </Link>
              </li>
            </ul>
          </div>

          {/* Social / Newsletter */}
          <div>
            <h4 className="font-sans font-bold text-base uppercase tracking-widest mb-4 text-primary">Follow Us</h4>
            <div className="flex gap-4 flex-wrap">
              {SOCIAL_LINKS.map(({ Icon, href, label, name }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-12 h-12 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-600 group-hover:bg-primary group-hover:text-white group-hover:border-primary group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 group-hover:text-primary transition-colors">{name}</span>
                </a>
              ))}
            </div>
          
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} World Safari Tours. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <span>Design by World Safari Team</span>
          </div>
          
        </div>
        
      </div>
    </footer>
  );
}
