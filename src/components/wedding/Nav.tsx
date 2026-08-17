import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#story", label: "Our Story" },
  { href: "#events", label: "Events" },
  { href: "#rsvp", label: "RSVP" },
  { href: "#gallery", label: "Gallery" },
  { href: "#venue", label: "Venue" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        solid ? "bg-[var(--sage-deep)]/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#home" className="font-script text-2xl text-[var(--cream)]">
          E <span className="text-[var(--blush)]">&</span> V
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-display relative text-sm tracking-[0.2em] text-[var(--cream)]/90 uppercase transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 after:bg-[var(--blush)] after:transition-transform after:duration-300 hover:text-[var(--blush)] hover:after:origin-bottom-left hover:after:scale-x-100"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="text-[var(--cream)] md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[var(--blush)]/25 bg-[var(--sage-deep)]/95 md:hidden"
          >
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display block px-6 py-3 text-sm tracking-[0.2em] text-[var(--cream)] uppercase"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </header>
  );
}