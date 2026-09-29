import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  CalendarDays,
  Clock,
  Ticket,
  Minus,
  Plus,
  Share2,
  ChevronRight,
} from "lucide-react";
import { getEventById, toggleFavorite } from "@/lib/eventData";
import { useFavoriteIds } from "@/lib/useStore";
import { formatDateLong } from "@/lib/filters";
import FavoriteButton from "@/components/FavoriteButton";
import EmptyState from "@/components/EmptyState";
import { CalendarX2 } from "lucide-react";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = getEventById(id);
  const favIds = useFavoriteIds();
  const [qty, setQty] = useState(1);

  if (!event) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState
          icon={CalendarX2}
          title="Event not found"
          description="This event may have been removed or never existed."
          action={
            <Link
              to="/events"
              className="mt-5 inline-flex rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
            >
              Back to Explore
            </Link>
          }
        />
      </div>
    );
  }

  const active = favIds.includes(event.id);
  const subtotal = event.price * qty;
  const fee = Math.round(subtotal * 0.08);
  const total = subtotal + fee;

  const goBook = () => {
    navigate("/booking/summary", {
      state: { eventId: event.id, qty, price: event.price },
    });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-violet-700"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="overflow-hidden rounded-3xl border border-[#E9D5FF] bg-white">
        <div className="relative aspect-[16/9] sm:aspect-[2/1]">
          <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
          <span className="absolute left-4 top-4 rounded-full bg-violet-600/95 px-3 py-1 text-xs font-semibold text-white">
            {event.category}
          </span>
          <FavoriteButton
            active={active}
            onToggle={() => toggleFavorite(event.id)}
            size={20}
            className="absolute right-4 top-4 h-11 w-11"
          />
        </div>

        <div className="p-5 sm:p-8">
          <h1 className="font-display text-2xl font-extrabold text-[#0F172A] sm:text-4xl">
            {event.title}
          </h1>

          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:gap-6">
            <span className="flex items-center gap-2">
              <CalendarDays size={17} className="text-violet-500" />
              {formatDateLong(event.date)}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={17} className="text-violet-500" />
              {event.time}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={17} className="text-cyan-500" />
              {event.location}
            </span>
          </div>

          <p className="mt-6 text-[15px] leading-relaxed text-slate-600">
            {event.description}
          </p>

          {/* Booking panel */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <h3 className="font-display text-lg font-bold text-[#0F172A]">
                Select tickets
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Choose how many tickets you'd like to book.
              </p>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-3 rounded-2xl border border-violet-100 bg-violet-50/40 p-2">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty <= 1}
                    className="grid h-10 w-10 place-items-center rounded-xl bg-white text-violet-700 shadow-sm transition-transform active:scale-90 disabled:opacity-40"
                    aria-label="Decrease"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-10 text-center font-display text-2xl font-extrabold text-[#0F172A]">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => Math.min(10, q + 1))}
                    disabled={qty >= 10}
                    className="grid h-10 w-10 place-items-center rounded-xl bg-violet-600 text-white shadow-sm transition-transform active:scale-90 disabled:opacity-40"
                    aria-label="Increase"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <span className="text-sm text-slate-500">
                  ${event.price} per ticket
                </span>
              </div>
            </div>

            {/* Summary card */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-violet-100 bg-violet-50/40 p-5">
                <h3 className="font-display text-base font-bold text-[#0F172A]">
                  Booking summary
                </h3>
                <dl className="mt-4 space-y-2.5 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <dt>{qty} × ${event.price}</dt>
                    <dd>${subtotal}</dd>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <dt>Service fee</dt>
                    <dd>${fee}</dd>
                  </div>
                  <div className="mt-3 flex justify-between border-t border-violet-100 pt-3 font-display text-lg font-extrabold text-[#0F172A]">
                    <dt>Total</dt>
                    <dd className="text-violet-700">${total}</dd>
                  </div>
                </dl>
                <button
                  onClick={goBook}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 py-3 text-sm font-bold text-white shadow-lg transition-all hover:shadow-[0_10px_30px_-6px_rgba(124,58,237,0.6)] active:scale-95"
                >
                  <Ticket size={16} /> Continue to booking
                </button>
                <button
                  onClick={() => navigate("/events")}
                  className="mt-2 flex w-full items-center justify-center gap-1 rounded-xl py-2.5 text-sm font-semibold text-slate-500 hover:text-violet-700"
                >
                  Keep exploring <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}