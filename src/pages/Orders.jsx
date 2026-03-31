import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { ShoppingBag, Clock, Calendar, Leaf, ChevronRight } from "lucide-react";
import StatusBadge from "../components/shared/StatusBadge";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    base44.auth.me().then(u => {
      setUser(u);
      loadOrders();
    }).catch(() => loadOrders());
  }, []);

  const loadOrders = async () => {
    try {
      const data = await base44.entities.Order.list("-created_date", 20);
      setOrders(data);
    } catch (e) {
      setOrders([]);
    }
    setLoading(false);
  };

  const totalSaved = orders.length * 1.2; // avg kg
  const totalRescued = orders.length;

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* Header */}
      <div className="px-4 pt-12 pb-4">
        <h1 className="font-black text-2xl text-[#1A1A1A] mb-1">My Orders</h1>
        <p className="text-[#9CA3AF] text-sm">Your food rescue history</p>
      </div>

      {/* Impact banner */}
      {totalRescued > 0 && (
        <div className="mx-4 mb-4 bg-green-gradient rounded-3xl p-5 text-white"
          style={{ background: "linear-gradient(135deg, #1B4332 0%, #52B788 100%)" }}>
          <p className="text-white/70 text-xs font-medium mb-2">Your impact so far 🌍</p>
          <div className="flex items-center justify-around">
            <div className="text-center">
              <p className="font-black text-2xl">{totalRescued}</p>
              <p className="text-white/70 text-xs">Bags Rescued</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="font-black text-2xl">{totalSaved.toFixed(1)}kg</p>
              <p className="text-white/70 text-xs">Food Saved</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="font-black text-2xl">
                R{orders.reduce((s, o) => s + (o.total_amount || 0), 0)}
              </p>
              <p className="text-white/70 text-xs">Spent</p>
            </div>
          </div>
        </div>
      )}

      {/* Orders list */}
      <div className="px-4">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-3xl h-24 animate-pulse" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🛍️</div>
            <h3 className="font-bold text-[#1A1A1A] text-lg mb-2">No orders yet</h3>
            <p className="text-[#9CA3AF] text-sm mb-6">Your rescued meals will appear here</p>
            <button
              onClick={() => navigate(createPageUrl("Home"))}
              className="bg-[#2D6A4F] text-white font-semibold px-6 py-3 rounded-2xl btn-press"
            >
              Find Deals Near You
            </button>
          </div>
        ) : (
          <div className="space-y-3 stagger-children">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl p-4 animate-fade-up"
                style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
              >
                <div className="flex items-start gap-3">
                  {/* Image */}
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0">
                    {order.store_image ? (
                      <img src={order.store_image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#F0FBF3] flex items-center justify-center">
                        <ShoppingBag size={20} className="text-[#52B788]" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-bold text-[#1A1A1A] text-sm leading-tight truncate">{order.store_name}</p>
                      <StatusBadge status={order.status} />
                    </div>

                    <div className="flex items-center gap-3 mt-1.5 text-[#9CA3AF]">
                      <div className="flex items-center gap-1">
                        <Clock size={11} />
                        <span className="text-xs">{order.pickup_start} – {order.pickup_end}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 bg-[#F0FBF3] rounded-xl px-2 py-1">
                        <Leaf size={10} className="text-[#52B788]" />
                        <span className="text-[10px] text-[#2D6A4F] font-medium">~1.2kg saved</span>
                      </div>
                      <p className="font-black text-[#2D6A4F] text-base">R{order.total_amount}</p>
                    </div>

                    {order.order_code && (
                      <div className="mt-2 bg-[#FAFAF8] rounded-xl px-3 py-1.5 flex items-center justify-between">
                        <span className="text-xs text-[#9CA3AF]">Code:</span>
                        <span className="font-bold text-xs text-[#1A1A1A] tracking-widest">{order.order_code}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="h-6" />
    </div>
  );
}