"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/projects", label: "Projects" },
];

export default function Nav({ name }: { name: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-line bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-base font-semibold tracking-tight text-ink transition-colors hover:text-accent-bright"
        >
          {name}
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 text-sm sm:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`transition-colors ${
                    active ? "text-ink" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
          <li>
            <a
              href="https://t.me/lexthai24"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-accent/40 px-4 py-2 text-accent transition-all hover:border-accent hover:bg-accent-soft"
            >
              Get in touch
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="relative z-50 -mr-2 flex h-10 w-10 items-center justify-center sm:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="relative block h-3.5 w-6">
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-ink transition-all duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-6 bg-ink transition-all duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-ink transition-all duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <div id="mobile-menu" className="sm:hidden">
            <motion.button
              type="button"
              aria-hidden="true"
              tabIndex={-1}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-x-0 bottom-0 top-[3.5rem] bg-bg/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="fixed inset-x-0 top-[3.5rem] border-b border-line bg-bg shadow-xl shadow-black/30"
            >
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.05, delayChildren: 0.06 } },
                }}
                className="flex flex-col gap-1 px-6 pb-6 pt-2 text-base"
              >
                {links.map((l) => {
                  const active = pathname === l.href;
                  return (
                    <motion.li
                      key={l.href}
                      variants={{
                        hidden: { opacity: 0, x: -8 },
                        show: { opacity: 1, x: 0 },
                      }}
                    >
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className={`block py-2.5 transition-colors ${
                          active ? "text-accent" : "text-ink-soft hover:text-ink"
                        }`}
                      >
                        {l.label}
                      </Link>
                    </motion.li>
                  );
                })}
                <motion.li
                  variants={{
                    hidden: { opacity: 0, x: -8 },
                    show: { opacity: 1, x: 0 },
                  }}
                  className="mt-2 border-t border-line pt-3"
                >
                  <a
                    href="https://t.me/lexthai24"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="block py-1 text-accent transition-colors hover:text-accent-bright"
                  >
                    Get in touch
                  </a>
                </motion.li>
              </motion.ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
