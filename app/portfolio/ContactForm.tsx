"use client";

import { FormEvent, useState } from "react";
import ArrowUpRight from "../Components/ArrowUpRight";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function clearFieldError(field: string) {
    setFieldErrors((errors) => {
      if (!errors[field]) {
        return errors;
      }

      const nextErrors = { ...errors };
      delete nextErrors[field];
      return nextErrors;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const nextFieldErrors: Record<string, string> = {};

    if (!name) {
      nextFieldErrors.name = "Diz-me como te posso tratar.";
    }

    if (!email) {
      nextFieldErrors.email = "Preciso do teu email para responder.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextFieldErrors.email = "Esse email parece não estar correto.";
    }

    if (!message) {
      nextFieldErrors.message = "Escreve algumas palavras sobre o projeto.";
    }

    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors);
      setStatus("idle");
      return;
    }

    setFieldErrors({});
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Não foi possível enviar a mensagem.");
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro inesperado. Tenta novamente.",
      );
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="contact-form relative mt-12 grid max-w-2xl gap-5 border-t border-[#161817]/20 pt-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#4d5950]">
          Nome
          <input
            name="name"
            type="text"
            required
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
            className={`border-b bg-transparent px-0 py-3 text-base font-normal normal-case tracking-normal text-[#161817] outline-none transition-colors placeholder:text-[#858981] focus:border-[#6b2737] ${fieldErrors.name ? "border-[#6b2737]" : "border-[#161817]/30"}`}
            placeholder="O teu nome"
            onChange={() => clearFieldError("name")}
            onFocus={() => clearFieldError("name")}
          />
          {fieldErrors.name && <span id="name-error" className="form-field-error">{fieldErrors.name}</span>}
        </label>
        <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#4d5950]">
          Email
          <input
            name="email"
            type="email"
            required
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            className={`border-b bg-transparent px-0 py-3 text-base font-normal normal-case tracking-normal text-[#161817] outline-none transition-colors placeholder:text-[#858981] focus:border-[#6b2737] ${fieldErrors.email ? "border-[#6b2737]" : "border-[#161817]/30"}`}
            placeholder="o-teu@email.com"
            onChange={() => clearFieldError("email")}
            onFocus={() => clearFieldError("email")}
          />
          {fieldErrors.email && <span id="email-error" className="form-field-error">{fieldErrors.email}</span>}
        </label>
      </div>
      <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#4d5950]">
        Mensagem
        <textarea
          name="message"
          required
          rows={4}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
          className={`resize-y border-b bg-transparent px-0 py-3 text-base font-normal normal-case tracking-normal text-[#161817] outline-none transition-colors placeholder:text-[#858981] focus:border-[#6b2737] ${fieldErrors.message ? "border-[#6b2737]" : "border-[#161817]/30"}`}
          placeholder="Conta-me um pouco sobre o projeto..."
          onChange={() => clearFieldError("message")}
          onFocus={() => clearFieldError("message")}
        />
        {fieldErrors.message && <span id="message-error" className="form-field-error">{fieldErrors.message}</span>}
      </label>
      <div className="contact-form-trap" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center gap-3 rounded-full bg-[#161817] px-5 py-3 text-sm font-semibold text-[#f1efe9] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6b2737] hover:shadow-[0_6px_18px_rgba(107,39,55,0.16)] active:translate-y-0 active:shadow-none disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? "A enviar..." : "Enviar mensagem"}
          <ArrowUpRight />
        </button>
        {status === "success" && (
          <p role="status" className="border-l-2 border-[#86a889] pl-3 text-sm leading-5 text-[#4d5950]">
            Recebi a tua mensagem. Respondo-te o mais breve possível.
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="border-l-2 border-[#6b2737] pl-3 text-sm leading-5 text-[#6b2737]">
            {errorMessage}
          </p>
        )}
      </div>
    </form>
  );
}
