"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";

type Slide = {
  tag?: string;
  title: string;
  subtitle?: string;
  body?: React.ReactNode;
};

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

const slides: Slide[] = [
  {
    tag: "CSS · Print Media",
    title: "Print on Top",
    subtitle:
      "Making content persist across every printed page using CSS — headers, watermarks, page breaks, and the @page rule.",
  },
  {
    tag: "01 / The Problem",
    title: "What breaks in print?",
    body: (
      <div className="space-y-6">
        <Bullet
          items={[
            "Sticky/fixed headers disappear after the first printed page.",
            "Watermarks and overlays don't repeat the way you'd expect.",
            "Page margins and sizes are browser-controlled by default.",
            "Content breaks mid-sentence across pages without guidance.",
          ]}
        />
        <p className="text-sm text-[var(--muted)] pt-2 border-t border-[var(--border)]">
          CSS gives you precise tools to fix all of this — most developers just don't know they exist.
        </p>
      </div>
    ),
  },
  {
    tag: "02 / Foundation",
    title: "@media print",
    body: (
      <div className="space-y-4">
        <p className="text-sm text-[var(--muted)]">
          Everything starts here. Styles inside{" "}
          <code className="text-[var(--text)] bg-[var(--hover-bg)] px-1.5 py-0.5 rounded text-xs">
            @media print
          </code>{" "}
          only apply when the user triggers a print.
        </p>
        <Code>{`@media print {
  /* Hide UI chrome */
  nav, .sidebar, button { display: none; }

  /* Adjust typography for paper */
  body { font-size: 11pt; line-height: 1.6; }

  /* Force black text on white */
  * { color: #000 !important; background: transparent !important; }
}`}</Code>
        <Bullet
          items={[
            "Use pt (points) for font sizes — designed for print.",
            "Strip backgrounds to save ink.",
            "Hide anything interactive or navigational.",
          ]}
        />
      </div>
    ),
  },
  {
    tag: "03 / Key Technique",
    title: "position: fixed in print",
    body: (
      <div className="space-y-4">
        <p className="text-sm text-[var(--muted)]">
          This is the core insight. In screen context,{" "}
          <code className="text-[var(--text)] bg-[var(--hover-bg)] px-1.5 py-0.5 rounded text-xs">
            position: fixed
          </code>{" "}
          anchors to the viewport. In print context, it anchors to the{" "}
          <em>page</em> — and{" "}
          <strong className="text-[var(--text)]">repeats on every printed page</strong>.
        </p>
        <Code>{`@media print {
  .page-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    border-bottom: 1px solid #ddd;
    font-size: 9pt;
    display: flex;
    align-items: center;
    padding: 0 20px;
  }

  /* Push body content below the fixed header */
  body { margin-top: 50px; }
}`}</Code>
      </div>
    ),
  },
  {
    tag: "04 / Watermarks",
    title: "Repeating watermarks",
    body: (
      <div className="space-y-4">
        <p className="text-sm text-[var(--muted)]">
          Combine{" "}
          <code className="text-[var(--text)] bg-[var(--hover-bg)] px-1.5 py-0.5 rounded text-xs">
            position: fixed
          </code>{" "}
          with a high z-index and low opacity to stamp a watermark on every page.
        </p>
        <Code>{`@media print {
  .watermark {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    font-size: 72pt;
    font-weight: 700;
    color: #000;
    opacity: 0.06;
    z-index: 9999;
    pointer-events: none;
    user-select: none;
  }
}`}</Code>
        <Bullet
          items={[
            "opacity: 0.06–0.1 is readable but not obtrusive.",
            "pointer-events: none keeps it non-interactive on screen.",
            "Add it once in the HTML — it will repeat in print.",
          ]}
        />
      </div>
    ),
  },
  {
    tag: "05 / Page Breaks",
    title: "Controlling where pages break",
    body: (
      <div className="space-y-4">
        <p className="text-sm text-[var(--muted)]">
          Prevent awkward mid-content breaks and force new pages where it makes sense.
        </p>
        <Code>{`/* Force a new page before each section */
.chapter { break-before: page; }

/* Prevent a heading from being orphaned */
h2, h3 { break-after: avoid; }

/* Keep this block together — never split it */
.card, figure, table { break-inside: avoid; }

/* Legacy fallback (older browsers) */
.chapter {
  page-break-before: always;
  break-before: page;
}`}</Code>
        <Bullet
          items={[
            "break-before / break-after: auto | page | avoid",
            "break-inside: avoid is the most commonly needed rule.",
            "Apply to tables, figures, and code blocks to stop mid-break splits.",
          ]}
        />
      </div>
    ),
  },
  {
    tag: "06 / @page Rule",
    title: "The @page rule",
    body: (
      <div className="space-y-4">
        <p className="text-sm text-[var(--muted)]">
          Control the printed page itself — size, margins, and per-page overrides.
        </p>
        <Code>{`/* Global page settings */
@page {
  size: A4 portrait;
  margin: 20mm 15mm;
}

/* First page gets extra top margin for a title block */
@page :first {
  margin-top: 50mm;
}

/* Left/right pages (for booklets) */
@page :left  { margin-left: 25mm; }
@page :right { margin-right: 25mm; }`}</Code>
        <Bullet
          items={[
            "size accepts A4, letter, landscape, portrait, or exact dimensions.",
            ":first, :left, :right allow per-page overrides.",
            "Large margins prevent content from bleeding to paper edges.",
          ]}
        />
      </div>
    ),
  },
  {
    tag: "07 / Full Example",
    title: "Putting it all together",
    body: (
      <div className="space-y-4">
        <Code>{`@page {
  size: A4 portrait;
  margin: 25mm 20mm 20mm;
}

@media print {
  /* Repeating header on every page */
  .doc-header {
    position: fixed;
    top: 0; left: 0; right: 0;
    height: 36px;
    border-bottom: 1pt solid #ccc;
    font-size: 8pt;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }

  /* Watermark */
  .watermark {
    position: fixed;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    font-size: 64pt;
    opacity: 0.06;
    z-index: 9999;
    pointer-events: none;
  }

  body    { margin-top: 46px; font-size: 11pt; }
  section { break-before: page; }
  figure  { break-inside: avoid; }
  nav, .no-print { display: none; }
}`}</Code>
      </div>
    ),
  },
  {
    tag: "08 / Takeaways",
    title: "Key things to remember",
    body: (
      <div className="space-y-6">
        <Bullet
          items={[
            "position: fixed in @media print repeats on every page — use it for headers, footers, and watermarks.",
            "break-inside: avoid is the most practical page-break rule; apply it to figures, tables, and cards.",
            "@page controls the page canvas itself — size, margin, and per-page variants.",
            "Use pt units (not px) for print typography. 1pt = 1/72 inch.",
            "Test in Chrome DevTools → More tools → Rendering → Emulate print media.",
            "Print rendering differs slightly across browsers — always test in Firefox and Safari too.",
          ]}
        />
      </div>
    ),
  },
];

