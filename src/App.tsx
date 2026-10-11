import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  MapPin, 
  Shield, 
  CheckCircle2, 
  Menu, 
  X, 
  ArrowUpRight, 
  ArrowRight, 
  ArrowDown,
  Check, 
  Instagram, 
  Compass, 
  ShieldCheck, 
  Droplet, 
  UserCheck,
  PhoneCall,
  Search,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Users,
  Clock,
  Award
} from 'lucide-react';
import { 
  BUSINESS_INFO, 
  SERVICES, 
  PROJECTS, 
  PROCESS_STEPS, 
  NJ_COUNTIES, 
  CRAFT_STANDARDS,
  ProjectItem 
} from './data/businessData';

// Verified 200 OK Full-Bleed Luxury Hero Slides
const HERO_SLIDES = [
  {
    id: 1,
    tag: "LUXURY CUSTOM REMODELING & GENERAL CONTRACTING · NEW JERSEY",
    title: "Exceptional Homes.",
    highlight: "Thoughtfully Reimagined.",
    subtitle: "LevBuilt transforms premier residences across Northern & Central New Jersey through architectural discipline, bespoke millwork, and master-level execution.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85",
    alt: "Luxury open-concept architectural kitchen and dining pavilion by LevBuilt",
    caption: "The Montclair Estate · Custom Millwork & Kitchen Renovation"
  },
  {
    id: 2,
    tag: "BESPOKE INTERIOR ARCHITECTURE · SHORT HILLS & ESSEX COUNTY",
    title: "Architectural Rigor.",
    highlight: "Bespoke Craftsmanship.",
    subtitle: "Precision-engineered culinary spaces and grand living pavilions crafted to sub-millimeter tolerances with furniture-grade timber and bookmatched stone.",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=2000&q=85",
    alt: "Luxury living room and bespoke architectural millwork",
    caption: "Short Hills Residence · Structural Remodeling & Living Pavilion"
  },
  {
    id: 3,
    tag: "CURATED SANCTUARIES · HOBOKEN & WATERFRONT NJ",
    title: "Charlize Coachella",
    highlight: "Living Pavilions.",
    subtitle: "Harmonizing timeless natural timbers, seamless plaster, and expansive steel-framed glazing for effortless everyday luxury and elevated family life.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=85",
    alt: "Bespoke modern luxury kitchen with waterfall marble island",
    caption: "The Charlize Coachella Residence · Montclair, NJ"
  },
  {
    id: 4,
    tag: "MASTER CONTRACTING & HISTORIC PRESERVATION",
    title: "Enduring Quality.",
    highlight: "White-Glove Discipline.",
    subtitle: "From historic Tudor restorations in Glen Ridge to contemporary additions in Princeton, we bring meticulous clean-site protocols and principal supervision.",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=2000&q=85",
    alt: "Custom chef's kitchen with natural wood island and pendant illumination",
    caption: "Morristown Estate · Chef's Kitchen & Scullery"
  },
  {
    id: 5,
    tag: "PRIMARY SUITES & WELLNESS BATHROOMS",
    title: "Spa-Grade Retreats.",
    highlight: "Engineered for Calm.",
    subtitle: "Curbless zero-threshold steam showers, heated stone flooring, and custom floating vanities with certified Schluter waterproofing.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85",
    alt: "Minimalist luxury master suite with architectural lighting",
    caption: "Hoboken Waterfront · Primary Spa Suite & Bath"
  }
];

