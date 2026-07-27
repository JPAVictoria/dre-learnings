"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const sections = [
  {
    href: "/blogs",
    label: "Blogs",
    description: "Thoughts, notes, and learnings written down.",
    meta: "0 posts",
  },
  {
    href: "/presentations",
    label: "Presentations",
    description: "Visual walkthroughs of topics I've explored.",
    meta: "1 deck",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {sections.map((s, i) => (
        <motion.div
          key={s.href}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.12, duration: 0.6 }}
          className="h-full"
        >
          <Link
            href={s.href}
            className="group flex flex-col justify-between h-full min-h-[50dvh] md:min-h-screen p-10 md:p-16 border-b md:border-b-0 md:border-r border-[var(--border)] last:border-0 transition-colors duration-300 hover:bg-[var(--surface)]"
          >
            <span className="text-xs text-[var(--muted)] tracking-widest uppercase">
              {s.meta}
            </span>

            <div>
              <div className="flex items-end gap-2 mb-3">
                <h2 className="text-5xl font-semibold tracking-tight text-[var(--text)] transition-transform duration-300 group-hover:translate-x-1">
                  {s.label}
                </h2>
                <ArrowUpRight
                  size={20}
                  className="mb-1.5 text-[var(--muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <p className="text-[var(--muted)] text-sm leading-relaxed max-w-[260px]">
                {s.description}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </main>
  );
}
