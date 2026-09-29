import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FavoriteButton({ active, onToggle, size = 18, className }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      className={cn(
        "grid place-items-center rounded-full bg-white/90 backdrop-blur shadow-sm border border-violet-100 transition-all hover:scale-110 active:scale-95",
        className
      )}
    >
      <Heart
        size={size}
        className={cn(
          "transition-colors",
          active ? "fill-violet-600 text-violet-600" : "text-slate-400"
        )}
      />
    </button>
  );
}