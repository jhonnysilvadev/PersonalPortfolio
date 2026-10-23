import Navbar from "../Components/navbar";
import ArrowUpRight from "../Components/ArrowUpRight";
import ContactForm from "./ContactForm";

const GITHUB_USERNAME = "jhonnysilvadev";
const EXCLUDED_REPOSITORIES = new Set(["personalportfolio", "jhonnysilvadev"]);

type GitHubRepository = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  topics: string[];
  updated_at: string;
  private?: boolean;
  fork: boolean;
  archived: boolean;
};

function getProjectDomains(): Record<string, string> {
  const rawProjectDomains = process.env.PROJECT_DOMAINS;

  if (!rawProjectDomains) {
    console.warn(
      "PROJECT_DOMAINS is not configured; project links will be omitted.",
    );
    return {};
  }

  try {
    const parsedProjectDomains: unknown = JSON.parse(rawProjectDomains);

    if (
      typeof parsedProjectDomains !== "object" ||
      parsedProjectDomains === null ||
      Array.isArray(parsedProjectDomains)
    ) {
      throw new Error("PROJECT_DOMAINS must be a JSON object.");
    }

    return Object.fromEntries(
      Object.entries(parsedProjectDomains)
        .map(([projectName, url]) => [
          projectName.trim(),
          typeof url === "string" ? url.trim() : url,
        ])
        .filter(
          ([, url]) => typeof url === "string" && url.startsWith("https://"),
        ) as [string, string][],
    );
  } catch (error) {
    console.warn(
      "PROJECT_DOMAINS is invalid; project links will be omitted.",
      error,
    );
    return {};
  }
}

function getProjectDomain(
  projectDomains: Record<string, string>,
  repository: Pick<GitHubRepository, "id" | "name">,
): string | undefined {
  const matchingDomain = Object.entries(projectDomains).find(
    ([projectKey]) =>
      projectKey === String(repository.id) ||
      projectKey.trim().toLowerCase() === repository.name.trim().toLowerCase(),
  );

  return matchingDomain?.[1];
}

async function getProjects(): Promise<{
  projects: GitHubRepository[];
  error: boolean;
}> {
  try {
    const githubToken = process.env.GITHUB_TOKEN;
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(githubToken ? { Authorization: `Bearer ${githubToken}` } : {}),
        },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      return { projects: [], error: true };
    }

    const repositories = (await response.json()) as GitHubRepository[];
    return {
      projects: repositories.filter(
        (repository) =>
          !repository.private &&
          !repository.fork &&
          !repository.archived &&
          !EXCLUDED_REPOSITORIES.has(repository.name.toLowerCase()),
      ),
      error: false,
    };
  } catch {
    return { projects: [], error: true };
  }
}

