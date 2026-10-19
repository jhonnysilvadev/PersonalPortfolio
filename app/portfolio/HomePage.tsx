import LogoutButton from "./LogoutButton";
import Navbar from "../Components/navbar";

export default function HomePage() {
  return (
    <main className="HomePage-shell background">
      <Navbar />

      <section className="hero-layout">
        <div className="hero-copy">
          <div className="hero-kicker hero-reveal [animation-delay:80ms]">
            <span className="status-dot" /> Aberto a novas oportunidades
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
          <pre className="terminal-code terminal-typing">
            <code>
              <span className="terminal-line"><span className="code-muted">01</span><span className="terminal-content"><span className="code-purple">export default</span>{" "}<span className="code-blue">function</span> Portfolio() {'{'}</span></span>
              <span className="terminal-line"><span className="code-muted">02</span><span className="terminal-content">  <span className="code-purple">return</span> ({'{'}</span></span>
              <span className="terminal-line"><span className="code-muted">03</span><span className="terminal-content">    &lt;<span className="code-blue">main</span> className=<span className="code-green">"hero"</span>&gt;</span></span>
              <span className="terminal-line"><span className="code-muted">04</span><span className="terminal-content">      &lt;h1&gt;Ideias que ganham vida.&lt;/h1&gt;</span></span>
              <span className="terminal-line"><span className="code-muted">05</span><span className="terminal-content">    &lt;/<span className="code-blue">main</span>&gt;</span></span>
              <span className="terminal-line"><span className="code-muted">06</span><span className="terminal-content">  );</span></span>
              <span className="terminal-line terminal-last-line"><span className="code-muted">09</span><span className="terminal-content">{'}'}</span></span>
            </code>
          </pre>
        </div>
      </section>
    </main>
  );
}
