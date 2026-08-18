export const images = {
  haldi: "/Haldi.jpg.jpeg",
  sangeeth: "/Sangeeth.jpg.jpeg",
  wedding: "/Wedding.jpg.jpeg",
  couple: "/1.jpg.jpeg",
  family: "/2.jpg.jpeg",
};

export const mobileImages = {
  haldi: "/mobile/Haldi.jpg.jpeg",
  sangeeth: "/mobile/Sangeeth.jpg.jpeg",
  wedding: "/mobile/Wedding.jpg.jpeg",
  couple: "/mobile/1.jpg.jpeg",
  family: "/mobile/2.jpg.jpeg",
};

export const tabletImages = {
  haldi: "/Tablets/Haldi.png",
  sangeeth: "/Tablets/Sangeet.png",
  wedding: "/Tablets/wedding.png",
  couple: "/Tablets/1.jpg.jpeg",
  family: "/Tablets/2.png",
};

export const couple = {
  groom: "Eswar Eskala",
  bride: "Veena Vyshnavi Garre",
  shortGroom: "Eswar",
  shortBride: "Veena",
  hashtag: "#VEsaidES",
  groomParents: ["S/o Smt. Eskala Prema Latha", "Sri. Eskala Krishna Prasad"],
  brideParents: [
    "Youngest D/o Smt. Garre Jeevana Jyothi",
    "Sri. Garre Raghu Rama Sesha Sai Kumar",
  ],
};

/** Wedding muhurtham day, 26 Aug 2026 09:00 PDT */
export const weddingDateISO = "2026-08-26T16:00:00Z";

export type WeddingEvent = {
  id: "haldi" | "sangeeth" | "wedding";
  name: string;
  tagline: string;
  dateLabel: string;
  dayLabel: string;
  timeLines: string[];
  dressCode: string;
  venueName: string;
  address: string[];
  maps: string;
  image: string;
  mobileImage: string;
  tabletImage: string;
  startUTC: string;
  endUTC: string;
};

export const events: WeddingEvent[] = [
  {
    id: "haldi",
    name: "Haldi",
    tagline:
      "Let the golden hues of Haldi fill the day with love, laughter, blessings and beautiful memories as we begin this joyful journey.",
    dateLabel: "23 August 2026",
    dayLabel: "Sunday",
    timeLines: ["09:00 AM – 01:00 PM", "Followed by Lunch"],
    dressCode: "YelloVE",
    venueName: "Haldi Ceremony",
    address: ["429 Ann Darling Drive", "San Jose, CA 95133"],
    maps: "https://maps.app.goo.gl/xP2qfWw3hSJFVjod7?g_st=iw",
    image: images.haldi,
    mobileImage: mobileImages.haldi,
    tabletImage: tabletImages.haldi,
    startUTC: "20260823T160000Z",
    endUTC: "20260823T200000Z",
  },
  {
    id: "sangeeth",
    name: "Sangeeth",
    tagline:
      "With music in our hearts and happiness in the air, let's come together for an unforgettable evening of dance, laughter and celebration.",
    dateLabel: "23 August 2026",
    dayLabel: "Sunday",
    timeLines: ["06:00 PM", "Dinner starts at 8:00 PM"],
    dressCode: "Glam",
    venueName: "Shubham Halls",
    address: ["1214 Apollo Way (Shubham Halls)", "Sunnyvale, CA 94085"],
    maps: "https://maps.app.goo.gl/a4yH6UGc5KEHYzek9?g_st=iw",
    image: images.sangeeth,
    mobileImage: mobileImages.sangeeth,
    tabletImage: tabletImages.sangeeth,
    startUTC: "20260824T010000Z",
    endUTC: "20260824T050000Z",
  },
  {
    id: "wedding",
    name: "Wedding",
    tagline:
      "With hearts full of love and dreams for tomorrow, we invite you to celebrate the beautiful beginning of our forever together.",
    dateLabel: "26 August 2026",
    dayLabel: "Wednesday",
    timeLines: [
      "09:00 AM Rituals start",
      "Guests can start coming 9:30 AM",
      "Muhurtham — 11:20 AM",
      "Lunch — 12:30 PM",
    ],
    dressCode: "Draped in Tradition",
    venueName: "Shiva - Vishnu Temple",
    address: ["1232 Arrowhead Avenue", "(Shiva - Vishnu Temple), Livermore, CA 94551"],
    maps: "https://maps.app.goo.gl/z72Ht4516NM2hPW79?g_st=iw",
    image: images.wedding,
    mobileImage: mobileImages.wedding,
    tabletImage: tabletImages.wedding,
    startUTC: "20260826T160000Z",
    endUTC: "20260826T210000Z",
  },
];

export function googleCalendarUrl(event: WeddingEvent) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${event.name} — ${couple.shortGroom} & ${couple.shortBride}`,
    dates: `${event.startUTC}/${event.endUTC}`,
    details: `${event.tagline}\nDress code: ${event.dressCode}\n${event.maps}`,
    location: event.address.join(", "),
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function icsFor(event: WeddingEvent) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Eswar and Veena//Wedding//EN",
    "BEGIN:VEVENT",
    `UID:${event.id}-eswar-veena@wedding`,
    `DTSTAMP:${event.startUTC}`,
    `DTSTART:${event.startUTC}`,
    `DTEND:${event.endUTC}`,
    `SUMMARY:${event.name} — ${couple.shortGroom} & ${couple.shortBride}`,
    `DESCRIPTION:Dress code: ${event.dressCode}`,
    `LOCATION:${event.address.join(", ")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}