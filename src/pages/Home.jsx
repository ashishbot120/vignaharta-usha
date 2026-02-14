import { useEffect, useState } from "react";
import { api } from "../lib/api";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

import Amenities from "../components/Amenities";
import ExploreBuildings from "../components/ExploreBuildings";
import FloorPlans from "../components/FloorPlans";
import Developer from "../components/Developer";

import FAQ from "../components/FAQ";



export default function Home() {
  const [content, setContent] = useState(null);

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
      <Navbar content={content} />
      <Hero content={content} />
        
        <Amenities content={content} />
        <ExploreBuildings content={content} />
        <FloorPlans content={content} />
        <Developer content={content} />
        <FAQ content={content} />
  
    </div>
  );
}
