// Demo event catalog + localStorage-backed favorites/bookings store.

const SEED_EVENTS = [
  {
    id: "evt-001",
    title: "Neon Skyline Live",
    category: "Concerts",
    date: "2026-10-18",
    time: "20:00",
    location: "Aurora Dome, Stockholm",
    price: 89,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80",
    description: "An electrifying synthwave night under a canopy of lasers, featuring headline acts and surprise guests.",
    trending: true,
  },
  {
    id: "evt-002",
    title: "Frontier AI Summit",
    category: "Tech",
    date: "2026-11-04",
    time: "09:30",
    location: "Nexus Hall, Berlin",
    price: 149,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
    description: "The year's biggest gathering of AI builders — keynotes, hands-on labs, and founder fireside chats.",
    trending: true,
  },
  {
    id: "evt-003",
    title: "City Marathon 2026",
    category: "Sports",
    date: "2026-10-25",
    time: "07:00",
    location: "Riverside Park, Amsterdam",
    price: 59,
    image: "https://images.unsplash.com/photo-1452626038306-091c2ba5a3a7?auto=format&fit=crop&w=1200&q=80",
    description: "Join 20,000 runners on a scenic flat course through the heart of the city. All levels welcome.",
    trending: false,
  },
  {
    id: "evt-004",
    title: "Brushstrokes & Wine",
    category: "Arts",
    date: "2026-10-12",
    time: "18:30",
    location: "Loft Gallery, Lisbon",
    price: 45,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80",
    description: "A guided acrylic painting evening paired with regional wines. No experience needed — all materials included.",
    trending: true,
  },
  {
    id: "evt-005",
    title: "Harbor Street Food Fest",
    category: "Food",
    date: "2026-10-09",
    time: "12:00",
    location: "Pier 7, Copenhagen",
    price: 25,
    image: "https://images.unsplash.com/photo-1504674900247-ef7b8e6e2e0b?auto=format&fit=crop&w=1200&q=80",
    description: "Forty kitchens. One waterfront. Tasting passes unlock small plates from the city's best vendors.",
    trending: false,
  },
  {
    id: "evt-006",
    title: "Midnight Jazz Sessions",
    category: "Concerts",
    date: "2026-11-15",
    time: "21:30",
    location: "Velvet Room, New Orleans",
    price: 65,
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80",
    description: "Intimate late-night jazz with rotating quartets. Cocktails, candlelight, and improvisation.",
    trending: false,
  },
  {
    id: "evt-007",
    title: "Quantum Computing Bootcamp",
    category: "Tech",
    date: "2026-11-22",
    time: "10:00",
    location: "Innovation Lab, Zurich",
    price: 199,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80",
    description: "A two-day intensive on quantum algorithms with hands-on access to real quantum hardware.",
    trending: true,
  },
  {
    id: "evt-008",
    title: "Champions Tennis Open",
    category: "Sports",
    date: "2026-11-09",
    time: "14:00",
    location: "Centre Court, Madrid",
    price: 120,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
    description: "World top-ten players compete across a week of singles and doubles finals.",
    trending: false,
  },
  {
    id: "evt-009",
    title: "Sculpture in the Garden",
    category: "Arts",
    date: "2026-10-30",
    time: "11:00",
    location: "Botanical Gardens, Vienna",
    price: 35,
    image: "https://images.unsplash.com/photo-1499781350541-7781601c4b2d?auto=format&fit=crop&w=1200&q=80",
    description: "An open-air exhibition of contemporary sculpture set among century-old greenery.",
    trending: false,
  },
  {
    id: "evt-010",
    title: "Ramen & Sake Night",
    category: "Food",
    date: "2026-11-19",
    time: "19:00",
    location: "Kaiseki House, Osaka",
    price: 78,
    image: "https://images.unsplash.com/photo-1569718212165-2a8eb74b3b44?auto=format&fit=crop&w=1200&q=80",
    description: "A guided tasting of five regional ramen styles paired with curated sake flights.",
    trending: true,
  },
  {
    id: "evt-011",
    title: "Indie Rock Rising",
    category: "Concerts",
    date: "2026-12-01",
    time: "19:30",
    location: "The Foundry, Manchester",
    price: 54,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
    description: "Five breakout indie bands on one stage for a high-energy winter showcase.",
    trending: false,
  },
  {
    id: "evt-012",
    title: "Design Systems Conf",
    category: "Tech",
    date: "2026-12-08",
    time: "09:00",
    location: "Design Center, Helsinki",
    price: 129,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    description: "Practitioners from leading product teams share patterns, tokens, and governance strategies.",
    trending: false,
  },
];

export const CATEGORIES = ["Concerts", "Tech", "Sports", "Arts", "Food"];

export function getEvents() {
  return SEED_EVENTS;
}

export function getEventById(id) {
  return SEED_EVENTS.find((e) => e.id === id) || null;
}

export function getFeaturedEvents() {
  return SEED_EVENTS.filter((e) => e.trending).concat(
    SEED_EVENTS.filter((e) => !e.trending)
  );
}

// ---- localStorage store ----
const FAV_KEY = "evently:favorites";
const BOOK_KEY = "evently:bookings";

export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
  } catch {
    return [];
  }
}

export function toggleFavorite(id) {
  const favs = getFavorites();
  const next = favs.includes(id)
    ? favs.filter((f) => f !== id)
    : [...favs, id];
  localStorage.setItem(FAV_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("evently:favorites-changed"));
  return next;
}

export function isFavorite(id) {
  return getFavorites().includes(id);
}

export function getBookings() {
  try {
    return JSON.parse(localStorage.getItem(BOOK_KEY) || "[]");
  } catch {
    return [];
  }
}

export function addBooking(booking) {
  const bookings = getBookings();
  const record = {
    ...booking,
    id: "bk-" + Date.now(),
    bookedAt: new Date().toISOString(),
  };
  const next = [record, ...bookings];
  localStorage.setItem(BOOK_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("evently:bookings-changed"));
  return record;
}

export function removeBooking(id) {
  const next = getBookings().filter((b) => b.id !== id);
  localStorage.setItem(BOOK_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("evently:bookings-changed"));
  return next;
}