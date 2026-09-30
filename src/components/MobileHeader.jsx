import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useFavoriteIds } from "@/lib/useStore";
import BrandLogo from "./BrandLogo";

export default function MobileHeader() {
  const favIds = useFavoriteIds();
  return (
    <header className="sticky top-0 z-40 bg-twilight text-white">
      <div className="flex h-14 items-center justify-between px-4">
        <BrandLogo
          size={28}
          textClass="font-display text-base font-extrabold tracking-tight"
        />
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