import { motion } from "motion/react";
import type { ReactNode } from "react";

export function KolamDivider({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-16 bg-[var(--blush)]/60 sm:w-24" />
      <svg width="54" height="18" viewBox="0 0 54 18" fill="none" className="text-[var(--blush)]">
        <path
          d="M2 9c6-8 12-8 18 0s12 8 18 0 12-8 14 0"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          opacity="0.9"
        />
        <circle cx="27" cy="9" r="2.4" fill="currentColor" />
      </svg>
      <span className="h-px w-16 bg-[var(--blush)]/60 sm:w-24" />
    </div>
  );
}

export function SectionTitle({
  script,
  children,
  kicker,
}: {
  script?: boolean;
  children: ReactNode;
  kicker?: string;
}) {
  return (
    <div className="text-center">
      {kicker ? (
        <p className="font-display text-xs tracking-[0.4em] text-[var(--blush)] uppercase">{kicker}</p>
      ) : null}
      <h2
        className={
          script
            ? "font-script mt-3 text-4xl text-[var(--cream)] sm:text-6xl"
            : "font-display mt-3 text-3xl font-light tracking-wide text-[var(--cream)] sm:text-5xl"
        }
      >
        {children}
      </h2>
      <KolamDivider className="mt-4" />
    </div>
  );
}

export function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </section>
  );
}