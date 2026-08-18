import { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  Droplet,
  Home,
  Key,
  Loader2,
  Search,
  ShowerHead,
  Sparkles,
  Sun,
  Wind,
} from "lucide-react";

import { submitLead, type Lead } from "@/lib/lead";

type Contact = {
  name: string;
  phone: string;
  email: string;
  address: string;
  zip: string;
};

const OWNERSHIP = [
  { value: "Sí, soy dueño", icon: Home },
  { value: "Estoy rentando", icon: Key },
  { value: "Estoy en proceso de comprar", icon: Search },
];

const SYMPTOMS = [
  { value: "Sabor o mal olor", icon: Wind },
  { value: "Sarro en cafetera o regadera", icon: ShowerHead },
  { value: "Piel reseca o caída de cabello", icon: Sparkles },
  { value: "Compro garrafones cada semana", icon: Droplet },
  { value: "No estoy seguro", icon: AlertCircle },
];

const TIMING = [
  {
    value: "Esta semana",
    help: "Más urgente, mejor disponibilidad de cuadrillas.",
    icon: CalendarClock,
  },
  {
    value: "La próxima semana",
    help: "Te llamamos a confirmar día y hora.",
    icon: CalendarDays,
  },
  { value: "Fin de semana", help: "Sábado o domingo, mañana o tarde.", icon: Sun },
];

const EMPTY: Contact = { name: "", phone: "", email: "", address: "", zip: "" };

