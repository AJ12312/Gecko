export interface Region {
  slug: string;
  name: string;
  tagline: string;
  city: string;
  marketIndex: number;
  avgPrice: string;
  yoyGrowth: string;
  totalListings: number;
  // CSS gradient used as the "skyline" behind the card
  gradient: string;
  // Two-sentence strategic bio for the hover overlay
  strategicBio: string;
  // Market health tag value shown in Outfit Medium
  marketHealthTag: string;
  // Picsum image seed for the card photo
  imageSeed: string;
}

export interface Property {
  id: string;
  regionSlug: string;
  title: string;
  locality: string;
  price: number;          // raw number in ₹ lakhs for sorting
  priceDisplay: string;
  reraId: string;
  vibeScore: number;
  roi: number;            // annual ROI % for sorting
  bhk: string;
  area: string;
  // Unsplash-style deterministic image
  imageQuery: string;
}

// ─── Regions ───────────────────────────────────────────────────────────────────
export const REGIONS: Region[] = [
  {
    slug: "gurgaon",
    name: "Gurgaon",
    tagline: "Golf Course Rd · Cyber City · DLF",
    city: "NCR",
    marketIndex: 108.4,
    avgPrice: "₹2.1 Cr",
    yoyGrowth: "+14.2%",
    totalListings: 847,
    gradient: "linear-gradient(135deg, #0a0f0a 0%, #0d1a10 50%, #050f08 100%)",
    strategicBio: "India's fastest-growing corporate corridor, home to Fortune 500 headquarters and the nation's most coveted sky-high addresses. DLF's Golf Course Road defines the benchmark for aspirational urban living.",
    marketHealthTag: "YIELD: 7.2%",
    imageSeed: "gurgaon-skyline-modern",
  },
  {
    slug: "noida",
    name: "Noida",
    tagline: "Sector 150 · Expressway · Tech Hub",
    city: "NCR",
    marketIndex: 97.1,
    avgPrice: "₹1.2 Cr",
    yoyGrowth: "+9.7%",
    totalListings: 1124,
    gradient: "linear-gradient(135deg, #0a0d12 0%, #0d1520 50%, #050810 100%)",
    strategicBio: "A rapidly maturing tech-residential hub offering the highest green cover density in NCR and exceptional infrastructure connectivity. Sector 150 represents the new gold standard for quality-of-life living.",
    marketHealthTag: "YIELD: 6.1%",
    imageSeed: "noida-expressway-luxury",
  },
  {
    slug: "south-delhi",
    name: "South Delhi",
    tagline: "Defence Colony · GK · Hauz Khas",
    city: "NCR",
    marketIndex: 112.8,
    avgPrice: "₹4.8 Cr",
    yoyGrowth: "+7.1%",
    totalListings: 412,
    gradient: "linear-gradient(135deg, #120a0a 0%, #1a0d10 50%, #100508 100%)",
    strategicBio: "India's premier diplomatic district, where architectural legacy meets unmatched cultural prestige. Unrivalled appreciation potential in a micro-market governed by strict supply constraints and generational ownership.",
    marketHealthTag: "YIELD: 6.4%",
    imageSeed: "south-delhi-villa-luxury",
  },
  {
    slug: "aerocity",
    name: "Aerocity",
    tagline: "IGI Adjacent · Business District",
    city: "NCR",
    marketIndex: 103.5,
    avgPrice: "₹1.8 Cr",
    yoyGrowth: "+11.4%",
    totalListings: 289,
    gradient: "linear-gradient(135deg, #0a0a12 0%, #0f0f1a 50%, #080810 100%)",
    strategicBio: "Delhi's most strategically connected business node, built at the intersection of global transit and domestic commerce. Premium commercial-adjacent residences command consistent rental yields from international executives.",
    marketHealthTag: "YIELD: 8.1%",
    imageSeed: "aerocity-modern-architecture",
  },
  {
    slug: "dwarka-expressway",
    name: "Dwarka Expressway",
    tagline: "Sector 108 · Hero Honda · New Sectors",
    city: "NCR",
    marketIndex: 94.2,
    avgPrice: "₹85 L",
    yoyGrowth: "+18.6%",
    totalListings: 1632,
    gradient: "linear-gradient(135deg, #0a0d0a 0%, #101a10 50%, #080d08 100%)",
    strategicBio: "The highest capital appreciation corridor in NCR, now fully connected with Delhi via an eight-lane expressway. Early investors are witnessing 18%+ YoY returns as infrastructure matures at an extraordinary pace.",
    marketHealthTag: "CAGR: 18.6%",
    imageSeed: "dwarka-expressway-new-sector",
  },
  {
    slug: "greater-noida",
    name: "Greater Noida",
    tagline: "Yamuna Expressway · Knowledge Park",
    city: "NCR",
    marketIndex: 88.7,
    avgPrice: "₹65 L",
    yoyGrowth: "+22.1%",
    totalListings: 2041,
    gradient: "linear-gradient(135deg, #0d0a10 0%, #150d18 50%, #0a0810 100%)",
    strategicBio: "NCR's highest-yielding growth frontier, powered by Jewar Airport and the upcoming Noida International Film City. The convergence of industrial scale and residential planning is creating a once-in-a-decade investment window.",
    marketHealthTag: "CAGR: 22.1%",
    imageSeed: "greater-noida-township",
  },
];

