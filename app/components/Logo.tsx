import { INK, GOLD, serif, sans } from "@/lib/constants";

interface LogoProps {
  h?: string;
}

export function Logo({ h = "50px" }: LogoProps) {
  return (
    <div style={{ height: h, display: "flex", alignItems: "center" }}>
      <span
        style={{
          fontFamily: serif,
          fontSize: "1.3rem",
          fontWeight: 600,
          color: INK,
          letterSpacing: "0.04em",
          lineHeight: 1,
        }}
      >
        AFUVAI
        <span
          style={{
            display: "block",
            fontSize: "0.55rem",
            letterSpacing: "0.28em",
            color: GOLD,
            textTransform: "uppercase",
            fontWeight: 400,
            fontFamily: sans,
          }}
        >
          Floral Society
        </span>
      </span>
    </div>
  );
}
