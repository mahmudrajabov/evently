import { Link } from "react-router-dom";
import { CalendarCheck, Trash2, Ticket, CalendarX2 } from "lucide-react";
import { useBookings } from "@/lib/useStore";
import { removeBooking } from "@/lib/eventData";
import { formatDate } from "@/lib/filters";
import EmptyState from "@/components/EmptyState";
import { useToast } from "@/components/ui/use-toast";

export default function MyBookings() {
  const bookings = useBookings();
  const { toast } = useToast();

  const handleRemove = (booking) => {
    removeBooking(booking.id);
    toast({ title: "Booking cancelled", description: `${booking.event.title} removed from your bookings.` });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-extrabold text-[#0F172A] sm:text-3xl">
          My Bookings
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {bookings.length} confirmed booking{bookings.length !== 1 ? "s" : ""} · saved on this device
        </p>
      </div>

      {bookings.length === 0 ? (
        <EmptyState
          icon={CalendarX2}
          title="No bookings yet"
          description="When you book tickets, they'll appear here so you can review them anytime."
          action={
            <Link
              to="/events"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
            >
              <Ticket size={16} /> Explore events
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="card-hover overflow-hidden rounded-2xl border border-[#E9D5FF] bg-white"
            >
              <div className="flex">
                <Link to={`/event/${b.event.id}`} className="relative block h-28 w-28 shrink-0 sm:h-32 sm:w-32">
                  <img src={b.event.image} alt={b.event.title} className="h-full w-full object-cover" />
                </Link>
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-start justify-between gap-2">
                    <Link to={`/event/${b.event.id}`}>
                      <h3 className="line-clamp-1 font-display text-base font-bold text-[#0F172A] hover:text-violet-700">
                        {b.event.title}
                      </h3>
                    </Link>
                    <span className="shrink-0 rounded-full bg-cyan-100 px-2 py-0.5 text-[10px] font-bold text-cyan-700">
                      {b.event.category}
                    </span>
                  </div>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                    <CalendarCheck size={13} className="text-violet-500" />
                    {formatDate(b.event.date)} · {b.event.time}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">{b.event.location}</p>

                  <div className="mt-auto flex items-end justify-between pt-3">
                    <div>
                      <p className="text-[11px] text-slate-400">{b.qty} ticket{b.qty !== 1 ? "s" : ""}</p>
                      <p className="font-display text-lg font-extrabold text-violet-700">${b.total}</p>
                    </div>
                    <button
                      onClick={() => handleRemove(b)}
                      className="grid h-9 w-9 place-items-center rounded-xl border border-red-100 text-red-500 transition-colors hover:bg-red-50"
                      aria-label="Cancel booking"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}