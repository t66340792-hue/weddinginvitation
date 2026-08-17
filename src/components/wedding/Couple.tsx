import { motion } from "motion/react";
import { couple, images } from "@/lib/wedding-data";
import { FadeUp, KolamDivider, Section, SectionTitle } from "./Ornaments";

export function Couple() {
  return (
    <Section id="story">
      <SectionTitle kicker="The Couple" script>
        Our Story
      </SectionTitle>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="kolam-frame relative mx-auto mt-10 max-w-3xl overflow-hidden"
      >
        <span className="kolam-frame-inner z-10" aria-hidden />
        <img
          src={images.couple}
          alt="Eswar and Veena illustrated in traditional wedding attire"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </motion.div>

      <FadeUp delay={0.1}>
        <p className="mx-auto mt-10 max-w-2xl text-center text-base leading-relaxed text-[var(--cream)]/90 sm:text-lg">
          Two hearts, one journey, and a lifetime of memories waiting to be created.
        </p>
      </FadeUp>

      <KolamDivider className="mt-10" />

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
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
    </Section>
  );
}