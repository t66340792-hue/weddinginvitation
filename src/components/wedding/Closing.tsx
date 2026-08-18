import { couple } from "@/lib/wedding-data";
import { FadeUp, KolamDivider, Section } from "./Ornaments";

export function Closing() {
  return (
    <Section id="closing" className="pb-32">
      <FadeUp>
        <div className="kolam-frame relative px-6 py-16 text-center sm:px-12">
          <span className="kolam-frame-inner" aria-hidden />
          <h2 className="font-script text-5xl text-[var(--cream)] sm:text-7xl">
            {couple.shortGroom} <span className="text-[var(--blush)]">&</span> {couple.shortBride}
          </h2>
          <KolamDivider className="mt-6" />
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[var(--cream)]/90 sm:text-base">
            Thank you for being a part of our journey. We can't wait to celebrate these beautiful
            moments with you.
          </p>
          <p className="font-script mt-6 text-3xl text-[var(--gold)]">With Love ❤️</p>
          <div className="mt-8 text-xs tracking-widest text-[var(--cream)]/60">
            @weddingprashantharts
          </div>
        </div>
      </FadeUp>
    </Section>
  );
}