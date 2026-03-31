import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { Search, Bell, MapPin, Leaf } from "lucide-react";
import HeroBanner from "../components/home/Herobanner";
import CategoryPill from "../components/home/CategoryPill";
import StoreCard from "../components/home/StoreCard";
import { CATEGORIES } from "../components/shared/mockData";
import { listStores } from "@/lib/store-service";

export default function Home() {
  const [user, setUser] = useState(null);
  const [stores, setStores] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
    listStores().then(setStores).catch(() => setStores([]));
  }, []);

  const filtered = stores.filter((s) => {
    const matchCat = activeCategory === "All" || s.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* Header */}
      <div className="px-4 pt-12 pb-2">
        <div className="flex items-center justify-between mb-1">
          <div>
            <div className="flex items-center gap-1.5 text-[#6B7280] mb-0.5">
              <MapPin size={13} className="text-[#52B788]" />
              <span className="text-xs font-medium">Cape Town, SA</span>
            </div>
            <h1 className="text-2xl font-black text-[#1A1A1A]">
              Still <span className="text-[#2D6A4F]">Fresh</span>
            </h1>
          </div>
          <button className="relative w-10 h-10 bg-white rounded-2xl flex items-center justify-center"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <Bell size={18} className="text-[#1A1A1A]" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#52B788] rounded-full" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 mt-3">
        <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3"
          style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <Search size={17} className="text-[#9CA3AF]" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search restaurants, bakeries..."
            className="flex-1 text-sm outline-none bg-transparent text-[#1A1A1A] placeholder-[#9CA3AF]"
          />
        </div>
      </div>

      {/* Hero Banner */}
      <HeroBanner userName={user?.full_name} />

      {/* Stats row */}
      <div className="px-4 mt-4">
        <div className="grid grid-cols-3 gap-2">
          {[
            { emoji: "🛍️", value: "2,400+", label: "Bags Rescued" },
            { emoji: "🌍", value: "4.8T", label: "CO₂ Saved" },
            { emoji: "💚", value: "180+", label: "Partners" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-3 text-center"
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <div className="text-lg mb-0.5">{stat.emoji}</div>
              <div className="font-black text-sm text-[#2D6A4F]">{stat.value}</div>
              <div className="text-[10px] text-[#9CA3AF] font-medium mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="mt-5">
        <div className="flex gap-2.5 px-4 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat}
              label={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>
      </div>

      {/* Listings */}
      <div className="px-4 mt-5 mb-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-[#1A1A1A] text-lg">
            Deals Near You
          </h2>
          <span className="text-xs text-[#9CA3AF] font-medium">{filtered.length} available</span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">🌿</div>
            <p className="text-[#9CA3AF] text-sm">No stores found</p>
          </div>
        ) : (
          <div className="space-y-4 stagger-children">
            {filtered.map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                onClick={() => navigate(createPageUrl(`Store?id=${store.id}`))}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom padding */}
      <div className="h-4" />
    </div>
  );
}