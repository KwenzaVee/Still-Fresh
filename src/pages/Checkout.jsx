import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { ArrowLeft, CreditCard, Smartphone, Leaf, Clock, ShoppingBag, Lock } from "lucide-react";

const paymentMethods = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard, detail: "Visa, Mastercard" },
  { id: "ozow", label: "Instant EFT", icon: Smartphone, detail: "Ozow, Peach Pay" },
];

export default function Checkout() {
  const navigate = useNavigate();
  const order = JSON.parse(sessionStorage.getItem("pendingOrder") || "{}");
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [loading, setLoading] = useState(false);

  const commission = Math.round(order.total_amount * 0.10);

  const handleConfirm = async () => {
    setLoading(true);
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const today = new Date().toISOString().split("T")[0];

    try {
      await base44.entities.Order.create({
        ...order,
        status: "Reserved",
        commission,
        pickup_date: today,
        order_code: code,
      });
    } catch (e) {}

    sessionStorage.setItem("lastOrderCode", code);
    sessionStorage.setItem("lastOrderStore", order.store_name);
    sessionStorage.setItem("lastOrderPickup", `${order.pickup_start} – ${order.pickup_end}`);

    setTimeout(() => {
      navigate(createPageUrl("OrderSuccess"));
    }, 600);
  };

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* Header */}
      <div className="px-4 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="font-bold text-xl text-[#1A1A1A]">Checkout</h1>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Order summary */}
        <div className="bg-white rounded-3xl p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          <h2 className="font-bold text-[#1A1A1A] mb-4">Order Summary</h2>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0">
              <img src={order.store_image} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-[#1A1A1A]">{order.store_name}</p>
              <p className="text-sm text-[#9CA3AF]">{order.store_category}</p>
            </div>
          </div>

          <div className="bg-[#FAFAF8] rounded-2xl p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[#6B7280]">Still Fresh Bag × {order.quantity}</span>
              <span className="font-semibold">R{order.bag_price} each</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#6B7280]">
              <Clock size={13} className="text-[#52B788]" />
              <span>Pickup: {order.pickup_start} – {order.pickup_end}</span>
            </div>
            <div className="border-t border-[#E5E7EB] pt-3 flex justify-between">
              <span className="font-bold text-[#1A1A1A]">Total</span>
              <span className="font-black text-[#2D6A4F] text-lg">R{order.total_amount}</span>
            </div>
          </div>

          {/* Sustainability note */}
          <div className="mt-3 flex items-center gap-2 bg-[#F0FBF3] rounded-2xl px-3 py-2">
            <Leaf size={13} className="text-[#52B788]" />
            <span className="text-xs text-[#2D6A4F] font-medium">You're rescuing food that would've been wasted 🌍</span>
          </div>
        </div>

        {/* Payment method */}
        <div className="bg-white rounded-3xl p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          <h2 className="font-bold text-[#1A1A1A] mb-4">Payment Method</h2>

          <div className="space-y-2.5">
            {paymentMethods.map((pm) => (
              <button
                key={pm.id}
                onClick={() => setSelectedPayment(pm.id)}
                className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 transition-all btn-press ${
                  selectedPayment === pm.id
                    ? "border-[#2D6A4F] bg-[#F0FBF3]"
                    : "border-[#E5E7EB] bg-white"
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  selectedPayment === pm.id ? "bg-[#2D6A4F]" : "bg-gray-100"
                }`}>
                  <pm.icon size={16} className={selectedPayment === pm.id ? "text-white" : "text-gray-500"} />
                </div>
                <div className="flex-1 text-left">
                  <p className={`font-semibold text-sm ${selectedPayment === pm.id ? "text-[#2D6A4F]" : "text-[#1A1A1A]"}`}>
                    {pm.label}
                  </p>
                  <p className="text-xs text-[#9CA3AF]">{pm.detail}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedPayment === pm.id ? "border-[#2D6A4F]" : "border-gray-300"
                }`}>
                  {selectedPayment === pm.id && <div className="w-2.5 h-2.5 rounded-full bg-[#2D6A4F]" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Confirm CTA */}
        <button
          onClick={handleConfirm}
          disabled={loading}
          className="w-full btn-press text-white font-bold text-base py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-70"
          style={{
            background: loading ? "#9CA3AF" : "linear-gradient(135deg, #2D6A4F 0%, #52B788 100%)",
            boxShadow: "0 8px 20px rgba(45,106,79,0.3)",
          }}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Lock size={16} />
              Confirm Reservation · R{order.total_amount}
            </>
          )}
        </button>

        <p className="text-center text-xs text-[#9CA3AF] pb-4">
          🔒 Secure mock payment — prototype only
        </p>
      </div>
    </div>
  );
}