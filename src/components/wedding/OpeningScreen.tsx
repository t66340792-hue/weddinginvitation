import { motion } from "motion/react";
import { couple } from "@/lib/wedding-data";
import { KolamDivider } from "./Ornaments";

export function OpeningScreen({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.div
      className="floral-field fixed inset-0 z-50 flex items-center justify-center px-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.06 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="kolam-frame relative w-full max-w-md px-6 py-14 text-center sm:px-10 sm:py-20">
        <span className="kolam-frame-inner" aria-hidden />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-display text-xs tracking-[0.45em] text-[var(--blush)] uppercase"
        >
          Wedding Invitation
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 1 }}
          className="font-script mt-6 text-5xl leading-tight text-[var(--cream)] sm:text-6xl"
        >
          {couple.shortGroom} <span className="text-[var(--blush)]">&</span> {couple.shortBride}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="font-display mt-2 text-lg tracking-[0.25em] text-[var(--blush)]"
        >
          {couple.hashtag}
        </motion.p>

        <KolamDivider className="mt-6" />

        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          onClick={onOpen}
          className="font-display mt-8 inline-flex items-center justify-center rounded-full border border-[var(--blush)]/70 bg-[var(--cream)]/10 px-8 py-3 text-sm tracking-[0.25em] text-[var(--cream)] uppercase transition-all duration-300 hover:scale-105 hover:bg-[var(--cream)]/20 hover:shadow-[0_0_30px_-8px_var(--gold)]"
        >
          Open Invitation
        </motion.button>
      </div>
    </motion.div>
  );
}