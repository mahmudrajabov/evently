import { Search, Calendar, Tag, ArrowRight } from "lucide-react";
import { CATEGORIES } from "../lib/eventData";
import { DATE_FILTERS } from "../lib/filters";
import { cn } from "@/lib/utils";

export default function SearchDock({
  keyword,
  setKeyword,
  category,
  setCategory,
  dateRange,
  setDateRange,
  maxPrice,
  setMaxPrice,
  onSearch,
  variant = "hero",
}) {
  return (
    <div
      className={
        variant === "hero"
          ? "glass-dock rounded-3xl p-3 shadow-2xl sm:p-4"
          : "rounded-2xl border border-violet-100 bg-white p-3 shadow-lg"
      }
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/70" />
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search events, artists, venues..."
            className={
              variant === "hero"
                ? "w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-11 pr-3 text-sm text-white outline-none transition-colors placeholder:text-white/60 focus:bg-white/20"
                : "w-full rounded-xl border border-violet-100 bg-violet-50/40 py-3 pl-11 pr-3 text-sm text-[#0F172A] outline-none placeholder:text-slate-400 focus:border-violet-400 focus:bg-white"
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:flex lg:items-center">
          <div className="relative">
            <Tag size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full appearance-none rounded-xl border border-violet-100 bg-white py-3 pl-9 pr-8 text-sm font-medium text-[#0F172A] outline-none focus:border-violet-400"
            >
              <option value="">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Calendar size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={dateRange || ""}
              onChange={(e) => setDateRange(e.target.value || null)}
              className="w-full appearance-none rounded-xl border border-violet-100 bg-white py-3 pl-9 pr-8 text-sm font-medium text-[#0F172A] outline-none focus:border-violet-400"
            >
              <option value="">Any date</option>
              {DATE_FILTERS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-violet-100 bg-white px-3 py-2.5">
            <span className="text-xs font-semibold text-slate-500">Max</span>
            <input
              type="range"
              min={20}
              max={250}
              step={5}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-20 accent-violet-600"
            />
            <span className="w-10 text-right text-sm font-bold text-violet-700">${maxPrice}</span>
          </div>
        </div>

        <button
          onClick={onSearch}
          className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:shadow-[0_10px_30px_-6px_rgba(124,58,237,0.6)] active:scale-95"
        >
          Search
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}