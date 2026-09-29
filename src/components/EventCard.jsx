import { Link } from "react-router-dom";
import { MapPin, CalendarDays, Ticket } from "lucide-react";
import { formatDate } from "@/lib/filters";
import { useFavoriteIds, useFavorites } from "@/lib/useStore";
import { toggleFavorite } from "@/lib/eventData";
import FavoriteButton from "./FavoriteButton";

export default function EventCard({ event, onBook }) {
  const favIds = useFavoriteIds();
  const active = favIds.includes(event.id);

  return (
    <Link
      to={`/event/${event.id}`}
      className="card-hover group flex flex-col overflow-hidden rounded-2xl border border-[#E9D5FF] bg-white"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-violet-600/95 px-3 py-1 text-xs font-semibold text-white shadow">
          {event.category}
        </span>
        <FavoriteButton
          active={active}
          onToggle={() => toggleFavorite(event.id)}
          className="absolute right-3 top-3 h-9 w-9"
        />
        {event.trending && (
          <span className="absolute bottom-3 left-3 rounded-full bg-cyan-500/95 px-2.5 py-1 text-[11px] font-semibold text-white shadow">
            🔥 Trending
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-1 font-display text-lg font-bold text-[#0F172A]">
          {event.title}
        </h3>
        <div className="mt-2 flex flex-col gap-1.5 text-sm text-slate-500">
          <span className="flex items-center gap-2">
            <CalendarDays size={15} className="text-violet-500" />
            {formatDate(event.date)} · {event.time}
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={15} className="text-cyan-500" />
            <span className="line-clamp-1">{event.location}</span>
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-xl font-extrabold text-[#0F172A]">
            ${event.price}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onBook?.(event);
            }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-violet-700 hover:shadow-[0_8px_20px_-6px_rgba(124,58,237,0.6)] active:scale-95"
          >
            <Ticket size={15} />
            Book Tickets
          </button>
        </div>
      </div>
    </Link>
  );
}