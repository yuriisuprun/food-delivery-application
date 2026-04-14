import React from "react";
import { Link } from "react-router";

export function HomePage() {
  return (
    <div className="grid gap-10">
      <section className="grid gap-6 rounded-3xl border border-[color:var(--line)] bg-white/5 p-8">
        <div className="grid gap-3">
          <h1 className="brand text-4xl leading-tight">
            AI-driven trip planning with real constraints.
          </h1>
          <p className="max-w-2xl text-[color:var(--fg1)]">
            Itineraries optimized for time, budget and logistics. Suggestions, low-cost alternatives, and explanation of assumptions.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/planner"
            className="rounded-full bg-[color:var(--accent)] px-6 py-3 font-medium text-black hover:brightness-95"
          >
            Create itinerary
          </Link>
          <a
            className="rounded-full border border-[color:var(--line)] px-6 py-3 hover:bg-white/5"
            href="/"
            onClick={(e) => e.preventDefault()}
          >
            View system design
          </a>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card title="Real constraints" body="Plausible schedules, movements, breaks, transport times and buffers." />
        <Card title="Budget" body="Cost estimates and practical tips to save without degrading the experience." />
        <Card title="RAG" body="Enrichment with data on places and travel data, to reduce hallucinations and improve context." />
      </section>
    </div>
  );
}

function Card(props: { title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-[color:var(--line)] bg-white/5 p-6">
      <div className="brand text-xl">{props.title}</div>
      <div className="mt-2 text-sm text-[color:var(--fg1)]">{props.body}</div>
    </div>
  );
}
