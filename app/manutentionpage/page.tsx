import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Em Desenvolvimento",
};

export default function MaintenancePage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_50%_0%,#27272a_0%,#09090b_48%,#000_100%)] p-6 text-zinc-100">
      <section className="w-full max-w-lg text-center">
        <p className="mb-10 text-xs font-bold tracking-[0.16em] text-zinc-400">
          Jhonny Silva
        </p>
        <div className="hero-reveal inline-flex items-center gap-[0.55rem] rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-[0.72rem] tracking-[0.02em] text-white/[0.58]">
          <span className="h-[0.42rem] w-[0.42rem] rounded-full bg-[#39ff88] shadow-[0_0_12px_rgba(57,255,136,0.95)] [animation:status-dot-blink_1.4s_ease-in-out_infinite]" /> Em Desenvolvimento
        </div>
        <h1 className="mt-8 text-[clamp(2.25rem,8vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em] text-zinc-50">Portfolio em desenvolvimento.</h1>
        <p className="mx-auto mt-6 max-w-md leading-[1.7] text-zinc-400">
          Estou a finalizar projetos e a preparar a nova versao do site.
          Entretanto, podes contactar-me diretamente por email.
        </p>
        <a className="mt-6 inline-flex rounded-lg bg-zinc-100 px-5 py-3 font-semibold text-zinc-950 transition-colors hover:bg-white" href="mailto:contacto@jhonnysilva.pt">
          contacto@jhonnysilva.pt
        </a>
        <footer className="w-full max-w-xl flex justify-center gap-6 py-4 text-sm text-zinc-500">
          <a
            href="https://github.com/jhonnysilvadev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300 transition-colors"
          >
            GitHub
          </a>
          <span>•</span>
          <a
            href="https://www.linkedin.com/in/joaosiilva/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300 transition-colors"
          >
            LinkedIn
          </a>
        </footer>
      </section>
    </main>
  );
}
