import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/landing/Footer";
import { CTA } from "@/components/landing/CTA";
import { PackageHero } from "@/components/package-details/PackageHero";
import { PackageOverview } from "@/components/package-details/PackageOverview";
import { PackageGallery } from "@/components/package-details/PackageGallery";
import { PackageItinerary } from "@/components/package-details/PackageItinerary";
import { PackageInclusions } from "@/components/package-details/PackageInclusions";
import { VisaInfo } from "@/components/package-details/VisaInfo";
import { EnquiryForm } from "@/components/package-details/EnquiryForm";
import { connectDB } from "@/lib/mongodb";
import Package from "@/models/Package";
import { isValidObjectId } from "@/lib/utils/slug";

// Type definition for package data from API
interface PackageData {
  _id: string;
  slug?: string;
  title: string;
  duration: string;
  price?: string;
  overview: string;
  itinerary: string[];
  inclusions: string[];
  exclusions: string[];
  visa?: string;
  bestTime?: string;
  images: string[];
  isActive: boolean;
}

// Fetch package data from the API
// Fetch package data directly from the DB
async function getPackage(id: string): Promise<PackageData | null> {
  try {
    await connectDB();
    
    let pkg;
    
    // Support both _id (legacy) and slug (SEO-friendly) lookups
    if (isValidObjectId(id)) {
      pkg = await Package.findById(id).lean();
    }
    
    if (!pkg) {
      pkg = await Package.findOne({ slug: id }).lean();
    }
    
    if (!pkg) return null;
    
    // Convert to regular object to serialized fields like _id
    return JSON.parse(JSON.stringify(pkg));
  } catch (error) {
    console.error('Error fetching package:', error);
    return null;
  }
}

// Transform itinerary strings to the format expected by PackageItinerary component
function parseItinerary(itinerary: string[]): { day: number; title: string; description: string }[] {
  return itinerary.map((item, index) => {
    // Try to parse structured format like "Day 1: Title - Description"
    const dayMatch = item.match(/^Day\s*(\d+)[:\s-]*(.*)/i);
    if (dayMatch) {
      const [, dayNum, rest] = dayMatch;
      const [title, ...descParts] = rest.split(/[-:]/).map(s => s.trim());
      return {
        day: parseInt(dayNum, 10),
        title: title || `Day ${dayNum}`,
        description: descParts.join(' ').trim() || item
      };
    }
    // Fallback: use index as day number
    return {
      day: index + 1,
      title: `Day ${index + 1}`,
      description: item
    };
  });
}

// Generate dynamic SEO metadata for each package
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPackage(slug);
  
  if (!pkg) {
    return {
      title: "Package Not Found",
      description: "The requested travel package could not be found."
    };
  }

  // Truncate overview for description (max ~155 chars for SEO)
  const description = pkg.overview?.length > 155 
    ? pkg.overview.substring(0, 152) + "..." 
    : pkg.overview || `Discover ${pkg.title} with World Safari Tours.`;

  return {
    title: pkg.title,
    description: description,
    openGraph: {
      title: `${pkg.title} | World Safari Tours`,
      description: description,
      images: pkg.images?.length > 0 
        ? [{ url: pkg.images[0], width: 1200, height: 630, alt: pkg.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${pkg.title} | World Safari Tours`,
      description: description,
      images: pkg.images?.[0] ? [pkg.images[0]] : undefined,
    },
  };
}

export default async function PackageDetailsPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const pkg = await getPackage(slug);
  
  // Show 404 page if package not found
  if (!pkg) {
    notFound();
  }

  // Use first image as background, fallback to placeholder
  const backgroundImage = pkg.images?.[0] || 
    "https://images.unsplash.com/photo-1547975172-a7308ae8e16a?q=80&w=2574&auto=format&fit=crop";

  // Parse itinerary if it exists
  const parsedItinerary = pkg.itinerary?.length > 0 
    ? parseItinerary(pkg.itinerary) 
    : [];

  return (
    <main className="min-h-screen bg-white">
      <PackageHero 
        title={pkg.title}
        duration={pkg.duration}
        price={pkg.price}
        backgroundImage={backgroundImage}
      />

      <PackageOverview 
        overview={pkg.overview} 
        highlights={[]} 
      />

      {pkg.images && pkg.images.length > 0 && (
        <PackageGallery images={pkg.images} />
      )}

      {parsedItinerary.length > 0 && (
        <PackageItinerary itinerary={parsedItinerary} />
      )}

      <PackageInclusions 
        inclusions={pkg.inclusions || []} 
        exclusions={pkg.exclusions || []} 
      />

      {pkg.visa && <VisaInfo info={pkg.visa} />}

      <EnquiryForm packageTitle={pkg.title} />

      <CTA />
      
      <Footer />
    </main>
  );
}
