import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { CTA } from "@/components/landing/CTA";
import { PackageHero } from "@/components/package-details/PackageHero";
import { PackageOverview } from "@/components/package-details/PackageOverview";
import { PackageGallery } from "@/components/package-details/PackageGallery";
import { PackageItinerary } from "@/components/package-details/PackageItinerary";
import { PackageInclusions } from "@/components/package-details/PackageInclusions";
import { VisaInfo } from "@/components/package-details/VisaInfo";
import { EnquiryForm } from "@/components/package-details/EnquiryForm";

// Mock Data
const PACKAGE_DATA = {
  id: "1",
  title: "The Great Migration Safari",
  destination: "Serengeti, Tanzania",
  duration: "6 Nights / 7 Days",
  price: "$4,500",
  backgroundImage: "https://images.unsplash.com/photo-1547975172-a7308ae8e16a?q=80&w=2574&auto=format&fit=crop",
  overview: `Experience the greatest wildlife spectacle on Earth in the Serengeti. This exclusive 7-day journey takes you deep into the heart of the migration, where millions of wildebeest and zebras traverse the plains in search of fresh grazing.
  
  Stay in luxury tented camps that offer front-row seats to the action, guided by expert rangers who know the land's secrets. From sunrise hot air balloon rides to sunset game drives, every moment is crafted for wonder and comfort.`,
  highlights: [
    "Witness the Great Migration river crossings",
    "Private game drives in 4x4 Land Cruisers",
    "Sunrise hot air balloon safari over the plains",
    "Luxury accommodation in the heart of the park",
    "Guided walking safaris with Maasai warriors",
    "Sundowners overlooking the vast savanna"
  ],
  gallery: [
    "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2671&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2668&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?q=80&w=2667&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2668&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1628267208922-2622e0e0a51f?q=80&w=2574&auto=format&fit=crop",
  ],
  itinerary: [
    {
      day: 1,
      title: "Arrival in Kilimanjaro & Transfer to Arusha",
      description: "Upon arrival at Kilimanjaro International Airport, you will be met by our representative and transferred to your luxury lodge in Arusha. Enjoy a relaxing evening preparing for your adventure."
    },
    {
      day: 2,
      title: "Flight to Serengeti & Afternoon Game Drive",
      description: "After breakfast, board a light aircraft for a scenic flight to the Serengeti. Arrive in time for lunch at your camp, followed by an afternoon game drive to spot the first herds of the migration."
    },
    {
      day: 3,
      title: "Full Day Great Migration Experience",
      description: "Spend the entire day tracking the migration. Witness the dramatic river crossings (seasonal) and the predator-prey interactions that define this ecosystem. Picnic lunch in the bush included."
    },
    {
      day: 4,
      title: "Hot Air Balloon Safari & Bush Breakfast",
      description: "Wake up before dawn for a bucket-list experience: a hot air balloon ride over the Serengeti plains at sunrise. Celebrate with a champagne bush breakfast upon landing."
    },
    {
      day: 5,
      title: "Ngorongoro Crater Descent",
      description: "Drive to the Ngorongoro Conservation Area. Descend into the crater floor for a game drive in this UNESCO World Heritage Site, often called the 'Garden of Eden' for its density of wildlife."
    },
    {
      day: 6,
      title: "Cultural Visit & Relaxation",
      description: "Visit a local Maasai village to learn about their traditions and way of life. Return to the lodge for an afternoon of relaxation at the spa or by the infinity pool."
    },
    {
      day: 7,
      title: "Departure",
      description: "After a final breakfast, transfer to the airstrip for your flight back to Kilimanjaro International Airport for your onward journey."
    }
  ],
  inclusions: [
    "Luxury accommodation for 6 nights",
    "All meals (Breakfast, Lunch, Dinner)",
    "Internal flights (Arusha - Serengeti - Arusha)",
    "Private 4x4 Land Cruiser with pop-up roof",
    "Professional English-speaking driver/guide",
    "All park fees and conservation levies",
    "Flying Doctors emergency evacuation cover",
    "Unlimited mineral water during game drives"
  ],
  exclusions: [
    "International flights",
    "Visa fees",
    "Travel insurance",
    "Tips for guides and staff",
    "Personal expenses (laundry, drinks, etc.)",
    "Optional activities not listed"
  ],
  visaInfo: "Most travelers require a visa to enter Tanzania. E-visas are available and recommended to be applied for at least 2 weeks in advance. A valid Yellow Fever vaccination certificate is required upon entry."
};

export default function PackageDetailsPage({ params }: { params: { id: string } }) {
  // In a real app, we would fetch data based on params.id
  // const package = await fetchPackage(params.id);
  const pkg = PACKAGE_DATA; 

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <PackageHero 
        title={pkg.title}
        destination={pkg.destination}
        duration={pkg.duration}
        price={pkg.price}
        backgroundImage={pkg.backgroundImage}
      />

      <PackageOverview 
        overview={pkg.overview} 
        highlights={pkg.highlights} 
      />

      <PackageGallery images={pkg.gallery} />

      <PackageItinerary itinerary={pkg.itinerary} />

      <PackageInclusions 
        inclusions={pkg.inclusions} 
        exclusions={pkg.exclusions} 
      />

      <VisaInfo info={pkg.visaInfo} />

      <EnquiryForm packageTitle={pkg.title} />

      <CTA />
      
      <Footer />
    </main>
  );
}
