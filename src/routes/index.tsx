import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { OpeningScreen } from "@/components/wedding/OpeningScreen";
import { Couple } from "@/components/wedding/Couple";
import { Countdown } from "@/components/wedding/Countdown";
import { Events } from "@/components/wedding/Events";
import { Venue } from "@/components/wedding/Venue";
import { RSVP } from "@/components/wedding/RSVP";
import { Petals } from "@/components/wedding/Petals";
import { MusicPlayer } from "@/components/wedding/MusicPlayer";
import { Closing } from "@/components/wedding/Closing";
import { AnimatePresence } from "motion/react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [opened, setOpened] = useState(false);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    if (opened) {
      const timer = setTimeout(() => setShowNav(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [opened]);

  return (
    <div className="floral-field min-h-screen">
      <AnimatePresence>
        {!opened && <OpeningScreen key="opening" onOpen={() => setOpened(true)} />}
      </AnimatePresence>

      {opened && (
        <main className="relative min-h-screen overflow-hidden pb-20">
          <Petals />
          {showNav && <MusicPlayer src="/Song.mp3" autoStart={true} />}

          <section id="story">
            <Couple />
          </section>

          <section id="events">
            <Events />
          </section>

          <section id="countdown">
            <Countdown />
          </section>

          <section id="venue">
            <Venue />
          </section>

          <section id="rsvp">
            <RSVP />
          </section>

          <footer className="py-6 text-center">
            <p className="text-xs tracking-widest text-[var(--cream)]/40">
              Designed &amp; Developed by <span className="text-[var(--gold)]/60 font-medium">PrashanthArts</span>
            </p>
          </footer>
        </main>
      )}
    </div>
  );
}
