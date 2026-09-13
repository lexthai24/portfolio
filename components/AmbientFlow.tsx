"use client";

import { useEffect, useState } from "react";

/*
 * Fixed backdrop that crossfades the page's ambient color as the reader
 * moves between sections tagged with [data-flow-theme]. Sections win by
 * being the last one whose top edge has crossed the viewport midline,
 * so hues hand over to each other instead of snapping at section borders.
 */

const scenes: Record<string, string> = {
  hero: `
    radial-gradient(ellipse 90rem 50rem at 50% -12rem, rgba(99, 102, 241, 0.16), transparent 65%),
    radial-gradient(ellipse 55rem 35rem at 10% 60%, rgba(129, 140, 248, 0.08), transparent 62%)`,
  scalptra: `
    radial-gradient(ellipse 70rem 45rem at 50% -6rem, rgba(34, 211, 238, 0.13), transparent 66%),
    radial-gradient(ellipse 55rem 35rem at 88% 62%, rgba(168, 85, 247, 0.12), transparent 64%),
    linear-gradient(160deg, rgba(34, 211, 238, 0.035), rgba(168, 85, 247, 0.045))`,
  work: `
    radial-gradient(ellipse 65rem 40rem at 12% 28%, rgba(168, 85, 247, 0.10), transparent 62%),
    radial-gradient(ellipse 60rem 38rem at 88% 80%, rgba(99, 102, 241, 0.11), transparent 62%),
    linear-gradient(200deg, rgba(168, 85, 247, 0.04), rgba(99, 102, 241, 0.04))`,
  contact: `
    radial-gradient(ellipse 70rem 42rem at 50% 115%, rgba(99, 102, 241, 0.16), transparent 65%),
    radial-gradient(ellipse 45rem 30rem at 85% 20%, rgba(52, 211, 153, 0.05), transparent 62%)`,
};

export default function AmbientFlow() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-flow-theme]")
    );
    if (sections.length === 0) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const midline = window.innerHeight * 0.5;
      let current = sections[0].dataset.flowTheme ?? "hero";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= midline) {
          current = section.dataset.flowTheme ?? current;
        }
      }
      setActive(current);
    };
    const onScroll = () => {
      if (raf === 0) raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf !== 0) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-[2]"
    >
      {Object.entries(scenes).map(([name, background]) => (
        <div
          key={name}
          className={`ambient-scene animate-ambient-drift ${
            name === active ? "ambient-scene--active" : ""
          }`}
          style={{ backgroundImage: background }}
        />
      ))}
    </div>
  );
}
