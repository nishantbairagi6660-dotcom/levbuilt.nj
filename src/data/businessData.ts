export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  desc: string;
  features: string[];
  image: string;
}

export interface ProjectItem {
  id: number;
  title: string;
  township: string;
  category: string;
  scope: string;
  sqft: string;
  duration: string;
  image: string;
  description: string;
  materials: string[];
}

export const BUSINESS_INFO = {
  name: "LevBuilt",
  legalName: "LevBuilt LLC",
  tagline: "Luxury Custom Remodeling & General Contracting",
  phone: "(201) 691-8341",
  phoneRaw: "+12016918341",
  location: "East Orange, NJ 07017",
  serviceAreas: "Northern & Central New Jersey (Essex, Hudson, Morris, Bergen, Mercer Counties)",
  instagram: "@levbuiltnj",
  instagramUrl: "https://www.instagram.com/levbuiltnj",
  hours: "Mon – Fri: 8:00 AM – 6:00 PM · Sat: By Appointment",
  license: "NJ HIC Compliant · Fully Licensed & Insured Contractor"
};

export const SERVICES: ServiceItem[] = [
  {
    id: "kitchens",
    title: "Architectural Kitchens & Bespoke Cabinetry",
    category: "Interior Architecture",
    desc: "Precision-engineered culinary spaces combining furniture-grade cabinetry, waterfall natural stone, integrated concealed refrigeration, and custom lighting architecture.",
    features: [
      "Bespoke inset & frameless European cabinetry",
      "Bookmatched quartzite & Calacatta marble installation",
      "Chef-grade appliance integration & concealed pantries",
      "Architectural cove & task LED illumination"
    ],
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "bathrooms",
    title: "Primary Suites & Spa-Grade Bathrooms",
    category: "Sanctuary Design",
    desc: "Transformative primary bathrooms featuring curbless zero-threshold steam showers, slab stone walls, radiant heated flooring, and custom white oak floating vanities.",
    features: [
      "Curbless walk-in thermostatic steam showers",
      "Full-height slab porcelain & marble wall cladding",
      "Schluter-certified waterproof substrate engineering",
      "Custom floating double vanities with concealed plumbing"
    ],
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "whole-home",
    title: "Whole-Home Transformations & Structural Reconfigurations",
    category: "Full Remodel",
    desc: "Comprehensive residential overhauls—from open-concept structural steel beam integration to full interior refits that honor existing architecture while introducing modern luxury.",
    features: [
      "Structural load-bearing wall removal & steel framing",
      "Complete architectural layout reconfigurations",
      "Historical architectural trim preservation & reproduction",
      "Upgraded mechanical, electrical & smart home backbones"
    ],
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "millwork",
    title: "Custom Architectural Millwork & Finish Carpentry",
    category: "Fine Craftsmanship",
    desc: "Fine carpentry built to furniture tolerances: acoustic slat walls, coffered ceilings, hidden pivot doors, and tailored architectural paneling made from rift white oak and walnut.",
    features: [
      "Rift-sawn white oak & walnut bespoke millwork",
      "Architectural hidden doors with concealed SOSS hinges",
      "Built-in library systems, wine storage & mudrooms",
      "Custom crown, base, and casing architectural profiles"
    ],
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "contracting",
    title: "Turnkey General Contracting & Project Management",
    category: "Execution",
    desc: "Meticulous single-point leadership overseeing every phase—from township building department permits in Essex and Morris counties to trade supervision and punch-list completion.",
    features: [
      "Direct principal oversight on every active job site",
      "Township permit expediting & full code compliance",
      "Rigorous HEPA dust containment & floor protection",
      "Transparent milestone scheduling & weekly homeowner briefings"
    ],
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 1,
    title: "The Charlize Coachella Residence",
    township: "Montclair, NJ (Essex County)",
    category: "Whole-Home Remodel",
    scope: "Architectural Kitchen, Living Pavilion & Custom Millwork",
    sqft: "4,850 sq. ft.",
    duration: "16 Weeks",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
    description: "A complete interior reimagining inspired by timeless Coachella modernism and Charlize architectural poise. Open-concept chef's kitchen, custom timber beam accents, integrated acoustic wall panels, and expansive steel-framed glazing.",
    materials: ["Rift-sawn White Oak", "Calacatta Monet Marble", "Custom Matte Slate Cabinetry", "Concealed Dornbracht Fixtures"]
  },
  {
    id: 2,
    title: "Short Hills Kitchen & Scullery",
    township: "Short Hills, NJ (Essex County)",
    category: "Kitchens",
    scope: "Chef's Kitchen, Butler's Pantry & Wine Room",
    sqft: "1,150 sq. ft.",
    duration: "10 Weeks",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=85",
    description: "Bespoke kitchen featuring floor-to-ceiling custom cabinetry in warm charcoal lacquer, a 14-foot Taj Mahal quartzite island, and an integrated hidden scullery for behind-the-scenes prep.",
    materials: ["Taj Mahal Quartzite", "Custom Charcoal Lacquer", "Sub-Zero & Wolf Integration", "Bespoke Bronze Hardware"]
  },
  {
    id: 3,
    title: "Hoboken Waterfront Primary Suite",
    township: "Hoboken, NJ (Hudson County)",
    category: "Bathrooms",
    scope: "Spa Bathroom & Walk-in Dressing Suite",
    sqft: "620 sq. ft.",
    duration: "7 Weeks",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1400&q=85",
    description: "A serene, minimalist wet-room design with bookmatched Grigio carnico porcelain slabs, freestanding solid-surface soaking tub, double custom vanity, and heated floor and bench systems.",
    materials: ["Porcelain Slabs", "Solid Surface Soaking Tub", "Radiant Heated Floors", "Wall-Mount Matte Black Fixtures"]
  },
  {
    id: 4,
    title: "Morristown Estate Living & Library",
    township: "Morristown, NJ (Morris County)",
    category: "Millwork & Details",
    scope: "Custom Library, Media Room & Bar",
    sqft: "1,400 sq. ft.",
    duration: "8 Weeks",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1400&q=85",
    description: "Floor-to-ceiling fluted walnut millwork with integrated warm 2700K ambient LED channels, hidden acoustic wall treatments, and a custom marble wet bar with concealed refrigeration.",
    materials: ["American Black Walnut", "Emperador Dark Marble", "Concealed Magnetic Hardware", "Integrated Ambient LED Channels"]
  },
  {
    id: 5,
    title: "Princeton Architect's Residence",
    township: "Princeton, NJ (Mercer County)",
    category: "Whole-Home Remodel",
    scope: "Main Level Renovation & Glazed Extension",
    sqft: "3,200 sq. ft.",
    duration: "14 Weeks",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    description: "Minimalist renovation creating continuous indoor-outdoor flow. Micro-cement flooring, concealed pocket sliding door systems, and an open architectural kitchen with a cantilevered oak breakfast bar.",
    materials: ["Micro-Cement Flooring", "Structural Glazing", "Custom Matte White Millwork", "Seamless Plaster Walls"]
  },
  {
    id: 6,
    title: "Livingston Primary Wellness Suite",
    township: "Livingston, NJ (Essex County)",
    category: "Bathrooms",
    scope: "Custom Steam Room & Dual Vanity Ensuite",
    sqft: "550 sq. ft.",
    duration: "6 Weeks",
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1400&q=85",
    description: "Bespoke primary bathroom featuring an enclosed glass aroma-steam room, natural limestone fluted tile, custom floating dual vanity in bleached oak, and ambient cove illumination.",
    materials: ["Fluted Natural Limestone", "Aroma-Steam Generator", "Bleached Oak Double Vanity", "Waterworks Brushed Nickel"]
  }
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & Site Consultation",
    subtitle: "In-Depth Onsite Evaluation",
    desc: "We meet at your residence to inspect existing structural conditions, review architectural blueprints or design concepts, discuss lifestyle requirements, and evaluate budget feasibility."
  },
  {
    step: "02",
    title: "Architectural Detailing & Fixed Scope",
    subtitle: "Clarity Before Construction",
    desc: "Every cabinet line, stone slab, plumbing rough-in, and trim profile is specified in detail. We provide a transparent, fixed-scope proposal with an explicit milestone schedule."
  },
  {
    step: "03",
    title: "Master Craftsmanship & Clean-Site Build",
    subtitle: "White-Glove Site Discipline",
    desc: "Our master carpenters and licensed trades execute the work under direct principal supervision. We use zip-wall dust containment, floor armor, and negative air filtration daily."
  },
  {
    step: "04",
    title: "Turnkey Handover & Warranty",
    subtitle: "Zero-Punch-List Completion",
    desc: "We perform rigorous quality inspections with you prior to project completion. Once perfected, we hand over all warranty documentation and maintenance guidelines."
  }
];

