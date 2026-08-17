import { motion } from "motion/react";
import { CalendarPlus, MapPin } from "lucide-react";
import { events, googleCalendarUrl, icsFor, type WeddingEvent } from "@/lib/wedding-data";
import { FadeUp, KolamDivider, Section, SectionTitle } from "./Ornaments";

function downloadIcs(event: WeddingEvent) {
  const blob = new Blob([icsFor(event)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${event.id}-eswar-veena.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

function EventCard({ event, index }: { event: WeddingEvent; index: number }) {
  const flip = index % 2 === 1;
  return (
    <div
      className={`grid items-center gap-8 sm:gap-12 lg:grid-cols-2 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}
    >
      <motion.div
        initial={{ opacity: 0, clipPath: "inset(12% 12% 12% 12%)" }}
        whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="kolam-frame relative overflow-hidden"
      >
        <span className="kolam-frame-inner z-10" aria-hidden />
        <img
          src={event.image}
          alt={`${event.name} invitation card`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain transition-transform duration-[1200ms] hover:scale-[1.03]"
        />
      </motion.div>

      <FadeUp delay={0.1}>
        <div className="card-invite px-6 py-8 text-center sm:px-10 sm:py-10">
          <h3 className="font-script text-4xl text-[var(--cream)] sm:text-5xl">{event.name}</h3>
          <KolamDivider className="mt-3" />
          <p className="mt-4 text-sm leading-relaxed text-[var(--cream)]/85">{event.tagline}</p>

          <p className="font-display mt-6 text-2xl tracking-wide text-[var(--cream)]">
            {event.dateLabel}
          </p>
          <p className="font-display text-sm tracking-[0.3em] text-[var(--blush)] uppercase">
            {event.dayLabel}
          </p>

          <div className="mt-4 space-y-1">
            {event.timeLines.map((t) => (
              <p key={t} className="font-display text-base text-[var(--cream)]/90">
                {t}
              </p>
            ))}
          </div>

          <p className="font-display mt-4 text-sm tracking-[0.15em] text-[var(--gold)] uppercase">
            Dress code: {event.dressCode}
          </p>

          <p className="font-script mt-5 text-2xl text-[var(--blush)]">Venue</p>
          {event.address.map((line) => (
            <p key={line} className="font-display text-sm text-[var(--cream)]/90">
              {line}
            </p>
          ))}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={event.maps}
              target="_blank"
              rel="noreferrer noopener"
              className="font-display inline-flex items-center gap-2 rounded-full border border-[var(--blush)]/70 px-5 py-2.5 text-xs tracking-[0.2em] text-[var(--cream)] uppercase transition-all duration-300 hover:scale-105 hover:bg-[var(--cream)]/15"
            >
              <MapPin size={14} /> View Location
            </a>
            <button
              onClick={() => downloadIcs(event)}
              className="font-display inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/70 px-5 py-2.5 text-xs tracking-[0.2em] text-[var(--gold)] uppercase transition-all duration-300 hover:scale-105 hover:bg-[var(--gold)]/15"
            >
              <CalendarPlus size={14} /> Add to Calendar
            </button>
            <a
              href={googleCalendarUrl(event)}
              target="_blank"
              rel="noreferrer noopener"
              className="font-display text-xs tracking-[0.2em] text-[var(--cream)]/70 uppercase underline-offset-4 hover:underline"
            >
              Google Calendar
            </a>
          </div>
        </div>
      </FadeUp>
    </div>
  );
}

export function Events() {
  return (
    <Section id="events">
      <SectionTitle kicker="Celebrations" script>
        Wedding Events
      </SectionTitle>
      <div className="mt-14 space-y-20 sm:space-y-28">
        {events.map((e, i) => (
          <EventCard key={e.id} event={e} index={i} />
        ))}
      </div>
    </Section>
  );
}