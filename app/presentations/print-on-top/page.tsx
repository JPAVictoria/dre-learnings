"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import PresentationViewer, {
  slideChild,
} from "@/components/PresentationViewer";
import {
  PRINT_ON_TOP_SLIDES,
  PROBLEM_SOLUTION_SLIDE,
  REQUIREMENTS_SLIDE,
  STEP_1_SLIDE,
  STEP_2_SLIDE,
  STEP_3_SLIDE,
  type Block,
  type TextPart,
} from "@/lib/constants";

// ─── Shared slide primitives ─────────────────────────────────────────────────

const Code = ({ children }: { children: string }) => (
  <pre className="bg-(--hover-bg) border border-(--border) rounded-md px-5 py-4 text-sm font-mono text-(--text) overflow-x-auto leading-relaxed whitespace-pre">
    {children}
  </pre>
);

const Bullet = ({ items }: { items: string[] }) => (
  <ul className="space-y-3">
    {items.map((item) => (
      <li
        key={item}
        className="flex items-start gap-3 text-sm text-(--muted) leading-relaxed"
      >
        <span className="mt-1.5 w-1 h-1 rounded-full bg-(--accent) shrink-0" />
        {item}
      </li>
    ))}
  </ul>
);

function renderParts(parts: TextPart[]) {
  return parts.map((p, i) => {
    if (p.t === "code")
      return (
        <code
          key={i}
          className="text-(--text) bg-(--hover-bg) px-1.5 py-0.5 rounded text-xs"
        >
          {p.v}
        </code>
      );
    if (p.t === "bold")
      return (
        <strong key={i} className="text-(--text)">
          {p.v}
        </strong>
      );
    if (p.t === "em") return <em key={i}>{p.v}</em>;
    return <span key={i}>{p.v}</span>;
  });
}

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "text":
      return (
        <p key={i} className="text-sm text-(--muted)">
          {block.text}
        </p>
      );
    case "richText":
      return (
        <p key={i} className="text-sm text-(--muted)">
          {renderParts(block.parts)}
        </p>
      );
    case "code":
      return <Code key={i}>{block.content}</Code>;
    case "bullets":
      return <Bullet key={i} items={block.items} />;
    case "footnote":
      return (
        <p
          key={i}
          className="text-sm text-(--muted) pt-2 border-t border-(--border)"
        >
          {block.text}
        </p>
      );
  }
}

// ─── Title slide ─────────────────────────────────────────────────────────────

const ease = [0.25, 0.1, 0.25, 1] as const;

function TitleSlide() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 min-h-105">
      {/* Left: typography */}
      <div className="flex-1">
        <motion.p
          variants={slideChild}
          className="text-xs text-(--muted) tracking-widest mb-8"
        >
          oboda · Print Workarounds
        </motion.p>

        {/* The key visual: Print / ~~Love~~ on Top */}
        <div className="mb-8 space-y-1">
          {/* "Print" written above, like a handwritten correction */}
          <motion.div
            variants={slideChild}
            className="flex items-center gap-2 pl-1"
          >
            <span
              className="text-2xl font-bold tracking-tight"
              style={{ color: "var(--accent)" }}
            >
              Print
            </span>
          </motion.div>

          {/* ~~Love~~ on Top */}
          <motion.div
            variants={slideChild}
            className="flex items-baseline flex-wrap gap-x-3 gap-y-1"
          >
            {/* Crossed-out Love */}
            <span className="relative inline-block leading-none">
              <span
                className="text-5xl md:text-6xl font-bold"
                style={{ color: "#b34040" }}
              >
                Love
              </span>
              {/* Strikethrough line drawn with motion */}
              <motion.span
                className="absolute left-0 right-0 top-[52%] h-0.75 rounded-full"
                style={{ backgroundColor: "#b34040", originX: 0 }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.55, duration: 0.35, ease }}
              />
            </span>

            <span
              className="text-5xl md:text-6xl font-bold"
              style={{ color: "var(--text)" }}
            >
              on Top
            </span>
          </motion.div>
        </div>

        <motion.p
          variants={slideChild}
          className="text-sm text-(--muted) leading-relaxed max-w-xs"
        >
          Skip the on-site visit. A step-by-step guide to implementing
          print-on-tops remotely using Canva, Claude and Patience!
        </motion.p>
      </div>

      {/* Right: Beyoncé */}
      <motion.div
        variants={slideChild}
        className="relative w-45 md:w-55 h-65 md:h-80 shrink-0 self-end"
      >
        <Image
          src="/beyonce.png"
          alt="Beyoncé — Love on Top"
          fill
          sizes="(min-width: 768px) 220px, 180px"
          className="object-cover object-top"
          priority
        />
      </motion.div>
    </div>
  );
}

