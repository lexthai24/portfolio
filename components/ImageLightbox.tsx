"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ImageLightboxProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
};

export default function ImageLightbox({
  src,
  alt,
  width,
  height,
  sizes,
  priority = false,
}: ImageLightboxProps) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setZoom(1);
  };

  const updateZoom = (amount: number) => {
    setZoom((current) => Math.min(2.5, Math.max(0.75, Number((current + amount).toFixed(2)))));
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full cursor-zoom-in text-left focus-visible:outline-none"
        aria-label={`Zoom in: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="h-auto w-full transition duration-300 group-hover:brightness-110"
          sizes={sizes}
        />
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/80 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
          Click to zoom
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Expanded image: ${alt}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div className="relative flex h-full w-full max-w-7xl flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 p-1.5 font-mono text-xs text-white/80 shadow-xl">
              <button
                type="button"
                onClick={() => updateZoom(-0.25)}
                disabled={zoom <= 0.75}
                className="grid h-8 w-8 place-items-center rounded-full text-lg transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Zoom out"
              >
                −
              </button>
              <span className="w-12 text-center tabular-nums">{Math.round(zoom * 100)}%</span>
              <button
                type="button"
                onClick={() => updateZoom(0.25)}
                disabled={zoom >= 2.5}
                className="grid h-8 w-8 place-items-center rounded-full text-lg transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Zoom in"
              >
                +
              </button>
              <span className="mx-1 h-4 w-px bg-white/15" />
              <button
                type="button"
                onClick={close}
                className="grid h-8 w-8 place-items-center rounded-full text-lg transition-colors hover:bg-white/10"
                aria-label="Close image"
              >
                ×
              </button>
            </div>

            <div className="flex min-h-0 w-full flex-1 items-center justify-center overflow-auto rounded-xl border border-white/10 bg-black/30 p-3 sm:p-6">
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="h-auto max-h-full w-auto max-w-full cursor-zoom-out object-contain transition-transform duration-200"
                style={{ transform: `scale(${zoom})` }}
                sizes="100vw"
              />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">Esc to close · use + / − to zoom</p>
          </div>
        </div>
      )}
    </>
  );
}
