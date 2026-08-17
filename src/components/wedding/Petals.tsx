import { useEffect, useState } from "react";

type Petal = { left: number; delay: number; duration: number; size: number; drift: number; kind: number };

export function Petals({ count = 18 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 640;
    if (reduced) return;
    const n = small ? Math.round(count / 2) : count;
    setPetals(
      Array.from({ length: n }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 18,
        duration: 16 + Math.random() * 16,
        size: 6 + Math.random() * 8,
        drift: (Math.random() - 0.5) * 160,
        kind: i % 3,
      })),
    );
  }, [count]);

  const colors = ["var(--blush)", "var(--cream)", "var(--gold)"];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute top-0 block opacity-70"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.4,
            background: colors[p.kind],
            borderRadius: "60% 0 60% 0",
            ["--drift" as string]: `${p.drift}px`,
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}