// ─── Properties ────────────────────────────────────────────────────────────────
export const PROPERTIES: Property[] = [
  // Gurgaon
  {
    id: "g1", regionSlug: "gurgaon", title: "DLF Camellias", locality: "Golf Course Rd",
    price: 35000, priceDisplay: "₹35,00,00,000", reraId: "P12345678901",
    vibeScore: 96, roi: 11.2, bhk: "4 BHK", area: "8,500 sq ft",
    imageQuery: "luxury-apartment-interior-modern",
  },
  {
    id: "g2", regionSlug: "gurgaon", title: "The Camellias Estate", locality: "DLF Phase 5",
    price: 18000, priceDisplay: "₹18,00,00,000", reraId: "HRERA-PKL-GGM-2022-0041",
    vibeScore: 91, roi: 9.8, bhk: "3 BHK", area: "4,200 sq ft",
    imageQuery: "modern-luxury-living-room-high-rise",
  },
  {
    id: "g3", regionSlug: "gurgaon", title: "M3M Golf Hills", locality: "Sector 79",
    price: 8500, priceDisplay: "₹8,50,00,000", reraId: "HRERA-PKL-GGM-2021-0192",
    vibeScore: 88, roi: 13.4, bhk: "3 BHK", area: "2,100 sq ft",
    imageQuery: "golf-course-view-apartment-pool",
  },
  {
    id: "g4", regionSlug: "gurgaon", title: "Central Park Resorts", locality: "Sector 48",
    price: 6200, priceDisplay: "₹6,20,00,000", reraId: "HRERA-PKL-GGM-2020-0314",
    vibeScore: 83, roi: 8.7, bhk: "2 BHK", area: "1,450 sq ft",
    imageQuery: "resort-style-apartment-swimming-pool-skyline",
  },
  {
    id: "g5", regionSlug: "gurgaon", title: "Ireo Victory Valley", locality: "Sector 67",
    price: 4800, priceDisplay: "₹4,80,00,000", reraId: "HRERA-PKL-GGM-2021-0087",
    vibeScore: 79, roi: 10.1, bhk: "3 BHK", area: "1,850 sq ft",
    imageQuery: "modern-apartment-building-exterior-sunset",
  },
  // Noida
  {
    id: "n1", regionSlug: "noida", title: "Godrej Woods", locality: "Sector 43",
    price: 9200, priceDisplay: "₹9,20,00,000", reraId: "UPRERAPRJ123456",
    vibeScore: 94, roi: 12.3, bhk: "3 BHK", area: "2,050 sq ft",
    imageQuery: "luxury-forest-apartment-greenery-modern",
  },
  {
    id: "n2", regionSlug: "noida", title: "Mahagun Mywoods", locality: "Sector 16C",
    price: 5400, priceDisplay: "₹5,40,00,000", reraId: "UPRERAPRJ234567",
    vibeScore: 85, roi: 11.8, bhk: "2 BHK", area: "1,250 sq ft",
    imageQuery: "green-township-apartment-complex-aerial",
  },
  {
    id: "n3", regionSlug: "noida", title: "ATS Pristine Golf Meadows", locality: "Sector 150",
    price: 7800, priceDisplay: "₹7,80,00,000", reraId: "UPRERAPRJ345678",
    vibeScore: 90, roi: 14.5, bhk: "4 BHK", area: "2,800 sq ft",
    imageQuery: "golf-meadow-luxury-villa-premium",
  },
  {
    id: "n4", regionSlug: "noida", title: "Supertech Cape Town", locality: "Sector 74",
    price: 3200, priceDisplay: "₹3,20,00,000", reraId: "UPRERAPRJ456789",
    vibeScore: 72, roi: 9.2, bhk: "2 BHK", area: "1,050 sq ft",
    imageQuery: "affordable-modern-apartment-interior-bright",
  },
  // South Delhi
  {
    id: "sd1", regionSlug: "south-delhi", title: "The Grand Mansion", locality: "Greater Kailash I",
    price: 48000, priceDisplay: "₹48,00,00,000", reraId: "DLRERA2022P0001",
    vibeScore: 97, roi: 6.8, bhk: "5 BHK", area: "12,000 sq ft",
    imageQuery: "grand-mansion-luxury-bungalow-delhi",
  },
  {
    id: "sd2", regionSlug: "south-delhi", title: "DLF Chattarpur Farmhouse", locality: "Chattarpur",
    price: 25000, priceDisplay: "₹25,00,00,000", reraId: "DLRERA2021P0042",
    vibeScore: 93, roi: 7.4, bhk: "4 BHK", area: "9,500 sq ft",
    imageQuery: "farmhouse-lush-garden-luxury-pool",
  },
  {
    id: "sd3", regionSlug: "south-delhi", title: "The Hauz Khas Penthouse", locality: "Hauz Khas",
    price: 16500, priceDisplay: "₹16,50,00,000", reraId: "DLRERA2023P0108",
    vibeScore: 89, roi: 8.1, bhk: "3 BHK", area: "3,800 sq ft",
    imageQuery: "penthouse-terrace-city-view-night",
  },
  // Aerocity
  {
    id: "a1", regionSlug: "aerocity", title: "Worldmark Aerocity Residences", locality: "IGI Adjacent",
    price: 12000, priceDisplay: "₹12,00,00,000", reraId: "DLRERA2022P0215",
    vibeScore: 88, roi: 12.7, bhk: "3 BHK", area: "2,400 sq ft",
    imageQuery: "business-district-luxury-apartment-aerocity",
  },
  {
    id: "a2", regionSlug: "aerocity", title: "GMR Residences", locality: "Sector 23A",
    price: 8900, priceDisplay: "₹8,90,00,000", reraId: "DLRERA2021P0318",
    vibeScore: 82, roi: 13.9, bhk: "2 BHK", area: "1,680 sq ft",
    imageQuery: "modern-highrise-city-airport-view",
  },
  // Dwarka Expressway
  {
    id: "de1", regionSlug: "dwarka-expressway", title: "Godrej Meridien", locality: "Sector 106",
    price: 4200, priceDisplay: "₹4,20,00,000", reraId: "HRERA-PKL-GGM-2020-0521",
    vibeScore: 87, roi: 18.2, bhk: "3 BHK", area: "1,900 sq ft",
    imageQuery: "expressway-apartment-modern-sunrise",
  },
  {
    id: "de2", regionSlug: "dwarka-expressway", title: "Sobha City", locality: "Sector 108",
    price: 3600, priceDisplay: "₹3,60,00,000", reraId: "HRERA-PKL-GGM-2021-0634",
    vibeScore: 83, roi: 16.8, bhk: "2 BHK", area: "1,400 sq ft",
    imageQuery: "township-residential-complex-wide-shot",
  },
  // Greater Noida
  {
    id: "gn1", regionSlug: "greater-noida", title: "Gaur City 2", locality: "12th Avenue",
    price: 2800, priceDisplay: "₹2,80,00,000", reraId: "UPRERAPRJ567890",
    vibeScore: 78, roi: 21.4, bhk: "2 BHK", area: "1,120 sq ft",
    imageQuery: "large-township-affordable-housing-wide",
  },
  {
    id: "gn2", regionSlug: "greater-noida", title: "ATS Knightsbridge", locality: "Sector 124",
    price: 5100, priceDisplay: "₹5,10,00,000", reraId: "UPRERAPRJ678901",
    vibeScore: 86, roi: 19.7, bhk: "3 BHK", area: "1,750 sq ft",
    imageQuery: "premium-gated-community-garden-villa",
  },
];

export function getRegion(slug: string): Region | undefined {
  return REGIONS.find((r) => r.slug === slug);
}

export function getPropertiesByRegion(slug: string): Property[] {
  return PROPERTIES.filter((p) => p.regionSlug === slug);
}
