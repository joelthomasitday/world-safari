import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface CMSSectionProps {
  data: {
    title?: string;
    subtitle?: string;
    bodyText?: string;
    mediaUrl?: string;
  };
}

export function CMSSection({ data }: CMSSectionProps) {
  const title = data?.title || "";
  const subtitle = data?.subtitle || "";
  const bodyText = data?.bodyText || "";

  if (!title && !subtitle && !bodyText) return null;

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-gray-100/50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {subtitle && (
            <ScrollReveal animation="slide-down" delay={100}>
               <span className="inline-block px-4 py-1.5 mb-6 text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-primary border border-primary/20 bg-primary/5 rounded-full">
                {subtitle}
              </span>
            </ScrollReveal>
          )}
          
          {title && (
            <ScrollReveal animation="reveal" delay={200}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-gray-900 mb-8">
                {title}
              </h2>
            </ScrollReveal>
          )}
          
          {bodyText && (
            <ScrollReveal animation="reveal" delay={300}>
              <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed whitespace-pre-wrap">
                {bodyText}
              </p>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  );
}
