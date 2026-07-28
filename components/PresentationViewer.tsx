"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";

interface PresentationViewerProps {
  slides: React.ReactNode[];
  backHref?: string;
  backLabel?: string;
}

const ease = [0.25, 0.1, 0.25, 1] as const;
const easeIn = [0.55, 0, 1, 0.45] as const;

const slideContainer: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease, staggerChildren: 0.07, delayChildren: 0.05 },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -60 : 60,
    transition: { duration: 0.25, ease: easeIn },
  }),
};

export const slideChild: Variants = {
  enter: { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
  exit: { opacity: 0, transition: { duration: 0.12 } },
};

export default function PresentationViewer({
  slides,
  backHref = "/presentations",
  backLabel = "Presentations",
}: PresentationViewerProps) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(next, slides.length - 1));
      setDir(clamped > index ? 1 : -1);
      setIndex(clamped);
    },
    [index, slides.length],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(index + 1);
      if (e.key === "ArrowLeft") go(index - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go, index]);

  const progress = (index + 1) / slides.length;

  return (
    <div className="min-h-screen flex flex-col bg-(--bg)">
      {/* Progress bar */}
      <div className="relative h-0.5 w-full bg-(--border)">
        <motion.div
          className="absolute left-0 top-0 h-full bg-(--accent)"
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.4, ease }}
        />
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm text-(--muted) hover:text-(--text) transition-colors duration-200"
        >
          <ChevronLeft size={14} />
          {backLabel}
        </Link>

        <div className="overflow-hidden h-4 flex items-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={index}
              initial={{ y: dir > 0 ? 10 : -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: dir > 0 ? -10 : 10, opacity: 0 }}
              transition={{ duration: 0.2, ease }}
              className="text-xs text-(--muted) block"
            >
              {index + 1} / {slides.length}
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
            >
              {slides[index]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex items-center justify-between px-8 py-5">
        {/* Back to start — only on last slide */}
        <div className="w-32">
          <AnimatePresence>
            {index === slides.length - 1 && (
              <motion.button
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                onClick={() => go(0)}
                className="text-xs text-(--muted) hover:text-(--text) transition-colors duration-150 flex items-center gap-1.5"
              >
                <ArrowLeft size={12} />
                Back to start
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom-right arrows */}
        <div className="flex items-center gap-1">
          <motion.button
            onClick={() => go(index - 1)}
            disabled={index === 0}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.88 }}
            transition={{ duration: 0.12 }}
            className="p-2.5 rounded-lg text-(--muted) hover:text-(--text) hover:bg-(--hover-bg) disabled:opacity-25 disabled:cursor-not-allowed transition-colors duration-150"
          >
            <ArrowLeft size={16} />
          </motion.button>
          <motion.button
            onClick={() => go(index + 1)}
            disabled={index === slides.length - 1}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.88 }}
            transition={{ duration: 0.12 }}
            className="p-2.5 rounded-lg text-(--muted) hover:text-(--text) hover:bg-(--hover-bg) disabled:opacity-25 disabled:cursor-not-allowed transition-colors duration-150"
          >
            <ArrowRight size={16} />
          </motion.button>
        </div>
      </footer>
    </div>
  );
}
