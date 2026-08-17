import { MapPin } from "lucide-react";
import { events, googleCalendarUrl, icsFor, type WeddingEvent } from "@/lib/wedding-data";

function downloadIcs(event: WeddingEvent) {
  const blob = new Blob([icsFor(event)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${event.id}-eswar-veena.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

function EventCard({ event }: { event: WeddingEvent }) {
  return (
    <div className="w-full">
      <div className="relative w-full overflow-hidden">
        <picture className="flex h-screen w-full justify-center">
          <source media="(max-width: 1024px)" srcSet={event.mobileImage} />
          <img
            src={event.tabletImage}
            alt={`${event.name} invitation card`}
            loading="lazy"
            decoding="async"
            className="h-screen w-full object-fill"
          />
        </picture>
        
        {/* Gradient overlay + button */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center justify-end pb-8 pt-24 bg-gradient-to-t from-[var(--olive)]/95 via-[var(--olive)]/60 to-transparent sm:pb-12">
          <div className="flex flex-wrap items-center justify-center gap-3 px-4">
            <a
              href={event.maps}
              target="_blank"
              rel="noreferrer noopener"
              className="font-display inline-flex items-center gap-2 rounded-full border border-[var(--cream)]/70 bg-[var(--olive)]/60 backdrop-blur-sm px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-xs tracking-[0.2em] text-[var(--cream)] uppercase transition-colors duration-300 hover:bg-[var(--cream)]/20"
            >
              <MapPin size={14} /> View Location
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Events() {
  return (
    <section id="events" className="relative">
      <div className="w-full">
        {events.map((e, i) => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>
    </section>
  );
}