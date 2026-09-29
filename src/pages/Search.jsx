import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, SearchX } from "lucide-react";
import EventCard from "@/components/EventCard";
import EmptyState from "@/components/EmptyState";
import CategoryRail from "@/components/CategoryRail";
import { filterEvents } from "@/lib/filters";

export default function SearchPage() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState(250);

  const results = useMemo(
    () =>
      filterEvents({
        keyword,
        categories: category ? [category] : [],
        maxPrice,
      }),
    [keyword, category, maxPrice]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <h1 className="mb-4 font-display text-2xl font-extrabold text-[#0F172A]">
        Search
      </h1>

      <div className="relative">
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          autoFocus
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search events, artists, venues..."
          className="w-full rounded-2xl border border-violet-100 bg-white py-3.5 pl-11 pr-10 text-base text-[#0F172A] shadow-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
        />
        {keyword && (
          <button
            onClick={() => setKeyword("")}
            className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-slate-100 text-slate-500"
          >
            <X size={15} />
          </button>
        )}
      </div>

      <CategoryRail value={category} onChange={setCategory} />

      <div className="mt-4 flex items-center gap-3 rounded-2xl border border-violet-100 bg-white px-4 py-3">
        <span className="text-sm font-semibold text-slate-500">Max price</span>
        <input
          type="range"
          min={20}
          max={250}
          step={5}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="flex-1 accent-violet-600"
        />
        <span className="w-12 text-right font-display text-sm font-bold text-violet-700">
          ${maxPrice}
        </span>
      </div>

      <div className="mt-5">
        <p className="mb-3 text-sm text-slate-500">
          {results.length} result{results.length !== 1 ? "s" : ""}
        </p>
        {results.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="No events found"
            description="Try a different keyword or widen your price range."
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((e) => (
              <EventCard key={e.id} event={e} onBook={() => navigate(`/event/${e.id}`)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}