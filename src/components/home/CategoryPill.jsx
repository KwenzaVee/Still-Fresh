const icons = {
  All: "🌿",
  Bakery: "🥐",
  Restaurant: "🍽️",
  Supermarket: "🛒",
  Cafe: "☕",
  Deli: "🥪",
};

export default function CategoryPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all duration-200 btn-press ${
        active
          ? "bg-[#2D6A4F] text-white shadow-md"
          : "bg-white text-[#6B7280] border border-gray-100"
      }`}
      style={active ? { boxShadow: "0 4px 12px rgba(45,106,79,0.3)" } : {}}
    >
      <span>{icons[label] || "🍀"}</span>
      {label}
    </button>
  );
}
