import { Link } from "@tanstack/react-router";
import seedco from "@/assets/seedco_logo.jpg";
import crest from "@/assets/tournament-crest.jpg";

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  return (
    <header className={overlay ? "absolute inset-x-0 top-0 z-20" : "border-b border-border bg-card"}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={crest}
            alt="Malawi Open 2026 elephant crest"
            className="h-11 w-11 rounded-lg bg-white/90 object-contain p-0.5 ring-2 ring-accent"
          />
          <span className={`font-display text-lg font-semibold leading-tight ${overlay ? "text-deep-foreground" : "text-foreground"}`}>
            Malawi Open
            <span className="block font-sans text-[11px] font-medium uppercase tracking-[0.2em] opacity-70">Rules Guide 2026</span>
          </span>
        </Link>
        <img
          src={seedco}
          alt="Seed Co"
          className="h-8 w-40 rounded-md object-contain sm:w-44"
        />
      </div>
    </header>
  );
}
