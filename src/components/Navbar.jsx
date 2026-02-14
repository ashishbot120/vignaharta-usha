export default function Navbar({ content }) {
  const links = content?.navbar?.links || [
    { label: "Home", id: "home" },
    { label: "Overview", id: "overview" },
    { label: "Connectivity", id: "connectivity" },
    { label: "Amenities", id: "amenities" },
    { label: "Floor Plans", id: "floorplans" },
    { label: "Developer", id: "developer" },
    { label: "Contact", id: "contact" },
  ];

  const ctaText = content?.navbar?.ctaText || "Enquiry Now";

  // 🔥 smooth scroll function with offset
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;

    const yOffset = -80; // navbar height
    const y =
      element.getBoundingClientRect().top +
      window.pageYOffset +
      yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[9999] bg-white/85 backdrop-blur border-b">
      <div className="w-full px-6">
        <div className="h-16 flex items-center justify-between">

          {/* Left brand - Updated with your logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3"
          >
            {/* Logo Image */}
            <img 
              src="/images/ref-5.png" 
              alt="Lime Roofing Logo" 
              className="w-12 h-10 object-contain" 
            />
            <div className="leading-tight text-left">
              <div className="font-bold text-sm tracking-tight">LIME ROOFING</div>
              <div className="text-[10px] text-gray-500 uppercase">Expert Services</div>
            </div>
          </button>

          {/* Center links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm text-gray-700">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToSection(l.id)}
                className="hover:text-black transition font-medium"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Right CTA */}
          <button
            onClick={() => scrollToSection("contact")}
            className="px-5 py-2 rounded-md bg-[#c0ff00] text-black font-bold text-sm shadow-sm hover:bg-[#d4ff4d] transition-all active:scale-95"
          >
            {ctaText}
          </button>

        </div>
      </div>
    </header>
  );
}