export function Quiz() {
  const [step, setStep] = useState(0);
  const [ownership, setOwnership] = useState("");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [timing, setTiming] = useState("");
  const [contact, setContact] = useState<Contact>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Contact, string>>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const progress = useMemo(() => Math.min(3, step + 1), [step]);

  function toggleSymptom(value: string) {
    setSymptoms((prev) => {
      if (value === "No estoy seguro") return prev.includes(value) ? [] : [value];
      const without = prev.filter((s) => s !== "No estoy seguro");
      return without.includes(value)
        ? without.filter((s) => s !== value)
        : [...without, value];
    });
  }

  function validate() {
    const next: Partial<Record<keyof Contact, string>> = {};
    if (contact.name.trim().length < 3) next.name = "Escribe tu nombre completo.";
    if (contact.phone.replace(/\D/g, "").length < 10) next.phone = "Escribe un teléfono válido.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact.email.trim()))
      next.email = "Escribe un email válido.";
    if (contact.address.trim().length < 4) next.address = "Escribe tu dirección.";
    if (!/^\d{5}$/.test(contact.zip.trim())) next.zip = "Escribe un ZIP de 5 dígitos.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    const lead: Lead = {
      homeOwnership: ownership,
      waterSymptoms: symptoms,
      visitTiming: timing,
      ...contact,
      source: "landing-agua-nj",
      submittedAt: new Date().toISOString(),
    };
    try {
      await submitLead(lead);
      setDone(true);
    } catch (err) {
      console.error(err);
      setDone(true);
    } finally {
      setSending(false);
    }
  }

  function reset() {
    setStep(0);
    setOwnership("");
    setSymptoms([]);
    setTiming("");
    setContact(EMPTY);
    setErrors({});
    setDone(false);
  }

  const cardBase =
    "group flex w-full items-center gap-4 rounded-2xl border bg-background p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-soft";

  return (
    <section id="quiz" className="scroll-mt-24 bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-border bg-background p-5 shadow-lift sm:p-10">
          {done ? (
            <div className="fade-up text-center">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full surface-blue text-primary-foreground">
                <CheckCircle2 className="size-8" aria-hidden />
              </div>
              <h2 className="mt-6 text-3xl font-bold text-ocean-deep">¡Listo!</h2>
              <p className="mt-3 text-lg font-semibold text-ocean">Recibimos tu solicitud.</p>
              <p className="mx-auto mt-4 max-w-md text-muted-foreground">
                Te llamaremos en un plazo de 24 horas para confirmar el día y la hora de tu análisis
                de agua.
              </p>
              <p className="mt-6 rounded-2xl bg-surface px-5 py-4 text-sm font-medium text-ocean">
                Si tu agua ya está bien, te lo diremos honestamente.
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-8 rounded-full border border-border px-6 py-3 text-sm font-bold text-ocean transition-colors hover:border-primary/50 hover:text-primary"
              >
                Volver al inicio
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs font-bold tracking-[0.14em] text-primary">
                  <span>{step < 3 ? `PASO ${progress} DE 3` : "ÚLTIMO PASO"}</span>
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => setStep((s) => s - 1)}
                      className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary"
                    >
                      <ArrowLeft className="size-3.5" aria-hidden /> ATRÁS
                    </button>
                  ) : null}
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full surface-blue transition-all duration-500"
                    style={{ width: `${((step + 1) / 4) * 100}%` }}
                  />
                </div>
              </div>

              {step === 0 ? (
                <div key="q1" className="fade-up">
                  <h2 className="text-2xl font-bold text-ocean-deep sm:text-3xl">
                    ¿La casa es tuya?
                  </h2>
                  <div className="mt-6 space-y-3">
                    {OWNERSHIP.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setOwnership(opt.value);
                          setTimeout(() => setStep(1), 160);
                        }}
                        className={`${cardBase} ${
                          ownership === opt.value
                            ? "border-primary bg-aqua-soft/60 shadow-soft"
                            : "border-border"
                        }`}
                      >
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-aqua-soft text-primary">
                          <opt.icon className="size-5" aria-hidden />
                        </span>
                        <span className="text-base font-semibold text-ocean">{opt.value}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {step === 1 ? (
                <div key="q2" className="fade-up">
                  <h2 className="text-2xl font-bold text-ocean-deep sm:text-3xl">
                    ¿Qué notas en el agua?
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Puedes elegir las que apliquen. Cuantas más, mejor sabremos qué probar.
                  </p>
                  <div className="mt-6 space-y-3">
                    {SYMPTOMS.map((opt) => {
                      const active = symptoms.includes(opt.value);
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => toggleSymptom(opt.value)}
                          className={`${cardBase} ${
                            active ? "border-primary bg-aqua-soft/60 shadow-soft" : "border-border"
                          }`}
                        >
                          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-aqua-soft text-primary">
                            <opt.icon className="size-5" aria-hidden />
                          </span>
                          <span className="flex-1 text-base font-semibold text-ocean">
                            {opt.value}
                          </span>
                          <span
                            className={`flex size-6 items-center justify-center rounded-md border ${
                              active ? "border-primary surface-blue" : "border-border"
                            }`}
                          >
                            {active ? (
                              <CheckCircle2 className="size-4 text-primary-foreground" aria-hidden />
                            ) : null}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    disabled={symptoms.length === 0}
                    onClick={() => setStep(2)}
                    className="mt-7 w-full rounded-full surface-blue px-6 py-4 text-sm font-bold tracking-wide text-primary-foreground shadow-soft transition-transform enabled:hover:-translate-y-0.5 disabled:opacity-40"
                  >
                    Continuar
                  </button>
                </div>
              ) : null}

              {step === 2 ? (
                <div key="q3" className="fade-up">
                  <h2 className="text-2xl font-bold text-ocean-deep sm:text-3xl">
                    ¿Cuándo te visitamos?
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Te llamamos para confirmar el día y la hora exacta.
                  </p>
                  <div className="mt-6 space-y-3">
                    {TIMING.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setTiming(opt.value);
                          setTimeout(() => setStep(3), 160);
                        }}
                        className={`${cardBase} items-start ${
                          timing === opt.value
                            ? "border-primary bg-aqua-soft/60 shadow-soft"
                            : "border-border"
                        }`}
                      >
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-aqua-soft text-primary">
                          <opt.icon className="size-5" aria-hidden />
                        </span>
                        <span>
                          <span className="block text-base font-semibold text-ocean">
                            {opt.value}
                          </span>
                          <span className="mt-1 block text-sm text-muted-foreground">
                            {opt.help}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {step === 3 ? (
                <form onSubmit={onSubmit} className="fade-up" noValidate>
                  <h2 className="text-2xl font-bold text-ocean-deep sm:text-3xl">
                    ¡Ya casi terminamos!
                  </h2>
                  <p className="mt-2 text-lg font-semibold text-ocean">Tus datos para agendar</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Solo los usamos para llamarte y confirmar la cita.
                  </p>

                  <div className="mt-6 space-y-4">
                    {(
                      [
                        { key: "name", label: "Nombre completo *", ph: "María García", type: "text" },
                        { key: "phone", label: "Teléfono *", ph: "(210) 555-0123", type: "tel" },
                        { key: "email", label: "Email *", ph: "tu@email.com", type: "email" },
                        { key: "address", label: "Dirección *", ph: "Calle y número", type: "text" },
                        { key: "zip", label: "ZIP *", ph: "07001", type: "text" },
                      ] as const
                    ).map((f) => (
                      <div key={f.key}>
                        <label
                          htmlFor={f.key}
                          className="mb-2 block text-sm font-semibold text-ocean"
                        >
                          {f.label}
                        </label>
                        <input
                          id={f.key}
                          type={f.type}
                          inputMode={f.key === "zip" ? "numeric" : undefined}
                          placeholder={f.ph}
                          value={contact[f.key]}
                          maxLength={f.key === "zip" ? 5 : 120}
                          onChange={(e) =>
                            setContact((c) => ({ ...c, [f.key]: e.target.value }))
                          }
                          className={`w-full rounded-2xl border bg-background px-4 py-4 text-base text-ocean outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-ring/30 ${
                            errors[f.key] ? "border-destructive" : "border-input"
                          }`}
                        />
                        {errors[f.key] ? (
                          <p className="mt-1.5 text-xs font-medium text-destructive">
                            {errors[f.key]}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full surface-blue px-6 py-4 text-sm font-bold tracking-wide text-primary-foreground shadow-lift transition-transform enabled:hover:-translate-y-0.5 disabled:opacity-60"
                  >
                    {sending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
                    RECLAMAR MI TEST GRATIS
                  </button>
                </form>
              ) : null}
            </>
          )}
        </div>
      </div>
    </section>
  );
}