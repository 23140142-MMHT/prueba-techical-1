import { SafeImage } from "@/components/shared/SafeImage";

/**
 * Imagen del componente para la columna izquierda del binder.
 * Fondo crema claro (como los renders de 4414) y `object-contain` para que el
 * render del mecanismo —con el bumper visible para dar escala— se vea completo.
 */
export function BinderImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border"
      style={{ backgroundColor: "#f4f3ee" }}
    >
      <SafeImage
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-contain"
      />
    </div>
  );
}
