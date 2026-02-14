import { useState } from "react";

export default function FAQ({ content }) {
  const faq = content?.faq;
  
  // Default FAQs matching the image context
  const defaultItems = [
    { question: "What makes Swastik Group a trusted name in real estate in Vikhroli?", answer: "We bring decades of experience and a commitment to quality, ensuring timely delivery and transparent processes." },
    { question: "What types of residential projects does Swastik Group offer in Vikhroli?", answer: "We offer a range of premium 1, 2, and larger BHK apartments tailored for modern urban living." },
    { question: "Why should I invest in Swastik Group's new projects in Vikhroli?", answer: "Vikhroli is a rapidly growing hub. Investing here guarantees excellent connectivity, modern amenities, and high ROI." },
    { question: "How does Swastik Group ensure quality and sustainability in its real estate projects?", answer: "We use eco-friendly materials, energy-efficient designs, and partner with top-tier construction firms." },
    { question: "How can I learn more about upcoming residential projects by Swastik Group in Vikhroli?", answer: "You can download our brochure, visit our site office, or contact our sales team directly through this website." }
  ];

  const items = faq?.items?.length ? faq.items : defaultItems;
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="bg-[#f4fbf8] pb-24 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Title */}
        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#193630] text-center mb-10">
          {faq?.title || "Frequently Asked Questions"}
        </h2>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {items.map((it, idx) => {
            const open = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`overflow-hidden transition-all duration-300 ${
                  open ? "rounded-2xl shadow-md bg-white border border-[#bcebd5]" : "rounded-xl"
                }`}
              >
                {/* Accordion Header (Light Mint Pill) */}
                <button
                  onClick={() => setOpenIndex(open ? null : idx)}
                  className={`w-full flex items-center justify-between px-6 py-4 transition-colors ${
                    open ? "bg-[#bcebd5]" : "bg-[#bcebd5]/80 hover:bg-[#bcebd5]"
                  } rounded-xl`}
                >
                  <span className="text-xs lg:text-sm font-semibold text-[#193630] text-left pr-4">
                    {it.question}
                  </span>
                  <span className="text-2xl font-medium text-[#193630] leading-none">
                    {open ? "−" : "+"}
                  </span>
                </button>

                {/* Accordion Body */}
                {open && (
                  <div className="px-6 py-5 text-sm text-gray-700 bg-white animate-in fade-in slide-in-from-top-2">
                    {it.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}