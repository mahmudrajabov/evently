import { Search, Compass, CalendarCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useFavoriteIds, useBookings } from "@/lib/useStore";
import BrandLogo from "./BrandLogo";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/events", label: "Explore", icon: Compass },
  { to: "/events?focus=categories", label: "Categories", icon: Search },
  { to: "/my-bookings", label: "My Bookings", icon: CalendarCheck },
];

export default function Navbar() {
  const { pathname, search } = useLocation();
  const favIds = useFavoriteIds();
  const bookings = useBookings();

  const isActive = (to) => {
    if (to === "/events") return pathname === "/events" || pathname.startsWith("/event");
    return pathname + search === to;
  };

  return (
    <header className="sticky top-0 z-40 border-b border-violet-100 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <BrandLogo
          size={32}
          textClass="font-display text-xl font-extrabold tracking-tight text-[#0F172A]"
        />

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.to}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive(item.to)
                    ? "bg-violet-50 text-violet-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-violet-700"
                )}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            to="/my-bookings"
            className="relative grid h-10 w-10 place-items-center rounded-xl border border-violet-100 bg-white text-violet-600 transition-colors hover:bg-violet-50"
            aria-label="My Bookings"
          >
            <CalendarCheck size={18} />
            {bookings.length > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-cyan-500 px-1 text-[11px] font-bold text-white">
                {bookings.length}
              </span>
            )}
          </Link>
          <Link
            to="/favorites"
            className="relative grid h-10 w-10 place-items-center rounded-xl border border-violet-100 bg-white text-violet-600 transition-colors hover:bg-violet-50"
            aria-label="Saved events"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={favIds.length ? "#7c3aed" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {favIds.length > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-violet-600 px-1 text-[11px] font-bold text-white">
                {favIds.length}
              </span>
            )}
          </Link>
          <div className="hidden h-10 items-center gap-2 rounded-xl bg-violet-50 px-3 text-sm font-medium text-violet-700 sm:flex">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-violet-600 text-xs font-bold text-white">
              G
            </span>
            Guest
          </div>
        </div>
      </div>
    </header>
  );
}