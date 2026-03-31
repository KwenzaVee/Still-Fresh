import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, ShoppingBag, User, Leaf } from "lucide-react";

const navItems = [
  { label: "Home", icon: Home, page: "Home" },
  { label: "Orders", icon: ShoppingBag, page: "Orders" },
  { label: "Profile", icon: User, page: "Profile" },
];

export default function Layout({ children, currentPageName }) {
  const hideNav = ["Onboarding", "Checkout", "OrderSuccess"].includes(currentPageName);

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col max-w-md mx-auto relative">
      <style>{`
        body { background: #F3F4F6; }
        .nav-active svg { color: #2D6A4F; }
        .nav-active span { color: #2D6A4F; font-weight: 600; }
      `}</style>

      <main className={`flex-1 overflow-y-auto ${!hideNav ? "pb-20" : ""}`}>
        {children}
      </main>

      {!hideNav && (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 px-6 py-2 z-50"
          style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-around">
            {navItems.map(({ label, icon: Icon, page }) => {
              const isActive = currentPageName === page;
              return (
                <Link
                  key={page}
                  to={createPageUrl(page)}
                  className={`flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-all duration-200 ${isActive ? "nav-active" : ""}`}
                >
                  <Icon
                    size={22}
                    className={`transition-colors duration-200 ${isActive ? "text-[#2D6A4F]" : "text-gray-400"}`}
                    strokeWidth={isActive ? 2.5 : 1.8}
                  />
                  <span className={`text-xs transition-colors duration-200 ${isActive ? "text-[#2D6A4F] font-semibold" : "text-gray-400 font-medium"}`}>
                    {label}
                  </span>
                  {isActive && (
                    <div className="w-1 h-1 rounded-full bg-[#2D6A4F] absolute -bottom-0.5" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}