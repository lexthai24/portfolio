"use client";

import { useEffect, useRef } from "react";
// React 18: the action-state hook lives in react-dom as useFormState.
// (Renamed to useActionState in React 19.)
import { useFormState, useFormStatus } from "react-dom";
import { useToast } from "./Toast";
import type { ActionState } from "./actions";

type Action = (prev: ActionState, fd: FormData) => Promise<ActionState>;

/**
 * A form bound to a Server Action that returns ActionState.
 * On completion it fires a toast; the submit button inside it shows a
 * pending state automatically via useFormStatus.
 */
export function AdminForm({
  action,
  children,
  className,
  resetOnSuccess,
}: {
  action: Action;
  children: React.ReactNode;
  className?: string;
  resetOnSuccess?: boolean;
}) {
  const [state, formAction] = useFormState<ActionState, FormData>(
    action,
    null,
  );
  const toast = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const lastHandled = useRef<ActionState>(null);

  useEffect(() => {
    if (state && state !== lastHandled.current) {
      lastHandled.current = state;
      toast({ ok: state.ok, message: state.message });
      if (state.ok && resetOnSuccess) formRef.current?.reset();
    }
  }, [state, toast, resetOnSuccess]);

  return (
    <form ref={formRef} action={formAction} className={className}>
      {children}
    </form>
  );
}

/** Submit button that disables + shows a spinner while the form is pending. */
export function SubmitButton({
  children = "Save",
  variant = "primary",
}: {
  children?: React.ReactNode;
  variant?: "primary" | "danger";
}) {
  const { pending } = useFormStatus();
  const base =
    "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60";
  const styles =
    variant === "danger"
      ? "border border-red-800 text-red-400 hover:bg-red-950"
      : "bg-amber-500 text-neutral-950 hover:bg-amber-400";
  return (
    <button type="submit" disabled={pending} className={`${base} ${styles}`}>
      {pending && (
        <span
          aria-hidden
          className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {pending ? "Saving…" : children}
    </button>
  );
}

/** Delete submit button (danger variant, shows "Deleting…"). */
export function DeleteSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-md border border-red-800 px-3 py-2 text-sm text-red-400 transition-colors hover:bg-red-950 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending && (
        <span
          aria-hidden
          className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
