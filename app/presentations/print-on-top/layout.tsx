import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Print on Top — dre.learnings",
  description:
    "Skip the on-site visit. A step-by-step guide to implementing print-on-tops remotely using Canva and Claude.",
  openGraph: {
    title: "Print on Top",
    description:
      "Skip the on-site visit. A step-by-step guide to implementing print-on-tops remotely using Canva and Claude.",
    url: "https://dre-learnings.vercel.app/presentations/print-on-top",
    siteName: "dre.learnings",
    images: [
      {
        url: "/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Print on Top — final output",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Print on Top",
    description:
      "Skip the on-site visit. A step-by-step guide to implementing print-on-tops remotely using Canva and Claude.",
    images: ["/thumbnail.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
