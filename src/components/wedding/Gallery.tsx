import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { images } from "@/lib/wedding-data";
import { FadeUp, Section, SectionTitle } from "./Ornaments";

const items = [
  { src: images.family, alt: "Invitation card with the families of Eswar and Veena" },
  { src: images.haldi, alt: "Haldi ceremony invitation card" },
  { src: images.sangeeth, alt: "Sangeeth invitation card" },
  { src: images.wedding, alt: "Wedding invitation card" },
  { src: images.couple, alt: "Illustrated portrait of Eswar and Veena" },
];

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <Section id="gallery">
      <SectionTitle kicker="Moments" script>
        Gallery
      </SectionTitle>

      <div className="mt-12 columns-2 gap-4 sm:columns-3 [&>*]:mb-4">
        {items.map((item, i) => (
          <FadeUp key={item.src} delay={(i % 3) * 0.08}>
            <button
              onClick={() => setActive(i)}
              className="kolam-frame group relative block w-full overflow-hidden"
              aria-label={`Open image: ${item.alt}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="w-full transition-transform duration-700 group-hover:scale-[1.05]"
              />
              <span className="absolute inset-0 bg-[var(--olive)]/0 transition-colors duration-500 group-hover:bg-[var(--olive)]/25" />
            </button>
          </FadeUp>
        ))}
        <div className="kolam-frame flex aspect-3/4 items-center justify-center px-4 text-center">
          <p className="font-display text-xs tracking-[0.25em] text-[var(--cream)]/70 uppercase">
            More photographs
            <br />
            coming soon
          </p>
        </div>
      </div>

      <AnimatePresence>
        {active !== null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex items-center justify-center bg-[var(--olive)]/90 p-4"
            onClick={() => setActive(null)}
          >
            <button
              className="absolute top-5 right-5 text-[var(--cream)]"
              aria-label="Close image"
              onClick={() => setActive(null)}
            >
              <X size={26} />
            </button>
            <motion.img
              key={active}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.4 }}
              src={items[active]!.src}
              alt={items[active]!.alt}
              className="max-h-[88vh] max-w-full rounded-md object-contain"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Section>
  );
}