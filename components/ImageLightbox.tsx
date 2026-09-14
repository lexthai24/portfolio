"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

export type LightboxImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type ImageLightboxProps = LightboxImage & {
  images?: LightboxImage[];
  sizes: string;
  priority?: boolean;
  previewClassName?: string;
};

export default function ImageLightbox({
  src,
  alt,
  width,
  height,
  images,
  sizes,
  priority = false,
  previewClassName = "h-auto w-full",
}: ImageLightboxProps) {
  const gallery = useMemo<LightboxImage[]>(
    () => (images && images.length > 0 ? images : [{ src, alt, width, height }]),
    [alt, height, images, src, width],
  );
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const currentImage = gallery[selectedIndex] ?? gallery[0];
  const hasMultipleImages = gallery.length > 1;

  useEffect(() => {
    if (selectedIndex < gallery.length) return;
    setSelectedIndex(0);
  }, [gallery.length, selectedIndex]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setZoom(1);
        return;
      }

      if (hasMultipleImages && event.key === "ArrowLeft") {
        setSelectedIndex((current) => (current - 1 + gallery.length) % gallery.length);
        setZoom(1);
      }
      if (hasMultipleImages && event.key === "ArrowRight") {
        setSelectedIndex((current) => (current + 1) % gallery.length);
        setZoom(1);
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [gallery.length, hasMultipleImages, open]);

  const close = () => {
    setOpen(false);
    setZoom(1);
  };

  const updateZoom = (amount: number) => {
    setZoom((current) => Math.min(2.5, Math.max(0.75, Number((current + amount).toFixed(2)))));
  };

  const moveImage = (direction: -1 | 1) => {
    setSelectedIndex((current) => (current + direction + gallery.length) % gallery.length);
    setZoom(1);
  };

  const dialog = open ? (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Image gallery: ${alt}`}
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
            aria-label="Close image gallery"
          >
            ×
          </button>
        </div>

        <div className="relative flex min-h-0 w-full flex-1 items-center justify-center overflow-auto rounded-xl border border-white/10 bg-black/30 p-3 sm:p-6">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            width={currentImage.width}
            height={currentImage.height}
            className="h-auto max-h-full w-auto max-w-full cursor-zoom-out object-contain transition-transform duration-200"
            style={{ transform: `scale(${zoom})` }}
            sizes="100vw"
          />

          {hasMultipleImages && (
            <>
              <button
                type="button"
                onClick={() => moveImage(-1)}
                className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-slate-950/75 text-2xl text-white transition-colors hover:bg-slate-800 sm:left-5"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => moveImage(1)}
                className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-slate-950/75 text-2xl text-white transition-colors hover:bg-slate-800 sm:right-5"
                aria-label="Next image"
              >
                ›
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
          {hasMultipleImages && <span>{selectedIndex + 1} / {gallery.length}</span>}
          <span>Esc to close · use + / − to zoom{hasMultipleImages ? " · ← / → to navigate" : ""}</span>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full cursor-zoom-in overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-bright"
        aria-label={`Open image gallery: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={`${previewClassName} transition duration-500 group-hover:scale-[1.025] group-hover:brightness-110`}
          sizes={sizes}
        />
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-white/20 bg-black/65 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/85 backdrop-blur">
          {hasMultipleImages ? `1 / ${gallery.length} · View gallery` : "Click to zoom"}
        </span>
      </button>

      {dialog && createPortal(dialog, document.body)}
    </>
  );
}
