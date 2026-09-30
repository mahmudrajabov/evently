import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";

export const BRAND_EMBLEM_URL =
  "https://media.base44.com/images/public/6abbf5bbf533ee5f051b2840/21a10ef60_m-cat-emblem.svg";

export default function BrandLogo({ size = 32, textClass = "", className = "" }) {
  return (
    <Link
      to="/"
      className={`flex items-center gap-2.5 ${className}`}
      aria-label="Mahmud Rajabov — Home"
    >
      <Image
        src={BRAND_EMBLEM_URL}
        alt="Mahmud Rajabov emblem"
        fittingType="fit"
        className="shrink-0 object-contain"
        style={{ width: size, height: size }}
      />
      <span className={textClass}>Mahmud Rajabov</span>
    </Link>
  );
}