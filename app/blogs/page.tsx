import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Blogs() {
  return (
    <main className="min-h-screen px-10 md:px-16 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200 mb-16"
      >
        <ArrowLeft size={14} />
        Back
      </Link>

      <h1 className="text-4xl font-semibold tracking-tight mb-3">Blogs</h1>
      <p className="text-[var(--muted)] text-sm mb-16">Nothing here yet.</p>

      <div className="border-t border-[var(--border)] pt-10 text-[var(--muted)] text-sm">
        Posts will appear here as they're written.
      </div>
    </main>
  );
}
