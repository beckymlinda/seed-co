import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ExternalLink, AlertTriangle, CheckCircle2 } from "lucide-react";
import { getRule, ruleImage, rules } from "@/lib/rules";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/rules/$ruleId")({
  loader: ({ params }) => {
    const rule = getRule(Number(params.ruleId));
    if (!rule) throw notFound();
    return { rule };
  },
  head: ({ loaderData }) => {
    const r = loaderData?.rule;
    const title = r ? `Rule ${r.number}: ${r.title} · Malawi Open Rules Guide` : "Rule not found · Malawi Open Rules Guide";
    const desc = r ? `${r.summary}. Plain-English explanation of Rule ${r.number} of the Rules of Golf.` : "This rule could not be found.";
    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title }, { property: "og:description", content: desc },
        { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" },
        ...(r ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
      <h1 className="font-display text-4xl">Rule not found</h1>
      <Link to="/" className="rounded-full bg-primary px-6 py-3 text-primary-foreground">Back to all rules</Link>
    </div>
  ),
  component: RulePage,
});

function RulePage() {
  const { rule } = Route.useLoaderData();
  const prev = rules.find((r) => r.number === rule.number - 1);
  const next = rules.find((r) => r.number === rule.number + 1);

  return (
    <div className="min-h-screen bg-background">
      <section className="relative isolate overflow-hidden">
        <img src={ruleImage(rule.number)} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-hero-fade" />
        <SiteHeader overlay />
        <div className="mx-auto max-w-4xl px-5 pb-14 pt-36 text-deep-foreground">
          <Link to="/" hash="rules" className="inline-flex items-center gap-2 text-sm opacity-80 hover:opacity-100"><ArrowLeft className="h-4 w-4" /> All rules</Link>
          <p className="animate-rise mt-6 font-display text-8xl font-extrabold leading-none text-accent md:text-9xl">{rule.number}</p>
          <h1 className="animate-rise mt-2 font-display text-4xl font-semibold leading-tight md:text-6xl">{rule.title}</h1>
          <p className="animate-rise mt-3 text-lg opacity-85">{rule.summary}</p>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-5 py-14">
        <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Key points</h2>
        <ol className="mt-6 space-y-4">
          {rule.points.map((p, i) => (
            <li key={i} className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-card">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <p className="leading-relaxed">{p}</p>
            </li>
          ))}
        </ol>

        {rule.penalty && (
          <div className="mt-10 rounded-2xl border-l-4 border-destructive bg-card p-6 shadow-card">
            <div className="flex items-center gap-2 text-destructive"><AlertTriangle className="h-5 w-5" /><h2 className="font-display text-xl font-semibold">Penalty</h2></div>
            <p className="mt-3 leading-relaxed">{rule.penalty}</p>
          </div>
        )}

        <a href={rule.url} target="_blank" rel="noopener" className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-110">
          Full Rule {rule.number} on randa.org <ExternalLink className="h-4 w-4" />
        </a>

        <nav className="mt-14 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
          {prev ? (
            <Link to="/rules/$ruleId" params={{ ruleId: String(prev.number) }} className="rounded-2xl border border-border bg-card p-5 hover:border-brand">
              <span className="flex items-center gap-1 text-xs uppercase tracking-widest text-muted-foreground"><ArrowLeft className="h-3 w-3" /> Rule {prev.number}</span>
              <span className="mt-1 block font-display text-lg">{prev.title}</span>
            </Link>
          ) : <span />}
          {next && (
            <Link to="/rules/$ruleId" params={{ ruleId: String(next.number) }} className="rounded-2xl border border-border bg-card p-5 text-right hover:border-brand">
              <span className="flex items-center justify-end gap-1 text-xs uppercase tracking-widest text-muted-foreground">Rule {next.number} <ArrowRight className="h-3 w-3" /></span>
              <span className="mt-1 block font-display text-lg">{next.title}</span>
            </Link>
          )}
        </nav>
      </main>
      <SiteFooter />
    </div>
  );
}
