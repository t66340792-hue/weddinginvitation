import { motion } from "motion/react";
import { couple, images, mobileImages, tabletImages } from "@/lib/wedding-data";
import { FadeUp, KolamDivider, Section, SectionTitle } from "./Ornaments";

export function Couple() {
  return (
    <section id="story" className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto w-full overflow-hidden"
      >
        <picture className="flex h-screen w-full justify-center">
          <source media="(max-width: 1024px)" srcSet={mobileImages.family} />
          <img
            src={tabletImages.family}
            alt="Eswar and Veena illustrated in traditional wedding attire"
            loading="lazy"
            className="h-screen w-full object-fill"
          />
        </picture>
      </motion.div>

      <FadeUp delay={0.1} className="mx-auto w-full max-w-5xl px-4 sm:px-6">
      </FadeUp>

      <KolamDivider className="mt-10" />

      <div className="mx-auto mt-10 grid w-full max-w-5xl gap-6 px-4 sm:grid-cols-2 sm:px-6">
        <FadeUp>
          <div className="card-invite h-full px-6 py-8 text-center">
            <p className="font-display text-xs tracking-[0.35em] text-[var(--blush)] uppercase">Chi.</p>
            <h3 className="font-script mt-2 text-4xl text-[var(--cream)]">{couple.groom}</h3>
            {couple.groomParents.map((p) => (
              <p key={p} className="font-display mt-1 text-sm text-[var(--cream)]/85">
                {p}
              </p>
            ))}
          </div>
        </FadeUp>
        <FadeUp delay={0.12}>
          <div className="card-invite h-full px-6 py-8 text-center">
            <p className="font-display text-xs tracking-[0.35em] text-[var(--blush)] uppercase">
              Chi. La. Sow.
            </p>
            <h3 className="font-script mt-2 text-4xl text-[var(--cream)]">{couple.bride}</h3>
            {couple.brideParents.map((p) => (
              <p key={p} className="font-display mt-1 text-sm text-[var(--cream)]/85">
                {p}
              </p>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}