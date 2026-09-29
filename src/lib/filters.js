import { getEvents } from "./eventData";

export const DATE_FILTERS = ["Today", "This Weekend", "Next 30 Days"];

export function inDateRange(dateStr, range) {
  const date = new Date(dateStr + "T00:00:00");
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.round((startOfDay - today) / 86400000);

  if (range === "Today") return diffDays === 0;
  if (range === "This Weekend") {
    const day = today.getDay(); // 0 Sun .. 6 Sat
    const toSat = (6 - day + 7) % 7;
    const sat = new Date(today.getTime() + toSat * 86400000);
    const sun = new Date(sat.getTime() + 86400000);
    return startOfDay >= sat && startOfDay <= sun;
  }
  if (range === "Next 30 Days") return diffDays >= 0 && diffDays <= 30;
  return true;
}

export function filterEvents({
  keyword = "",
  categories = [],
  dateRange = null,
  maxPrice = 250,
  sort = "featured",
} = {}) {
  let list = getEvents().slice();

  if (keyword.trim()) {
    const k = keyword.toLowerCase();
    list = list.filter(
      (e) =>
        e.title.toLowerCase().includes(k) ||
        e.location.toLowerCase().includes(k) ||
        e.category.toLowerCase().includes(k)
    );
  }
  if (categories.length) {
    list = list.filter((e) => categories.includes(e.category));
  }
  if (dateRange) {
    list = list.filter((e) => inDateRange(e.date, dateRange));
  }
  list = list.filter((e) => e.price <= maxPrice);

  switch (sort) {
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "date-asc":
      list.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case "featured":
    default:
      list.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
  }
  return list;
}

export function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatDateLong(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}