import { cn } from "@/lib/utils";

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-violet-200 bg-white/60 px-6 py-14 text-center",
        className
      )}
    >
      {Icon && (
        <div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-violet-100 to-cyan-100 text-violet-600">
          <Icon size={30} />
        </div>
      )}
      <h3 className="font-display text-lg font-bold text-[#0F172A]">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm text-slate-500">{description}</p>
      )}
      {action}
    </div>
  );
}