import { GOLD, GOLD_L, INK, IVORY, serif } from "@/lib/constants";

interface SectionHeadProps {
  label: string;
  heading: React.ReactNode;
  center?: boolean;
  light?: boolean;
}

export function SectionHead({ label, heading, center = false, light = false }: SectionHeadProps) {
  return (
    <div className={center ? "text-center" : ""}>
      <p
        style={{
          fontSize: "0.7rem",
          letterSpacing: "0.28em",
          color: light ? GOLD_L : GOLD,
          textTransform: "uppercase",
          marginBottom: "0.75rem",
        }}
      >
        {label}
      </p>
      <h2
        style={{
          fontFamily: serif,
          fontSize: "clamp(2rem, 4vw, 2.8rem)",
          fontWeight: 500,
          color: light ? IVORY : INK,
          lineHeight: 1.12,
        }}
      >
        {heading}
      </h2>
    </div>
  );
}
