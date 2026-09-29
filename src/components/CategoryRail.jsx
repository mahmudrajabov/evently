import { useRef } from "react";
import { CATEGORIES } from "../lib/eventData";
import { cn } from "@/lib/utils";

export default function CategoryRail({ value, onChange }) {
  const ref = useRef(null);
  return (
    <div
      ref={ref}
      className="no-scrollbar sticky top-14 z-30 flex gap-2 overflow-x-auto bg-[#F8F9FC]/95 px-4 py-3 backdrop-blur md:hidden"
    >
      <button
        onClick={() => onChange("")}
        className={cn(
          "shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
          !value ? "bg-violet-600 text-white" : "bg-white text-slate-600 border border-violet-100"
        )}
      >
        All
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(value === cat ? "" : cat)}
          className={cn(
            "shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
            value === cat ? "bg-violet-600 text-white" : "bg-white text-slate-600 border border-violet-100"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}