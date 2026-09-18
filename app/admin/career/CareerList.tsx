"use client";

import { useState, useTransition } from "react";
import { deleteCareer, reorderCareer, saveCareer } from "../actions";
import { AdminForm, DeleteSubmitButton, SubmitButton } from "../AdminForm";
import { useToast } from "../Toast";

type CareerItem = {
  id: number;
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
  order: number;
};

type CareerListProps = {
  career: CareerItem[];
};

function moveItem(items: CareerItem[], fromIndex: number, toIndex: number): CareerItem[] {
  if (fromIndex === toIndex) return items;

  const nextItems = [...items];
  const [movedItem] = nextItems.splice(fromIndex, 1);
  if (!movedItem) return items;

  nextItems.splice(toIndex, 0, movedItem);
  return nextItems.map((item, order) => ({ ...item, order }));
}

function TextField({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-neutral-400">{label}</span>
      <input
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-amber-500"
      />
    </label>
  );
}

export default function CareerList({ career: initialCareer }: CareerListProps) {
  const [career, setCareer] = useState(initialCareer);
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();
  const toast = useToast();

  const persistOrder = (nextCareer: CareerItem[], previousCareer: CareerItem[]) => {
    setCareer(nextCareer);
    startTransition(async () => {
      const formData = new FormData();
      formData.set("careerIds", JSON.stringify(nextCareer.map((entry) => entry.id)));
      const result = await reorderCareer(null, formData);

      if (!result?.ok) {
        setCareer(previousCareer);
        toast({ ok: false, message: result?.message ?? "Could not save career order." });
        return;
      }

      toast({ ok: true, message: "Career order saved." });
    });
  };

  const moveCareer = (careerId: number, direction: -1 | 1) => {
    const fromIndex = career.findIndex((entry) => entry.id === careerId);
    const toIndex = fromIndex + direction;
    if (fromIndex < 0 || toIndex < 0 || toIndex >= career.length || isPending) return;

    persistOrder(moveItem(career, fromIndex, toIndex), career);
  };

  const dropCareer = (targetId: number) => {
    if (draggedId === null || draggedId === targetId || isPending) return;

    const fromIndex = career.findIndex((entry) => entry.id === draggedId);
    const toIndex = career.findIndex((entry) => entry.id === targetId);
    if (fromIndex < 0 || toIndex < 0) return;

    persistOrder(moveItem(career, fromIndex, toIndex), career);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-neutral-500">
        Drag the handle to reorder. Changes save automatically after you drop.
      </p>

      {career.map((entry, index) => (
        <article
          key={entry.id}
          onDragOver={(event) => event.preventDefault()}
          onDrop={() => dropCareer(entry.id)}
          className={`rounded-lg border bg-neutral-900/40 p-5 transition-colors ${
            draggedId === entry.id
              ? "border-amber-500/70 opacity-60"
              : "border-neutral-800"
          }`}
        >
          <div className="mb-4 flex items-center justify-between gap-3 border-b border-neutral-800 pb-3">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                draggable={!isPending}
                onDragStart={(event) => {
                  event.dataTransfer.effectAllowed = "move";
                  setDraggedId(entry.id);
                }}
                onDragEnd={() => setDraggedId(null)}
                aria-label={`Drag ${entry.company} to reorder`}
                className="cursor-grab rounded border border-neutral-700 px-2 py-1 font-mono text-sm text-neutral-400 active:cursor-grabbing disabled:cursor-not-allowed disabled:opacity-40"
                disabled={isPending}
              >
                ⠿
              </button>
              <div className="min-w-0">
                <p className="truncate font-medium text-neutral-100">{entry.company}</p>
                <p className="text-xs text-neutral-500">Position {index + 1}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => moveCareer(entry.id, -1)}
                disabled={index === 0 || isPending}
                aria-label={`Move ${entry.company} up`}
                className="rounded border border-neutral-700 px-2 py-1 text-sm text-neutral-300 transition-colors hover:border-neutral-500 disabled:cursor-not-allowed disabled:opacity-35"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => moveCareer(entry.id, 1)}
                disabled={index === career.length - 1 || isPending}
                aria-label={`Move ${entry.company} down`}
                className="rounded border border-neutral-700 px-2 py-1 text-sm text-neutral-300 transition-colors hover:border-neutral-500 disabled:cursor-not-allowed disabled:opacity-35"
              >
                ↓
              </button>
            </div>
          </div>

          <AdminForm action={saveCareer} className="grid gap-3">
            <input type="hidden" name="id" value={entry.id} />
            <input type="hidden" name="order" value={entry.order} />
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField label="Company" name="company" defaultValue={entry.company} />
              <TextField label="Role" name="role" defaultValue={entry.role} />
              <TextField label="Period" name="period" defaultValue={entry.period} />
              <TextField label="Location" name="location" defaultValue={entry.location} />
            </div>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-neutral-400">Points</span>
              <textarea
                name="points"
                rows={5}
                defaultValue={entry.points.join("\n")}
                className="w-full resize-y rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-amber-500"
              />
            </label>
            <div>
              <SubmitButton />
            </div>
          </AdminForm>
          <AdminForm action={deleteCareer} className="mt-2">
            <input type="hidden" name="id" value={entry.id} />
            <DeleteSubmitButton />
          </AdminForm>
        </article>
      ))}
    </div>
  );
}
