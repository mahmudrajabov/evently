import { Link } from "react-router-dom";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { getEvents } from "../lib/eventData";
import { formatDate } from "../lib/filters";
import { useBookings } from "../lib/useStore";

export default function TrendingCarousel() {
  const ref = useRef(null);
  const trending = getEvents().filter((e) => e.trending);
  const bookings = useBookings();

  const scroll = (dir) => {
    ref.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="flex items-center gap-2 font-display text-2xl font-extrabold text-[#0F172A] sm:text-3xl">
            <Flame className="text-orange-500" /> Recently Booked & Trending
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Live sync from your saved bookings —{" "}
            <span className="font-semibold text-violet-600">
              {bookings.length} booked
            </span>
          </p>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            onClick={() => scroll(-1)}
            className="grid h-10 w-10 place-items-center rounded-full border border-violet-100 bg-white text-violet-600 transition-colors hover:bg-violet-50"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll(1)}
            className="grid h-10 w-10 place-items-center rounded-full border border-violet-100 bg-white text-violet-600 transition-colors hover:bg-violet-50"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        ref={ref}
        className="no-scrollbar flex gap-4 overflow-x-auto pb-2"
      >
        {trending.map((e) => (
          <Link
            key={e.id}
            to={`/event/${e.id}`}
            className="card-hover group w-72 shrink-0 overflow-hidden rounded-2xl border border-[#E9D5FF] bg-white"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img src={e.image} alt={e.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute left-3 top-3 rounded-full bg-violet-600/95 px-2.5 py-1 text-[11px] font-semibold text-white">
                {e.category}
              </span>
            </div>
            <div className="p-4">
              <h3 className="line-clamp-1 font-display text-base font-bold text-[#0F172A]">{e.title}</h3>
              <p className="mt-1 text-xs text-slate-500">{formatDate(e.date)} · {e.location}</p>
              <p className="mt-2 font-display text-lg font-extrabold text-violet-700">${e.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}