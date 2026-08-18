import { useState } from "react";
import {
  Beaker,
  ClipboardCheck,
  Droplets,
  PhoneCall,
  PiggyBank,
  Search,
  Wallet,
  Wrench,
} from "lucide-react";

import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/lead";
import wqa from "@/assets/wqa.png.asset.json";
import nsf from "@/assets/nsf.png.asset.json";
import vortech from "@/assets/vortech.png.asset.json";
import usa from "@/assets/made-in-usa.png.asset.json";

export function Process() {
  const steps = [
    {
      icon: ClipboardCheck,
      title: "Completas el formulario",
      text: "Toma menos de un minuto.",
    },
    {
      icon: PhoneCall,
      title: "Te llamamos en 24 horas",
      text: "Confirmamos día y hora del test.",
    },
    {
      icon: Beaker,
      title: "Analizamos tu agua, gratis",
      text: "Realizamos el análisis y revisamos los resultados contigo.",
    },
  ];

  return (
    <section id="proceso" className="scroll-mt-24 bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="max-w-2xl text-3xl font-bold text-ocean-deep sm:text-4xl">
          ¿Qué pasa después?
        </h2>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="relative rounded-3xl border border-border bg-background p-7 shadow-soft"
            >
              <span className="text-xs font-bold tracking-[0.2em] text-primary">
                0{i + 1}
              </span>
              <span className="mt-4 flex size-12 items-center justify-center rounded-2xl bg-aqua-soft text-primary">
                <s.icon className="size-6" aria-hidden />
              </span>
              <h3 className="mt-5 text-lg font-bold text-ocean-deep">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 grid gap-4 rounded-3xl surface-deep p-8 text-primary-foreground sm:grid-cols-2 sm:p-10">
          <p className="text-xl font-semibold">
            Si tu agua ya está bien, te lo decimos honestamente.
          </p>
          <p className="text-sm leading-relaxed opacity-90">
            No firmas nada. No vendemos puerta a puerta. Si no necesitas el sistema, no te lo
            ofrecemos.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Savings() {
  const [bottles, setBottles] = useState(3);
  const [price, setPrice] = useState(7);
  const weekly = bottles * price;

  const money = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-primary">
            <PiggyBank className="size-4" aria-hidden /> AHORRO
          </span>
          <h2 className="mt-4 text-3xl font-bold text-ocean-deep sm:text-4xl">
            ¿Cuánto estás gastando en agua cada semana?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Si compras garrafones o agua embotellada constantemente, esos gastos pueden acumularse
            rápidamente.
          </p>
          <p className="mt-4 text-lg font-semibold text-ocean">
            Descubre cuánto podrías ahorrar.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Podrías ahorrar dependiendo de tu consumo. Empieza por descubrir cuánto gastas
            actualmente.
          </p>
        </div>

        <div className="rounded-[2rem] border border-border bg-background p-6 shadow-soft sm:p-8">
          <div className="space-y-7">
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="bottles" className="text-sm font-semibold text-ocean">
                  ¿Cuántos garrafones compras por semana?
                </label>
                <span className="text-sm font-bold text-primary">{bottles}</span>
              </div>
              <input
                id="bottles"
                type="range"
                min={0}
                max={15}
                value={bottles}
                onChange={(e) => setBottles(Number(e.target.value))}
                className="mt-3 w-full accent-[var(--primary)]"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="price" className="text-sm font-semibold text-ocean">
                  ¿Cuánto pagas por cada uno?
                </label>
                <span className="text-sm font-bold text-primary">{money(price)}</span>
              </div>
              <input
                id="price"
                type="range"
                min={1}
                max={20}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="mt-3 w-full accent-[var(--primary)]"
              />
            </div>
          </div>

          <dl className="mt-8 grid grid-cols-3 gap-3 text-center">
            {[
              { k: "Gasto semanal", v: money(weekly) },
              { k: "Gasto mensual aprox.", v: money(weekly * 4.33) },
              { k: "Gasto anual aprox.", v: money(weekly * 52) },
            ].map((item) => (
              <div key={item.k} className="rounded-2xl bg-surface px-3 py-4">
                <dt className="text-[0.7rem] font-medium text-muted-foreground">{item.k}</dt>
                <dd className="mt-1 text-lg font-extrabold text-ocean-deep sm:text-xl">
                  {item.v}
                </dd>
              </div>
            ))}
          </dl>

          <a
            href="#quiz"
            className="mt-6 flex items-center justify-center gap-2 rounded-full border border-primary/30 px-5 py-3 text-sm font-bold text-primary transition-colors hover:bg-aqua-soft/60"
          >
            <Wallet className="size-4" aria-hidden /> Descubre cuánto podrías ahorrar
          </a>
        </div>
      </div>
    </section>
  );
}

export function Benefits() {
  const cards = [
    { icon: Droplets, title: "Conoce la calidad de tu agua" },
    { icon: Search, title: "Identifica problemas de sabor, olor o sarro" },
    { icon: Wrench, title: "Descubre opciones para tu hogar" },
    { icon: PiggyBank, title: "Conoce cómo podrías reducir tu gasto en agua embotellada" },
  ];

  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="max-w-2xl text-3xl font-bold text-ocean-deep sm:text-4xl">
          ¿Qué puedes descubrir con un análisis de agua?
        </h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div
              key={c.title}
              className="rounded-3xl border border-border bg-background p-7 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-aqua-soft text-primary">
                <c.icon className="size-6" aria-hidden />
              </span>
              <h3 className="mt-5 text-base font-bold leading-snug text-ocean-deep">{c.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Technology() {
  const creds = [
    {
      logo: wqa.url,
      alt: "WQA Gold Seal – Tested and Certified under industry standards",
      title: "WQA Gold Seal",
      text: "Productos certificados bajo estándares WQA.",
      h: 296,
      w: 297,
    },
    {
      logo: nsf.url,
      alt: "NSF",
      title: "NSF®",
      text: "Productos certificados según estándares NSF aplicables.",
      h: 520,
      w: 519,
    },
    {
      logo: vortech.url,
      alt: "Vortech Distribution Technology",
      title: "Vortech®",
      text: "Vortech Distribution Technology.",
      h: 444,
      w: 505,
    },
    {
      logo: usa.url,
      alt: "Made in the USA",
      title: "Made in USA",
      text: "Fabricación en EE. UU. en productos/componentes aplicables.",
      h: 504,
      w: 512,
    },
  ];

  return (
    <section id="tecnologia" className="scroll-mt-24 bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-ocean-deep sm:text-4xl">
            Tecnología en la que puedes confiar
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Utilizamos productos y tecnología de fabricantes establecidos, respaldados por
            estándares reconocidos de la industria.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {creds.map((c) => (
            <div
              key={c.title}
              className="flex flex-col items-center rounded-3xl border border-border bg-background/70 px-6 py-9 text-center"
            >
              <img
                src={c.logo}
                alt={c.alt}
                width={c.w}
                height={c.h}
                loading="lazy"
                className="h-20 w-auto object-contain"
              />
              <h3 className="mt-6 text-base font-bold text-ocean-deep">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          Las certificaciones y especificaciones corresponden a productos, componentes o tecnologías
          específicos y pueden variar según el modelo.
        </p>
      </div>
    </section>
  );
}

export function Faq() {
  const items = [
    {
      q: "¿El análisis de agua realmente es gratis?",
      a: "Sí. Visitamos tu casa, analizamos el agua y revisamos los resultados contigo sin costo y sin compromiso.",
    },
    {
      q: "¿Cuánto tiempo toma?",
      a: "La visita suele tomar poco tiempo y te explicamos cada resultado en el momento, en español.",
    },
    {
      q: "¿En qué zonas dan servicio?",
      a: "Atendemos a propietarios de viviendas en todo New Jersey.",
    },
    {
      q: "¿Tengo que comprar algo después del análisis?",
      a: "No. Si tu agua ya está bien, te lo decimos honestamente y ahí termina la visita.",
    },
  ];

  return (
    <section id="preguntas" className="scroll-mt-24 bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-ocean-deep sm:text-4xl">Preguntas frecuentes</h2>
        <div className="mt-10 divide-y divide-border overflow-hidden rounded-3xl border border-border">
          {items.map((item) => (
            <details key={item.q} className="group bg-background p-6 open:bg-surface">
              <summary className="cursor-pointer list-none text-base font-semibold text-ocean-deep marker:hidden">
                {item.q}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="surface-deep py-16 text-primary-foreground sm:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold sm:text-4xl">
          ¿Quieres saber qué hay realmente en el agua de tu hogar?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed opacity-90">
          Descubre la calidad de tu agua, conoce tus opciones y averigua cómo podrías ahorrar en agua
          embotellada.
        </p>
        <a
          href="#quiz"
          className="mt-9 inline-block rounded-full bg-background px-9 py-4 text-sm font-bold tracking-wide text-primary shadow-lift transition-transform hover:-translate-y-0.5"
        >
          RECLAMAR MI TEST GRATIS
        </a>
        <p className="mt-7 text-sm opacity-80">¿Prefieres hablar con nosotros?</p>
        <a href={PHONE_HREF} className="mt-1 inline-block text-xl font-bold underline-offset-4 hover:underline">
          {PHONE_DISPLAY}
        </a>
      </div>
    </section>
  );
}