import { motion } from "motion/react";
import { couple, images } from "@/lib/wedding-data";
import { KolamDivider } from "./Ornaments";

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pt-24 pb-16">
      <motion.img
        src={images.couple}
        alt="Illustrated portrait of Eswar and Veena in traditional wedding attire"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35"
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.35 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 bg-[var(--sage)]/55" aria-hidden />

      <div className="relative z-10 w-full max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9 }}
          className="font-display text-[0.7rem] tracking-[0.45em] text-[var(--blush)] uppercase sm:text-xs"
        >
          Together with our families
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.1 }}
          className="font-script mt-5 text-6xl leading-[1.05] text-[var(--cream)] drop-shadow-[0_6px_24px_rgba(0,0,0,0.25)] sm:text-8xl"
        >
          {couple.shortGroom} <span className="text-[var(--blush)]">&</span> {couple.shortBride}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.9 }}
          className="font-display mt-3 text-base tracking-[0.35em] text-[var(--blush)] sm:text-lg"
        >
          {couple.hashtag}
        </motion.p>

        <KolamDivider className="mt-7" />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="mx-auto mt-7 max-w-xl text-sm leading-relaxed text-[var(--cream)]/90 sm:text-lg"
        >
          Together with our families, we invite you to celebrate the beginning of our forever.
        </motion.p>

        <motion.a
          href="#rsvp"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="font-display mt-9 inline-flex rounded-full border border-[var(--blush)]/70 px-8 py-3 text-xs tracking-[0.3em] text-[var(--cream)] uppercase transition-all duration-300 hover:scale-105 hover:bg-[var(--cream)]/15 hover:shadow-[0_0_30px_-8px_var(--gold)]"
        >
          RSVP
        </motion.a>
      </div>
    </section>
  );
}