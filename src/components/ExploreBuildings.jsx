import { useState } from "react";

export default function ExploreBuildings({ content }) {
  const eb = content?.exploreBuildings;

  // 1. Define fallback images
  const fallbackImages = [
    "/images/ref-2.png", 
    "/images/ref-1.png", 
    "/images/ref-2.png"
  ];

  // 2. Default data
  const defaultData = [
    { id: 1, label: "Newly Launched - Vignaharta Aaradhya", image: fallbackImages[0] },
    { id: 2, label: "Newly Launched - Vignaharta Enclave", image: fallbackImages[1] },
    { id: 3, label: "Newly Launched - Vignaharta Infinity", image: fallbackImages[2] },
  ];

  // Make sure we have valid data
  let initialCards = eb?.cards?.length >= 3 ? eb.cards : defaultData;
  initialCards = initialCards.map((card, index) => ({
    ...card,
    id: card.id || index + 1, // Need a unique ID for React keys
    image: card.image || fallbackImages[index % fallbackImages.length]
  }));

  // 3. REACT STATE: This holds the current order of the cards
  const [cards, setCards] = useState(initialCards);

  // 4. Move Left (Previous)
  const handlePrev = () => {
    setCards((prevCards) => {
      const newArray = [...prevCards];
      const lastItem = newArray.pop(); // Take the last item
      newArray.unshift(lastItem);      // Put it at the beginning
      return newArray;
    });
  };

  // 5. Move Right (Next)
  const handleNext = () => {
    setCards((prevCards) => {
      const newArray = [...prevCards];
      const firstItem = newArray.shift(); // Take the first item
      newArray.push(firstItem);           // Put it at the end
      return newArray;
    });
  };

  return (
    <section id="connectivity" className="bg-[#bcebd5] py-20 overflow-hidden scroll-mt-20">
      <div className="max-w-[1400px] mx-auto px-4">
        
        {/* Title */}
        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#193630] text-center mb-10 transition-all">
          {eb?.title || "Explore More Buildings in the Township"}
        </h2>

        {/* Carousel Container */}
        <div className="flex items-center justify-center gap-4 lg:gap-6 relative">
          
          {/* LEFT CARD (Inactive) */}
          <div className="relative hidden md:block w-[260px] lg:w-[320px] h-[380px] lg:h-[460px] rounded-[1.5rem] overflow-hidden shrink-0 mt-6 shadow-lg transition-all duration-500 ease-in-out">
            <img 
              src={cards[0].image} 
              alt="Building" 
              className="absolute inset-0 w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-[#2b3543]/60 z-10 transition-colors" />
            
            {/* Left Arrow - Now Clickable */}
            <div 
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 cursor-pointer hover:scale-110 active:scale-95 transition-transform p-2"
            >
              <svg width="40" height="50" viewBox="0 0 24 24" className="drop-shadow-md">
                <polygon points="18,4 6,12 18,20" fill="#4ade80" />
              </svg>
            </div>

            <div className="absolute bottom-0 w-full py-4 bg-gradient-to-r from-[#62d295]/80 to-[#b5eb4b]/80 text-center z-20">
              <p className="text-[11px] lg:text-xs font-bold text-gray-800 opacity-80">
                {cards[0].label}
              </p>
            </div>
          </div>

          {/* CENTER CARD (Active) */}
          <div className="relative w-[300px] lg:w-[380px] h-[440px] lg:h-[520px] rounded-[1.5rem] overflow-hidden shrink-0 shadow-2xl z-20 transition-all duration-500 ease-in-out">
            <img 
              src={cards[1].image} 
              alt="Building" 
              className="absolute inset-0 w-full h-full object-cover" 
            />
            
            <div className="absolute bottom-0 w-full py-5 bg-gradient-to-r from-[#81e8b2] to-[#d2fb6d] text-center z-20">
              <p className="text-sm lg:text-base font-bold text-gray-900 tracking-tight">
                {cards[1].label}
              </p>
            </div>
          </div>

          {/* RIGHT CARD (Inactive) */}
          <div className="relative hidden md:block w-[260px] lg:w-[320px] h-[380px] lg:h-[460px] rounded-[1.5rem] overflow-hidden shrink-0 mt-6 shadow-lg transition-all duration-500 ease-in-out">
            <img 
              src={cards[2].image} 
              alt="Building" 
              className="absolute inset-0 w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-[#2b3543]/60 z-10 transition-colors" />
            
            {/* Right Arrow - Now Clickable */}
            <div 
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 cursor-pointer hover:scale-110 active:scale-95 transition-transform p-2"
            >
              <svg width="40" height="50" viewBox="0 0 24 24" className="drop-shadow-md">
                <polygon points="6,4 18,12 6,20" fill="#4ade80" />
              </svg>
            </div>

            <div className="absolute bottom-0 w-full py-4 bg-gradient-to-r from-[#62d295]/80 to-[#b5eb4b]/80 text-center z-20">
              <p className="text-[11px] lg:text-xs font-bold text-gray-800 opacity-80">
                {cards[2].label}
              </p>
            </div>
          </div>

        </div>

        {/* Mobile instruction fallback */}
        <p className="md:hidden text-center text-xs text-gray-700 mt-6 font-medium">
          Swipe to explore more buildings
        </p>
      </div>
    </section>
  );
}