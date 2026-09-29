import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Ticket, CheckCircle2, Minus, Plus, ShieldCheck } from "lucide-react";
import { getEventById, addBooking } from "@/lib/eventData";
import { formatDateLong } from "@/lib/filters";
import EmptyState from "@/components/EmptyState";
import { CalendarX2 } from "lucide-react";

export default function BookingSummary() {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventId, qty: initQty, price } = location.state || {};
  const event = getEventById(eventId);
  const [qty, setQty] = useState(initQty || 1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!event) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState
          icon={CalendarX2}
          title="No booking in progress"
          description="Pick an event to start a booking."
          action={
            <Link to="/events" className="mt-5 inline-flex rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700">
              Browse events
            </Link>
          }
        />
      </div>
    );
  }

  const unit = price || event.price;
  const subtotal = unit * qty;
  const fee = Math.round(subtotal * 0.08);
  const total = subtotal + fee;

  const confirm = () => {
    if (!name.trim() || !email.trim()) return;
    setSubmitting(true);
    const record = addBooking({
      eventId: event.id,
      qty,
      unitPrice: unit,
      total,
      attendeeName: name.trim(),
      attendeeEmail: email.trim(),
    });
    setTimeout(() => {
      navigate(`/booking/success`, { state: { bookingId: record.id } });
    }, 600);
  };

  const canSubmit = name.trim() && email.includes("@") && !submitting;

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-violet-700"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <h1 className="mb-6 font-display text-2xl font-extrabold text-[#0F172A] sm:text-3xl">
        Review your booking
      </h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Ticket stub */}
        <div className="lg:col-span-3">
          <div className="relative overflow-hidden rounded-2xl border border-[#E9D5FF] bg-white shadow-sm">
            <div className="flex flex-col sm:flex-row">
              <div className="relative aspect-[16/10] sm:aspect-auto sm:w-44 shrink-0">
                <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 p-5">
                <span className="inline-block rounded-full bg-violet-100 px-2.5 py-1 text-[11px] font-semibold text-violet-700">
                  {event.category}
                </span>
                <h2 className="mt-2 font-display text-xl font-extrabold text-[#0F172A]">
                  {event.title}
                </h2>
                <p className="mt-1 text-sm text-slate-500">{formatDateLong(event.date)} · {event.time}</p>
                <p className="mt-0.5 text-sm text-slate-500">{event.location}</p>
              </div>
            </div>

            {/* Perforated divider with notches */}
            <div className="relative border-t-2 border-dashed border-violet-100">
              <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#F8F9FC]" />
              <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#F8F9FC]" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Tickets</p>
                <div className="mt-1.5 flex items-center gap-3">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty <= 1}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-violet-100 text-violet-700 active:scale-90 disabled:opacity-40"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-display text-xl font-extrabold text-[#0F172A]">{qty}</span>
                  <button
                    onClick={() => setQty((q) => Math.min(10, q + 1))}
                    disabled={qty >= 10}
                    className="grid h-9 w-9 place-items-center rounded-lg bg-violet-600 text-white active:scale-90 disabled:opacity-40"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Unit price</p>
                <p className="font-display text-xl font-extrabold text-violet-700">${unit}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Details + confirm */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-violet-100 bg-white p-5">
            <h3 className="font-display text-base font-bold text-[#0F172A]">Attendee details</h3>
            <div className="mt-4 space-y-3">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-500">Full name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jordan Rivera"
                  className="w-full rounded-xl border border-violet-100 bg-violet-50/30 px-3 py-2.5 text-sm outline-none focus:border-violet-400 focus:bg-white"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-500">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full rounded-xl border border-violet-100 bg-violet-50/30 px-3 py-2.5 text-sm outline-none focus:border-violet-400 focus:bg-white"
                />
              </div>
            </div>

            <dl className="mt-5 space-y-2 border-t border-violet-100 pt-4 text-sm">
              <div className="flex justify-between text-slate-600">
                <dt>Subtotal</dt><dd>${subtotal}</dd>
              </div>
              <div className="flex justify-between text-slate-600">
                <dt>Service fee</dt><dd>${fee}</dd>
              </div>
              <div className="flex justify-between border-t border-violet-100 pt-2 font-display text-lg font-extrabold text-[#0F172A]">
                <dt>Total</dt><dd className="text-violet-700">${total}</dd>
              </div>
            </dl>

            <button
              onClick={confirm}
              disabled={!canSubmit}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 py-3 text-sm font-bold text-white shadow-lg transition-all hover:shadow-[0_10px_30px_-6px_rgba(124,58,237,0.6)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              ) : (
                <><Ticket size={16} /> Confirm booking</>
              )}
            </button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck size={13} /> Demo booking — no payment is processed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}