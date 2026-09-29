import { Link } from "react-router-dom";
import { Compass, Heart } from "lucide-react";
import { useFavoriteIds } from "@/lib/useStore";

export default function MobileHeader() {
  const favIds = useFavoriteIds();
  return (
    <header className="sticky top-0 z-40 bg-twilight text-white">
      <div className="flex h-14 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400">
            <Compass size={18} />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight">
            Evently
          </span>
        </Link>
        <Link
          to="/favorites"
          className="relative grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-white"
          aria-label="Saved events"
        >
          <Heart size={18} className={favIds.length ? "fill-violet-400 text-violet-400" : ""} />
          {favIds.length > 0 && (
            <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-violet-500 px-1 text-[11px] font-bold text-white">
              {favIds.length}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}