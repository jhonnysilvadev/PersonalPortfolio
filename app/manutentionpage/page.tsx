import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.jpeg";

export const metadata: Metadata = {
  title: "Em Desenvolvimento",
};

export default function MaintenancePage() {
  return (
    <main className="maintenance-shell">
      <section className="maintenance-content">
        <p className="maintenance-brand">
          Jhonny Silva
        </p>
        <span className="maintenance-status">Em desenvolvimento</span>
        <h1>Portfolio em desenvolvimento.</h1>
        <p>
          Estou a finalizar projetos e a preparar a nova versao do site.
          Entretanto, podes contactar-me diretamente por email.
        </p>
        <a className="maintenance-email" href="mailto:contacto@jhonnysilva.pt">
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
