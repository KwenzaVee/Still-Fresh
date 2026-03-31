import { Star, MapPin, Clock, Leaf } from "lucide-react";

export default function StoreCard({ store, onClick }) {
  return (
    <div
      onClick={onClick}
      className="card-hover bg-white rounded-2xl overflow-hidden cursor-pointer animate-fade-up"
      style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={store.image_url}
          alt={store.name}
          className="w-full h-full object-cover"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-[#2D6A4F] text-xs font-semibold px-3 py-1 rounded-full">
            {store.category}
          </span>
        </div>

        {/* Bags left badge */}
        {store.bags_available <= 3 && store.bags_available > 0 && (
          <div className="absolute top-3 right-3 badge-fresh">
            <span className="bg-[#FF6B35] text-white text-xs font-bold px-3 py-1 rounded-full">
              {store.bags_available} left!
            </span>
          </div>
        )}

        {/* Price tag */}
        <div className="absolute bottom-3 right-3">
          <div className="bg-[#2D6A4F] text-white px-3 py-1.5 rounded-xl">
            <span className="text-sm font-bold">R{store.bag_price}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-[#1A1A1A] text-base leading-tight">{store.name}</h3>
          <div className="flex items-center gap-1 ml-2 shrink-0">
            <Star size={13} className="text-amber-400 fill-amber-400" />
            <span className="text-sm font-semibold text-[#1A1A1A]">{store.rating?.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[#6B7280]">
          <div className="flex items-center gap-1">
            <MapPin size={12} />
            <span className="text-xs">{store.distance_km} km away</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span className="text-xs">{store.pickup_start} – {store.pickup_end}</span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-1.5 bg-[#F0FBF3] rounded-xl px-3 py-2">
          <Leaf size={12} className="text-[#52B788]" />
          <span className="text-xs text-[#2D6A4F] font-medium">Saves ~{store.food_saved_kg}kg food waste</span>
        </div>
      </div>
    </div>
  );
}