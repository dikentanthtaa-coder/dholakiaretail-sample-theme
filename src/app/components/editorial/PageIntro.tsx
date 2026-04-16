import * as React from "react"

import { cn } from "../ui/utils"

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

type PageIntroProps = {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  meta?: React.ReactNode[]
  align?: "left" | "center"
  headingLevel?: HeadingLevel
  className?: string
  eyebrowClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  children?: React.ReactNode
}

export function PageIntro({
  eyebrow,
  title,
  description,
  meta,
  align = "left",
  headingLevel = 1,
  className,
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
  children,
}: PageIntroProps) {
  const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements

  return (
    <header className={cn("mx-auto w-full max-w-4xl", align === "center" ? "text-center" : "text-left", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "font-grotesk text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-text-muted",
            eyebrowClassName,
          )}
        >
          {eyebrow}
        </p>
      ) : null}

      <HeadingTag
        className={cn(
          "mt-4 text-[clamp(2.8rem,6vw,5.8rem)] font-semibold leading-[0.96] tracking-[-0.04em] text-text-primary",
          titleClassName,
        )}
        style={{ fontFamily: "var(--font-editorial)" }}
      >
        {title}
      </HeadingTag>

      {description ? (
        <p
          className={cn(
            "font-dm mt-6 max-w-2xl text-[1.05rem] leading-[1.85] text-text-secondary",
            align === "center" && "mx-auto",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}

      {meta && meta.length ? (
        <div className={cn("mt-8 flex flex-wrap gap-3", align === "center" && "justify-center")}>
          {meta.map((item, index) => (
            <span
              key={index}
              className="font-grotesk inline-flex items-center rounded-full border border-glass-border bg-bg-surface-elevated px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-text-muted"
            >
              {item}
            </span>
          ))}
        </div>
      ) : null}

      {children ? <div className={cn("mt-10", align === "center" && "flex justify-center")}>{children}</div> : null}
    </header>
  )
}
