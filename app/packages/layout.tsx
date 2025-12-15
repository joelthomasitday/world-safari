import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Packages",
  description: "Explore our curated collection of luxury travel packages. From honeymoon getaways to adventure safaris, find your perfect journey with World Safari Tours.",
  openGraph: {
    title: "Explore Travel Packages | World Safari Tours",
    description: "Discover handcrafted travel packages for every type of traveler. Honeymoons, safaris, adventures, and more.",
  },
};

export default function PackagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
