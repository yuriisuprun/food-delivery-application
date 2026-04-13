import React, { useState } from "react";
import { tripApi } from "../lib/http";

export function PlannerPage() {
  const [destination, setDestination] = useState("Roma");
  const [days, setDays] = useState(3);
  const [budgetEur, setBudgetEur] = useState(450);
  const [markdown, setMarkdown] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [trips, setTrips] = useState<Array<{ id: string; destination: string; days: number; budgetEur: number; itineraryMarkdown: string | null }>>([]);

  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <h1 className="brand text-3xl">Planner</h1>
        <p className="text-sm text-[color:var(--fg1)]">
          Chiamata a `trip-service` che inoltra la richiesta a `ai-service` e salva il trip su Postgres.
        </p>
      </div>

      <div className="grid gap-4 rounded-3xl border border-[color:var(--line)] bg-white/5 p-6 md:grid-cols-3">
        <Field label="Destinazione">
          <input
            className="w-full rounded-2xl border border-[color:var(--line)] bg-black/20 px-4 py-3 outline-none focus:border-white/25"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </Field>
        <Field label="Giorni">
          <input
            type="number"
            min={1}
            className="w-full rounded-2xl border border-[color:var(--line)] bg-black/20 px-4 py-3 outline-none focus:border-white/25"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          />
        </Field>
        <Field label="Budget (EUR)">
          <input
            type="number"
            min={0}
            className="w-full rounded-2xl border border-[color:var(--line)] bg-black/20 px-4 py-3 outline-none focus:border-white/25"
            value={budgetEur}
            onChange={(e) => setBudgetEur(Number(e.target.value))}
          />
        </Field>
        <div className="md:col-span-3">
          <button
            type="button"
            className="rounded-2xl bg-[color:var(--accent2)] px-5 py-3 font-medium text-black hover:brightness-95"
            onClick={async () => {
              setError(null);
              setMarkdown("");
              try {
                const res = await tripApi.postJson<{ itineraryMarkdown: string | null }>(
                  "/api/trips/plan",
                  {
                  destination,
                  days,
                  budgetEur,
                  constraints: ["preferisci camminare", "evita spostamenti lunghi"],
                  },
                );
                setMarkdown(res.itineraryMarkdown ?? "");
                const list = await tripApi.getJson<typeof trips>("/api/trips");
                setTrips(list);
              } catch (e: any) {
                setError(e?.message ?? "Request failed");
              }
            }}
          >
            Genera itinerario
          </button>
          <button
            type="button"
            className="ml-3 rounded-2xl border border-[color:var(--line)] px-5 py-3 hover:bg-white/5"
            onClick={async () => {
              setError(null);
              try {
                const list = await tripApi.getJson<typeof trips>("/api/trips");
                setTrips(list);
              } catch (e: any) {
                setError(e?.message ?? "Load failed");
              }
            }}
          >
            Aggiorna lista
          </button>
        </div>
      </div>

      {error ? (
        <div className="rounded-3xl border border-[color:var(--danger)]/40 bg-[color:var(--danger)]/10 p-6 text-sm">
          {error}
        </div>
      ) : null}

      <div className="rounded-3xl border border-[color:var(--line)] bg-black/20 p-6">
        <div className="mb-3 text-xs text-[color:var(--fg1)]">Risposta (markdown grezzo):</div>
        <pre className="whitespace-pre-wrap text-sm leading-relaxed">{markdown || "..."}</pre>
      </div>

      <div className="rounded-3xl border border-[color:var(--line)] bg-white/5 p-6">
        <div className="mb-3 text-xs text-[color:var(--fg1)]">My trips (demo):</div>
        {trips.length === 0 ? (
          <div className="text-sm text-[color:var(--fg1)]">Nessun trip ancora.</div>
        ) : (
          <div className="grid gap-2">
            {trips.map((t) => (
              <div key={t.id} className="rounded-2xl border border-[color:var(--line)] bg-black/20 px-4 py-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="brand text-lg">{t.destination}</div>
                  <div className="text-xs text-[color:var(--fg1)]">
                    {t.days} giorni, {t.budgetEur} EUR
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Field(props: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm">
      <div className="text-[color:var(--fg1)]">{props.label}</div>
      {props.children}
    </label>
  );
}
