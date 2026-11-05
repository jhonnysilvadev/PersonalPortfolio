import Link from "next/link";

export default function PrivacyPolicyPage() {
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
              Política de Privacidade
            </h1>
          </div>
          <p>
            Esta política explica, de forma simples, como são tratados os dados
            enviados através do formulário de contacto deste portefólio.
          </p>
          <section className="space-y-3">
            <h2 className="text-2xl font-medium">Dados tratados</h2>
            <p>
              São pedidos apenas o nome, o endereço de email e a mensagem. Estes
              dados são usados para ler e responder ao contacto iniciado por si.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-2xl font-medium">Envio e conservação</h2>
            <p>
              O formulário envia a mensagem para o endereço de contacto
              configurado pelo titular através de um serviço externo de email
              utilizado pelo site. As mensagens recebidas são guardadas apenas
              durante o tempo necessário para responder ao contacto e por um
              período máximo de 1 ano após a última comunicação, sendo depois
              eliminadas.
            </p>
            <p>
              Por motivos de segurança e prevenção de abusos (rate limiting), o
              endereço IP poderá ser temporariamente processado no momento do
              envio do formulário, ao abrigo do interesse legítimo de proteger
              a infraestrutura do site.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-2xl font-medium">Direitos</h2>
            <p>
              Para pedir acesso, retificação ou eliminação dos dados enviados,
              contacte{" "}
              <a className="text-[#6b2737] underline" href="mailto:contacto@jhonnysilva.pt">
                contacto@jhonnysilva.pt
              </a>
              . Não são usados cookies de analytics neste site.
            </p>
          </section>
          <p className="text-sm text-[#686b67]">
            Esta é uma informação geral e não substitui aconselhamento jurídico.
            Deve ser atualizada se forem adicionados novos serviços, cookies ou
            finalidades de tratamento.
          </p>
        </article>
      </div>
    </main>
  );
}
