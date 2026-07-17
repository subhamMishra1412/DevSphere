import React from "react";

export function SectionCard({
  title,
  subtitle,
  children,
  action,
  className = "",
  isLoading = false,
}) {
  return (
    <section
      className={`relative flex flex-col rounded-2xl border border-white/10 bg-zinc-950/60 p-6 shadow-xl backdrop-blur-xl before:absolute before:inset-0 before:rounded-2xl before:border-t before:border-white/15 before:pointer-events-none ${className}`}
      aria-label={title}
    >
      <header className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4">
        <div className="space-y-0.5 min-w-0 pr-2">
          <h2 className="truncate text-base font-bold tracking-tight text-white font-sans">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-zinc-400 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        {action && <div className="shrink-0 pt-1 sm:pt-0">{action}</div>}
      </header>

      <div className="flex-1">
        {isLoading ? (
          <div className="space-y-3 animate-pulse py-2">
            <div className="h-12 w-full rounded-xl bg-white/5 border border-white/5" />
            <div className="h-12 w-full rounded-xl bg-white/5 border border-white/5" />
            <div className="h-12 w-3/4 rounded-xl bg-white/5 border border-white/5" />
          </div>
        ) : (
          children
        )}
      </div>
    </section>
  );
}

export default SectionCard;