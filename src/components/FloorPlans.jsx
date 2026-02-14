import { useState } from "react";

export default function FloorPlans({ content }) {
  // Wing Navigation State
  const wings = ["All", "East Wing", "West Wing", "North Wing", "South Wing"];
  const [activeWing, setActiveWing] = useState("East Wing");

  // BHK Navigation State
  const bhks = ["1 bhk", "2 bhk", "5,6 bhk"];
  const [activeBhk, setActiveBhk] = useState("1 bhk");

  return (
    <section id="floorplans" className="bg-[#bcebd5] pt-20 scroll-mt-20">
      
      {/* ---------------- FLOOR PLANS CONTAINER ---------------- */}
      <div className="max-w-[1200px] mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-start">
          
          {/* LEFT: Main Floor Plan Image */}
          <div className="bg-white p-6 lg:p-10 rounded-[2.5rem] shadow-sm flex items-center justify-center">
            <img
              src="/images/ref-6.png" 
              alt={`${activeWing} - ${activeBhk} Floor Plan`}
              className="w-full max-w-md h-auto object-contain"
            />
          </div>

          {/* RIGHT: Navigation & Details */}
          <div className="flex flex-col w-full max-w-md mx-auto lg:mx-0 pt-4 lg:pt-8">
            
            {/* 1. Wings Navigation - FORCED SINGLE LINE */}
            <div className="flex flex-nowrap items-center justify-between w-full border-b border-[#96ccb9] mb-8 pb-3">
              {wings.map((wing) => (
                <button
                  key={wing}
                  onClick={() => setActiveWing(wing)}
                  className={`text-[10px] sm:text-xs font-bold uppercase tracking-tight sm:tracking-wider relative transition-colors whitespace-nowrap ${
                    activeWing === wing ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {wing}
                  {/* Active Underline */}
                  {activeWing === wing && (
                    <div className="absolute bottom-[-13px] left-0 w-full h-[3px] bg-[#45b2a5] rounded-t-full" />
                  )}
                </button>
              ))}
            </div>

            {/* 2. Info Card (Center) */}
            <div className="bg-white rounded-[2rem] p-8 lg:p-10 shadow-sm text-center">
              
              {/* BHK Selector Buttons */}
              <div className="flex items-center justify-center gap-3 mb-8">
                {bhks.map((bhk) => (
                  <button
                    key={bhk}
                    onClick={() => setActiveBhk(bhk)}
                    className={`px-4 lg:px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                      activeBhk === bhk
                        ? "bg-[#45b2a5] text-white shadow-md"
                        : "bg-[#81c7be] text-white opacity-80 hover:opacity-100"
                    }`}
                  >
                    {bhk}
                  </button>
                ))}
              </div>

              {/* Floor Plan Details */}
              <div className="space-y-3 text-gray-800 font-semibold text-sm lg:text-base">
                <p>Type — {activeBhk.toUpperCase()}</p>
                <p>Area — 380-411 RCA Sq.ft</p>
                <p className="text-[#45b2a5]">Price — Click for details</p>
              </div>

              {/* Download Button */}
              <button className="mt-8 w-full py-4 rounded-xl bg-gradient-to-r from-[#1d2b2a] to-[#3a4d4b] text-white font-bold uppercase tracking-widest text-[10px] lg:text-xs shadow-lg hover:brightness-125 transition-all">
                Download Floor Plan
              </button>
            </div>

            {/* 3. Thumbnails (Bottom) */}
            <div className="flex gap-4 mt-6 justify-center lg:justify-start">
              {[1, 2, 3].map((i) => (
                <button 
                  key={i} 
                  className={`w-[70px] h-[70px] p-1 rounded-2xl overflow-hidden transition-all border-2 ${
                    i === 1 ? "border-[#45b2a5] bg-white" : "border-transparent bg-white/40"
                  }`}
                >
                  <img
                    src="/images/ref-6.png"
                    alt={`Thumbnail ${i}`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ---------------- VIDEO SECTION ---------------- */}
      <div className="relative w-full h-[350px] sm:h-[450px] lg:h-[600px] cursor-pointer group overflow-hidden">
        <img 
          src="/images/ref-3.png" 
          alt="Project Video" 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-500">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-[6px] border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-md">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="white" className="ml-2">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

    </section>
  );
}