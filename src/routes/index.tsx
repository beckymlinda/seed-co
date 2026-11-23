import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search, CalendarDays, MapPin, BookOpen } from "lucide-react";
import hero from "@/assets/hero-course.jpg";
import crest from "@/assets/tournament-crest.jpg";
import { rules, ruleImage, searchRules } from "@/lib/rules";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rules of Golf Guide · Seed Co Malawi Open 2026" },
      { name: "description", content: "Browse the first 15 Rules of Golf in plain English for the Seed Co Malawi Open at Lilongwe Golf Club." },
      { property: "og:title", content: "Rules of Golf Guide · Seed Co Malawi Open 2026" },
      { property: "og:description", content: "The first 15 Rules of Golf, explained in plain English for officials and players." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const penalties = [
  { label: "One penalty stroke", stroke: "+1 stroke", match: "+1 stroke" },
  { label: "General penalty", stroke: "+2 strokes", match: "Loss of hole" },
  { label: "Disqualification", stroke: "Out of competition", match: "Out of match" },
];

function Index() {
  const [q, setQ] = useState("");
  const list = useMemo(() => searchRules(q), [q]);

  return (
    <div className="min-h-screen bg-background">
      <section className="relative isolate min-h-[88vh] overflow-hidden">
        <img src={hero} alt="Golf course at golden hour" width={1920} height={1088} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-hero-fade" />
        <SiteHeader overlay />
        <div className="mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-5 pb-16 pt-32 text-deep-foreground">
          <p className="animate-rise text-xs font-semibold uppercase tracking-[0.3em] text-deep-foreground">Growing Together · Driving Excellence</p>
          <h1 className="animate-rise mt-4 max-w-3xl font-display text-5xl font-semibold leading-[1.02] md:text-7xl">
            The Rules of Golf, <em className="text-deep-foreground">made simple.</em>
          </h1>
          <p className="animate-rise mt-5 max-w-xl text-base opacity-85 md:text-lg">
            A plain-English pocket guide for officials and players at the Seed Co Malawi Open Golf Championship.
          </p>
          <div className="animate-rise mt-8 flex flex-wrap gap-3 text-sm">
            <span className="flex items-center gap-2 rounded-full bg-deep/60 px-4 py-2 backdrop-blur"><CalendarDays className="h-4 w-4 text-accent" />19 – 22 November 2026</span>
            <span className="flex items-center gap-2 rounded-full bg-deep/60 px-4 py-2 backdrop-blur"><MapPin className="h-4 w-4 text-accent" />Lilongwe Golf Club</span>
            <span className="flex items-center gap-2 rounded-full bg-deep/60 px-4 py-2 backdrop-blur"><BookOpen className="h-4 w-4 text-accent" />R&amp;A / USGA 2023 edition</span>
          </div>
          <a href="#rules" className="animate-rise mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-accent-foreground transition hover:brightness-105">
            Explore the rules <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-px bg-border md:grid-cols-3">
          {penalties.map((p) => (
            <div key={p.label} className="bg-card px-6 py-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{p.label}</p>
              <p className="mt-2 font-display text-2xl text-primary">{p.stroke}</p>
              <p className="text-sm text-muted-foreground">Match play: {p.match}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="rules" className="mx-auto max-w-6xl scroll-mt-6 px-5 py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Rules 1 – 15</p>
            <h2 className="mt-2 font-display text-4xl font-semibold md:text-5xl">Choose a rule</h2>
            <p className="mt-2 max-w-md text-muted-foreground">Tap any rule to open its full explanation, key points and penalties.</p>
          </div>
          <label className="flex w-full items-center gap-3 rounded-full border border-input bg-card px-5 py-3 md:w-80">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search: bunker, lost ball, 14 clubs…" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          </label>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((r) => (
            <Link key={r.number} to="/rules/$ruleId" params={{ ruleId: String(r.number) }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card transition duration-300 hover:-translate-y-1">
              <div className="relative h-36 overflow-hidden">
                <img src={ruleImage(r.number)} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-hero-fade opacity-70" />
                <span className="absolute bottom-3 left-4 font-display text-5xl font-extrabold text-deep-foreground">{String(r.number).padStart(2, "0")}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-semibold leading-snug">{r.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{r.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">Read rule <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
              </div>
            </Link>
          ))}
        </div>
        {list.length === 0 && <p className="mt-10 text-center text-muted-foreground">No rules match “{q}”.</p>}
        <p className="mt-6 text-sm text-muted-foreground">Showing {list.length} of {rules.length} rules.</p>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-[auto_1fr]">
          <img
            src={crest}
            alt="Malawi Open elephant crest"
            loading="lazy"
            className="mx-auto h-40 w-40 rounded-3xl bg-white/80 p-3 object-contain shadow-card"
          />
          <div>
            <h2 className="font-display text-3xl font-semibold">Play it as it lies. Play it with integrity.</h2>
            <p className="mt-3 max-w-2xl text-secondary-foreground/80">
              Players apply the Rules to themselves and call their own penalties. These summaries help you decide quickly on the course —
              when in doubt, ask a Rules official. The Committee has the final word.
            </p>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
