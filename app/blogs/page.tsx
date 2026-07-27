"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { BLOGS_PAGE } from "@/lib/constants";

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};

export default function Blogs() {
  return (
    <motion.main
      className="min-h-screen px-10 md:px-16 py-12"
      initial="hidden"
      animate="visible"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
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

      <motion.h1 variants={fadeUp} className="text-4xl font-semibold tracking-tight mb-3">
        {BLOGS_PAGE.heading}
      </motion.h1>

      <motion.p variants={fadeUp} className="text-[var(--muted)] text-sm mb-16">
        {BLOGS_PAGE.empty}
      </motion.p>

      <motion.div
        variants={fadeUp}
        className="border-t border-[var(--border)] pt-10 text-[var(--muted)] text-sm"
      >
        {BLOGS_PAGE.placeholder}
      </motion.div>
    </motion.main>
  );
}
