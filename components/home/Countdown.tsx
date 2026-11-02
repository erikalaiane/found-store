"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const id = setInterval(callback, 1000);
  return () => clearInterval(id);
}

function getSnapshot() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(24, 0, 0, 0);
  return Math.floor((end.getTime() - now.getTime()) / 1000);
}

function getServerSnapshot() {
  return -1;
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function Countdown() {
  const seconds = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = seconds >= 0;

  const units = [
    { label: "horas", value: ready ? pad(Math.floor(seconds / 3600)) : "--" },
    { label: "min", value: ready ? pad(Math.floor((seconds % 3600) / 60)) : "--" },
    { label: "seg", value: ready ? pad(seconds % 60) : "--" },
  ];

  return (
    <div
      role="timer"
      aria-label="Tempo restante da oferta"
      className="flex gap-3"
    >
      {units.map((unit) => (
        <div
          key={unit.label}
          className="min-w-16 rounded-xl bg-black/25 px-3 py-2 text-center"
        >
          <p className="font-mono text-3xl leading-none font-bold">{unit.value}</p>
          <p className="text-xs uppercase opacity-80">{unit.label}</p>
        </div>
      ))}
    </div>
  );
}