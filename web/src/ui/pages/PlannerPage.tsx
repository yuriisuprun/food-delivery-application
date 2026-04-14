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
    <div className="grid gap-4 sm:gap-6">
      <div className="grid gap-2">
        <h1 className="brand text-2xl sm:text-3xl">Planner</h1>
        <p className="text-xs sm:text-sm text-[color:var(--fg1)]">
          Call to `trip-service` that forwards the request to `ai-service` and saves the trip on Postgres.
        </p>
      </div>

      <div className="grid gap-4 rounded-2xl sm:rounded-3xl border border-[color:var(--line)] bg-white/5 p-6 sm:p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Destination">
          <input
            className="w-full rounded-2xl border border-[color:var(--line)] bg-black/20 px-4 py-3 outline-none focus:border-white/25 text-sm"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </Field>
        <Field label="Days">
          <input
            type="number"
            min={1}
            className="w-full rounded-2xl border border-[color:var(--line)] bg-black/20 px-4 py-3 outline-none focus:border-white/25 text-sm"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          />
        </Field>
        <Field label="Budget (EUR)">
          <input
            type="number"
            min={0}
            className="w-full rounded-2xl border border-[color:var(--line)] bg-black/20 px-4 py-3 outline-none focus:border-white/25 text-sm"
            value={budgetEur}
            onChange={(e) => setBudgetEur(Number(e.target.value))}
          />
        </Field>
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            className="rounded-2xl bg-[color:var(--accent2)] px-5 py-3 font-medium text-black hover:brightness-95 text-sm sm:text-base"
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
                  constraints: ["prefer walking", "avoid long moves"],
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
            Generate itinerary
          </button>
          <button
            type="button"
            className="rounded-2xl border border-[color:var(--line)] px-5 py-3 hover:bg-white/5 text-sm sm:text-base"
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
            Update list
          </button>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl sm:rounded-3xl border border-[color:var(--danger)]/40 bg-[color:var(--danger)]/10 p-4 sm:p-6 text-xs sm:text-sm">
          {error}
        </div>
      ) : null}

      <div className="rounded-2xl sm:rounded-3xl border border-[color:var(--line)] bg-black/20 p-4 sm:p-6">
        <div className="mb-3 text-xs text-[color:var(--fg1)]">Response (raw markdown):</div>
        <pre className="whitespace-pre-wrap text-xs sm:text-sm leading-relaxed overflow-x-auto">{markdown || "..."}</pre>
      </div>

      <div className="rounded-2xl sm:rounded-3xl border border-[color:var(--line)] bg-white/5 p-4 sm:p-6">
        <div className="mb-3 text-xs text-[color:var(--fg1)]">My trips (demo):</div>
        {trips.length === 0 ? (
          <div className="text-xs sm:text-sm text-[color:var(--fg1)]">No trips yet.</div>
        ) : (
          <div className="grid gap-2">
            {trips.map((t) => (
              <div key={t.id} className="rounded-2xl border border-[color:var(--line)] bg-black/20 px-4 py-3">
                <div className="flex flex-col sm:flex-row gap-2 sm:items-baseline sm:justify-between">
                  <div className="brand text-base sm:text-lg">{t.destination}</div>
                  <div className="text-xs text-[color:var(--fg1)] whitespace-nowrap">
                    {t.days} days, {t.budgetEur} EUR
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
    <label className="grid gap-2 text-xs sm:text-sm">
      <div className="text-[color:var(--fg1)]">{props.label}</div>
      {props.children}
    </label>
  );
}
