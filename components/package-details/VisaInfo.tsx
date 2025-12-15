"use client";

import { Info } from "lucide-react";

interface VisaInfoProps {
  info: string;
}

export function VisaInfo({ info }: VisaInfoProps) {
  return (
    <section className="py-8 bg-gray-50 border-t border-b border-gray-100">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="flex items-start md:items-center gap-4 p-6 bg-blue-50/50 rounded-xl border border-blue-100/50">
          <Info className="w-6 h-6 text-blue-900/70 flex-shrink-0 mt-1 md:mt-0" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Visa & Travel Information</h4>
            <p className="text-blue-900/70 text-sm leading-relaxed">
              {info}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
