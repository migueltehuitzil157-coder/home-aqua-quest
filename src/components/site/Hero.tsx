import { Droplets, HeartHandshake, MapPin, ShieldCheck } from "lucide-react";

import hero from "@/assets/hero.jpg.asset.json";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/lead";
import { WaterSlider } from "./WaterSlider";

const TRUST = [
  { icon: Droplets, label: "Test de agua gratis" },
  { icon: MapPin, label: "Servicio en todo New Jersey" },
  { icon: ShieldCheck, label: "Sin compromiso" },
  { icon: HeartHandshake, label: "Atención personalizada" },
];

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden surface-hero">
      <div className="pointer-events-none absolute -right-40 -top-40 size-[38rem] rounded-full bg-aqua/25 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16 lg:px-8 lg:py-24">
        <div className="fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-background/70 px-4 py-1.5 text-xs font-bold tracking-[0.16em] text-primary">
            AGUA · NEW JERSEY
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] text-ocean-deep sm:text-5xl lg:text-6xl">
            Descubre qué hay en el agua de tu hogar.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Conoce la calidad de tu agua, descubre tus opciones y averigua cómo podrías ahorrar en
            agua embotellada.
          </p>
          <p className="mt-4 text-base font-semibold text-primary">
            Test de agua GRATIS para propietarios de viviendas en New Jersey.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#quiz"
              className="rounded-full surface-blue px-8 py-4 text-center text-sm font-bold tracking-wide text-primary-foreground shadow-lift transition-transform hover:-translate-y-0.5"
            >
              RECLAMAR MI TEST GRATIS
            </a>
            <div className="text-sm">
              <p className="text-muted-foreground">¿Prefieres hablar con nosotros?</p>
              <a href={PHONE_HREF} className="font-bold text-ocean hover:text-primary">
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4">
            {TRUST.map((item) => (
              <li key={item.label} className="flex items-start gap-3">
                <item.icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <span className="text-sm font-medium text-ocean">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="fade-up">
          <div className="overflow-hidden rounded-[2rem] border border-background/60 shadow-lift">
            <img
              src={hero.url}
              alt="Agua cristalina cayendo de una llave en una cocina moderna"
              width={1600}
              height={1200}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="grid gap-10 rounded-[2.5rem] border border-background/70 bg-background/70 p-6 backdrop-blur sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-bold text-ocean-deep sm:text-4xl">
              Del agua turbia al agua cristalina
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Un sistema de tratamiento bien elegido puede cambiar la apariencia, el sabor y el olor
              del agua de tu casa. Mueve el control y observa la diferencia.
            </p>
          </div>
          <WaterSlider />
        </div>
      </div>
    </section>
  );
}