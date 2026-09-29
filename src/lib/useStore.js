import { useEffect, useState } from "react";
import {
  getFavorites,
  getBookings,
  getEventById,
} from "./eventData";

// Reactive favorites list (array of event objects).
export function useFavorites() {
  const [ids, setIds] = useState(() => getFavorites());

  useEffect(() => {
    const handler = () => setIds(getFavorites());
    window.addEventListener("evently:favorites-changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("evently:favorites-changed", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return ids.map(getEventById).filter(Boolean);
}

export function useFavoriteIds() {
  const [ids, setIds] = useState(() => getFavorites());
  useEffect(() => {
    const handler = () => setIds(getFavorites());
    window.addEventListener("evently:favorites-changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("evently:favorites-changed", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return ids;
}

export function useBookings() {
  const [bookings, setBookings] = useState(() => getBookings());

  useEffect(() => {
    const handler = () => setBookings(getBookings());
    window.addEventListener("evently:bookings-changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("evently:bookings-changed", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return bookings
    .map((b) => ({ ...b, event: getEventById(b.eventId) }))
    .filter((b) => b.event);
}