// ─── Site ────────────────────────────────────────────────────────────────────

export const SITE = {
  title: "dre.learnings",
  description: "A personal learning journal — blogs, presentations, and notes.",
};

// ─── Landing ─────────────────────────────────────────────────────────────────

export const HOME_SECTIONS = [
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

// ─── Blogs ───────────────────────────────────────────────────────────────────

export const BLOGS_PAGE = {
  heading: "Blogs",
  empty: "Nothing here yet.",
  placeholder: "Posts will appear here as they're written.",
};

// ─── Presentations list ───────────────────────────────────────────────────────

export const PRESENTATIONS_LIST = [
  {
    slug: "print-on-top",
    title: "Print on Top",
    description:
      "How to implement print-on-tops remotely 101",
    tags: ["Canva", "Claude"],
    date: "Jul 2025",
    slides: 9,
  },
];

// ─── Slide content types ──────────────────────────────────────────────────────

export type TextPart =
  | { t: "text"; v: string }
  | { t: "code"; v: string }
  | { t: "bold"; v: string }
  | { t: "em"; v: string };

export type Block =
  | { type: "text"; text: string }
  | { type: "richText"; parts: TextPart[] }
  | { type: "code"; content: string }
  | { type: "bullets"; items: string[] }
  | { type: "footnote"; text: string };

export type SlideData = {
  tag?: string;
  title: string;
  subtitle?: string;
  blocks?: Block[];
};

// ─── Print on Top slides ──────────────────────────────────────────────────────

export const PRINT_ON_TOP_SLIDES: SlideData[] = [
  {
    tag: "CSS · Print Media",
    title: "Print on Top",
    subtitle:
      "Making content persist across every printed page using CSS — headers, watermarks, page breaks, and the @page rule.",
  },
  {
    tag: "01 / The Problem",
    title: "What breaks in print?",
    blocks: [
      {
        type: "bullets",
        items: [
          "Sticky/fixed headers disappear after the first printed page.",
          "Watermarks and overlays don't repeat the way you'd expect.",
          "Page margins and sizes are browser-controlled by default.",
          "Content breaks mid-sentence across pages without guidance.",
        ],
      },
      {
        type: "footnote",
        text: "CSS gives you precise tools to fix all of this — most developers just don't know they exist.",
      },
    ],
  },
  {
    tag: "02 / Foundation",
    title: "@media print",
    blocks: [
      {
        type: "richText",
        parts: [
          { t: "text", v: "Everything starts here. Styles inside " },
          { t: "code", v: "@media print" },
          { t: "text", v: " only apply when the user triggers a print." },
        ],
      },
      {
        type: "code",
        content: `@media print {
  /* Hide UI chrome */
  nav, .sidebar, button { display: none; }

  /* Adjust typography for paper */
  body { font-size: 11pt; line-height: 1.6; }

  /* Force black text on white */
  * { color: #000 !important; background: transparent !important; }
}`,
      },
      {
        type: "bullets",
        items: [
          "Use pt (points) for font sizes — designed for print.",
          "Strip backgrounds to save ink.",
          "Hide anything interactive or navigational.",
        ],
      },
    ],
  },
  {
    tag: "03 / Key Technique",
    title: "position: fixed in print",
    blocks: [
      {
        type: "richText",
        parts: [
          { t: "text", v: "This is the core insight. In screen context, " },
          { t: "code", v: "position: fixed" },
          { t: "text", v: " anchors to the viewport. In print context, it anchors to the " },
          { t: "em", v: "page" },
          { t: "text", v: " — and " },
          { t: "bold", v: "repeats on every printed page" },
          { t: "text", v: "." },
        ],
      },
      {
        type: "code",
        content: `@media print {
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
}`,
      },
    ],
  },
  {
    tag: "04 / Watermarks",
    title: "Repeating watermarks",
    blocks: [
      {
        type: "richText",
        parts: [
          { t: "text", v: "Combine " },
          { t: "code", v: "position: fixed" },
          { t: "text", v: " with a high z-index and low opacity to stamp a watermark on every page." },
        ],
      },
      {
        type: "code",
        content: `@media print {
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
}`,
      },
      {
        type: "bullets",
        items: [
          "opacity: 0.06–0.1 is readable but not obtrusive.",
          "pointer-events: none keeps it non-interactive on screen.",
          "Add it once in the HTML — it will repeat in print.",
        ],
      },
    ],
  },
  {
    tag: "05 / Page Breaks",
    title: "Controlling where pages break",
    blocks: [
      {
        type: "text",
        text: "Prevent awkward mid-content breaks and force new pages where it makes sense.",
      },
      {
        type: "code",
        content: `/* Force a new page before each section */
.chapter { break-before: page; }

/* Prevent a heading from being orphaned */
h2, h3 { break-after: avoid; }

/* Keep this block together — never split it */
.card, figure, table { break-inside: avoid; }

/* Legacy fallback (older browsers) */
.chapter {
  page-break-before: always;
  break-before: page;
}`,
      },
      {
        type: "bullets",
        items: [
          "break-before / break-after: auto | page | avoid",
          "break-inside: avoid is the most commonly needed rule.",
          "Apply to tables, figures, and code blocks to stop mid-break splits.",
        ],
      },
    ],
  },
  {
    tag: "06 / @page Rule",
    title: "The @page rule",
    blocks: [
      {
        type: "text",
        text: "Control the printed page itself — size, margins, and per-page overrides.",
      },
      {
        type: "code",
        content: `/* Global page settings */
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
@page :right { margin-right: 25mm; }`,
      },
      {
        type: "bullets",
        items: [
          "size accepts A4, letter, landscape, portrait, or exact dimensions.",
          ":first, :left, :right allow per-page overrides.",
          "Large margins prevent content from bleeding to paper edges.",
        ],
      },
    ],
  },
  {
    tag: "07 / Full Example",
    title: "Putting it all together",
    blocks: [
      {
        type: "code",
        content: `@page {
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
}`,
      },
    ],
  },
  {
    tag: "08 / Takeaways",
    title: "Key things to remember",
    blocks: [
      {
        type: "bullets",
        items: [
          "position: fixed in @media print repeats on every page — use it for headers, footers, and watermarks.",
          "break-inside: avoid is the most practical page-break rule; apply it to figures, tables, and cards.",
          "@page controls the page canvas itself — size, margin, and per-page variants.",
          "Use pt units (not px) for print typography. 1pt = 1/72 inch.",
          "Test in Chrome DevTools → More tools → Rendering → Emulate print media.",
          "Print rendering differs slightly across browsers — always test in Firefox and Safari too.",
        ],
      },
    ],
  },
];
