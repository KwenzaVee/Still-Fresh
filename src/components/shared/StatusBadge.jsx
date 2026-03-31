const config = {
    Reserved: { bg: "bg-blue-50", text: "text-blue-600", dot: "bg-blue-500", label: "Reserved" },
    Collected: { bg: "bg-[#F0FBF3]", text: "text-[#2D6A4F]", dot: "bg-[#52B788]", label: "Collected ✓" },
    Cancelled: { bg: "bg-red-50", text: "text-red-500", dot: "bg-red-400", label: "Cancelled" },
  };
  
  export default function StatusBadge({ status }) {
    const c = config[status] || config.Reserved;
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
        {c.label}
      </span>
    );
  }