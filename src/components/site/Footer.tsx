import logo from "@/assets/nova-logo.png.asset.json";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/lead";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <img
            src={logo.url}
            alt="Nova Home Services"
            width={816}
            height={737}
            loading="lazy"
            className="h-20 w-auto"
          />
          <p className="mt-5 text-sm text-muted-foreground">
            Tratamiento y calidad de agua para hogares en New Jersey.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-ocean-deep">Contacto</h3>
          <a
            href={PHONE_HREF}
            className="mt-4 block text-lg font-bold text-primary hover:underline"
          >
            {PHONE_DISPLAY}
          </a>
          <p className="mt-2 text-sm text-muted-foreground">New Jersey</p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-ocean-deep">Navegación</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {[
              { label: "Inicio", href: "#inicio" },
              { label: "Nuestro Proceso", href: "#proceso" },
              { label: "Tecnología", href: "#tecnologia" },
              { label: "Preguntas", href: "#preguntas" },
              { label: "Reclamar mi test", href: "#quiz" },
            ].map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-primary">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-3 border-t border-border px-4 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Nova Home Services. Todos los derechos reservados.</p>
        <div className="flex gap-5">
          <a href="#preguntas" className="hover:text-primary">
            Aviso de privacidad
          </a>
          <a href="#preguntas" className="hover:text-primary">
            Términos y condiciones
          </a>
        </div>
      </div>
    </footer>
  );
}