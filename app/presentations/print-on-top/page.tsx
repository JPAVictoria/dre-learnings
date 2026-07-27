"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";
import { PRINT_ON_TOP_SLIDES, type Block, type TextPart } from "@/lib/constants";

// ─── Renderers ────────────────────────────────────────────────────────────────

const Code = ({ children }: { children: string }) => (
  <pre className="bg-[var(--hover-bg)] border border-[var(--border)] rounded-md px-5 py-4 text-sm font-mono text-[var(--text)] overflow-x-auto leading-relaxed whitespace-pre">
    {children}
  </pre>
);

const Bullet = ({ items }: { items: string[] }) => (
  <ul className="space-y-3">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-3 text-sm text-[var(--muted)] leading-relaxed">
        <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--accent)] shrink-0" />
        {item}
      </li>
    ))}
  </ul>
);

function renderParts(parts: TextPart[]) {
  return parts.map((p, i) => {
    if (p.t === "code")
      return (
        <code key={i} className="text-[var(--text)] bg-[var(--hover-bg)] px-1.5 py-0.5 rounded text-xs">
          {p.v}
        </code>
      );
    if (p.t === "bold") return <strong key={i} className="text-[var(--text)]">{p.v}</strong>;
    if (p.t === "em") return <em key={i}>{p.v}</em>;
    return <span key={i}>{p.v}</span>;
  });
}

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "text":
      return <p key={i} className="text-sm text-[var(--muted)]">{block.text}</p>;
    case "richText":
      return <p key={i} className="text-sm text-[var(--muted)]">{renderParts(block.parts)}</p>;
    case "code":
      return <Code key={i}>{block.content}</Code>;
    case "bullets":
      return <Bullet key={i} items={block.items} />;
    case "footnote":
      return (
        <p key={i} className="text-sm text-[var(--muted)] pt-2 border-t border-[var(--border)]">
          {block.text}
        </p>
      );
  }
}

// ─── Animation variants ───────────────────────────────────────────────────────

const ease = [0.25, 0.1, 0.25, 1] as const;
const easeIn = [0.55, 0, 1, 0.45] as const;

const slideContainer: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 50 : -50 }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.38, ease, staggerChildren: 0.07, delayChildren: 0.04 },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -50 : 50,
    transition: { duration: 0.22, ease: easeIn },
  }),
};

const slideChild: Variants = {
  enter: { opacity: 0, y: 14 },
  center: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
  exit: { opacity: 0, transition: { duration: 0.12 } },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PrintOnTop() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next: number) => {
    setDir(next > index ? 1 : -1);
    setIndex(next);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && index < PRINT_ON_TOP_SLIDES.length - 1) go(index + 1);
      if (e.key === "ArrowLeft" && index > 0) go(index - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [index]);

  const slide = PRINT_ON_TOP_SLIDES[index];
  const progress = (index + 1) / PRINT_ON_TOP_SLIDES.length;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      {/* Progress bar */}
      <div className="relative h-[2px] w-full bg-[var(--border)]">
        <motion.div
          className="absolute left-0 top-0 h-full bg-[var(--accent)]"
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.4, ease }}
        />
      </div>

      {/* Top bar */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-[var(--border)]">
        <Link
          href="/presentations"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200"
        >
          <ChevronLeft size={14} />
          Presentations
        </Link>

        <div className="overflow-hidden h-4 flex items-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={index}
              initial={{ y: dir > 0 ? 10 : -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: dir > 0 ? -10 : 10, opacity: 0 }}
              transition={{ duration: 0.2, ease }}
              className="text-xs text-[var(--muted)] block"
            >
              {index + 1} / {PRINT_ON_TOP_SLIDES.length}
            </motion.span>
          </AnimatePresence>
        </div>
      </header>

      {/* Slide area */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 overflow-hidden">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={index}
              custom={dir}
              variants={slideContainer}
              initial="enter"
              animate="center"
              exit="exit"
              className="space-y-6"
            >
              {slide.tag && (
                <motion.p variants={slideChild} className="text-xs text-[var(--muted)] tracking-widest uppercase">
                  {slide.tag}
                </motion.p>
              )}

              <motion.h1 variants={slideChild} className="text-3xl md:text-4xl font-semibold tracking-tight leading-snug">
                {slide.title}
              </motion.h1>

              {slide.subtitle && (
                <motion.p variants={slideChild} className="text-[var(--muted)] text-base leading-relaxed max-w-lg">
                  {slide.subtitle}
                </motion.p>
              )}

              {slide.blocks && (
                <motion.div variants={slideChild} className="space-y-4">
                  {slide.blocks.map((block, i) => renderBlock(block, i))}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <footer className="flex items-center justify-between px-8 py-5 border-t border-[var(--border)]">
        <div className="flex items-center gap-1.5">
          {PRINT_ON_TOP_SLIDES.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => go(i)}
              animate={{
                width: i === index ? 16 : 6,
                backgroundColor: i === index ? "var(--accent)" : "var(--border)",
              }}
              whileHover={{ backgroundColor: i === index ? "var(--accent)" : "var(--muted)" }}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
              className="h-1.5 rounded-full"
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            onClick={() => go(index - 1)}
            disabled={index === 0}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="p-2 rounded-md text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--hover-bg)] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={16} />
          </motion.button>
          <motion.button
            onClick={() => go(index + 1)}
            disabled={index === PRINT_ON_TOP_SLIDES.length - 1}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="p-2 rounded-md text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--hover-bg)] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowRight size={16} />
          </motion.button>
        </div>
      </footer>
    </div>
  );
}
