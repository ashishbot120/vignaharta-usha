import { MapPin } from "lucide-react";

export default function Hero({ content }) {
  const hero = content?.hero || {};
  const about = content?.aboutProject || {};

  return (
    <>
      {/* ---------------- HERO SECTION ---------------- */}
      {/* Kept relative and z-10 so the About section can slide OVER it */}
      <section id="home" className="relative w-full overflow-hidden bg-[#f4fbf8] pt-16 z-10">
        
        {/* Background Image (FULL WIDTH) */}
        <div className="relative w-full h-[600px] lg:h-[700px] ">
          <img
            src="/images/ref-1.png"
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Top fade gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/20 to-transparent" />

          {/* LEFT OVERLAY TEXT */}
          <div className="absolute top-20 left-6 lg:left-16 z-20 max-w-[680px]">
            <h2 className="text-2xl font-bold tracking-widest text-[#8a6b4e] uppercase">
              THINKING
            </h2>

            <h1 className="text-3xl lg:text-5xl font-black uppercase mt-2 leading-tight">
              <span className="text-[#333333]">OF A </span>
              <span className="text-[#a31b26]">FANTASTIC VICINITY?</span>
            </h1>

            <div className="flex items-center gap-4 mt-5">
              <span className="text-[11px] lg:text-xs font-bold tracking-tight text-gray-800 uppercase">
                20+ PODIUM LUXURIOUS AMENITIES
              </span>
              <span className="text-[11px] lg:text-xs font-bold tracking-tight text-gray-800 uppercase border-l-2 border-gray-400 pl-4">
                SPACIOUS BALCONY HOMES*
              </span>
            </div>
          </div>

          {/* RIGHT PANEL OVERLAY */}
          <div className="absolute mt-12 right-0 z-30 w-[92%] sm:w-[500px] lg:w-[750px]">
            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl border p-12 ">
              {/* Logo + Title */}
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
                    <rect x="30" y="30" width="4" height="18" fill="currentColor" />
                    <circle cx="32" cy="22" r="10" fill="currentColor" opacity="0.9" />
                    <circle cx="20" cy="28" r="8" fill="currentColor" opacity="0.8" />
                    <circle cx="44" cy="28" r="8" fill="currentColor" opacity="0.8" />
                    <circle cx="26" cy="16" r="5" fill="currentColor" opacity="0.7" />
                    <circle cx="38" cy="16" r="5" fill="currentColor" opacity="0.7" />
                  </svg>
                </div>

                <div className="text-[10px] font-bold tracking-[0.4em] text-gray-500 uppercase">
                  {hero.brandTop || "VIGHNAHARTA"}
                </div>

                <div className="text-4xl lg:text-5xl font-serif tracking-widest text-[#333333] mt-2">
                  {hero.projectName || "INFINITY"}
                </div>
              </div>

              <Divider />

              {/* Pricing */}
              <div className="grid grid-cols-2 divide-x divide-gray-300">
                <PriceBlock
                  title={hero.leftPriceTitle || "SMART 1 BHK"}
                  oldPrice={hero.leftOldPrice || "74.99 Lacs"}
                  price={hero.leftPrice || "₹ 69.99 Lacs*"}
                />
                <PriceBlock
                  title={hero.rightPriceTitle || "PREMIUM 2 BHK"}
                  oldPrice={hero.rightOldPrice || "1.05 CR"}
                  price={hero.rightPrice || "₹ 96.99 Lacs*"}
                />
              </div>

              <Divider />

              {/* Address */}
              <div className="flex items-start justify-center gap-3 mt-4">
                <MapPin className="text-red-600 w-5 h-5 flex-shrink-0 mt-0.5 fill-red-600/20" />
                <p className="text-[10px] lg:text-[11px] font-bold text-gray-700 uppercase tracking-widest leading-relaxed text-center">
                  {hero.addressLine || "BLDG. NO. 223/224, CIRCLE, KANNAMWAR NAGAR 1, VIKHROLI (EAST)"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- ABOUT SECTION (OVERLAPPING HERO) ---------------- */}
      <section 
        id="overview" 
        /* 1. z-40 strictly forces this section ON TOP of the Hero.
           2. -mt-10 lg:-mt-24 pulls the section up so it overlaps the bottom of the hero.
        */
        className="relative bg-[#e9f1ee] pt-16 pb-28 z-40 -mt-10 lg:-mt-24"
      >
        {/* SVG INVERTED CURVE (Valley) 
            Sits exactly on the top edge of the About section and extends upwards,
            creating a seamless concave dip using the exact same background color.
        */}
        <div className="absolute bottom-full left-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg 
            viewBox="0 0 1440 120" 
            preserveAspectRatio="none" 
            className="w-full h-[50px] sm:h-[80px] lg:h-[120px]"
          >
            <path d="M0,0 Q720,240 1440,0 L1440,120 L0,120 Z" fill="#e9f1ee" />
          </svg>
        </div>

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center relative z-10 mt-8">
          
          {/* LEFT IMAGE COLLAGE */}
          <div className="relative w-full flex justify-center">
            {/* Big Circle */}
            <div className="w-[420px] h-[320px] lg:w-[520px] lg:h-[380px] rounded-[100px] overflow-hidden shadow-lg border-[10px] border-white">
              <img
                src="/images/ref-2.png"
                alt="About"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Small top-left circle */}
            <div className="absolute -top-6 left-10 w-28 h-28 rounded-full overflow-hidden border-[8px] border-white shadow-md">
              <img src="/images/ref-3.png" alt="Mini" className="w-full h-full object-cover" />
            </div>

            {/* Small bottom-right circle */}
            <div className="absolute bottom-0 right-10 w-28 h-28 rounded-full overflow-hidden border-[8px] border-white shadow-md">
              <img src="/images/ref-4.png" alt="Mini 2" className="w-full h-full object-cover grayscale" />
            </div>
          </div>

          {/* RIGHT TEXT */}
          <div className="px-6 lg:px-0">
            <h2 className="text-4xl font-serif text-gray-900 mb-6">
              {about?.title || "About Project"}
            </h2>

            <p className="text-gray-700 leading-relaxed text-sm mb-5">
              {about?.description || "At Vignharata Enclave, every detail reflects the grandest gesture of life in the most authentic and desirable home. Guided by a humanist approach, the architecture places people at the heart of the space."}
            </p>

            <button className="mt-4 px-8 py-3 bg-[#b8e886] text-black font-bold uppercase tracking-wider text-xs rounded shadow-md hover:bg-[#a6d675] transition-colors">
              {about?.brochureBtnText || "Download Brochure"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------------- Sub Components ---------------- */

function PriceBlock({ title, oldPrice, price }) {
  return (
    <div className="flex flex-col items-center text-center px-4 py-5">
      <h3 className="text-sm font-bold text-gray-800 uppercase">{title}</h3>
      <div className="flex items-center justify-center gap-1.5 mt-1">
        <span className="text-gray-500 text-sm">@</span>
        <span className="text-[#a31b26] font-bold line-through decoration-2 text-sm">
          {oldPrice}
        </span>
      </div>
      <div className="text-3xl font-black text-gray-900 mt-2">{price}</div>
      <div className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mt-3">
        ONWARDS
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center w-full my-6 opacity-60">
      <div className="flex-1 border-t-2 border-gray-300" />
      <span className="px-4 text-[10px] text-gray-500">◆</span>
      <div className="flex-1 border-t-2 border-gray-300" />
    </div>
  );
}