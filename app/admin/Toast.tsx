"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Toast = { id: number; ok: boolean; message: string };

const ToastCtx = createContext<(t: Omit<Toast, "id">) => void>(() => {});

export function useToast() {
  return useContext(ToastCtx);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((t: Omit<Toast, "id">) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { ...t, id }]);
    // auto-dismiss after 3.5s
    setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id));
    }, 3500);
  }, []);

  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="pointer-events-none fixed bottom-5 right-5 z-50 flex w-[min(22rem,calc(100vw-2.5rem))] flex-col gap-2">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={() =>
            setToasts((prev) => prev.filter((x) => x.id !== t.id))
          } />
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(r);
  }, []);

  return (
    <div
      role="status"
      className={`pointer-events-auto flex items-start gap-3 rounded-lg border px-4 py-3 text-sm shadow-lg transition-all duration-300 ${
        shown ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      } ${
        toast.ok
          ? "border-emerald-800 bg-emerald-950/90 text-emerald-200"
          : "border-red-800 bg-red-950/90 text-red-200"
      }`}
    >
      <span aria-hidden className="mt-0.5 shrink-0">
        {toast.ok ? "✓" : "✕"}
      </span>
      <span className="flex-1">{toast.message}</span>
      <button
        onClick={onClose}
        aria-label="Dismiss"
        className="shrink-0 text-current opacity-60 transition-opacity hover:opacity-100"
      >
        ×
      </button>
    </div>
  );
}
