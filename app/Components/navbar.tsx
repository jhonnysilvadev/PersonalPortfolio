"use client";

import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="fixed left-1/2 top-0 z-[1000] w-[calc(100%_-_2.5rem)] max-w-[1100px] -translate-x-1/2 pt-5 max-[760px]:w-[calc(100%_-_1.5rem)] max-[760px]:pt-3">
      <nav className="relative flex w-full items-center justify-between gap-4">
        <a href="#" className="inline-flex w-fit items-center whitespace-nowrap rounded-full border border-[#161817]/15 bg-[#f1efe9]/80 px-[1.4rem] py-[0.65rem] text-[0.95rem] font-bold tracking-[-0.01em] text-[#161817] shadow-[0_10px_30px_-10px_rgba(22,24,23,0.25)] backdrop-blur-2xl transition-all duration-200 hover:border-[#6b2737]/60 hover:bg-[#f8f7f2]">
          {"<Jhonny Silva/>"}
        </a>

        <button
          className="z-[2] hidden h-[42px] w-[42px] cursor-pointer flex-col items-center justify-center gap-[5px] rounded-full border border-[#161817]/15 bg-[#f1efe9]/80 backdrop-blur-xl max-[760px]:flex"
          type="button"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          aria-controls="navGroup"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <span className={`block h-0.5 w-[18px] rounded-sm bg-[#161817] transition-all ${isMenuOpen ? "translate-y-[7px] rotate-45" : ""}`}></span>
          <span className={`block h-0.5 w-[18px] rounded-sm bg-[#161817] transition-all ${isMenuOpen ? "opacity-0" : ""}`}></span>
          <span className={`block h-0.5 w-[18px] rounded-sm bg-[#161817] transition-all ${isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}></span>
        </button>

        <div className={`${isMenuOpen ? "flex" : "hidden"} absolute left-0 right-0 top-[calc(100%_+_0.75rem)] z-[1] flex-col items-stretch gap-3 rounded-2xl border border-[#161817]/15 bg-[#f1efe9] p-3 shadow-[0_20px_45px_rgba(22,24,23,0.2)] min-[761px]:contents`} id="navGroup">
          <div className="flex w-fit items-center gap-1 rounded-full border border-[#161817]/15 bg-[#f1efe9]/80 p-[0.35rem_0.45rem] shadow-[0_10px_30px_-10px_rgba(22,24,23,0.25)] backdrop-blur-2xl max-[760px]:w-full max-[760px]:flex-col max-[760px]:rounded-[25px]">
            <a href="#home" className="w-full whitespace-nowrap rounded-full bg-[#161817] px-[1.15rem] py-[0.45rem] text-center text-[0.9rem] font-semibold text-[#f1efe9] shadow-[0_2px_10px_rgba(22,24,23,0.15)] min-[761px]:w-auto" onClick={closeMenu}>
              Home
            </a>
            <a href="#projects" className="w-full whitespace-nowrap rounded-full px-[1.15rem] py-[0.45rem] text-center text-[0.9rem] font-medium text-[#686b67] transition-colors hover:text-[#6b2737] max-[760px]:py-3 min-[761px]:w-auto" onClick={closeMenu}>
              Projects
            </a>
            <a href="#about" className="w-full whitespace-nowrap rounded-full px-[1.15rem] py-[0.45rem] text-center text-[0.9rem] font-medium text-[#686b67] transition-colors hover:text-[#6b2737] max-[760px]:py-3 min-[761px]:w-auto" onClick={closeMenu}>
              About
            </a>
            <a href="#contact" className="w-full whitespace-nowrap rounded-full px-[1.15rem] py-[0.45rem] text-center text-[0.9rem] font-medium text-[#686b67] transition-colors hover:text-[#6b2737] max-[760px]:py-3 min-[761px]:w-auto" onClick={closeMenu}>
              Contact
            </a>
          </div>

          <div className="flex w-fit items-center gap-[0.85rem] rounded-full border border-[#161817]/15 bg-[#f1efe9]/80 px-[1.1rem] py-[0.65rem] shadow-[0_10px_30px_-10px_rgba(22,24,23,0.25)] backdrop-blur-2xl max-[760px]:w-full max-[760px]:justify-center">
            <a
              href="https://www.linkedin.com/in/joaosiilva/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg className="h-6 w-6 fill-current text-[#686b67] transition-all duration-300 hover:scale-110 hover:text-[#6b2737]" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.67 1.67 0 1 0 0 3.34 1.67 1.67 0 0 0 0-3.34Z" />
              </svg>
            </a>
            <a
              href="https://github.com/jhonnysilvadev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg className="h-6 w-6 fill-current text-[#686b67] transition-all duration-300 hover:scale-110 hover:text-[#6b2737]" viewBox="0 0 24 24">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
              </svg>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
