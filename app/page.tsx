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

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function Home() {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 relative overflow-hidden">
      {/* Animated center divider */}
      <motion.div
        className="hidden md:block absolute left-1/2 top-0 w-px bg-[var(--border)]"
        initial={{ height: 0 }}
        animate={{ height: "100%" }}
        transition={{ duration: 1, delay: 0.2, ease }}
      />

      {sections.map((s, i) => (
        <motion.div
          key={s.href}
          className="h-full"
          initial="rest"
          animate="rest"
          whileHover="hover"
        >
          {/* Hover fill that rises from the bottom */}
          <motion.div
            className="absolute inset-0 pointer-events-none bg-[var(--surface)]"
            style={{ transformOrigin: "bottom", zIndex: 0 }}
            variants={{
              rest: { scaleY: 0 },
              hover: { scaleY: 1, transition: { duration: 0.5, ease } },
            }}
          />

          <Link
            href={s.href}
            className="relative z-10 flex flex-col justify-between h-full min-h-[50dvh] md:min-h-screen p-10 md:p-16 border-b md:border-b-0 md:border-r border-[var(--border)] last:border-0"
          >
            {/* Meta */}
            <motion.span
              className="text-xs text-[var(--muted)] tracking-widest uppercase"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.1, duration: 0.5, ease }}
            >
              {s.meta}
            </motion.span>

            {/* Title + arrow */}
            <div>
              <motion.div
                className="flex items-end gap-2 mb-3"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.55, ease }}
              >
                <h2 className="text-5xl font-semibold tracking-tight text-[var(--text)]">
                  {s.label}
                </h2>
                <motion.span
                  className="mb-1.5 text-[var(--muted)]"
                  variants={{
                    rest: { opacity: 0, x: -6, y: 6 },
                    hover: { opacity: 1, x: 0, y: 0, transition: { duration: 0.25, ease } },
                  }}
                >
                  <ArrowUpRight size={20} />
                </motion.span>
              </motion.div>

              {/* Description */}
              <motion.p
                className="text-[var(--muted)] text-sm leading-relaxed max-w-[260px]"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.32, duration: 0.5, ease }}
              >
                {s.description}
              </motion.p>
            </div>
          </Link>
        </motion.div>
      ))}
    </main>
  );
}
