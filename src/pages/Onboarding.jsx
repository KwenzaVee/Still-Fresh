import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Leaf, ShoppingBag, TrendingDown, ChevronRight, CheckCircle } from "lucide-react";

const slides = [
  {
    emoji: "🌿",
    title: "Good Food Deserves\na Second Chance.",
    subtitle: "Still Fresh rescues surplus food from restaurants, bakeries and supermarkets — before it's thrown away.",
    bg: "from-[#1B4332] to-[#2D6A4F]",
  },
  {
    emoji: "💰",
    title: "Save Up to\n70% on Meals.",
    subtitle: "Get surprise bags packed with delicious food at a fraction of the price. Great food. Zero guilt.",
    bg: "from-[#2D6A4F] to-[#52B788]",
  },
  {
    emoji: "🌍",
    title: "Every Bag\nSaves the Planet.",
    subtitle: "South Africa wastes millions of tonnes of food every year. One bag at a time, we're changing that.",
    bg: "from-[#1B4332] to-[#40916C]",
  },
];

export default function Onboarding() {
  const [slide, setSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (slide < slides.length - 1) {
      setSlide(slide + 1);
    } else {
      navigate(createPageUrl("Home"));
    }
  };

  const s = slides[slide];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${s.bg} flex flex-col transition-all duration-500`}>
      {/* Skip */}
      <div className="flex justify-end p-6">
        <button
          onClick={() => navigate(createPageUrl("Home"))}
          className="text-white/60 text-sm font-medium"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div
          key={slide}
          className="animate-bounce-in text-8xl mb-8"
        >
          {s.emoji}
        </div>

        <h1
          key={`title-${slide}`}
          className="text-white font-black text-3xl leading-tight mb-4 animate-fade-up whitespace-pre-line"
        >
          {s.title}
        </h1>

        <p
          key={`sub-${slide}`}
          className="text-white/75 text-base leading-relaxed animate-fade-up max-w-xs"
          style={{ animationDelay: "100ms" }}
        >
          {s.subtitle}
        </p>
      </div>

      {/* Bottom */}
      <div className="px-8 pb-12">
        {/* Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === slide ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/30"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-full bg-white text-[#2D6A4F] font-bold text-lg py-4 rounded-2xl btn-press flex items-center justify-center gap-2"
          style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}
        >
          {slide < slides.length - 1 ? (
            <>
              Continue
              <ChevronRight size={20} />
            </>
          ) : (
            <>
              Start Rescuing Food
              <Leaf size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}