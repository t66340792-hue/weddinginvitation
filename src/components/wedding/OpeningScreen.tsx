import { motion } from "motion/react";
import { images, mobileImages, tabletImages } from "@/lib/wedding-data";

export function OpeningScreen({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.div
      className="floral-field fixed inset-0 z-50 flex items-center justify-center bg-[var(--olive)]"
      initial={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
        <picture className="h-full w-full">
          <source media="(max-width: 1024px)" srcSet={mobileImages.couple} />
          <img
            src={tabletImages.couple}
            alt="Wedding Invitation Cover"
            className="h-full w-full object-fill"
          />
        </picture>

        <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center pb-8 pt-32 bg-gradient-to-t from-[var(--olive)]/95 via-[var(--olive)]/50 to-transparent sm:pb-12">
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            onClick={() => {
              const audio = document.getElementById("wedding-audio") as HTMLAudioElement | null;
              if (audio) {
                audio.play().catch(console.error);
                sessionStorage.setItem("wedding-music", "on");
              }
              onOpen();
            }}
            className="font-display inline-flex items-center justify-center rounded-full border border-[var(--gold)]/70 bg-[var(--olive)]/60 backdrop-blur-sm px-8 py-3 text-sm tracking-[0.25em] text-[var(--gold)] uppercase transition-all duration-300 hover:scale-105 hover:bg-[var(--gold)]/20 hover:shadow-[0_0_30px_-8px_var(--gold)]"
          >
            Open Invitation
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}