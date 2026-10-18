import LogoutButton from "./LogoutButton";
import Navbar from "../Components/navbar";

export default function HomePage() {
  return (
    <main className="HomePage-shell background">
      <Navbar />

      <section className="hero-layout">
        <div className="hero-copy">
          <div className="hero-kicker hero-reveal [animation-delay:80ms]">
            <span className="status-dot" /> Disponível para novos projetos
          </div>

          <h1 className="hero-heading hero-reveal [animation-delay:140ms]">
            Ideias que ganham{" "}
            <span>vida na web.</span>
          </h1>

          <p className="hero-description hero-reveal [animation-delay:200ms]">
            Olá, sou o Jhonny. Desenvolvo interfaces modernas, código limpo e
            experiências digitais focadas em performance e interatividade.
          </p>

          <div className="hero-actions hero-reveal [animation-delay:300ms]">
            <button className="primary-action">
              Ver meus projetos <span aria-hidden="true">↗</span>
            </button>

            <button className="secondary-action">
              Falar comigo <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>

        <div className="terminal-window hero-reveal [animation-delay:220ms]" aria-label="Exemplo de código">
          <div className="terminal-bar">
            <span className="terminal-dot terminal-dot-red" />
            <span className="terminal-dot terminal-dot-yellow" />
            <span className="terminal-dot terminal-dot-green" />
            <span className="terminal-title">portfolio.tsx</span>
          </div>
          <pre className="terminal-code">
            <code>
              <span className="code-muted">01 </span>
              <span className="code-purple">export default</span>{" "}
              <span className="code-blue">function</span> Portfolio() {"{\n"}
              <span className="code-muted">02 </span>  <span className="code-purple">return</span> ({"{\n"}
              <span className="code-muted">03 </span>    &lt;<span className="code-blue">main</span>{"\n"}
              <span className="code-muted">04 </span>      className=<span className="code-green">"hero"</span>{"\n"}
              <span className="code-muted">05 </span>    &gt;{"\n"}
              <span className="code-muted">06 </span>      &lt;h1&gt;Ideias que ganham vida.&lt;/h1&gt;{"\n"}
              <span className="code-muted">07 </span>    &lt;/<span className="code-blue">main</span>&gt;{"\n"}
              <span className="code-muted">08 </span>  );{"\n"}
              <span className="code-muted">09 </span>{"}"}
            </code>
          </pre>
        </div>
      </section>
    </main>
  );
}
