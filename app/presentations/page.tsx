import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

const presentations = [
  {
    slug: "print-on-top",
    title: "Print on Top",
    description:
      "CSS techniques for making content persist across every printed page — fixed headers, watermarks, page breaks, and the @page rule.",
    tags: ["CSS", "Print Media"],
    date: "Jul 2025",
    slides: 9,
  },
];

export default function Presentations() {
  return (
    <main className="min-h-screen px-10 md:px-16 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200 mb-16"
      >
        <ArrowLeft size={14} />
        Back
      </Link>

      <h1 className="text-4xl font-semibold tracking-tight mb-2">Presentations</h1>
      <p className="text-[var(--muted)] text-sm mb-12">
        {presentations.length} deck{presentations.length !== 1 ? "s" : ""}
      </p>

      <div className="divide-y divide-[var(--border)]">
        {presentations.map((p) => (
          <Link
            key={p.slug}
            href={`/presentations/${p.slug}`}
            className="group flex items-start justify-between gap-8 py-8 hover:bg-[var(--surface)] -mx-4 px-4 rounded-sm transition-colors duration-200"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-lg font-medium text-[var(--text)] group-hover:underline underline-offset-4">
                  {p.title}
                </h2>
                <span className="text-xs text-[var(--muted)] shrink-0">{p.date}</span>
              </div>
              <p className="text-sm text-[var(--muted)] leading-relaxed mb-3 max-w-lg">
                {p.description}
              </p>
              <div className="flex items-center gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-[var(--accent)] border border-[var(--border)] px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                <span className="text-xs text-[var(--muted)] ml-1">
                  {p.slides} slides
                </span>
              </div>
            </div>

            <ArrowRight
              size={16}
              className="mt-1 text-[var(--muted)] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
