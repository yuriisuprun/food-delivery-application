import { Link } from "react-router";

export function HomePage() {
  return (
    <div className="grid gap-10">
      <section className="grid gap-6 rounded-3xl border border-[color:var(--line)] bg-white/5 p-8">
        <div className="grid gap-3">
          <h1 className="brand text-4xl leading-tight">
            Pianificazione viaggi AI-driven, con vincoli reali.
          </h1>
          <p className="max-w-2xl text-[color:var(--fg1)]">
            Itinerari ottimizzati su tempo, budget e logistica. Suggerimenti, alternative low-cost, e spiegazione delle assunzioni.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/planner"
            className="rounded-full bg-[color:var(--accent)] px-6 py-3 font-medium text-black hover:brightness-95"
          >
            Crea itinerario
          </Link>
          <a
            className="rounded-full border border-[color:var(--line)] px-6 py-3 hover:bg-white/5"
            href="/"
            onClick={(e) => e.preventDefault()}
          >
            Vedi system design
          </a>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card title="Vincoli reali" body="Orari plausibili, spostamenti, pause, tempi di trasporto e buffer." />
        <Card title="Budget" body="Stime costi e consigli pratici per risparmiare senza degradare l’esperienza." />
        <Card title="RAG" body="Arricchimento con dati su luoghi e travel data, per ridurre allucinazioni e migliorare il contesto." />
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

