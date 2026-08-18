import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import antes from "@/assets/agua-antes.jpg.asset.json";
import despues from "@/assets/agua-despues.jpg.asset.json";

export function WaterSlider() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      e.preventDefault();
      setFromClientX(e.clientX);
    };
    const up = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [setFromClientX]);

  return (
    <div className="w-full">
      <div
        ref={ref}
        onPointerDown={(e) => {
          dragging.current = true;
          setFromClientX(e.clientX);
        }}
        className="relative aspect-square w-full select-none overflow-hidden rounded-[2rem] border border-border bg-surface shadow-lift touch-none"
      >
        <img
          src={despues.url}
          alt="Vaso con agua completamente cristalina"
          width={1200}
          height={1200}
          loading="lazy"
          draggable={false}
          className="absolute inset-0 size-full object-cover"
        />
        <img
          src={antes.url}
          alt="Vaso con agua con apariencia turbia antes del tratamiento"
          width={1200}
          height={1200}
          loading="lazy"
          draggable={false}
          className="absolute inset-0 size-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        />

        <span className="absolute left-4 top-4 rounded-full bg-ocean-deep/80 px-3 py-1 text-[0.7rem] font-bold tracking-[0.18em] text-primary-foreground backdrop-blur">
          ANTES
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-primary/85 px-3 py-1 text-[0.7rem] font-bold tracking-[0.18em] text-primary-foreground backdrop-blur">
          DESPUÉS
        </span>

        <div
          className="absolute inset-y-0 w-0.5 bg-background/90"
          style={{ left: `${pos}%` }}
        >
          <button
            type="button"
            role="slider"
            aria-label="Comparar agua antes y después"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
              if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
            }}
            className="absolute top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-background surface-blue text-primary-foreground shadow-lift"
          >
            <ChevronLeft className="size-4" aria-hidden />
            <ChevronRight className="size-4" aria-hidden />
          </button>
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Desliza para ver la diferencia. Imagen ilustrativa de un proceso de tratamiento de agua.
      </p>
    </div>
  );
}