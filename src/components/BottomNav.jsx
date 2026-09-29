import { Link, useLocation } from "react-router-dom";
import { Compass, Search, CalendarCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFavoriteIds, useBookings } from "@/lib/useStore";

const TABS = [
  { to: "/events", label: "Explore", icon: Compass },
  { to: "/search", label: "Search", icon: Search },
  { to: "/my-bookings", label: "Bookings", icon: CalendarCheck },
];

export default function BottomNav() {
  const { pathname } = useLocation();
  const favIds = useFavoriteIds();
  const bookings = useBookings();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-violet-100 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-md items-stretch justify-around px-2">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const active = pathname === tab.to || (tab.to === "/events" && pathname.startsWith("/event"));
          const badge = tab.to === "/my-bookings" ? bookings.length : 0;
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={cn(
                "relative flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition-colors",
                active ? "text-violet-700" : "text-slate-400"
              )}
            >
              <span className="relative">
                <Icon size={22} strokeWidth={active ? 2.4 : 2} />
                {badge > 0 && (
                  <span className="absolute -right-2 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-cyan-500 px-1 text-[10px] font-bold text-white">
                    {badge}
                  </span>
                )}
              </span>
              {tab.label}
              {active && (
                <span className="absolute top-0 h-1 w-8 rounded-full bg-violet-600" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}