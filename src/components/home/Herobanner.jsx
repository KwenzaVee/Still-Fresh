import { Leaf, TrendingDown } from "lucide-react";

export default function HeroBanner({ userName }) {
  return (
    <div
      className="mx-4 mt-4 rounded-3xl overflow-hidden relative"
      style={{
        background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 50%, #52B788 100%)",
        minHeight: 160,
      }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
      <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-white/5" />
      <div className="absolute top-4 right-16 w-12 h-12 rounded-full bg-white/8" />

      <div className="relative p-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <Leaf size={14} className="text-white" />
          </div>
          <span className="text-white/80 text-sm font-medium">Still Fresh</span>
        </div>

        <h2 className="text-white font-bold text-xl leading-snug mb-1">
          {userName ? `Hey ${userName.split(' ')[0]}! 👋` : "Good Food Deserves"}
          <br />
          {userName ? "Ready to rescue?" : "a Second Chance."}
        </h2>
        <p className="text-white/70 text-sm mt-2">
          Rescue food. Save money. Save the planet.
        </p>

        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-1.5 bg-white/15 rounded-xl px-3 py-1.5">
            <TrendingDown size={13} className="text-[#95D5B2]" />
            <span className="text-white text-xs font-semibold">Up to 70% off</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/15 rounded-xl px-3 py-1.5">
            <span className="text-xs">🌱</span>
            <span className="text-white text-xs font-semibold">Zero waste</span>
          </div>
        </div>
      </div>
    </div>
  );
}
