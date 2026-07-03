import type { Metadata } from "next";
import Link from "next/link";
import { GOLD, INK, IVORY, MUTED, SAGE, serif } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div
      className="pt-[88px] min-h-screen flex flex-col items-center justify-center text-center px-5"
      style={{ background: IVORY }}
    >
      <p
        style={{
          fontSize: "0.68rem",
          letterSpacing: "0.28em",
          color: GOLD,
          textTransform: "uppercase",
          marginBottom: "0.75rem",
        }}
      >
        404
      </p>
      <h1
        style={{
          fontFamily: serif,
          fontSize: "clamp(2.4rem, 6vw, 4rem)",
          fontWeight: 500,
          color: INK,
          marginBottom: "1rem",
        }}
      >
        Page not found.
      </h1>
      <p
        style={{
          color: MUTED,
          fontSize: "1rem",
          marginBottom: "2.5rem",
          maxWidth: "380px",
          lineHeight: 1.75,
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist — but there are plenty of beautiful flowers waiting for you.
      </p>
      <Link
        href="/"
        className="px-8 py-4 text-base font-semibold hover:opacity-85 transition-opacity"
        style={{ background: SAGE, color: "#fff", letterSpacing: "0.08em" }}
      >
        Back to Home
      </Link>
    </div>
  );
}
