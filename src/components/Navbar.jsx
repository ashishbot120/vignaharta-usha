import { useEffect, useMemo, useState } from "react";

export default function Navbar({ content, onOpenEnquiry }) {
  const links = useMemo(
    () =>
      content?.navbar?.links || [
        { label: "Home", id: "home" },
        { label: "Overview", id: "overview" },
        { label: "Connectivity", id: "connectivity" },
        { label: "Amenities", id: "amenities" },
        { label: "Floor Plans", id: "floorplans" },
        { label: "Developer", id: "developer" },
        { label: "Updates", id: "updates" },
        { label: "FAQ", id: "faq" },
        { label: "Contact", id: "contact" },
      ],
    [content]
  );

  const ctaText = content?.navbar?.ctaText || "Enquiry Now";
  const [activeId, setActiveId] = useState("home");
  const [open, setOpen] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const yOffset = -80;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
    setOpen(false);
  };

  useEffect(() => {
    const ids = links.map((l) => l.id);

    const handler = () => {
      let current = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= 120) current = id;
      }
      setActiveId(current);
    };

    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [links]);

  const handleCTA = () => {
    if (typeof onOpenEnquiry === "function") return onOpenEnquiry();
    scrollToSection("contact");
  };

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    const onKeyDown = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 w-full z-[9999] bg-white/85 backdrop-blur border-b">
      <div className="w-full px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          <button onClick={() => scrollToSection("home")} className="flex items-center gap-3">
            <img src="/images/ref-5.png" alt="Logo" className="w-10 h-9 sm:w-12 sm:h-10 object-contain" />
            <div className="leading-tight text-left hidden sm:block">
              <div className="font-bold text-sm tracking-tight">LIME ROOFING</div>
              <div className="text-[10px] text-gray-500 uppercase">Expert Services</div>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-7 text-sm text-gray-700">
            {links.map((l, idx) => {
              const isActive = activeId === l.id;
              return (
                <button
                  key={`${l.id}-${l.label}-${idx}`}
                  onClick={() => scrollToSection(l.id)}
                  className={`relative transition font-medium ${
                    isActive ? "text-black" : "text-gray-600 hover:text-black"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-[2px] w-full rounded-full transition-all ${
                      isActive ? "opacity-100 bg-black" : "opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              className="lg:hidden w-10 h-10 rounded-md border bg-white/70 hover:bg-white transition"
              onClick={() => setOpen((v) => !v)}
              aria-label="Open menu"
              aria-expanded={open}
            >
              <div className="mx-auto w-5 space-y-1.5">
                <div className="h-0.5 bg-black" />
                <div className="h-0.5 bg-black" />
                <div className="h-0.5 bg-black" />
              </div>
            </button>

            <button
              onClick={handleCTA}
              className="px-4 sm:px-5 py-2 rounded-md bg-[#c0ff00] text-black font-bold text-xs sm:text-sm shadow-sm hover:bg-[#d4ff4d] transition-all active:scale-95"
            >
              {ctaText}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-0 z-[9998] bg-black/30 backdrop-blur-[1px]" onClick={() => setOpen(false)}>
          <div
            className="absolute top-16 left-0 right-0 mx-4 rounded-2xl border bg-white/95 p-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-1">
              {links.map((l, idx) => {
                const isActive = activeId === l.id;
                return (
                  <button
                    key={`${l.id}-${l.label}-${idx}-m`}
                    onClick={() => scrollToSection(l.id)}
                    className={`text-left px-3 py-2 rounded-lg font-medium transition ${
                      isActive ? "bg-black text-white" : "hover:bg-gray-100 text-gray-800"
                    }`}
                  >
                    {l.label}
                  </button>
                );
              })}
              <button onClick={handleCTA} className="mt-2 px-3 py-2 rounded-lg bg-[#c0ff00] font-bold">
                {ctaText}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
