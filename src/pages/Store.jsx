import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Star, MapPin, Clock, Leaf, ShoppingBag, Minus, Plus, Info } from "lucide-react";
import { getStoreById } from "@/lib/store-service";

export default function Store() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const [store, setStore] = useState(null);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    getStoreById(id).then(setStore).catch(() => setStore(null));
  }, [id]);

  if (!store) {
    return <div className="min-h-screen bg-[#FAFAF8]" />;
  }

  const handleReserve = () => {
    const order = {
      store_id: store.id,
      store_name: store.name,
      store_image: store.image_url,
      store_category: store.category,
      bag_price: store.bag_price,
      quantity: qty,
      total_amount: store.bag_price * qty,
      pickup_start: store.pickup_start,
      pickup_end: store.pickup_end,
    };
    sessionStorage.setItem("pendingOrder", JSON.stringify(order));
    navigate(createPageUrl("Checkout"));
  };

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* Banner */}
      <div className="relative h-64 overflow-hidden">
        <img src={store.banner_url || store.image_url} alt={store.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#FAFAF8]" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center"
          style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}
        >
          <ArrowLeft size={18} className="text-[#1A1A1A]" />
        </button>

        {/* Category badge */}
        <div className="absolute top-12 right-4">
          <span className="bg-white/90 backdrop-blur-sm text-[#2D6A4F] text-xs font-bold px-3 py-1.5 rounded-full">
            {store.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 -mt-6 relative z-10">
        {/* Store info card */}
        <div className="bg-white rounded-3xl p-5 mb-4" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          <div className="flex items-start justify-between mb-2">
            <h1 className="font-black text-xl text-[#1A1A1A] leading-tight">{store.name}</h1>
            <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-xl">
              <Star size={13} className="text-amber-400 fill-amber-400" />
              <span className="font-bold text-sm text-[#1A1A1A]">{store.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[#6B7280] mb-3">
            <MapPin size={13} />
            <span className="text-sm">{store.address}</span>
          </div>

          <p className="text-[#6B7280] text-sm leading-relaxed">{store.description}</p>
        </div>

        {/* Still Fresh Bag */}
        <div className="bg-white rounded-3xl p-5 mb-4" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-[#F0FBF3] rounded-2xl flex items-center justify-center">
              <ShoppingBag size={18} className="text-[#2D6A4F]" />
            </div>
            <div>
              <h2 className="font-bold text-[#1A1A1A]">Still Fresh Bag</h2>
              <p className="text-xs text-[#9CA3AF]">Surprise selection of today's fresh items</p>
            </div>
          </div>

          <p className="text-sm text-[#6B7280] leading-relaxed mb-4 bg-[#FAFAF8] rounded-2xl p-3">
            "{store.bag_description}"
          </p>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-[#FAFAF8] rounded-2xl p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Clock size={13} className="text-[#52B788]" />
                <span className="text-xs text-[#9CA3AF] font-medium">Pickup Time</span>
              </div>
              <p className="font-bold text-sm text-[#1A1A1A]">{store.pickup_start} – {store.pickup_end}</p>
            </div>
            <div className="bg-[#FAFAF8] rounded-2xl p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <ShoppingBag size={13} className="text-[#52B788]" />
                <span className="text-xs text-[#9CA3AF] font-medium">Available</span>
              </div>
              <p className="font-bold text-sm text-[#1A1A1A]">{store.bags_available} bags left</p>
            </div>
          </div>

          {/* Sustainability */}
          <div className="bg-[#F0FBF3] border border-[#D8F3DC] rounded-2xl p-3 flex items-center gap-3">
            <div className="w-9 h-9 bg-[#52B788] rounded-xl flex items-center justify-center shrink-0">
              <Leaf size={16} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-sm text-[#2D6A4F]">Rescue impact</p>
              <p className="text-xs text-[#40916C]">This bag saves approx. <strong>{store.food_saved_kg}kg</strong> of food waste 🌍</p>
            </div>
          </div>
        </div>

        {/* Quantity + CTA */}
        <div className="bg-white rounded-3xl p-5 mb-6" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-[#9CA3AF] font-medium mb-1">Price per bag</p>
              <p className="font-black text-2xl text-[#2D6A4F]">R{store.bag_price}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-9 h-9 bg-[#F0FBF3] rounded-2xl flex items-center justify-center btn-press"
              >
                <Minus size={16} className="text-[#2D6A4F]" />
              </button>
              <span className="font-bold text-lg text-[#1A1A1A] w-5 text-center">{qty}</span>
              <button
                onClick={() => setQty(Math.min(store.bags_available, qty + 1))}
                className="w-9 h-9 bg-[#2D6A4F] rounded-2xl flex items-center justify-center btn-press"
              >
                <Plus size={16} className="text-white" />
              </button>
            </div>
          </div>

          <button
            onClick={handleReserve}
            className="w-full btn-press text-white font-bold text-base py-4 rounded-2xl bg-green-gradient flex items-center justify-center gap-2"
            style={{ background: "linear-gradient(135deg, #2D6A4F 0%, #52B788 100%)", boxShadow: "0 8px 20px rgba(45,106,79,0.3)" }}
          >
            <ShoppingBag size={18} />
            Reserve Now · R{store.bag_price * qty}
          </button>
        </div>
      </div>
    </div>
  );
}