export const NJ_COUNTIES = [
  { name: "Essex County", towns: ["Montclair", "Short Hills", "Millburn", "Livingston", "Maplewood", "Glen Ridge", "South Orange", "Verona"] },
  { name: "Hudson County", towns: ["Hoboken", "Jersey City Downtown", "Jersey City Heights", "Weehawken"] },
  { name: "Morris County", towns: ["Morristown", "Chatham", "Madison", "Mendham", "Harding Township", "Chester"] },
  { name: "Bergen County", towns: ["Alpine", "Saddle River", "Englewood", "Franklin Lakes", "Ridgewood", "Tenafly"] },
  { name: "Mercer County", towns: ["Princeton", "Hopewell", "Pennington"] }
];

export const CRAFT_STANDARDS = [
  {
    title: "Architectural Tolerances",
    desc: "Millwork, tile alignment, and reveal gaps installed to sub-millimeter precision, creating seamless sightlines that define true luxury.",
    icon: "compass"
  },
  {
    title: "Clean-Site Protection",
    desc: "ZipWall containment zones, Ram Board floor protection, and HEPA air scrubbers ensure your home remains clean, healthy, and protected throughout construction.",
    icon: "shield-check"
  },
  {
    title: "Schluter Waterproofing",
    desc: "Every shower and wet area is constructed with certified multi-layer waterproofing membrane systems, backed by industry-leading warranties.",
    icon: "droplet"
  },
  {
    title: "Direct Principal Supervision",
    desc: "You never get handed off to an inexperienced sub. LevBuilt’s leadership is personally present on your job site every single week.",
    icon: "user-check"
  }
];
