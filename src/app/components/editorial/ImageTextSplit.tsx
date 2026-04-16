import * as React from "react"

import { ImageWithFallback } from "../figma/ImageWithFallback"
import { cn } from "../ui/utils"

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

type ImageTextSplitProps = {
  image: {
    src: string
    alt: string
    caption?: React.ReactNode
  }
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  reverse?: boolean
  headingLevel?: HeadingLevel
  className?: string
  mediaClassName?: string
  contentClassName?: string
}

export function ImageTextSplit({
  image,
  eyebrow,
  title,
  description,
  children,
  reverse = false,
  headingLevel = 2,
  className,
  mediaClassName,
  contentClassName,
}: ImageTextSplitProps) {
  const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements

  return (
    <div className={cn("grid items-center gap-10 lg:grid-cols-2 lg:gap-16", className)}>
      <div className={cn(reverse && "lg:order-2", mediaClassName)}>
        <div className="overflow-hidden rounded-[2rem] border border-glass-border bg-bg-surface-elevated shadow-[0_24px_80px_rgba(31,33,28,0.08)]">
          <ImageWithFallback src={image.src} alt={image.alt} className="h-full w-full object-cover" />
        </div>
        {image.caption ? (
          <p className="font-grotesk mt-4 text-[0.72rem] uppercase tracking-[0.2em] text-text-muted">
            {image.caption}
          </p>
        ) : null}
      </div>

      <div className={cn("max-w-xl", reverse && "lg:order-1", contentClassName)}>
        {eyebrow ? (
          <p className="font-grotesk text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-text-muted">
            {eyebrow}
          </p>
        ) : null}
        <HeadingTag
          className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-text-primary"
          style={{ fontFamily: "var(--font-editorial)" }}
        >
          {title}
        </HeadingTag>
        {description ? (
          <p className="font-dm mt-6 text-[1rem] leading-[1.85] text-text-secondary">{description}</p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </div>
  )
}
