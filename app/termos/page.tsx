import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="portfolio-page">
      <div className="portfolio-container py-32">
        <Link href="/" className="text-sm font-semibold text-[#6b2737]">
          ← Voltar ao portefólio
        </Link>
        <article className="mt-12 max-w-3xl space-y-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#6b2737]">
              Informação legal
            </p>
            <h1 className="mt-5 text-5xl font-medium tracking-[-0.07em]">
              Aviso Legal e Direitos de Autor
            </h1>
          </div>
          <p>
            Este portefólio é uma apresentação pessoal e não constitui uma loja
            online nem uma oferta de venda direta.
          </p>
          <section className="space-y-3">
            <h2 className="text-2xl font-medium">Autoria e utilização</h2>
            <p>
              Os textos, código, identidade visual e projetos apresentados são
              da autoria de Jhonny Silva, salvo indicação em contrário. Não é
              autorizada a cópia, reprodução, adaptação, distribuição ou
              utilização comercial sem autorização prévia por escrito.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-2xl font-medium">Conteúdos de terceiros</h2>
            <p>
              As marcas, plataformas e conteúdos de terceiros pertencem aos
              respetivos titulares. Os projetos carregados dinamicamente a
              partir do GitHub podem conter licenças próprias, que devem ser
              consultadas antes de qualquer reutilização.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-2xl font-medium">Proteção do trabalho</h2>
            <p>
              Recomenda-se que qualquer autorização de utilização seja pedida por
              escrito e que sejam mantidos avisos de copyright, histórico de
              versões e provas de autoria. A proteção concreta depende do caso e
              da legislação aplicável, incluindo o Código do Direito de Autor e
              dos Direitos Conexos.
            </p>
          </section>
          <p className="text-sm text-[#686b67]">
            Este aviso é informativo e não substitui aconselhamento jurídico.
          </p>
        </article>
      </div>
    </main>
  );
}