// ─── Problem / Solution slide ─────────────────────────────────────────────────

function ProblemSolutionSlide() {
  const { tag, problem, solution } = PROBLEM_SOLUTION_SLIDE;
  return (
    <div className="space-y-8">
      <motion.p variants={slideChild} className="text-xs text-(--muted) tracking-widest uppercase">
        {tag}
      </motion.p>

      <motion.div variants={slideChild} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Problem */}
        <div className="space-y-4">
          <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#b34040" }}>
            {problem.heading}
          </p>
          <ul className="space-y-3">
            {problem.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-(--muted) leading-relaxed">
                <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: "#b34040" }} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Solution */}
        <div className="space-y-4">
          <p className="text-xs font-semibold text-(--accent) tracking-widest uppercase">
            {solution.heading}
          </p>
          <ul className="space-y-3">
            {solution.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-(--muted) leading-relaxed">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-(--accent) shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Requirements slide ───────────────────────────────────────────────────────

function RequirementsSlide() {
  const { tag, title, you, client } = REQUIREMENTS_SLIDE;
  return (
    <div className="space-y-8">
      <motion.p variants={slideChild} className="text-xs text-(--muted) tracking-widest uppercase">
        {tag}
      </motion.p>

      <motion.h1 variants={slideChild} className="text-3xl md:text-4xl font-semibold tracking-tight leading-snug">
        {title}
      </motion.h1>

      <motion.div variants={slideChild} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Your toolkit */}
        <div className="space-y-4">
          <p className="text-xs font-semibold text-(--text) tracking-widest uppercase opacity-60">
            {you.heading}
          </p>
          <ul className="space-y-3">
            {you.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-(--muted) leading-relaxed">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-(--accent) shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* From client */}
        <div className="space-y-4">
          <p className="text-xs font-semibold text-(--text) tracking-widest uppercase opacity-60">
            {client.heading}
          </p>
          <ul className="space-y-3">
            {client.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-(--muted) leading-relaxed">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-(--accent) shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Step 1 slide ─────────────────────────────────────────────────────────────

function Step1Slide() {
  const { tag, title, subtitle, videoSrc, steps } = STEP_1_SLIDE;
  return (
    <div className="space-y-5">
      <motion.p variants={slideChild} className="text-xs text-(--muted) tracking-widest uppercase">
        {tag}
      </motion.p>

      <div>
        <motion.h1 variants={slideChild} className="text-3xl md:text-4xl font-semibold tracking-tight leading-snug">
          {title}
        </motion.h1>
        <motion.p variants={slideChild} className="text-sm text-(--muted) mt-1">
          {subtitle}
        </motion.p>
      </div>

      <motion.div variants={slideChild} className="space-y-4">
        {/* Video */}
        <div className="rounded-xl overflow-hidden bg-black border border-(--border)">
          <video
            src={videoSrc}
            className="w-full max-h-52 object-contain"
            controls
            playsInline
            muted
          />
        </div>

        {/* Steps — two columns */}
        <ol className="flex flex-col gap-2.5">
          {steps.map((step, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-(--muted) leading-snug">
              <span className="shrink-0 w-5 h-5 rounded-full bg-(--hover-bg) border border-(--border) text-(--accent) text-[10px] font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </motion.div>
    </div>
  );
}

// ─── Terminal component ───────────────────────────────────────────────────────

function Terminal({ prompt }: { prompt: string }) {
  return (
    <div className="rounded-lg overflow-hidden text-sm font-mono" style={{ background: "#0d1117" }}>
      {/* Title bar */}
      <div className="flex items-center gap-1.5 px-4 py-2.5" style={{ background: "#161b22" }}>
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c841" }} />
        <span className="ml-3 text-xs" style={{ color: "#8b949e" }}>claude</span>
      </div>
      {/* Body */}
      <div className="px-5 py-4 space-y-1">
        <div className="flex gap-2" style={{ color: "#e6edf3" }}>
          <span style={{ color: "#28c841" }}>you@claude</span>
          <span style={{ color: "#8b949e" }}>~</span>
          <span style={{ color: "#8b949e" }}>$</span>
          <span className="flex-1">{prompt}</span>
        </div>
        {/* Blinking cursor */}
        <div className="flex gap-2">
          <span style={{ color: "#28c841" }}>claude</span>
          <span style={{ color: "#8b949e" }}>~</span>
          <span style={{ color: "#8b949e" }}>$</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
            style={{ color: "#e6edf3" }}
          >
            ▋
          </motion.span>
        </div>
      </div>
    </div>
  );
}

// ─── Step 2 slide ─────────────────────────────────────────────────────────────

function Step2Slide() {
  const { tag, title, subtitle, prompt, caption, note } = STEP_2_SLIDE;
  return (
    <div className="space-y-5">
      <motion.p variants={slideChild} className="text-xs text-(--muted) tracking-widest uppercase">
        {tag}
      </motion.p>

      <div>
        <motion.h1 variants={slideChild} className="text-3xl md:text-4xl font-semibold tracking-tight leading-snug">
          {title}
        </motion.h1>
        <motion.p variants={slideChild} className="text-sm text-(--muted) mt-1">
          {subtitle}
        </motion.p>
      </div>

      <motion.div variants={slideChild}>
        <Terminal prompt={prompt} />
      </motion.div>

      {/* Caption */}
      <motion.p variants={slideChild} className="text-sm text-(--muted) leading-relaxed">
        {caption}
      </motion.p>

      {/* Note */}
      <motion.div
        variants={slideChild}
        className="flex gap-3 pl-3 border-l-2"
        style={{ borderColor: "var(--accent)" }}
      >
        <div>
          <p className="text-xs font-semibold text-(--accent) uppercase tracking-wider mb-0.5">Note</p>
          <p className="text-xs text-(--muted) leading-relaxed italic">{note}</p>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Step 3 slide ─────────────────────────────────────────────────────────────

function Step3Slide() {
  const { tag, title, subtitle, videoSrc, steps } = STEP_3_SLIDE;
  return (
    <div className="space-y-5">
      <motion.p variants={slideChild} className="text-xs text-(--muted) tracking-widest uppercase">
        {tag}
      </motion.p>

      <div>
        <motion.h1 variants={slideChild} className="text-3xl md:text-4xl font-semibold tracking-tight leading-snug">
          {title}
        </motion.h1>
        <motion.p variants={slideChild} className="text-sm text-(--muted) mt-1">
          {subtitle}
        </motion.p>
      </div>

      <motion.div variants={slideChild} className="space-y-4">
        <div className="rounded-xl overflow-hidden bg-black border border-(--border)">
          <video
            src={videoSrc}
            className="w-full max-h-52 object-contain"
            controls
            playsInline
            muted
          />
        </div>

        <ol className="flex flex-col gap-2.5">
          {steps.map((step, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-(--muted) leading-snug">
              <span className="shrink-0 w-5 h-5 rounded-full bg-(--hover-bg) border border-(--border) text-(--accent) text-[10px] font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </motion.div>
    </div>
  );
}

// ─── Content slides (from constants) ─────────────────────────────────────────

function ContentSlide({
  slide,
}: {
  slide: (typeof PRINT_ON_TOP_SLIDES)[number];
}) {
  return (
    <div className="space-y-6">
      {slide.tag && (
        <motion.p
          variants={slideChild}
          className="text-xs text-(--muted) tracking-widest uppercase"
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
          className="text-(--muted) text-base leading-relaxed max-w-lg"
        >
          {slide.subtitle}
        </motion.p>
      )}
      {slide.blocks && (
        <motion.div variants={slideChild} className="space-y-4">
          {slide.blocks.map((block, i) => renderBlock(block, i))}
        </motion.div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const slides: React.ReactNode[] = [
  <TitleSlide key="title" />,
  <ProblemSolutionSlide key="problem" />,
  <RequirementsSlide key="requirements" />,
  <Step1Slide key="step1" />,
  <Step2Slide key="step2" />,
  <Step3Slide key="step3" />,
  ...PRINT_ON_TOP_SLIDES.slice(1).map((slide, i) => (
    <ContentSlide key={`css-${i}`} slide={slide} />
  )),
];

export default function PrintOnTop() {
  return <PresentationViewer slides={slides} />;
}
