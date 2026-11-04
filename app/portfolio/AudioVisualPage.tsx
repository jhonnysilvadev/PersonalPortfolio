"use client";

import Navbar from "../Components/navbar";
import Footer from "../Components/footer";
import ArrowUpRight from "../Components/ArrowUpRight";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

type AudiovisualProject = {
  number: string;
  title: string;
  description: string;
  tag: string;
  video: string;
};

const audiovisualProjects: AudiovisualProject[] = [
  /*{
    number: "01",
    title: "Captação e edição",
    description:
      "Vídeos com ritmo, intenção e uma edição pensada para prender a atenção desde o primeiro frame.",
    tag: "Vídeo / Edição",
    video:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
  {
    number: "02",
    title: "Conteúdo para marcas",
    description:
      "Peças visuais para comunicar produtos, projetos e histórias de forma clara e memorável.",
    tag: "Conteúdo / Social",
    video:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
  {
    number: "03",
    title: "Direção visual",
    description:
      "Do conceito à entrega final, junto referências, imagem e movimento numa linguagem coerente.",
    tag: "Conceito / Direção",
    video:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },*/
];

export default function AudioVisualPage() {
  const [selectedProject, setSelectedProject] =
    useState<AudiovisualProject | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!selectedProject) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  function closeVideo() {
    setSelectedProject(null);
    setIsPlaying(false);
    setProgress(0);
    setDuration(0);
  }

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  }

  function updateProgress() {
    const video = videoRef.current;
    if (!video) return;
    setProgress(video.currentTime);
  }

  function seekVideo(value: number) {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = value;
    setProgress(value);
  }

  function changeVolume(value: number) {
    const video = videoRef.current;
    if (!video) return;
    video.volume = value;
    setVolume(value);
  }

  function formatTime(value: number) {
    if (!Number.isFinite(value)) return "00:00";
    const minutes = Math.floor(value / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(value % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  function toggleFullscreen() {
    const video = videoRef.current;
    if (!video) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void video.requestFullscreen();
    }
  }

  return (
    <main className="portfolio-page">
      <div className="portfolio-container">
        <Navbar />

        <section id="audiovisual" className="portfolio-hero">
          <div className="portfolio-hero-copy editorial-enter">
            <div className="hero-status">
              <span className="hero-status-dot" />
              Audiovisual
            </div>

            <h1 className="hero-title">
              Imagem
              <br />
              <span>em movimento.</span>
            </h1>

            <div className="hero-intro">
              <p className="hero-role">
                VÍDEO
                <br />& CONTEÚDO
              </p>
              <p className="hero-description">
                Transformo ideias em imagens com ritmo, intenção e uma linguagem
                visual que fica na memória.
              </p>
            </div>
          </div>

          <div className="portfolio-hero-visual editorial-enter">
            <div className="visual-backdrop">
              <div className="visual-backdrop-shapes">
                <div className="visual-backdrop-circle visual-backdrop-circle-top" />
                <div className="visual-backdrop-circle visual-backdrop-circle-bottom" />
                <div className="visual-backdrop-dot" />
                <span className="visual-label">motion / 001</span>
              </div>
            </div>

            <div className="visual-card">
              <div className="visual-card-ring visual-card-ring-large" />
              <div className="visual-card-ring visual-card-ring-small" />
              <span className="visual-card-center" />
              <div className="visual-card-footer">
                <span>frame / story</span>
                <span>2026</span>
              </div>
            </div>

            <div className="visual-caption">imagem → emoção</div>
          </div>

          <a href="#work" className="hero-scroll-link">
            <span>↓</span>
            Ver trabalho
          </a>
        </section>

        <section
          id="work"
          className="scroll-mt-20 border-t border-[#161817]/20 py-24 lg:py-32"
        >
          <div className="editorial-enter mb-10 flex flex-col justify-between gap-5 sm:mb-14 sm:flex-row sm:items-end sm:gap-6">
            <div>
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-[#6b2737]">
                01 — Trabalho
              </p>
              <h2 className="max-w-xl text-[clamp(2.8rem,13vw,4.5rem)] font-medium leading-[0.9] tracking-[-0.07em] sm:text-7xl">
                Histórias
                <br />
                que se veem.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-[#686b67] sm:text-right">
              Cada projeto começa com uma ideia e termina numa imagem que tem
              alguma coisa para dizer.
            </p>
          </div>

          <div className="border-t border-[#161817]/20">
            {audiovisualProjects.length > 0 ? (
              audiovisualProjects.map((project) => (
                <button
                  key={project.number}
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="group grid w-full gap-5 border-b border-[#161817]/20 py-7 text-left transition-colors hover:bg-[#e9e6de] sm:grid-cols-[4rem_1.1fr_1fr_5rem] sm:items-center sm:gap-8 sm:px-4 sm:py-8"
                >
                  <span className="font-mono text-xs text-[#858981]">
                    {project.number}
                  </span>
                  <div>
                    <h3 className="text-2xl font-medium tracking-[-0.05em] text-[#161817] sm:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[#6b2737]">
                      {project.tag}
                    </p>
                  </div>
                  <p className="max-w-sm text-sm leading-6 text-[#686b67]">
                    {project.description}
                  </p>
                  <span className="text-2xl text-[#6b2737] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <ArrowUpRight />
                  </span>
                </button>
              ))
            ) : (
              <div className="flex flex-col gap-6 border-b border-[#161817]/20 py-10 sm:flex-row sm:items-center sm:justify-between sm:py-12">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#6b2737]">
                    Em breve
                  </p>
                  <p className="mt-3 max-w-xl text-2xl font-medium leading-tight tracking-[-0.05em] text-[#161817] sm:text-3xl">
                    Estou a preparar novos vídeos para mostrar aqui.
                  </p>
                  <p className="mt-3 max-w-lg text-sm leading-6 text-[#686b67]">
                    Enquanto isso, fala comigo sobre o teu próximo projeto.
                  </p>
                </div>
                <a
                  href="mailto:contacto@jhonnysilva.pt"
                  className="group flex w-fit shrink-0 items-center gap-3 rounded-full bg-[#161817] px-5 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-[#f1efe9] transition-colors hover:bg-[#6b2737]"
                >
                  Entrar em contacto
                  <ArrowUpRight />
                </a>
              </div>
            )}
          </div>
        </section>

        <Footer topHref="#audiovisual" />
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-[2000] grid place-items-center bg-[#161817]/80 p-4 backdrop-blur-md sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-dialog-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedProject(null);
            }
          }}
        >
          <div className="relative grid max-h-[92vh] w-full max-w-[90rem] overflow-auto rounded-[1.5rem] border border-white/15 bg-[#f1efe9] shadow-[0_30px_90px_rgba(0,0,0,0.35)] lg:grid-cols-[1.55fr_0.45fr]">
            <div className="relative aspect-video min-h-[18rem] bg-[#0f1010] lg:aspect-auto lg:min-h-[40rem]">
              <video
                key={selectedProject.video}
                ref={videoRef}
                className="h-full w-full object-contain"
                src={selectedProject.video}
                autoPlay
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={updateProgress}
                onLoadedMetadata={(event) =>
                  setDuration(event.currentTarget.duration)
                }
              >
                O teu navegador não suporta a reprodução de vídeo.
              </video>
              <div className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-[#0f1010] via-[#0f1010]/90 to-transparent px-4 pt-10 pb-3 text-[#f1efe9]">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  step="0.1"
                  value={Math.min(progress, duration || 0)}
                  onChange={(event) => seekVideo(Number(event.target.value))}
                  aria-label="Progresso do vídeo"
                  className="video-progress mb-3 w-full"
                  style={
                    {
                      "--video-progress": `${duration ? (progress / duration) * 100 : 0}%`,
                    } as CSSProperties
                  }
                />
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlayback}
                    className="video-control-button"
                    aria-label={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
                  >
                    {isPlaying ? "❚❚" : "▶"}
                  </button>
                  <span className="font-mono text-[0.65rem]">
                    {formatTime(progress)} / {formatTime(duration)}
                  </span>
                  <label className="ml-auto flex items-center gap-2">
                    <span className="text-xs" aria-hidden="true">
                      ⌕
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={volume}
                      onChange={(event) =>
                        changeVolume(Number(event.target.value))
                      }
                      aria-label="Volume"
                      className="video-volume w-20"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    className="video-control-button"
                    aria-label="Ecrã inteiro"
                  >
                    ⛶
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-8 p-6 sm:p-8">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#6b2737]">
                  {selectedProject.number} — {selectedProject.tag}
                </p>
                <h2
                  id="video-dialog-title"
                  className="mt-5 text-4xl font-medium leading-[0.9] tracking-[-0.07em] text-[#161817] sm:text-5xl"
                >
                  {selectedProject.title}
                </h2>
                <p className="mt-6 text-sm leading-6 text-[#686b67]">
                  {selectedProject.description}
                </p>
              </div>
              <button
                type="button"
                onClick={closeVideo}
                className="flex w-fit items-center gap-3 rounded-full bg-[#161817] px-5 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-[#f1efe9] transition-colors hover:bg-[#6b2737]"
              >
                Fechar
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
