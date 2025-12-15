"use client";

import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

const SOCIAL_LINKS = [
  {
    Icon: Facebook,
    href: "https://www.facebook.com/worldsafaritoursandtravels/",
    label: "World Safari Tours and Travels on Facebook",
  },
  {
    Icon: Facebook,
    href: "https://www.facebook.com/worldsafaritour/",
    label: "World Safari Tour on Facebook",
  },
  {
    Icon: Instagram,
    href: "https://www.instagram.com/worldsafaritours",
    label: "World Safari Tours on Instagram",
  },
];

export function Footer() {
  return (
    <footer className="bg-white text-gray-900 border-t border-gray-100 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
               <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                 W
               </div>
               <span className="text-xl font-bold tracking-wide">World Safari</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Crafting unforgettable luxury safaris and travel experiences since 2008.
            </p>
          </div>

          {/* Links - Column 1 */}
          <div>
            <h4 className="font-sans font-bold text-sm uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-4">
              {["About Us", "Careers", "Press", "Blog"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-500 hover:text-primary transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links - Column 2 */}
          <div>
            <h4 className="font-sans font-bold text-sm uppercase tracking-widest mb-6">Support</h4>
            <ul className="space-y-4">
              {["Contact Us", "Terms & Conditions", "Privacy Policy", "Sitemap"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-500 hover:text-primary transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social / Newsletter */}
          <div>
            <h4 className="font-sans font-bold text-sm uppercase tracking-widest mb-6">Follow Us</h4>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            
            <div className="mt-8">
               <Link 
                 href="/admin/login" 
                 className="text-sm text-gray-400 opacity-40 hover:opacity-100 transition-opacity no-underline"
               >
                 Staff Login
               </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} World Safari Tours. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <span>Design by World Safari Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