export default async function HomePage() {
  const { projects, error: projectsError } = await getProjects();
  const projectDomains = getProjectDomains();

  return (
    <main className="portfolio-page">
      <div className="portfolio-container">
        <Navbar />

        <section id="home" className="portfolio-hero">
          <div className="portfolio-hero-copy editorial-enter">
            <div className="hero-status">
              <span className="hero-status-dot" />
              Disponível para conversar
            </div>

            <h1 className="hero-title">
              Jhonny
              <br />
              <span>Silva.</span>
            </h1>

            <div className="hero-intro">
              <p className="hero-role">
                Front-end
                <br />
                Developer
              </p>
              <p className="hero-description ">
                Faço sites e interfaces para quem tem uma boa ideia
                e não quer andar às voltas com coisas desnecessárias.
              </p>
            </div>
          </div>

          <div className="portfolio-hero-visual editorial-enter">
            <div className="visual-backdrop">
              <div className="visual-backdrop-shapes">
                <div className="visual-backdrop-circle visual-backdrop-circle-top" />
                <div className="visual-backdrop-circle visual-backdrop-circle-bottom" />
                <div className="visual-backdrop-dot" />
                <span className="visual-label">form / 001</span>
              </div>
            </div>

            <div className="visual-card">
              <div className="visual-card-ring visual-card-ring-large" />
              <div className="visual-card-ring visual-card-ring-small" />
              <span className="visual-card-center" />
              <div className="visual-card-footer">
                <span>design / code</span>
                <span>2026</span>
              </div>
            </div>

            <div className="visual-caption">ideias → interfaces</div>
          </div>

          <a href="#projects" className="hero-scroll-link">
            <span>↓</span>
            Ver trabalho
          </a>
        </section>

        <section
          id="projects"
          className="scroll-mt-20 border-t border-[#161817]/20 py-24 lg:py-32"
        >
          <div className="editorial-enter mb-10 flex flex-col justify-between gap-5 sm:mb-14 sm:flex-row sm:items-end sm:gap-6">
            <div>
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-[#6b2737]">
                01 — Seleção
              </p>
              <h2 className="max-w-xl text-[clamp(2.8rem,13vw,4.5rem)] font-medium leading-[0.9] tracking-[-0.07em] sm:text-7xl">
                Coisas que
                <br />
                estou a fazer.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-[#686b67] sm:text-right">
              Não é uma lista de prémios. É apenas o trabalho que faz sentido
              mostrar agora.
            </p>
          </div>

          <div className="border-t border-[#161817]/20">
            {projectsError ? (
              <p className="border-b border-[#161817]/20 py-8 text-sm leading-6 text-[#686b67]">
                Não foi possível carregar os projetos neste momento. Tenta
                novamente mais tarde.
              </p>
            ) : projects.length > 0 ? (
              projects.map((project, index) => {
                const projectUrl = getProjectDomain(
                  projectDomains,
                  project,
                );
                const projectContent = (
                  <article className="grid gap-5 py-7 sm:grid-cols-[4rem_1.1fr_1fr_5rem] sm:items-center sm:gap-8 sm:px-4 sm:py-8">
                    <span className="font-mono text-xs text-[#858981]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-2xl font-medium tracking-[-0.05em] text-[#161817] sm:text-3xl">
                        {project.name}
                      </h3>
                      <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[#6b2737]">
                        {project.topics?.length
                          ? project.topics.slice(0, 3).join(" · ")
                          : (project.language ?? "Projeto pessoal")}
                      </p>
                    </div>
                    <p className="max-w-sm text-sm leading-6 text-[#686b67]">
                      {project.description ?? "Projeto sem descrição."}
                    </p>
                    <div className="flex items-center justify-between sm:justify-end">
                      <span className="text-xs text-[#858981]">
                        {new Date(project.updated_at).getFullYear()}
                      </span>
                      {projectUrl && (
                        <span className="text-2xl text-[#6b2737] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                          <ArrowUpRight />
                        </span>
                      )}
                    </div>
                  </article>
                );
                const className = `group block border-b border-[#161817]/20 transition-colors ${projectUrl ? "cursor-pointer hover:bg-[#e9e6de]" : "cursor-default"}`;

                return projectUrl ? (
                  <a
                    key={project.id}
                    href={projectUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Abrir site de ${project.name}`}
                    className={className}
                  >
                    {projectContent}
                  </a>
                ) : (
                  <div key={project.id} className={className}>
                    {projectContent}
                  </div>
                );
              })
            ) : (
              <p className="border-b border-[#161817]/20 py-8 text-sm text-[#686b67]">
                Estou a preparar alguns projetos para mostrar aqui.
              </p>
            )}
          </div>
        </section>

        <section
          id="about"
          className="grid scroll-mt-20 gap-12 border-t border-[#161817]/20 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:py-32"
        >
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#6b2737]">
            02 — Sobre
          </p>
          <div>
            <p className="max-w-3xl text-[clamp(2rem,4vw,4rem)] font-medium leading-[0.98] tracking-[-0.07em]">
              Ainda não sei bem qual é a melhor maneira de fazer isto tudo, mas é aí que está a piada.
            </p>
            <div className="mt-12 grid gap-8 border-t border-[#161817]/20 pt-6 text-sm leading-6 text-[#686b67] sm:grid-cols-2">
              <p>
                Gosto de interfaces que se usam sem ninguém explicar nada, e de código que consigo ler daqui a seis meses sem praguejar.
              </p>
              <p>
                Quando não estou a programar, estou a ver como é que os outros resolveram o mesmo problema. Fico ali um bom bocado.
              </p>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="scroll-mt-20 border-t border-[#161817]/20 py-24 lg:py-32"
        >
          <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-[#6b2737]">
                03 — Contacto
              </p>
              <h2 className="max-w-3xl text-[clamp(3.5rem,8vw,8rem)] font-medium leading-[0.8] tracking-[-0.09em]">
                Vamos
                <br />
                conversar<span className="text-[#6b2737]">?</span>
              </h2>
            </div>
            <a
              href="mailto:contacto@jhonnysilva.pt"
              className="group flex w-fit items-center gap-4 border-b border-[#161817] pb-3 text-sm font-semibold transition-colors hover:border-[#6b2737] hover:text-[#6b2737]"
            >
              contacto@jhonnysilva.pt
              <span className="text-xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowUpRight />
              </span>
            </a>
          </div>
          <ContactForm />
        </section>

        <footer className="border-t border-[#161817]/20 pb-8 pt-10">
          <div className="flex items-start justify-between gap-6">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[#858981]">
              Até já
            </p>
            <a
              href="#home"
              className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[#858981] transition-colors hover:text-[#6b2737]"
            >
              Voltar ao topo ↑
            </a>
          </div>
          <a
            href="#home"
            className="group mt-10 block pb-[0.12em] text-[clamp(4rem,17vw,13rem)] font-medium leading-[0.82] tracking-[-0.1em] text-[#161817] transition-colors hover:text-[#6b2737]"
          >
            Jhonny
            <span className="text-[#6b2737] transition-colors group-hover:text-[#161817]">
              .
            </span>
          </a>
          <div className="mt-10 flex flex-col gap-3 border-t border-[#161817]/10 pt-4 text-xs text-[#858981] sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 Jhonny Silva</span>
            <div className="flex gap-5">
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
      </div>
    </main>
  );
}
