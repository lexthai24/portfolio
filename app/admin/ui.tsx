// Small presentational helpers for the admin forms. Server components only.
import type { ReactNode } from "react";

export function Field({
  label,
  name,
  defaultValue,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-neutral-400">
        {label}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue ?? ""}
        className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-amber-500"
      />
    </label>
  );
}

export function Area({
  label,
  name,
  defaultValue,
  rows = 3,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  rows?: number;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-neutral-400">
        {label}
        {hint && <span className="ml-2 text-neutral-600">{hint}</span>}
      </span>
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? ""}
        className="w-full resize-y rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-amber-500"
      />
    </label>
  );
}

export function ListArea({
  label,
  name,
  items,
  rows = 4,
}: {
  label: string;
  name: string;
  items?: string[];
  rows?: number;
}) {
  return (
    <Area
      label={label}
      name={name}
      rows={rows}
      hint="one per line"
      defaultValue={(items ?? []).join("\n")}
    />
  );
}

export function Checkbox({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-neutral-300">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 accent-amber-500"
      />
      {label}
    </label>
  );
}

export function SaveButton({ children = "Save" }: { children?: ReactNode }) {
  return (
    <button
      type="submit"
      className="rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-neutral-950 transition-colors hover:bg-amber-400"
    >
      {children}
    </button>
  );
}

export function DeleteButton() {
  return (
    <button
      type="submit"
      className="rounded-md border border-red-800 px-3 py-2 text-sm text-red-400 transition-colors hover:bg-red-950"
    >
      Delete
    </button>
  );
}

export function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6">
      <h1 className="text-xl font-semibold text-neutral-100">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>}
    </div>
  );
}

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-5">
      {children}
    </div>
  );
}

export function SectionTitle({
  id,
  title,
  count,
}: {
  id?: string;
  title: string;
  count?: number;
}) {
  return (
    <h2
      id={id}
      className="mb-4 mt-12 flex scroll-mt-20 items-baseline gap-3 border-b border-neutral-800 pb-2 text-lg font-semibold text-neutral-100"
    >
      {title}
      {count !== undefined && (
        <span className="text-sm font-normal text-neutral-500">{count}</span>
      )}
    </h2>
  );
}
