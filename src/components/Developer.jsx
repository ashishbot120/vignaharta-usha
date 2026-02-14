export default function DeveloperAndUpdates({ content }) {
  const dev = content?.developer;
  const cu = content?.constructionUpdates;

  // -----------------------------------------------------------------
  // 1. FALLBACK DATA
  // -----------------------------------------------------------------
  const defaultStats = [
    { value: "6", label: "Projects" },
    { value: "1.32 LAC", label: "sq. ft. area developed" },
    { value: "449+", label: "Happy Families" },
    { value: "3.77 LAC", label: "sq. ft. ongoing" },
    { value: "2.7 LAC", label: "sq. ft. Area Upcoming" }
  ];
  const stats = dev?.stats?.length ? dev.stats : defaultStats;

  const fallbackImages = [
    "/images/ref-2.png",
    "/images/ref-1.png",
    "/images/ref-2.png"
  ];

  const defaultCards = [
    { title: "Under Construction", subtitle: "Tower A", linkText: "Know More", image: fallbackImages[0] },
    { title: "Completed", subtitle: "Tower B", linkText: "Know More", image: fallbackImages[1] },
    { title: "Completed", subtitle: "Tower C", linkText: "Know More", image: fallbackImages[2] },
  ];

  let cards = cu?.cards?.length === 3 ? cu.cards : defaultCards;
  cards = cards.map((card, index) => ({
    ...card,
    image: card.image || fallbackImages[index]
  }));

  return (
    <div className="flex flex-col w-full overflow-hidden ">
      
      {/* ========================================================= */}
      {/* 1. DEVELOPER SECTION */}
      {/* ========================================================= */}
      <section id="updates" className="bg-[#f4fbf8] relative pb-24 pt-20 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          
          {/* Title & Description */}
          <h2 className="text-3xl lg:text-5xl font-serif font-bold text-[#193630]">
            {dev?.title || "About Developer"}
          </h2>
          <p className="text-gray-700 mt-4 max-w-4xl mx-auto leading-relaxed text-sm lg:text-[25px]">
            {dev?.description || "Vighnaharta Developers is more than just a real estate company—we are dream weavers, committed to building not just homes, but better lives. With a legacy of expert craftsmanship and a forward-thinking approach, we're transforming skylines and setting new standards in urban living. Our foundation rests on integrity, excellence, and innovation, ensuring every project is a perfect blend of creativity, functionality, and sustainability."}
          </p>

          {/* Stats Strip */}
          <div className="mt-10 bg-[#bcebd5] rounded-3xl lg:rounded-full py-6 px-4 shadow-sm border border-[#a8e6cf]">
            <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 max-w-5xl mx-auto px-4 lg:px-10">
              {stats.map((s, idx) => (
                <div key={idx} className="text-center flex-1 min-w-[120px]">
                  <div className="text-xl font-black text-[#193630] tracking-tight">{s.value}</div>
                  <div className="text-[10px] lg:text-xs text-gray-700 font-bold mt-1 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. PANORAMIC IMAGE WITH INVERTED (CONCAVE) DIVIDER */}
      {/* ========================================================= */}
      <section className="relative w-full h-[250px] lg:h-[450px] z-10 -mt-1">
        
        {/* SVG Curved overlay matching the Developer background color */}
        <svg 
          viewBox="0 0 1440 120" 
          className="absolute top-0 left-0 w-full h-[60px] lg:h-[120px] z-20 pointer-events-none" 
          preserveAspectRatio="none"
        >
          {/* INVERTED CURVE PATH: 
              Draws down the left edge, curves UP into the top center,
              and curves DOWN to the right edge. This creates an upward "smile" valley.
          */}
          <path d="M0,0 L0,120 Q720,0 1440,120 L1440,0 Z" fill="#f4fbf8" />
        </svg>

        <img
          src="/images/ref-1.png" // Replace with your skyline/building panorama
          alt="Developer Projects"
          className="w-full h-full object-cover"
        />
      </section>

      {/* ========================================================= */}
      {/* 3. CONSTRUCTION UPDATES SECTION */}
      {/* ========================================================= */}
      <section id="updates" className="bg-[#f4fbf8] relative pb-24">
        
        {/* Edge-to-Edge Gradient Header Band (Sits behind cards) */}
        <div className="absolute top-0 left-0 w-full h-[55%] lg:h-[60%] bg-gradient-to-r from-[#b1ecd2] to-[#7bd0bd] z-0" />

        <div className="relative z-10 pt-16 lg:pt-20 text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#193630] mb-12 lg:mb-16 drop-shadow-sm">
            {cu?.title || "Construction Updates"}
          </h2>

          {/* Staggered Cards Container */}
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-center items-center gap-6 lg:gap-8">
            {cards.map((c, idx) => {
              // The center card is taller
              const isCenter = idx === 1;

              return (
                <div
                  key={idx}
                  className={`group relative w-full md:w-1/3 rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer transition-all duration-300 ${
                    isCenter ? "h-[400px] lg:h-[480px] z-20" : "h-[340px] lg:h-[400px] z-10"
                  }`}
                >
                  {/* Background Image */}
                  <img
                    src={c.image}
                    alt={c.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Bottom Teal Gradient Overlay */}
                  <div className="absolute bottom-0 w-full h-[60%] bg-gradient-to-t from-[#418575] via-[#5dae9b]/80 to-transparent opacity-95 transition-opacity duration-300" />
                  
                  {/* Text Content */}
                  <div className="absolute bottom-6 left-0 w-full text-center text-white px-4">
                    <div className="font-bold text-lg lg:text-xl tracking-wide drop-shadow-md">
                      {c.title}
                    </div>
                    <div className="text-xs lg:text-sm font-medium mt-1 drop-shadow-md">
                      {c.subtitle}
                    </div>
                    <div className="text-[10px] lg:text-xs font-bold mt-3 tracking-widest uppercase underline underline-offset-4 hover:text-[#bcebd5] transition-colors drop-shadow-md">
                      {c.linkText || "Know More"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}