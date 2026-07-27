"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PRESENTATIONS_LIST } from "@/lib/constants";

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};

export default function Presentations() {
  return (
    <motion.main
      className="min-h-screen px-10 md:px-16 py-12"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
    >
      <motion.div variants={fadeUp}>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200 mb-16"
        >
          <ArrowLeft size={14} />
          Back
        </Link>
      </motion.div>

      <motion.h1
        variants={fadeUp}
        className="text-4xl font-semibold tracking-tight mb-2"
      >
        Presentations
      </motion.h1>

      <motion.p variants={fadeUp} className="text-[var(--muted)] text-sm mb-12">
        {PRESENTATIONS_LIST.length} deck
        {PRESENTATIONS_LIST.length !== 1 ? "s" : ""}
      </motion.p>

      <motion.div variants={fadeUp} className="divide-y divide-[var(--border)]">
        {PRESENTATIONS_LIST.map((p) => (
          <motion.div
            key={p.slug}
            whileHover={{ x: 6 }}
            transition={{ duration: 0.2, ease }}
          >
            <Link
              href={`/presentations/${p.slug}`}
              className="group flex items-start justify-between gap-8 py-8 -mx-4 px-4 rounded-sm"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-lg font-medium text-[var(--text)] group-hover:underline underline-offset-4">
                    {p.title}
                  </h2>
                  <span className="text-xs text-[var(--muted)] shrink-0">
                    {p.date}
                  </span>
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

              <motion.span
                className="mt-1 text-[var(--muted)] shrink-0"
                variants={{
                  rest: { opacity: 0, x: -6 },
                  hover: { opacity: 1, x: 0 },
                }}
                initial="rest"
                animate="rest"
                whileHover="hover"
                transition={{ duration: 0.2 }}
              >
                <ArrowRight size={16} />
              </motion.span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.main>
  );
}
