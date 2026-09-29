import { Link, useNavigate } from "react-router-dom";
import { Heart, Ticket, Compass } from "lucide-react";
import { useFavorites } from "@/lib/useStore";
import EventCard from "@/components/EventCard";
import EmptyState from "@/components/EmptyState";

export default function Favorites() {
  const favorites = useFavorites();
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6">
        <h1 className="flex items-center gap-2 font-display text-2xl font-extrabold text-[#0F172A] sm:text-3xl">
          <Heart className="fill-violet-600 text-violet-600" /> Saved Events
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {favorites.length} event{favorites.length !== 1 ? "s" : ""} you've hearted
        </p>
      </div>

      {favorites.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="No saved events yet"
          description="Tap the heart on any event to save it here for quick access."
          action={
            <Link
              to="/events"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
            >
              <Compass size={16} /> Explore events
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((e) => (
            <EventCard key={e.id} event={e} onBook={() => navigate(`/event/${e.id}`)} />
          ))}
        </div>
      )}
    </div>
  );
}