import * as React from "react"

import { ImageWithFallback } from "../figma/ImageWithFallback"
import { cn } from "../ui/utils"

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

type BaseProps = {
  title: React.ReactNode
  description?: React.ReactNode
  eyebrow?: React.ReactNode
  image?: {
    src: string
    alt: string
    caption?: React.ReactNode
  }
  meta?: React.ReactNode[]
  headingLevel?: HeadingLevel
  className?: string
  bodyClassName?: string
}

type LinkedEditorialCardProps = BaseProps & {
  href: string
  children?: never
}

type StaticEditorialCardProps = BaseProps & {
  href?: never
  children?: React.ReactNode
}

type EditorialCardProps = LinkedEditorialCardProps | StaticEditorialCardProps

export function EditorialCard({
  title,
  description,
  eyebrow,
  image,
  meta,
  href,
  headingLevel = 3,
  className,
  bodyClassName,
  children,
}: EditorialCardProps) {
  const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements

  const cardClassName = cn(
    "group block overflow-hidden rounded-[2rem] border border-glass-border bg-bg-surface-elevated shadow-[0_18px_60px_rgba(31,33,28,0.06)] transition-transform duration-300 hover:-translate-y-1",
    href && "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40",
    className,
  )

  const content = (
    <>
      {image ? (
        <div className="relative overflow-hidden bg-bg-surface">
          <div className="aspect-[4/3]">
            <ImageWithFallback
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
          {image.caption ? (
            <p className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
              {image.caption}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className={cn("p-6 lg:p-8", bodyClassName)}>
        {eyebrow ? (
          <p className="font-grotesk text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-text-muted">
            {eyebrow}
          </p>
        ) : null}

        <HeadingTag
          className="mt-3 text-[clamp(1.4rem,2.8vw,2.1rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-text-primary"
          style={{ fontFamily: "var(--font-editorial)" }}
        >
          {title}
        </HeadingTag>

        {description ? (
          <p className="font-dm mt-4 text-[0.96rem] leading-[1.8] text-text-secondary">{description}</p>
        ) : null}

        {meta && meta.length ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {meta.map((item, index) => (
              <span
                key={index}
                className="font-grotesk inline-flex items-center rounded-full border border-glass-border bg-bg-deep/60 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-text-muted"
              >
                {item}
              </span>
            ))}
          </div>
        ) : null}

        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    </>
  )

  if (href) {
    return (
      <a href={href} className={cardClassName}>
        {content}
      </a>
    )
  }

  return <article className={cardClassName}>{content}</article>
}
