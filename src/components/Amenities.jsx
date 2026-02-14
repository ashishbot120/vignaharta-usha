import { Dumbbell, Castle, Footprints, Flower2, Activity, Gamepad2, Users, Star, Trees, Coffee } from "lucide-react";

// Mapping titles to line-art SVG icons
const ICON_MAP = {
  "Gymnasium": <Dumbbell className="w-10 h-10 stroke-[1.5]" />,
  "Kids Play Area": <Castle className="w-10 h-10 stroke-[1.5]" />,
  "Jogging Track": <Footprints className="w-10 h-10 stroke-[1.5]" />,
  "Yoga Deck": <Flower2 className="w-10 h-10 stroke-[1.5]" />,
  "Swimming Pool": <Activity className="w-10 h-10 stroke-[1.5]" />,
  "Indoor Games": <Gamepad2 className="w-10 h-10 stroke-[1.5]" />,
  "Senior Citizen Zone": <Users className="w-10 h-10 stroke-[1.5]" />,
  "Stargazing Deck": <Star className="w-10 h-10 stroke-[1.5]" />,
  "Landscaped Garden": <Trees className="w-10 h-10 stroke-[1.5]" />,
  "Clubhouse": <Coffee className="w-10 h-10 stroke-[1.5]" />,
};

export default function Amenities({ content }) {
  const a = content?.amenities || {};

  // Expanded list of amenities for a more premium feel
  const defaultItems = [
    { title: "Gymnasium" },
    { title: "Kids Play Area" },
    { title: "Jogging Track" },
    { title: "Yoga Deck" },
    { title: "Swimming Pool" },
    { title: "Indoor Games" },
    { title: "Senior Citizen Zone" },
    { title: "Stargazing Deck" },
    { title: "Landscaped Garden" },
  ];

  const items = a.items?.length > 0 ? a.items : defaultItems;

  return (
    <section id="amenities" className="bg-[#f4fbf8] py-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-serif font-bold text-[#0f2e2b]">
            {a.title || "World-Class Amenities"}
          </h2>
          <p className="text-gray-600 mt-3 text-sm max-w-2xl leading-relaxed">
            {a.subtitle || "From fitness to relaxation, every space is designed to elevate your daily living experience with modern facilities and natural surroundings."}
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
          
          {/* Left: Large Image - Using a taller aspect ratio for the new list length */}
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl h-[450px] lg:h-[650px] sticky top-24">
            <img
              src="/images/ref-2.png" 
              alt="Amenities Top View"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Icons Grid */}
          <div className="flex flex-col">
            
            {/* 3 Columns Grid for Icons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-12 w-full justify-items-center">
              {items.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center gap-4 group">
                  
                  {/* Circular White Icon Background */}
                  <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-full bg-white shadow-md flex items-center justify-center text-[#129482] transition-all duration-300 group-hover:bg-[#129482] group-hover:text-white group-hover:shadow-xl group-hover:-translate-y-2">
                    {ICON_MAP[item.title] || <Flower2 className="w-10 h-10 stroke-[1.5]" />}
                  </div>
                  
                  {/* Icon Label */}
                  <span className="text-xs lg:text-sm font-bold text-gray-700 tracking-wide uppercase">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Gradient Button - Centered below icons */}
            <div className="mt-16 flex justify-center">
                <button className="px-12 py-4 rounded-full bg-gradient-to-r from-[#1d2b2a] to-[#3a4d4b] text-white font-bold uppercase tracking-widest text-xs shadow-xl hover:scale-105 transition-all active:scale-95">
                  {a.viewMoreText || "Explore All 20+ Amenities"}
                </button>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}