// Fallback safe image for any load errors
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85";

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "Charlize Coachella",
    phone: "(201) 691-8341",
    email: "charlize.coachella@example.com",
    township: "Montclair, NJ",
    projectType: "Kitchen Remodeling",
    investmentRange: "$100,000 – $250,000",
    timeline: "1 – 3 Months",
    details: "Looking for an open-concept architectural kitchen with custom rift white oak cabinetry, waterfall natural stone island, and timber beam accents."
  });

  // Track window scroll for sticky navbar blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Preload hero images to avoid flashing
  useEffect(() => {
    HERO_SLIDES.forEach(slide => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  // Automatic Hero Slideshow every 5.5 seconds with pause on hover
  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    if (target.src !== FALLBACK_IMAGE) {
      target.src = FALLBACK_IMAGE;
    }
  };

  const filteredProjects = activeCategory === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-midnight selection:bg-mutedBronze selection:text-white font-sans">
      
      {/* ========================================================= */}
      {/* TOP UTILITY ANNOUNCEMENT BAR                             */}
      {/* ========================================================= */}
      <div className="bg-[#171B22] text-[#C4C5C7] text-xs py-2 px-6 md:px-14 border-b border-white/10 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5 hover:text-white transition-colors">
              <span className="text-mutedBronze font-medium">Email:</span>
              <a href="mailto:contact@levbuilt.com">contact@levbuilt.com</a>
            </span>
            <span className="text-white/20">|</span>
            <span className="flex items-center space-x-1.5 hover:text-white transition-colors">
              <span className="text-mutedBronze font-medium">Direct:</span>
              <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="font-semibold text-white">{BUSINESS_INFO.phone}</a>
            </span>
            <span className="text-white/20">|</span>
            <span className="text-mutedBronze/90 font-medium">
              East Orange & Northern NJ Metro
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <a 
              href={BUSINESS_INFO.instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-lightText hover:text-white transition-colors flex items-center space-x-1"
            >
              <Instagram className="w-3.5 h-3.5 text-mutedBronze" />
              <span>@levbuiltnj</span>
            </a>
            <button 
              onClick={() => setConsultationModalOpen(true)}
              className="bg-[#B58A55] hover:bg-[#9E7340] text-white px-3.5 py-1 rounded text-[11px] font-semibold uppercase tracking-wider transition-colors flex items-center space-x-1"
            >
              <span>Book Appointment</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MAIN HEADER & NAVIGATION                                 */}
      {/* ========================================================= */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3.5 border-b border-gray-100' 
          : 'bg-white/95 backdrop-blur-md py-4 border-b border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-14 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2.5 group">
            <div className="w-8 h-8 rounded bg-midnight flex items-center justify-center text-mutedBronze font-bold text-lg font-serif">
              L
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold tracking-wider text-midnight font-coachella uppercase group-hover:text-mutedBronze transition-colors">
                LevBuilt
              </span>
              <span className="text-[9px] tracking-widest-plus text-gray-500 uppercase -mt-1 font-medium">
                Luxury Remodeling · NJ
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-bold uppercase tracking-wider text-gray-700">
            <a href="#hero" className="hover:text-mutedBronze transition-colors">Home</a>
            <a href="#about" className="hover:text-mutedBronze transition-colors">About</a>
            <a href="#services" className="hover:text-mutedBronze transition-colors">Services</a>
            <a href="#portfolio" className="hover:text-mutedBronze transition-colors">Projects</a>
            <a href="#methodology" className="hover:text-mutedBronze transition-colors">Methodology</a>
            <a href="#standards" className="hover:text-mutedBronze transition-colors">Standards</a>
            <a href="#service-area" className="hover:text-mutedBronze transition-colors">Service Area</a>
            <a href="#contact" className="hover:text-mutedBronze transition-colors">Contact</a>
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center space-x-4">
            <a 
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="text-xs font-semibold text-midnight hover:text-mutedBronze transition-colors flex items-center space-x-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-mutedBronze" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
            <button 
              onClick={() => setConsultationModalOpen(true)}
              className="bg-midnight hover:bg-mutedBronze text-white px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center space-x-1.5 shadow-sm"
            >
              <span>Schedule Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-midnight p-2 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-6 shadow-xl animate-fade-in">
            <nav className="flex flex-col space-y-4 text-xs font-bold uppercase tracking-wider text-gray-700">
              <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="text-mutedBronze">Home</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-mutedBronze">About Us</a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-mutedBronze">Services</a>
              <a href="#portfolio" onClick={() => setMobileMenuOpen(false)} className="hover:text-mutedBronze">Projects</a>
              <a href="#methodology" onClick={() => setMobileMenuOpen(false)} className="hover:text-mutedBronze">Methodology</a>
              <a href="#standards" onClick={() => setMobileMenuOpen(false)} className="hover:text-mutedBronze">Standards</a>
              <a href="#service-area" onClick={() => setMobileMenuOpen(false)} className="hover:text-mutedBronze">Service Area</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-mutedBronze">Contact</a>
              
              <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3">
                <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-xs font-bold text-midnight flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-mutedBronze" />
                  <span>{BUSINESS_INFO.phone}</span>
                </a>
                <button 
                  onClick={() => { setMobileMenuOpen(false); setConsultationModalOpen(true); }}
                  className="w-full bg-midnight text-white py-3 rounded-lg text-xs uppercase font-bold tracking-wider"
                >
                  Schedule Consultation ↗
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* ========================================================= */}
      {/* 1. HERO SECTION — FULL-BLEED IMAGE WITH FLOATING TEXT     */}
      {/* & AUTOMATIC SLIDESHOW WITH SMOOTH CROSSFADE               */}
      {/* ========================================================= */}
      <section 
        id="hero"
        className="relative min-h-[92vh] lg:min-h-screen flex items-end justify-start bg-midnight overflow-hidden select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Full-bleed Background Slides with Smooth Crossfade */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img 
                src={slide.image} 
                alt={slide.alt}
                onError={handleImageError}
                className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05] transform scale-100"
              />
            </div>
          ))}

          {/* Cinematic Dark Gradient Overlay for Pristine Readability */}
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-midnight via-midnight/55 to-midnight/35 pointer-events-none"></div>
          <div className="absolute inset-0 z-20 bg-gradient-to-r from-midnight/80 via-midnight/40 to-transparent pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white z-20 pointer-events-none"></div>
        </div>

        {/* Floating Overlay Content */}
        <div className="relative z-30 max-w-5xl px-6 md:px-14 pb-20 md:pb-28 pt-36 sm:pt-44">
          
          {/* Eyebrow Label with Tasteful Bronze Accent */}
          <div className="inline-flex items-center space-x-2 text-[11px] md:text-xs font-semibold uppercase tracking-widest-plus text-mutedBronze mb-5 bg-midnight/70 px-4 py-1.5 rounded-full border border-mutedBronze/30 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-mutedBronze animate-pulse"></span>
            <span>{HERO_SLIDES[currentSlide].tag}</span>
          </div>

          {/* Large Refined Editorial Headline (Charlize Coachella Style) */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08] mb-6 font-coachella">
            <span>{HERO_SLIDES[currentSlide].title}</span> <br />
            <span className="font-serif italic font-normal text-white/95 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-mutedBronze/90 block mt-1">
              {HERO_SLIDES[currentSlide].highlight}
            </span>
          </h1>

          {/* Concise Description */}
          <p className="text-base sm:text-lg md:text-xl text-gray-200 font-light max-w-2xl leading-relaxed mb-9 drop-shadow">
            {HERO_SLIDES[currentSlide].subtitle}
          </p>

          {/* CTA Buttons & Phone Link */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-12">
            
            {/* Primary Consultation Pill CTA */}
            <button 
              onClick={() => setConsultationModalOpen(true)}
              className="bg-white text-midnight hover:bg-mutedBronze hover:text-white px-8 py-4 rounded-full text-sm md:text-base font-bold uppercase tracking-wider shadow-2xl transition-all duration-200 flex items-center space-x-2 group"
            >
              <span>Schedule a Consultation</span>
              <span className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
            </button>

            {/* Secondary Ghost Button */}
            <a 
              href="#portfolio"
              className="px-6 py-4 rounded-full text-sm md:text-base font-semibold tracking-wider uppercase text-white hover:text-white hover:bg-white/10 transition-colors border border-white/30 backdrop-blur-md flex items-center space-x-2"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            {/* Direct Phone Dial */}
            <a 
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="text-xs md:text-sm text-gray-300 hover:text-mutedBronze font-semibold flex items-center space-x-2 ml-1 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-mutedBronze" />
              <span>Direct: {BUSINESS_INFO.phone}</span>
            </a>
          </div>

          {/* Subtle Slide Indicators & Progress Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-8 border-t border-white/15 gap-4">
            
            {/* Slideshow Indicator Pills */}
            <div className="flex items-center space-x-3">
              {HERO_SLIDES.map((slide, sIdx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(sIdx)}
                  className={`h-2 rounded-full transition-all duration-300 relative overflow-hidden ${
                    sIdx === currentSlide 
                      ? 'w-12 bg-mutedBronze' 
                      : 'w-3 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${sIdx + 1}`}
                >
                  {sIdx === currentSlide && (
                    <div className={`h-full bg-white ${isPaused ? 'opacity-50' : 'slide-progress-bar'}`}></div>
                  )}
                </button>
              ))}

              <span className="text-[11px] text-gray-300 font-mono tracking-wider ml-2">
                0{currentSlide + 1} / 0{HERO_SLIDES.length}
              </span>

              {isPaused && (
                <span className="text-[10px] text-mutedBronze uppercase tracking-widest ml-2 px-2 py-0.5 rounded bg-black/40">
                  Paused
                </span>
              )}
            </div>

            {/* Manual Arrows & Location Tag */}
            <div className="flex items-center space-x-4">
              <span className="text-xs text-gray-300 font-light hidden md:inline-block italic">
                {HERO_SLIDES[currentSlide].caption}
              </span>

              <div className="flex items-center space-x-1.5">
                <button 
                  onClick={prevSlide}
                  className="w-9 h-9 rounded-full bg-black/40 hover:bg-mutedBronze text-white flex items-center justify-center transition-colors border border-white/10"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="w-9 h-9 rounded-full bg-black/40 hover:bg-mutedBronze text-white flex items-center justify-center transition-colors border border-white/10"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. ABOUT US SECTION (Clean Editorial Layout - Fixed)      */}
      {/* ========================================================= */}
      <section id="about" className="py-24 md:py-32 bg-white px-6 md:px-14">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
            
            {/* Left Column: Clean, Large Architectural Photograph (NO text covering photo) */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100 relative group aspect-[4/3] sm:aspect-[16/11]">
                <img 
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85" 
                  alt="LevBuilt master craftsmanship in custom luxury kitchen and millwork" 
                  onError={handleImageError}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <div className="absolute bottom-5 left-6 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-mutedBronze font-bold block mb-0.5">
                    Verified Craftsmanship
                  </span>
                  <p className="text-xs text-white/90 font-light">
                    Furniture-grade cabinetry & waterfall natural stone
                  </p>
                </div>
              </div>

              {/* Floating Quality Stamp */}
              <div className="absolute -bottom-6 -right-6 bg-midnight text-white p-5 rounded-2xl shadow-xl border border-white/10 hidden sm:block max-w-[220px]">
                <div className="flex items-center space-x-2 text-mutedBronze mb-1">
                  <Award className="w-5 h-5" />
                  <span className="text-xs uppercase font-bold tracking-wider">NJ HIC Verified</span>
                </div>
                <div className="text-[11px] text-gray-300 leading-tight">
                  Fully licensed, bonded, and insured general contractor.
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Copy, Clear Typography, Clear CTA */}
            <div className="lg:col-span-6 space-y-6 lg:pl-4">
              <span className="text-xs uppercase tracking-widest-plus text-[#B58A55] font-bold block">
                About LevBuilt
              </span>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-midnight tracking-tight leading-tight font-coachella">
                Creative solutions by professional designers & master builders.
              </h2>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light">
                Your residence is an expression of who you are, and its architecture should elevate your daily lifestyle. Whether you have traditional tastes or desire modern minimalism, we design and execute high-end residential remodeling tailored to your exact purpose.
              </p>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light">
                Based in East Orange and serving premier communities across Essex, Hudson, Morris, Bergen, and Mercer counties, LevBuilt eliminates disconnected sub-contracting. Our principal leadership personally oversees engineering, permit expediting, and clean-site construction on every active job.
              </p>

              <div className="pt-2 flex items-center space-x-4">
                <button 
                  onClick={() => setConsultationModalOpen(true)}
                  className="bg-midnight hover:bg-mutedBronze text-white px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md inline-flex items-center space-x-2"
                >
                  <span>Request a Consultation</span>
                  <span>→</span>
                </button>

                <a 
                  href="#how-it-works"
                  className="text-xs uppercase tracking-wider font-bold text-midnight hover:text-mutedBronze transition-colors"
                >
                  Explore Our Process →
                </a>
              </div>
            </div>

          </div>

          {/* 3 Micro-Feature Columns (Refined & Aligned) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-gray-100">
            
            <div className="flex items-start space-x-4 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-mutedBronze flex-shrink-0 shadow-sm">
                <Layers className="w-6 h-6 text-mutedBronze" />
              </div>
              <div>
                <h3 className="text-base font-bold text-midnight mb-1 font-coachella">Reasonable & Fixed Pricing</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-light">
                  We produce detailed architectural estimates with fixed milestone schedules and zero hidden surprises.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-mutedBronze flex-shrink-0 shadow-sm">
                <Sparkles className="w-6 h-6 text-mutedBronze" />
              </div>
              <div>
                <h3 className="text-base font-bold text-midnight mb-1 font-coachella">Exclusive Architectural Design</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-light">
                  A synthesis of structural discipline, bespoke millwork, and refined aesthetic poise is the hallmark of our work.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-mutedBronze flex-shrink-0 shadow-sm">
                <Users className="w-6 h-6 text-mutedBronze" />
              </div>
              <div>
                <h3 className="text-base font-bold text-midnight mb-1 font-coachella">Licensed Master Craftsmen</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-light">
                  Direct principal supervision on every site with vetted, certified master carpenters and licensed trades.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. "HOW IT WORKS" (3 Easy Steps to Your Dream Remodel)    */}
      {/* ========================================================= */}
      <section id="how-it-works" className="py-20 md:py-28 bg-[#FAFAFA] px-6 md:px-14 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            
            <div className="lg:col-span-4">
              <span className="text-xs uppercase tracking-widest-plus text-[#B58A55] font-bold block mb-2">
                How It Works
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-midnight tracking-tight leading-tight mb-4 font-coachella">
                3 Easy steps to get interior design & remodeling
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-light">
                The layout of your residence varies from one home to another. The shape and structural architecture determine the flow, cabinetry, counter space, and natural illumination.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div className="bg-white p-8 rounded-2xl border border-gray-100 relative overflow-hidden group hover:shadow-lg transition-all">
                <div className="text-7xl font-bold text-gray-100 font-coachella absolute -top-3 right-3 select-none pointer-events-none group-hover:text-mutedBronze/20 transition-colors">
                  01
                </div>
                <div className="relative z-10 pt-6">
                  <h3 className="text-base font-bold text-midnight mb-3 font-coachella">
                    We Visit <br />You At Home
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">
                    We measure your residence, inspect existing structural conditions, and evaluate your lifestyle requirements and budget feasibility.
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-gray-100 relative overflow-hidden group hover:shadow-lg transition-all">
                <div className="text-7xl font-bold text-gray-100 font-coachella absolute -top-3 right-3 select-none pointer-events-none group-hover:text-mutedBronze/20 transition-colors">
                  02
                </div>
                <div className="relative z-10 pt-6">
                  <h3 className="text-base font-bold text-midnight mb-3 font-coachella">
                    Preliminary <br />Computer 3D Designs
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">
                    We utilize 3D architectural detailing to show you every cabinet line, stone slab, and illumination channel prior to demolition.
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-gray-100 relative overflow-hidden group hover:shadow-lg transition-all">
                <div className="text-7xl font-bold text-gray-100 font-coachella absolute -top-3 right-3 select-none pointer-events-none group-hover:text-mutedBronze/20 transition-colors">
                  03
                </div>
                <div className="relative z-10 pt-6">
                  <h3 className="text-base font-bold text-midnight mb-3 font-coachella">
                    Begin The Detailed <br />Build Process
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">
                    Once architectural plans and permits are approved, our master craftsmen begin with negative-air dust containment and white-glove care.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. SERVICES (All 5 Cards Fixed & Verified)                */}
      {/* ========================================================= */}
      <section id="services" className="py-24 md:py-32 bg-[#171B22] text-white px-6 md:px-14">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10">
            <div>
              <span className="text-xs uppercase tracking-widest-plus text-[#B58A55] font-bold block mb-3">
                Curated Trades
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-coachella">
                Specialized Remodeling Services
              </h2>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm max-w-md mt-4 md:mt-0 font-light">
              Tailored construction and renovation services delivered with craftsmanship and transparent project governance across New Jersey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div 
                key={service.id} 
                className="bg-[#252A31] rounded-2xl overflow-hidden flex flex-col group hover:border-[#B58A55]/50 border border-white/5 transition-all duration-300 hover:shadow-2xl"
              >
                {/* Fixed Aspect Ratio Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden zoom-img-container">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    onError={handleImageError}
                    className="w-full h-full object-cover filter brightness-90 group-hover:brightness-100 transition-all duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-midnight/85 backdrop-blur-md px-3 py-1 rounded-full text-[10px] tracking-widest uppercase text-mutedBronze font-semibold border border-mutedBronze/30">
                    {service.category}
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-mutedBronze transition-colors font-coachella">
                      {service.title}
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed font-light mb-6">
                      {service.desc}
                    </p>

                    <div className="border-t border-white/10 pt-4 space-y-2 mb-6">
                      {service.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start space-x-2 text-xs text-gray-300">
                          <span className="text-mutedBronze font-bold">✓</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setFormData({ ...formData, projectType: service.title });
                      setConsultationModalOpen(true);
                    }}
                    className="w-full py-3 px-4 rounded-xl border border-white/15 hover:border-mutedBronze hover:bg-mutedBronze/15 text-xs uppercase tracking-widest text-white font-semibold transition-all flex items-center justify-center space-x-2 group-hover:border-mutedBronze"
                  >
                    <span>Inquire About This Service</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-mutedBronze" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. PROJECTS SECTION (All Images Verified & Fixed)         */}
      {/* ========================================================= */}
      <section id="portfolio" className="py-24 md:py-32 bg-[#FAFAFA] px-6 md:px-14">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest-plus text-[#B58A55] font-bold block mb-3">
                Craftsmanship in Practice
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-midnight tracking-tight font-coachella">
                Selected Residential Works
              </h2>
            </div>

            <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
              {["All", "Kitchens", "Bathrooms", "Whole-Home", "Millwork"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase font-semibold transition-all ${
                    activeCategory === cat
                      ? "bg-midnight text-white shadow-sm"
                      : "bg-white text-gray-600 hover:text-midnight border border-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm group flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                onClick={() => setSelectedProject(project)}
              >
                <div>
                  {/* Fixed Aspect Ratio Container with Fallback */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden zoom-img-container">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      onError={handleImageError}
                      className="w-full h-full object-cover transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-midnight/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-wider text-white font-medium">
                      {project.township}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-xs uppercase tracking-widest text-mutedBronze font-bold mb-1">
                      {project.category}
                    </div>
                    <h3 className="text-xl font-bold text-midnight group-hover:text-mutedBronze transition-colors mb-2 font-coachella">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-4 line-clamp-2 font-light">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-[11px] text-gray-500 pt-3 border-t border-gray-100">
                      <span><strong>Scope:</strong> {project.scope}</span>
                      <span><strong>Timeline:</strong> {project.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <div className="w-full py-2.5 rounded-lg bg-gray-50 group-hover:bg-midnight group-hover:text-white text-midnight text-xs font-semibold uppercase tracking-wider text-center transition-all flex items-center justify-center space-x-1">
                    <span>Inspect Project Scope</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-gray-400 text-center mt-10 italic max-w-xl mx-auto">
            *Representative luxury architectural imagery demonstrating LevBuilt’s caliber of craftsmanship and material palettes. Real project updates posted regularly to @levbuiltnj.
          </p>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. METHODOLOGY (4-Stage Process)                          */}
      {/* ========================================================= */}
      <section id="methodology" className="py-24 md:py-32 bg-midnight text-white px-6 md:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs uppercase tracking-widest-plus text-mutedBronze font-bold block mb-3">
              Systematic Execution
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 font-coachella">
              The Remodeling Methodology
            </h2>
            <p className="text-gray-300 font-light text-sm sm:text-base">
              High-end remodeling succeeds through thorough planning. Our disciplined four-stage process eliminates surprises, delays, and unexpected costs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, idx) => (
              <div 
                key={idx}
                className="p-8 rounded-2xl glass-card relative flex flex-col justify-between group hover:border-mutedBronze transition-all"
              >
                <div>
                  <div className="text-4xl font-light text-mutedBronze mb-6 font-mono">
                    {step.step}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-gray-400 mb-2 font-semibold">
                    {step.subtitle}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 font-coachella">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
                <div className="w-8 h-0.5 bg-mutedBronze/40 mt-8 group-hover:w-full transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. CRAFT STANDARDS                                        */}
      {/* ========================================================= */}
      <section id="standards" className="py-24 md:py-32 bg-white px-6 md:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100 aspect-[4/3] sm:aspect-[16/11]">
                <img 
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80" 
                  alt="Fine craftsmanship and architectural wood finishes by LevBuilt" 
                  onError={handleImageError}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-midnight text-white p-6 rounded-2xl shadow-2xl border border-white/10 hidden sm:block max-w-xs">
                <div className="text-2xl font-bold text-mutedBronze mb-1">100%</div>
                <div className="text-xs uppercase tracking-wider text-gray-300">Dedicated On-Site Superintendent Discipline</div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <span className="text-xs uppercase tracking-widest-plus text-[#B58A55] font-bold block mb-3">
                Quality Guarantee
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-midnight tracking-tight mb-8 font-coachella">
                Strict Building & Site Protocols
              </h2>
              <p className="text-gray-600 leading-relaxed mb-10 font-light text-sm sm:text-base">
                We maintain rigorous trade standards to ensure long-term durability, structural safety, and aesthetic elegance in every residence we touch.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {CRAFT_STANDARDS.map((std, i) => (
                  <div key={i} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-mutedBronze mb-3 shadow-sm">
                      {i === 0 && <Compass className="w-4 h-4" />}
                      {i === 1 && <ShieldCheck className="w-4 h-4" />}
                      {i === 2 && <Droplet className="w-4 h-4" />}
                      {i === 3 && <UserCheck className="w-4 h-4" />}
                    </div>
                    <h4 className="text-sm font-bold text-midnight mb-2 font-coachella">{std.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed font-light">{std.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. SERVICE AREA (NJ Counties)                             */}
      {/* ========================================================= */}
      <section id="service-area" className="py-24 bg-[#171B22] text-white px-6 md:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs uppercase tracking-widest-plus text-[#B58A55] font-bold block mb-3">
                Territory
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-coachella">
                Northern & Central New Jersey Coverage
              </h2>
            </div>
            <div className="text-sm text-gray-300 font-light mt-4 md:mt-0 flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-mutedBronze" />
              <span>Base: <strong>East Orange, NJ 07017</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {NJ_COUNTIES.map((county, cIdx) => (
              <div key={cIdx} className="bg-[#252A31] p-6 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                  <h3 className="text-base font-bold text-white font-coachella">{county.name}</h3>
                  <span className="text-[10px] uppercase tracking-wider text-mutedBronze font-mono font-bold">Active Projects</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {county.towns.map((town, tIdx) => (
                    <span key={tIdx} className="text-xs bg-midnight/70 px-2.5 py-1 rounded-md text-gray-300 border border-white/5">
                      {town}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-[#252A31] p-6 rounded-2xl border border-mutedBronze/40 bg-midnight flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white mb-2 font-coachella">Custom Location Inquiries</h3>
                <p className="text-xs text-gray-300 leading-relaxed font-light mb-4">
                  For large architectural commissions, estate additions, or whole-home structural restorations, we evaluate select projects throughout New Jersey and the tri-state area.
                </p>
              </div>
              <button 
                onClick={() => setConsultationModalOpen(true)}
                className="text-xs uppercase tracking-wider font-semibold text-mutedBronze hover:text-white flex items-center space-x-1"
              >
                <span>Check Your Location With Our Team</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. CONTACT & CONSULTATION FORUM (Charlize Coachella Style) */}
      {/* ========================================================= */}
      <section id="contact" className="py-24 md:py-32 bg-[#1A1F26] text-white px-6 md:px-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest-plus text-[#B58A55] font-bold block mb-3">
                  Start Your Project
                </span>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 font-coachella">
                  Charlize Coachella Consultation
                </h2>
                <p className="text-gray-300 font-serif italic text-lg text-mutedBronze mb-6">
                  Tailored design forum & project feasibility
                </p>

                <p className="text-gray-300 leading-relaxed font-light mb-10 text-xs sm:text-sm">
                  Whether you are planning a comprehensive kitchen redesign, primary bath suite, or whole-home transformation, let’s discuss your vision, timeline, and architectural requirements.
                </p>

                <div className="space-y-4">
                  <a 
                    href={`tel:${BUSINESS_INFO.phoneRaw}`} 
                    className="flex items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-mutedBronze transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-mutedBronze/20 text-mutedBronze flex items-center justify-center mr-4 group-hover:bg-mutedBronze group-hover:text-midnight transition-colors">
                      <PhoneCall className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-gray-400">Direct Line / Text</div>
                      <div className="text-base font-bold text-white group-hover:text-mutedBronze transition-colors">
                        {BUSINESS_INFO.phone}
                      </div>
                    </div>
                  </a>

                  <div className="flex items-center p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-10 h-10 rounded-full bg-mutedBronze/20 text-mutedBronze flex items-center justify-center mr-4">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-gray-400">Business Base</div>
                      <div className="text-sm font-semibold text-white">
                        {BUSINESS_INFO.location}
                      </div>
                    </div>
                  </div>

                  <a 
                    href={BUSINESS_INFO.instagramUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-mutedBronze transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-mutedBronze/20 text-mutedBronze flex items-center justify-center mr-4 group-hover:bg-mutedBronze group-hover:text-midnight transition-colors">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-gray-400">Instagram Updates</div>
                      <div className="text-sm font-semibold text-white group-hover:text-mutedBronze transition-colors">
                        {BUSINESS_INFO.instagram}
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-xs text-gray-400">
                <p>{BUSINESS_INFO.license}</p>
                <p className="mt-1">Operating hours: {BUSINESS_INFO.hours}</p>
              </div>
            </div>

            {/* The Text Form with Charlize Coachella branding */}
            <div className="lg:col-span-7">
              <div className="p-8 md:p-10 rounded-2xl bg-[#252A31] border border-white/10 shadow-2xl">
                
                {formSubmitted ? (
                  <div className="py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-mutedBronze/20 text-mutedBronze mx-auto flex items-center justify-center mb-6">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 font-coachella">
                      Thank You, {formData.fullName}
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed mb-8">
                      We have received your remodeling consultation request. A member of LevBuilt’s leadership team will review your project scope and contact you within 24 business hours.
                    </p>
                    <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-mutedBronze font-semibold">
                      <span>Need immediate assistance? Call {BUSINESS_INFO.phone}</span>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    
                    <div className="border-b border-white/10 pb-4 mb-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-white font-coachella">
                          Charlize Coachella Project Forum
                        </h3>
                        <span className="text-[10px] text-mutedBronze uppercase tracking-widest font-mono font-bold">
                          Direct Lead Entry
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 font-light mt-1">
                        Tell us about your home and remodeling aspirations across New Jersey.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1.5 font-medium">
                          Full Name *
                        </label>
                        <input 
                          type="text" 
                          required
                          placeholder="Charlize Coachella"
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          className="w-full bg-[#1A1F26] border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-mutedBronze transition-colors font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1.5 font-medium">
                          Phone Number *
                        </label>
                        <input 
                          type="tel" 
                          required
                          placeholder="(201) 691-8341"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full bg-[#1A1F26] border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-mutedBronze transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1.5 font-medium">
                          Email Address *
                        </label>
                        <input 
                          type="email" 
                          required
                          placeholder="charlize.coachella@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-[#1A1F26] border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-mutedBronze transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1.5 font-medium">
                          Location (NJ Township) *
                        </label>
                        <input 
                          type="text" 
                          required
                          placeholder="Montclair, Short Hills, Hoboken"
                          value={formData.township}
                          onChange={(e) => setFormData({...formData, township: e.target.value})}
                          className="w-full bg-[#1A1F26] border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-mutedBronze transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1.5 font-medium">
                          Primary Scope
                        </label>
                        <select 
                          value={formData.projectType}
                          onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                          className="w-full bg-[#1A1F26] border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-mutedBronze transition-colors"
                        >
                          <option value="Kitchen Remodeling">Architectural Kitchen & Cabinetry</option>
                          <option value="Bathroom Renovation">Primary Suite & Spa Bathroom</option>
                          <option value="Whole-Home Remodel">Whole-Home Renovation</option>
                          <option value="Custom Millwork">Bespoke Millwork & Trim</option>
                          <option value="General Contracting">Structural / General Contracting</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1.5 font-medium">
                          Investment Range
                        </label>
                        <select 
                          value={formData.investmentRange}
                          onChange={(e) => setFormData({...formData, investmentRange: e.target.value})}
                          className="w-full bg-[#1A1F26] border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-mutedBronze transition-colors"
                        >
                          <option value="$50,000 – $100,000">$50,000 – $100,000</option>
                          <option value="$100,000 – $250,000">$100,000 – $250,000</option>
                          <option value="$250,000 – $500,000">$250,000 – $500,000</option>
                          <option value="$500,000+">$500,000 + (Full Estate Transformation)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1.5 font-medium">
                        Project Vision & Specific Requests
                      </label>
                      <textarea 
                        rows={3}
                        placeholder="Describe your residence and architectural vision..."
                        value={formData.details}
                        onChange={(e) => setFormData({...formData, details: e.target.value})}
                        className="w-full bg-[#1A1F26] border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-mutedBronze transition-colors"
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-white text-midnight hover:bg-mutedBronze hover:text-white py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                    >
                      <span>Submit Charlize Coachella Consultation</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                  </form>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. FOOTER                                                */}
      {/* ========================================================= */}
      <footer className="bg-[#12151B] text-gray-400 py-16 px-6 md:px-14 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            
            <div className="lg:col-span-2 space-y-4">
              <span className="text-2xl font-bold tracking-wider text-white uppercase block font-coachella">
                LevBuilt
              </span>
              <p className="text-xs tracking-widest uppercase text-mutedBronze font-semibold">
                Luxury Custom Remodeling & General Contracting
              </p>
              <p className="text-xs text-gray-400 max-w-sm font-light leading-relaxed">
                Crafting bespoke residential environments through architectural rigor, fine millwork, and white-glove site discipline across premier New Jersey communities.
              </p>
              <div className="pt-2 text-xs text-gray-500">
                <p>Based in East Orange, NJ 07017</p>
                <p>Serving Essex, Hudson, Morris, Bergen & Mercer Counties</p>
              </div>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-white font-bold mb-4 font-coachella">Navigation</h4>
              <ul className="space-y-2.5 text-xs tracking-wide">
                <li><a href="#services" className="hover:text-mutedBronze transition-colors">Remodeling Services</a></li>
                <li><a href="#portfolio" className="hover:text-mutedBronze transition-colors">Selected Projects</a></li>
                <li><a href="#how-it-works" className="hover:text-mutedBronze transition-colors">How It Works</a></li>
                <li><a href="#standards" className="hover:text-mutedBronze transition-colors">Craft Standards</a></li>
                <li><a href="#contact" className="hover:text-mutedBronze transition-colors">Contact Form</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-white font-bold mb-4 font-coachella">Specialties</h4>
              <ul className="space-y-2.5 text-xs tracking-wide">
                <li><a href="#services" className="hover:text-mutedBronze transition-colors">Architectural Kitchens</a></li>
                <li><a href="#services" className="hover:text-mutedBronze transition-colors">Primary Spa Bathrooms</a></li>
                <li><a href="#services" className="hover:text-mutedBronze transition-colors">Whole-Home Renovations</a></li>
                <li><a href="#services" className="hover:text-mutedBronze transition-colors">Custom Millwork & Trim</a></li>
                <li><a href="#services" className="hover:text-mutedBronze transition-colors">Turnkey Contracting</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-white font-bold mb-4 font-coachella">Direct Contact</h4>
              <ul className="space-y-3 text-xs tracking-wide">
                <li>
                  <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-white hover:text-mutedBronze font-semibold transition-colors flex items-center space-x-2">
                    <Phone className="w-3.5 h-3.5 text-mutedBronze" />
                    <span>{BUSINESS_INFO.phone}</span>
                  </a>
                </li>
                <li>
                  <a href={BUSINESS_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-mutedBronze transition-colors flex items-center space-x-2">
                    <Instagram className="w-3.5 h-3.5 text-mutedBronze" />
                    <span>{BUSINESS_INFO.instagram}</span>
                  </a>
                </li>
                <li>
                  <a href="https://maps.app.goo.gl/bab4Xgf8Kp9Sfcuf6?g_st=ac" target="_blank" rel="noopener noreferrer" className="hover:text-mutedBronze transition-colors flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-mutedBronze" />
                    <span>Google Maps Listing</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
            <div>
              © {new Date().getFullYear()} LevBuilt LLC. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-[11px]">
              <span>NJ Home Improvement Contractor Compliant</span>
              <span>·</span>
              <span>Fully Licensed & Insured</span>
            </div>
          </div>

        </div>
      </footer>

      {/* ========================================================= */}
      {/* PROJECT DETAIL MODAL                                      */}
      {/* ========================================================= */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/80 backdrop-blur-md animate-fade-in">
          <div 
            className="bg-[#252A31] text-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-midnight/80 text-white flex items-center justify-center hover:bg-mutedBronze transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/9] w-full">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                onError={handleImageError}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#252A31] via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-6">
                <span className="text-[10px] uppercase tracking-widest text-mutedBronze font-bold bg-midnight/80 px-2.5 py-1 rounded-md">
                  {selectedProject.category}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1 font-coachella">{selectedProject.title}</h3>
                <p className="text-xs text-gray-300">{selectedProject.township}</p>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-midnight/60 border border-white/5 text-center">
                <div>
                  <div className="text-[10px] uppercase text-gray-400">Project Scope</div>
                  <div className="text-xs font-semibold text-white mt-0.5">{selectedProject.scope}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-gray-400">Square Footage</div>
                  <div className="text-xs font-semibold text-white mt-0.5">{selectedProject.sqft}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-gray-400">Duration</div>
                  <div className="text-xs font-semibold text-white mt-0.5">{selectedProject.duration}</div>
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest text-mutedBronze font-bold mb-2">Architectural Overview</h4>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                  {selectedProject.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest text-mutedBronze font-bold mb-3">Key Material Specifications</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.materials.map((mat, mIdx) => (
                    <span key={mIdx} className="text-xs bg-midnight px-3 py-1.5 rounded-lg border border-white/10 text-gray-300">
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="text-xs text-gray-400 font-light">
                  Planning a similar scope for your residence?
                </div>
                <button 
                  onClick={() => {
                    setSelectedProject(null);
                    setFormData({...formData, projectType: selectedProject.title});
                    setConsultationModalOpen(true);
                  }}
                  className="bg-white hover:bg-mutedBronze hover:text-white text-midnight px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap"
                >
                  Inquire About Similar Project ↗
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* CONSULTATION MODAL                                        */}
      {/* ========================================================= */}
      {consultationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/80 backdrop-blur-md animate-fade-in">
          <div 
            className="bg-[#252A31] text-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl relative p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setConsultationModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-midnight/80 text-white flex items-center justify-center hover:bg-mutedBronze transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-widest-plus text-mutedBronze font-bold block mb-1">
                Charlize Coachella Forum
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight font-coachella">
                Request an Estimate or Consultation
              </h3>
              <p className="text-xs text-gray-400 font-light mt-1">Direct inquiries receive response within 24 business hours.</p>
            </div>

            {formSubmitted ? (
              <div className="py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-mutedBronze/20 text-mutedBronze mx-auto flex items-center justify-center mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2 font-coachella">Request Received</h4>
                <p className="text-xs text-gray-300 max-w-sm mx-auto mb-6">
                  Thank you, {formData.fullName}. We look forward to reviewing your remodeling goals and contacting you shortly.
                </p>
                <button 
                  onClick={() => { setFormSubmitted(false); setConsultationModalOpen(false); }}
                  className="bg-white text-midnight px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-300 mb-1">Your Full Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Charlize Coachella"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full bg-[#1A1F26] border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-mutedBronze font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-gray-300 mb-1">Phone *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="(201) 691-8341"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-[#1A1F26] border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-mutedBronze"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-gray-300 mb-1">Township (NJ) *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Montclair, Short Hills"
                      value={formData.township}
                      onChange={(e) => setFormData({...formData, township: e.target.value})}
                      className="w-full bg-[#1A1F26] border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-mutedBronze"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-300 mb-1">Email *</label>
                  <input 
                    type="email" 
                    required
                    placeholder="charlize.coachella@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-[#1A1F26] border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-mutedBronze"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-gray-300 mb-1">Project Category</label>
                    <select 
                      value={formData.projectType}
                      onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                      className="w-full bg-[#1A1F26] border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-mutedBronze"
                    >
                      <option value="Kitchen Remodeling">Kitchen Remodeling</option>
                      <option value="Bathroom Renovation">Spa Bathroom Renovation</option>
                      <option value="Whole-Home Remodel">Whole-Home Renovation</option>
                      <option value="Custom Millwork">Custom Millwork & Trim</option>
                      <option value="General Contracting">General Contracting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-gray-300 mb-1">Target Budget Tier</label>
                    <select 
                      value={formData.investmentRange}
                      onChange={(e) => setFormData({...formData, investmentRange: e.target.value})}
                      className="w-full bg-[#1A1F26] border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-mutedBronze"
                    >
                      <option value="$50,000 – $100,000">$50,000 – $100,000</option>
                      <option value="$100,000 – $250,000">$100,000 – $250,000</option>
                      <option value="$250,000 – $500,000">$250,000 – $500,000</option>
                      <option value="$500,000+">$500,000 +</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-300 mb-1">Notes / Description</label>
                  <textarea 
                    rows={2}
                    placeholder="Brief summary of what you are looking to remodel..."
                    value={formData.details}
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    className="w-full bg-[#1A1F26] border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-mutedBronze"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-white text-midnight hover:bg-mutedBronze hover:text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all mt-2"
                >
                  Submit Consultation Request ↗
                </button>

                <div className="pt-2 text-center">
                  <a 
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    className="text-xs text-mutedBronze hover:text-white font-medium"
                  >
                    Prefer speaking directly? Call {BUSINESS_INFO.phone}
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
