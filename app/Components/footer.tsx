import ArrowUpRight from "../Components/ArrowUpRight";

type FooterProps = {
  topHref?: string;
};

export default function Footer({ topHref = "#home" }: FooterProps) {
  return (
    <footer className="border-t border-[#161817]/20 pb-8 pt-10">
      <div className="flex items-start justify-between gap-6">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[#858981]">
          Até já
        </p>
        <a
          href={topHref}
          className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[#858981] transition-colors hover:text-[#6b2737]"
        >
          Voltar ao topo ↑
        </a>
      </div>
      <a
        href={topHref}
        className="group mt-10 block pb-[0.12em] text-[clamp(4rem,17vw,13rem)] font-medium leading-[0.82] tracking-[-0.1em] text-[#161817] transition-colors hover:text-[#6b2737]"
      >
        Jhonny
        <span className="text-[#6b2737] transition-colors group-hover:text-[#161817]">
          .
        </span>
      </a>
      <div className="mt-10 flex flex-col gap-3 border-t border-[#161817]/10 pt-4 text-xs text-[#858981] sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 Jhonny Silva</span>
        <div className="flex flex-wrap gap-5">
          <a href="/privacidade" className="transition-colors hover:text-[#6b2737]">
            Privacidade
          </a>
          <a href="/termos" className="transition-colors hover:text-[#6b2737]">
            Direitos de autor
          </a>
          <a
            href="https://github.com/jhonnysilvadev"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-[#6b2737]"
          >
            GitHub <ArrowUpRight />
          </a>
          <a
            href="https://www.linkedin.com/in/joaosiilva/"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-[#6b2737]"
          >
            LinkedIn <ArrowUpRight />
          </a>
          <a
            href="mailto:contacto@jhonnysilva.pt"
            className="transition-colors hover:text-[#6b2737]"
          >
            Email <ArrowUpRight />
          </a>
        </div>
      </div>
    </footer>
  );
}
