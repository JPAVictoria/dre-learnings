import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HOME_SECTIONS } from "@/lib/constants";

export default function Home() {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {HOME_SECTIONS.map((s) => (
        <Link
          key={s.href}
          href={s.href}
          className="group flex flex-col justify-between min-h-[50dvh] md:min-h-screen p-10 md:p-16 border-b md:border-b-0 md:border-r border-[var(--border)] last:border-0 hover:bg-[var(--surface)] transition-colors duration-300"
        >
          <span className="text-xs text-[var(--muted)] tracking-widest uppercase">
            {s.meta}
          </span>

          <div>
            <div className="flex items-end gap-2 mb-3">
              <h2 className="text-5xl font-semibold tracking-tight text-[var(--text)]">
                {s.label}
              </h2>
              <span className="mb-1.5 text-[var(--muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <ArrowUpRight size={20} />
              </span>
            </div>
            <p className="text-[var(--muted)] text-sm leading-relaxed max-w-[260px]">
              {s.description}
            </p>
          </div>
        </Link>
      ))}
    </main>
  );
}
