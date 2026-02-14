import { useEffect, useState } from "react";
import { api } from "../lib/api";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Amenities from "../components/Amenities";
import ExploreBuildings from "../components/ExploreBuildings";
import FloorPlans from "../components/FloorPlans";
import DeveloperAndUpdates from "../components/Developer";
import FAQ from "../components/FAQ";
import { EnquiryModal } from "../components/EnquiryModal";

export default function Home() {
  const [content, setContent] = useState(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await api.get("/api/content");
      setContent(res.data);
    }
    load();
  }, []);

  if (!content) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen">
      <Navbar content={content} onOpenEnquiry={() => setEnquiryOpen(true)} />
      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />

      <Hero content={content} />
      <Amenities content={content} />
      <ExploreBuildings content={content} />
      <FloorPlans content={content} />
      <DeveloperAndUpdates content={content} />
      <FAQ content={content} />

      {/* Optional footer anchor for navbar "Contact" */}
      <section id="contact" className="bg-[#f4fbf8] py-20 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-serif font-bold text-[#193630]">Contact</h2>
          <p className="mt-3 text-gray-700">
            Phone / Email / Address section (you can connect your footer content here).
          </p>
        </div>
      </section>
    </div>
  );
}
