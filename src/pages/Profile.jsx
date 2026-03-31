import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { User, Leaf, Settings, ChevronRight, LogOut, Award, Heart, Bell, HelpCircle, Star } from "lucide-react";

const menuItems = [
  { icon: Bell, label: "Notifications", desc: "Manage alerts" },
  { icon: Heart, label: "Saved Stores", desc: "Your favourites" },
  { icon: Award, label: "Achievements", desc: "Your rescue milestones" },
  { icon: HelpCircle, label: "Help & Support", desc: "FAQ and contact" },
  { icon: Settings, label: "Settings", desc: "App preferences" },
];

export default function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
    base44.entities.Order.list("-created_date", 100)
      .then(setOrders)
      .catch(() => setOrders([]));
  }, []);

  const totalKg = (orders.length * 1.2).toFixed(1);
  const totalSpent = orders.reduce((s, o) => s + (o.total_amount || 0), 0);

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* Header */}
      <div className="px-4 pt-12 pb-4">
        <h1 className="font-black text-2xl text-[#1A1A1A]">Profile</h1>
      </div>

      {/* User card */}
      <div className="mx-4 mb-4 bg-white rounded-3xl p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-green-gradient flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #2D6A4F 0%, #52B788 100%)" }}>
            <span className="text-white font-black text-xl">
              {user?.full_name?.[0]?.toUpperCase() || "?"}
            </span>
          </div>
          <div>
            <h2 className="font-bold text-[#1A1A1A] text-lg">{user?.full_name || "Food Rescuer"}</h2>
            <p className="text-[#9CA3AF] text-sm">{user?.email || "Sign in to save your orders"}</p>
            <div className="flex items-center gap-1 mt-1">
              <Leaf size={12} className="text-[#52B788]" />
              <span className="text-xs text-[#52B788] font-semibold">Rescue Hero 🌿</span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-[#F0FBF3]">
          <div className="text-center">
            <p className="font-black text-xl text-[#2D6A4F]">{orders.length}</p>
            <p className="text-xs text-[#9CA3AF] mt-0.5">Rescues</p>
          </div>
          <div className="text-center">
            <p className="font-black text-xl text-[#2D6A4F]">{totalKg}kg</p>
            <p className="text-xs text-[#9CA3AF] mt-0.5">Saved</p>
          </div>
          <div className="text-center">
            <p className="font-black text-xl text-[#2D6A4F]">R{totalSpent}</p>
            <p className="text-xs text-[#9CA3AF] mt-0.5">Spent</p>
          </div>
        </div>
      </div>

      {/* Eco badge */}
      <div className="mx-4 mb-4 rounded-3xl overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1B4332 0%, #40916C 100%)" }}>
        <div className="p-5 flex items-center gap-4">
          <div className="text-4xl">🏆</div>
          <div>
            <p className="text-white font-bold">Eco Warrior Badge</p>
            <p className="text-white/70 text-sm mt-0.5">You've saved {totalKg}kg of food from landfill</p>
            <div className="mt-2 bg-white/15 rounded-xl px-3 py-1 inline-block">
              <span className="text-white/90 text-xs font-semibold">Proudly South African 🇿🇦</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="mx-4 bg-white rounded-3xl overflow-hidden mb-4" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
        {menuItems.map((item, i) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-5 py-4 hover:bg-[#FAFAF8] transition-colors btn-press ${
              i < menuItems.length - 1 ? "border-b border-[#F3F4F6]" : ""
            }`}
          >
            <div className="w-9 h-9 bg-[#F0FBF3] rounded-xl flex items-center justify-center">
              <item.icon size={17} className="text-[#2D6A4F]" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-sm text-[#1A1A1A]">{item.label}</p>
              <p className="text-xs text-[#9CA3AF]">{item.desc}</p>
            </div>
            <ChevronRight size={16} className="text-[#D1D5DB]" />
          </button>
        ))}
      </div>

      {/* Sign out */}
      <div className="mx-4 mb-8">
        <button
          onClick={() => base44.auth.logout()}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border border-red-100 text-red-500 font-semibold text-sm bg-white btn-press"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );
}