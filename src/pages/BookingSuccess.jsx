import { Link, useNavigate, useLocation } from "react-router-dom";
import { CheckCircle2, CalendarCheck, Home, Sparkles } from "lucide-react";
import { getEventById, getBookings } from "@/lib/eventData";
import { formatDateLong } from "@/lib/filters";
import EmptyState from "@/components/EmptyState";
import { CalendarX2 } from "lucide-react";

export default function BookingSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = getBookings().find((b) => b.id === location.state?.bookingId);
  const event = booking ? getEventById(booking.eventId) : null;

  if (!booking || !event) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState
          icon={CalendarX2}
          title="No recent booking found"
          description="Your booking may have expired from this session."
          action={
            <Link to="/events" className="mt-5 inline-flex rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700">
              Browse events
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:py-16">
      <div className="overflow-hidden rounded-3xl border border-[#E9D5FF] bg-white text-center shadow-xl">
        <div className="mesh-hero px-6 py-10 text-white">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white/15 backdrop-blur">
            <CheckCircle2 size={44} className="text-white" />
          </div>
          <h1 className="mt-5 font-display text-3xl font-extrabold">Booking confirmed!</h1>
          <p className="mt-2 text-white/75">
            Your tickets are saved to your device. Show this confirmation at the door.
          </p>
        </div>

        <div className="p-6 sm:p-8 text-left">
          <div className="flex items-center gap-4">
            <img src={event.image} alt={event.title} className="h-16 w-16 rounded-xl object-cover" />
            <div>
              <span className="inline-block rounded-full bg-violet-100 px-2.5 py-0.5 text-[11px] font-semibold text-violet-700">
                {event.category}
              </span>
              <h2 className="mt-1 font-display text-lg font-extrabold text-[#0F172A]">{event.title}</h2>
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-2xl bg-violet-50/50 p-5 text-sm">
            <div>
              <dt className="text-xs font-semibold uppercase text-slate-400">Date</dt>
              <dd className="mt-1 font-semibold text-[#0F172A]">{formatDateLong(event.date)}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-slate-400">Time</dt>
              <dd className="mt-1 font-semibold text-[#0F172A]">{event.time}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-slate-400">Tickets</dt>
              <dd className="mt-1 font-semibold text-[#0F172A]">{booking.qty}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-slate-400">Total paid</dt>
              <dd className="mt-1 font-semibold text-violet-700">${booking.total}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-xs font-semibold uppercase text-slate-400">Confirmation</dt>
              <dd className="mt-1 font-mono text-sm font-semibold text-[#0F172A]">{booking.id}</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/my-bookings"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
            >
              <CalendarCheck size={16} /> View My Bookings
            </Link>
            <button
              onClick={() => navigate("/")}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white py-3 text-sm font-semibold text-violet-700 hover:bg-violet-50"
            >
              <Home size={16} /> Back home
            </button>
          </div>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <Sparkles size={12} className="text-violet-400" /> Enjoy the experience!
          </p>
        </div>
      </div>
    </div>
  );
}