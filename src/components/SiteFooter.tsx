import letts from "@/assets/letts_commerce.png";

export function SiteFooter() {
  return (
    <footer className="bg-deep text-deep-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-xl">Seed Co Malawi Open Golf Championship</p>
          <p className="mt-1 text-sm opacity-70">19 – 22 November 2026 · Lilongwe Golf Club · R&amp;A / USGA Rules of Golf, 2023 edition</p>
          <p className="mt-1 text-xs opacity-60">Plain-English summaries. The Committee has the final word.</p>
        </div>
        <a href="https://www.lettscommerce.com" target="_blank" rel="noopener" className="flex items-center gap-3 rounded-lg bg-card px-4 py-2">
          <span className="text-xs text-muted-foreground">Powered by</span>
          <img src={letts} alt="Letts Commerce" className="h-5" />
        </a>
      </div>
    </footer>
  );
}
