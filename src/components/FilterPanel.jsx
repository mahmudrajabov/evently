import { Search, X, SlidersHorizontal } from "lucide-react";
import { CATEGORIES } from "../lib/eventData";
import { DATE_FILTERS } from "../lib/filters";
import { cn } from "@/lib/utils";

export default function FilterPanel({
  keyword,
  setKeyword,
  categories,
  setCategories,
  dateRange,
  setDateRange,
  maxPrice,
  setMaxPrice,
  onReset,
  compact = false,
}) {
  const toggleCategory = (cat) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const hasActive =
    keyword ||
    categories.length ||
    dateRange ||
    maxPrice < 250;

  return (
    <div className={cn("rounded-2xl border border-violet-100 bg-white p-5", compact && "p-0 border-0 bg-transparent")}>
      {!compact && (
        <div className="mb-5 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-display text-base font-bold text-[#0F172A]">
            <SlidersHorizontal size={17} className="text-violet-600" />
            Filters
          </h3>
          {hasActive && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-700"
            >
              <X size={13} /> Reset
            </button>
          )}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
            Keyword
          </label>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search events..."
              className="w-full rounded-xl border border-violet-100 bg-violet-50/40 py-2.5 pl-9 pr-3 text-sm text-[#0F172A] outline-none transition-colors placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-200"
            />
          </div>
        </div>

        <div>
          <label className="mb-2.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">
            Category
          </label>
          <div className="space-y-1.5">
            {CATEGORIES.map((cat) => {
              const checked = categories.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    checked
                      ? "bg-violet-600 text-white"
                      : "text-slate-600 hover:bg-violet-50"
                  )}
                >
                  <span
                    className={cn(
                      "grid h-4 w-4 place-items-center rounded border transition-colors",
                      checked ? "border-white bg-white/20" : "border-slate-300"
                    )}
                  >
                    {checked && <span className="h-1.5 w-1.5 rounded-sm bg-white" />}
                  </span>
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="mb-2.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">
            Date
          </label>
          <div className="flex flex-wrap gap-2">
            {DATE_FILTERS.map((d) => (
              <button
                key={d}
                onClick={() => setDateRange(dateRange === d ? null : d)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                  dateRange === d
                    ? "border-violet-600 bg-violet-600 text-white"
                    : "border-violet-100 bg-white text-slate-600 hover:border-violet-300 hover:text-violet-700"
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2.5 flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Max Price
            </label>
            <span className="font-display text-sm font-bold text-violet-700">
              ${maxPrice}
            </span>
          </div>
          <input
            type="range"
            min={20}
            max={250}
            step={5}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-violet-600"
          />
          <div className="mt-1 flex justify-between text-[11px] text-slate-400">
            <span>$20</span>
            <span>$250</span>
          </div>
        </div>

        {compact && hasActive && (
          <button
            onClick={onReset}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-violet-200 py-2.5 text-sm font-semibold text-violet-600 hover:bg-violet-50"
          >
            <X size={15} /> Reset filters
          </button>
        )}
      </div>
    </div>
  );
}