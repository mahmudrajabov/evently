import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, CalendarCheck } from "lucide-react";
import SearchDock from "@/components/SearchDock";
import EventCard from "@/components/EventCard";
import TrendingCarousel from "@/components/TrendingCarousel";
import { getEvents } from "@/lib/eventData";
import { formatDate } from "@/lib/filters";

export default function Home() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [dateRange, setDateRange] = useState(null);
  const [maxPrice, setMaxPrice] = useState(250);

  const featured = getEvents().slice(0, 6);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (keyword) params.set("q", keyword);
    if (category) params.set("category", category);
    if (dateRange) params.set("date", dateRange);
    if (maxPrice < 250) params.set("price", String(maxPrice));
    navigate(`/events?${params.toString()}`);
  };

  return (
    <div>
      {/* Hero */}
      <section className="mesh-hero relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
          <div className="mx-auto max-w-3xl text-center text-white">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur">
              <Sparkles size={14} className="text-cyan-300" />
              Discover 1,200+ live events near you
            </span>
            <h1
              className="mt-6 font-display font-extrabold leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.2rem)" }}
            >
              Unforgettable
              <br />
              <span className="bg-gradient-to-r from-violet-300 via-white to-cyan-300 bg-clip-text text-transparent">
                Live Experiences
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base text-white/75 sm:text-lg">
              Concerts, tech summits, sports, arts and food — find your next
              moment and book tickets in seconds.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-5xl">
            <SearchDock
              keyword={keyword}
              setKeyword={setKeyword}
              category={category}
              setCategory={setCategory}
              dateRange={dateRange}
              setDateRange={setDateRange}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              onSearch={handleSearch}
            />
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-extrabold text-[#0F172A] sm:text-3xl">
              Featured Events
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Handpicked experiences you won't want to miss
            </p>
          </div>
          <Link
            to="/events"
            className="hidden items-center gap-1.5 text-sm font-semibold text-violet-600 hover:text-violet-700 sm:flex"
          >
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((e) => (
            <EventCard key={e.id} event={e} onBook={() => navigate(`/event/${e.id}`)} />
          ))}
        </div>
      </section>

      <TrendingCarousel />

      {/* CTA band */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-twilight p-8 text-center text-white sm:p-12">
          <div className="absolute inset-0 opacity-40 mesh-hero" />
          <div className="relative">
            <CalendarCheck className="mx-auto mb-4 text-cyan-300" size={36} />
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
              Your bookings, always with you
            </h2>
            <p className="mx-auto mt-2 max-w-md text-white/70">
              Every ticket you book is saved to your device — review and manage
              them anytime.
            </p>
            <Link
              to="/my-bookings"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-violet-700 transition-transform hover:scale-105"
            >
              Go to My Bookings <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}