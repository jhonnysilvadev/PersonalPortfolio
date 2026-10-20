import Script from "next/script";
import HomePage from "./portfolio/HomePage";

export default function Page() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jhonny Silva",
    jobTitle: "Desenvolvedor Front-end",
    url: "https://jhonnysilva.pt",
    sameAs: [
      "https://github.com/jhonnysilvadev",
      "https://www.linkedin.com/in/joaosiilva/",
    ],
  };

  return (
    <>
      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <HomePage />
    </>
  );
}