import type { Metadata } from "next";
import HomePage from "./portfolio/HomePage";

export const metadata: Metadata = {
  title: "<Jhonny Silva/>",
  description: "Portfolio de Jhonny Silva, desenvolvedor front-end. Projetos WEB",
  openGraph: {
    title: "<Jhonny Silva/> | Desenvolvedor Front-end",
    description: "Portfolio de Jhonny Silva, desenvolvedor front-end. Projetos WEB",
  },
};

export default function Page() {
  return <HomePage />;
}