import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";

import logo from "@/assets/nova-logo.png.asset.json";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/lead";

const NAV = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nuestro Proceso", href: "#proceso" },
  { label: "Tecnología", href: "#tecnologia" },
  { label: "Preguntas", href: "#preguntas" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-border/70 bg-background/90 backdrop-blur-xl shadow-soft"
          : "border-transparent bg-background/70 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#inicio" className="flex shrink-0 items-center" aria-label="Nova Home Services">
          <img
            src={logo.url}
            alt="Nova Home Services"
            width={816}
            height={737}
            className="h-16 w-auto sm:h-20 lg:h-24"
          />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={PHONE_HREF}
            className="hidden items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-ocean transition-colors hover:border-primary/40 hover:text-primary sm:inline-flex"
          >
            <Phone className="size-4" aria-hidden />
            {PHONE_DISPLAY}
          </a>
          <a
            href={PHONE_HREF}
            aria-label={`Llamar al ${PHONE_DISPLAY}`}
            className="inline-flex size-11 items-center justify-center rounded-full border border-border text-ocean sm:hidden"
          >
            <Phone className="size-5" aria-hidden />
          </a>
          <a
            href="#quiz"
            className="hidden rounded-full surface-blue px-5 py-3 text-xs font-bold tracking-wide text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 sm:inline-block"
          >
            RECLAMAR MI TEST
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
            aria-expanded={open}
            className="inline-flex size-11 items-center justify-center rounded-full border border-border text-ocean lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background px-4 pb-6 pt-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-semibold text-ocean transition-colors hover:bg-surface"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#quiz"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-full surface-blue px-6 py-4 text-center text-sm font-bold tracking-wide text-primary-foreground"
          >
            RECLAMAR MI TEST GRATIS
          </a>
          <a
            href={PHONE_HREF}
            className="mt-3 block text-center text-sm font-semibold text-primary"
          >
            {PHONE_DISPLAY}
          </a>
        </div>
      ) : null}
    </header>
  );
}