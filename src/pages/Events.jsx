import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X, SearchX, ArrowUpDown } from "lucide-react";
import EventCard from "@/components/EventCard";
import FilterPanel from "@/components/FilterPanel";
import CategoryRail from "@/components/CategoryRail";
import EmptyState from "@/components/EmptyState";
import { useNavigate } from "react-router-dom";
import { filterEvents } from "@/lib/filters";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "date-asc", label: "Date (soonest)" },
  { value: "price-asc", label: "Price (low to high)" },
  { value: "price-desc", label: "Price (high to low)" },
];

export default function Events() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [params, setParams] = useSearchParams();

  const [keyword, setKeyword] = useState(params.get("q") || "");
  const [categories, setCategories] = useState(
    params.get("category") ? [params.get("category")] : []
  );
  const [dateRange, setDateRange] = useState(params.get("date") || null);
  const [maxPrice, setMaxPrice] = useState(Number(params.get("price")) || 250);
  const [sort, setSort] = useState("featured");
  const [sheetOpen, setSheetOpen] = useState(false);

  // mobile category rail single-select syncs with categories array
  const mobileCategory = categories[0] || "";

  const reset = () => {
    setKeyword("");
    setCategories([]);
    setDateRange(null);
    setMaxPrice(250);
    setSort("featured");
  };

  const results = useMemo(
    () => filterEvents({ keyword, categories, dateRange, maxPrice, sort }),
    [keyword, categories, dateRange, maxPrice, sort]
  );

  const activeTagCount =
    (keyword ? 1 : 0) +
    categories.length +
    (dateRange ? 1 : 0) +
    (maxPrice < 250 ? 1 : 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-5">
        <h1 className="font-display text-2xl font-extrabold text-[#0F172A] sm:text-3xl">
          Explore Events
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {results.length} event{results.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Mobile category rail */}
      <CategoryRail
        value={mobileCategory}
        onChange={(c) => setCategories(c ? [c] : [])}
      />

      <div className="mt-4 grid grid-cols-12 gap-6">
        {/* Desktop filter rail */}
        <aside className="col-span-12 hidden md:col-span-3 md:block">
          <div className="sticky top-20">
            <FilterPanel
              keyword={keyword}
              setKeyword={setKeyword}
              categories={categories}
              setCategories={setCategories}
              dateRange={dateRange}
              setDateRange={setDateRange}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              onReset={reset}
            />
          </div>
        </aside>

        <div className="col-span-12 md:col-span-9">
          {/* Active tags + sort bar */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {keyword && (
                <Tag label={`"${keyword}"`} onClear={() => setKeyword("")} />
              )}
              {categories.map((c) => (
                <Tag key={c} label={c} onClear={() => setCategories((p) => p.filter((x) => x !== c))} />
              ))}
              {dateRange && (
                <Tag label={dateRange} onClear={() => setDateRange(null)} />
              )}
              {maxPrice < 250 && (
                <Tag label={`≤ $${maxPrice}`} onClear={() => setMaxPrice(250)} />
              )}
              {activeTagCount > 0 && (
                <button
                  onClick={reset}
                  className="text-xs font-semibold text-violet-600 hover:text-violet-700"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <ArrowUpDown size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none rounded-xl border border-violet-100 bg-white py-2 pl-9 pr-8 text-sm font-medium text-[#0F172A] outline-none focus:border-violet-400"
                >
                  {SORTS.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => setSheetOpen(true)}
                className="flex items-center gap-1.5 rounded-xl border border-violet-200 bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-700 md:hidden"
              >
                <SlidersHorizontal size={15} /> Filters
                {activeTagCount > 0 && (
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-violet-600 text-[11px] text-white">
                    {activeTagCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {results.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="No events match your filters"
              description="Try widening your price range, clearing a category, or picking a different date window."
              action={
                <button
                  onClick={reset}
                  className="mt-5 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
                >
                  Reset all filters
                </button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((e) => (
                <EventCard key={e.id} event={e} onBook={() => navigate(`/event/${e.id}`)} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto p-0">
          <SheetHeader className="px-5 pt-5">
            <SheetTitle className="font-display text-lg font-bold">
              Filter & Search
            </SheetTitle>
          </SheetHeader>
          <div className="p-5">
            <FilterPanel
              keyword={keyword}
              setKeyword={setKeyword}
              categories={categories}
              setCategories={setCategories}
              dateRange={dateRange}
              setDateRange={setDateRange}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              onReset={reset}
              compact
            />
            <button
              onClick={() => setSheetOpen(false)}
              className="mt-5 w-full rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 py-3 text-sm font-bold text-white"
            >
              Show {results.length} events
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function Tag({ label, onClear }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
      {label}
      <button onClick={onClear} className="grid h-4 w-4 place-items-center rounded-full hover:bg-violet-200">
        <X size={11} />
      </button>
    </span>
  );
}