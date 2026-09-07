import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type VisualFrameProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  /** Soft vignette for text-over-image readability */
  vignette?: boolean;
};

export function VisualFrame({
  src,
  alt,
  width = 1376,
  height = 768,
  priority = false,
  className,
  imgClassName,
  sizes = "(max-width: 768px) 100vw, 90vw",
  vignette = false,
}: VisualFrameProps) {
  return (
    <figure
      className={cn(
        "visual-frame relative overflow-hidden",
        vignette && "visual-frame--vignette",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        sizes={sizes}
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </figure>
  );
}

type HeroVisualProps = {
  src: string;
  alt: string;
  children: ReactNode;
};

/** Full-bleed hero plane — image is the composition, copy sits inside */
export function HeroVisual({ src, alt, children }: HeroVisualProps) {
  return (
    <section className="hero-visual relative isolate w-full max-w-full min-h-[75vh] md:min-h-[min(92vh,880px)] overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="hero-visual__scrim" aria-hidden />
      <div className="container-site relative z-10 flex min-h-[75vh] md:min-h-[min(92vh,880px)] flex-col justify-center pt-28 pb-16 sm:pt-32 sm:pb-20 md:pb-24 md:pt-36">
        {children}
      </div>
    </section>
  );
}

type SectionVisualProps = {
  src: string;
  alt: string;
  eyebrow?: string;
  title: string;
  support?: string;
  children?: ReactNode;
  reverse?: boolean;
  className?: string;
  aspect?: "wide" | "square" | "tall";
};

/** Split editorial: large illustration + short copy. Image leads. */
export function SectionVisual({
  src,
  alt,
  eyebrow,
  title,
  support,
  children,
  reverse = false,
  className,
  aspect = "wide",
}: SectionVisualProps) {
  const aspectClass =
    aspect === "square"
      ? "aspect-square"
      : aspect === "tall"
        ? "aspect-[4/5]"
        : "aspect-[16/10]";

  return (
    <section className={cn("section-pad relative overflow-hidden", className)}>
      <div
        className={cn(
          "container-site grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16",
          reverse && "lg:[&>*:first-child]:order-2",
        )}
      >
        <VisualFrame
          src={src}
          alt={alt}
          className={cn("w-full", aspectClass)}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="max-w-lg">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h2 className="display-title mt-2 text-3xl md:text-5xl">{title}</h2>
          {support ? (
            <p className="mt-4 text-base font-medium leading-relaxed text-theme-muted md:text-lg">
              {support}
            </p>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  );
}

type FullBleedVisualProps = {
  src: string;
  alt: string;
  children?: ReactNode;
  className?: string;
  minHeight?: string;
};

export function FullBleedVisual({
  src,
  alt,
  children,
  className,
  minHeight = "min-h-[70vh]",
}: FullBleedVisualProps) {
  return (
    <section className={cn("relative isolate overflow-hidden", minHeight, className)}>
      <Image
        src={src}
        alt={alt}
        fill
        loading="lazy"
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="hero-visual__scrim hero-visual__scrim--soft" aria-hidden />
      {children ? (
        <div className="container-site relative z-10 flex min-h-[inherit] flex-col justify-end py-16 md:py-24">
          {children}
        </div>
      ) : null}
    </section>
  );
}
