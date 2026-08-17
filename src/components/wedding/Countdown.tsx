import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { weddingDateISO } from "@/lib/wedding-data";
import { Section, SectionTitle } from "./Ornaments";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    done: ms === 0,
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  const text = String(value).padStart(2, "0");
  return (
    <div className="card-invite flex min-w-[4.5rem] flex-col items-center px-4 py-5 sm:min-w-[7rem] sm:px-7 sm:py-7">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.35 }}
          className="font-display text-3xl text-[var(--cream)] tabular-nums sm:text-5xl"
        >
          {text}
        </motion.span>
      </AnimatePresence>
      <span className="font-display mt-2 text-[0.6rem] tracking-[0.3em] text-[var(--blush)] uppercase sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export function Countdown() {
  const target = new Date(weddingDateISO).getTime();
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <Section id="countdown">
      <SectionTitle kicker="26 August 2026" script>
        Muhurtham
      </SectionTitle>

      {t.done ? (
        <p className="font-script mt-10 text-center text-4xl text-[var(--cream)] sm:text-6xl">
          The day has arrived! ❤️
        </p>
      ) : (
        <div className="mx-auto mt-10 grid max-w-xs grid-cols-2 gap-3 sm:max-w-none sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-5">
          <Unit value={t.days} label="Days" />
          <Unit value={t.hours} label="Hours" />
          <Unit value={t.minutes} label="Minutes" />
          <Unit value={t.seconds} label="Seconds" />
        </div>
      )}
    </Section>
  );
}