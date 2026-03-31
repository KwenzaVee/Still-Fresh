import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { CheckCircle, Clock, MapPin, Share2, Home, ShoppingBag } from "lucide-react";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const code = sessionStorage.getItem("lastOrderCode") || "ABC123";
  const storeName = sessionStorage.getItem("lastOrderStore") || "the store";
  const pickup = sessionStorage.getItem("lastOrderPickup") || "";

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#52B788] flex flex-col">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/5" />

      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center relative z-10">
        {/* Check icon */}
        <div className={`transition-all duration-700 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
          <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mb-8"
            style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.2)" }}>
            <CheckCircle size={56} className="text-[#2D6A4F]" strokeWidth={2.5} />
          </div>
        </div>

        <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h1 className="text-white font-black text-3xl mb-2">You rescued a meal!</h1>
          <p className="text-5xl mb-4">🌱</p>
          <p className="text-white/75 text-base leading-relaxed mb-6 max-w-xs">
            Thank you for helping reduce food waste in South Africa. Every bag makes a difference.
          </p>
        </div>

        {/* Order card */}
        <div className={`w-full bg-white/15 backdrop-blur-sm rounded-3xl p-5 mb-6 text-left transition-all duration-700 delay-300 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-white/70 text-sm font-medium">Reservation Code</p>
            <span className="bg-white/20 text-white font-black text-lg px-4 py-1.5 rounded-xl tracking-widest">
              {code}
            </span>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-white/80">
              <ShoppingBag size={14} />
              <span className="text-sm">{storeName}</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Clock size={14} />
              <span className="text-sm">Pickup: {pickup}</span>
            </div>
          </div>

          <div className="mt-4 bg-white/10 rounded-2xl p-3">
            <p className="text-white/90 text-xs font-medium">
              📱 Show this code at pickup. The store will hand you your Still Fresh Bag!
            </p>
          </div>
        </div>

        {/* Impact snippet */}
        <div className={`text-white/60 text-sm mb-8 transition-all duration-700 delay-400 ${
          visible ? "opacity-100" : "opacity-0"
        }`}>
          🌍 You've saved approximately 1kg of food from landfill
        </div>
      </div>

      {/* Actions */}
      <div className="px-8 pb-12 space-y-3 relative z-10">
        <button
          onClick={() => navigate(createPageUrl("Orders"))}
          className="w-full bg-white text-[#2D6A4F] font-bold py-4 rounded-2xl btn-press flex items-center justify-center gap-2"
          style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}
        >
          <ShoppingBag size={18} />
          View My Orders
        </button>
        <button
          onClick={() => navigate(createPageUrl("Home"))}
          className="w-full bg-white/15 text-white font-semibold py-4 rounded-2xl btn-press flex items-center justify-center gap-2"
        >
          <Home size={18} />
          Back to Home
        </button>
      </div>
    </div>
  );
}