const ease = [0.25, 0.1, 0.25, 1] as const;

const easeIn = [0.55, 0, 1, 0.45] as const;

// Slide container: translates + staggerChildren
const slideContainer: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 50 : -50 }),
  center: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.38,
      ease,
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -50 : 50,
    transition: { duration: 0.22, ease: easeIn },
  }),
};

// Each child inside the slide fades up
const slideChild: Variants = {
  enter: { opacity: 0, y: 14 },
  center: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
  exit: { opacity: 0, transition: { duration: 0.12 } },
};

export default function PrintOnTop() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next: number) => {
    setDir(next > index ? 1 : -1);
    setIndex(next);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && index < slides.length - 1) go(index + 1);
      if (e.key === "ArrowLeft" && index > 0) go(index - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [index]);

  const slide = slides[index];
  const progress = (index + 1) / slides.length;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      {/* Animated progress bar */}
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

        {/* Animated slide counter */}
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
              className="space-y-6"
            >
              {slide.tag && (
                <motion.p
                  variants={slideChild}
                  className="text-xs text-[var(--muted)] tracking-widest uppercase"
                >
                  {slide.tag}
                </motion.p>
              )}

              <motion.h1
                variants={slideChild}
                className="text-3xl md:text-4xl font-semibold tracking-tight leading-snug"
              >
                {slide.title}
              </motion.h1>

              {slide.subtitle && (
                <motion.p
                  variants={slideChild}
                  className="text-[var(--muted)] text-base leading-relaxed max-w-lg"
                >
                  {slide.subtitle}
                </motion.p>
              )}

              {slide.body && (
                <motion.div variants={slideChild}>{slide.body}</motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <footer className="flex items-center justify-between px-8 py-5 border-t border-[var(--border)]">
        {/* Morphing dot indicators */}
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => go(i)}
              animate={{
                width: i === index ? 16 : 6,
                backgroundColor:
                  i === index ? "var(--accent)" : "var(--border)",
              }}
              whileHover={{
                backgroundColor:
                  i === index ? "var(--accent)" : "var(--muted)",
              }}
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
            disabled={index === slides.length - 1}
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
