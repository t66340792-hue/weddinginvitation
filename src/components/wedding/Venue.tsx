import { MapPin } from "lucide-react";
import { events } from "@/lib/wedding-data";
import { FadeUp, Section, SectionTitle } from "./Ornaments";

export function Venue() {
  return (
    <Section id="venue">
      <SectionTitle kicker="Where to find us" script>
        Venues
      </SectionTitle>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {events.map((e, i) => (
          <FadeUp key={e.id} delay={i * 0.1}>
            <div className="card-invite flex h-full flex-col items-center px-6 py-8 text-center">
              <h3 className="font-script text-3xl text-[var(--cream)]">{e.name}</h3>
              <div className="mt-3 space-y-1">
                {e.address.map((line) => (
                  <p key={line} className="font-display text-sm text-[var(--cream)]/90">
                    {line}
                  </p>
                ))}
              </div>
              <a
                href={e.maps}
                target="_blank"
                rel="noreferrer noopener"
                className="font-display mt-auto inline-flex items-center gap-2 pt-6 text-xs tracking-[0.2em] text-[var(--blush)] uppercase transition-colors hover:text-[var(--gold)]"
              >
                <MapPin size={14} /> View on Google Maps
              </a>
            </div>
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}