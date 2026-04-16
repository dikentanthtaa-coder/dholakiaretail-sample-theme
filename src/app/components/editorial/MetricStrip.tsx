import * as React from "react"

import { cn } from "../ui/utils"

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

type Metric = {
  value: React.ReactNode
  label: React.ReactNode
  detail?: React.ReactNode
}

type MetricStripProps = {
  metrics: Metric[]
  eyebrow?: React.ReactNode
  title?: React.ReactNode
  headingLevel?: HeadingLevel
  className?: string
  itemClassName?: string
}

export function MetricStrip({
  metrics,
  eyebrow,
  title,
  headingLevel = 3,
  className,
  itemClassName,
}: MetricStripProps) {
  const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements

  return (
    <section className={cn("rounded-[2rem] border border-glass-border bg-bg-surface-elevated p-6 lg:p-8", className)}>
      {(eyebrow || title) && (
        <div className="mb-8">
          {eyebrow ? (
            <p className="font-grotesk text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-text-muted">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <HeadingTag
              className="mt-2 text-[clamp(1.4rem,2.5vw,2rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-text-primary"
              style={{ fontFamily: "var(--font-editorial)" }}
            >
              {title}
            </HeadingTag>
          ) : null}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={cn(
              "rounded-[1.5rem] border border-glass-border bg-bg-deep/60 p-5",
              itemClassName,
            )}
          >
            <div className="text-[clamp(1.75rem,3vw,2.8rem)] font-semibold leading-none tracking-[-0.04em] text-text-primary">
              {metric.value}
            </div>
            <p className="font-grotesk mt-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-text-muted">
              {metric.label}
            </p>
            {metric.detail ? <p className="font-dm mt-3 text-[0.92rem] leading-[1.7] text-text-secondary">{metric.detail}</p> : null}
          </div>
        ))}
      </div>
    </section>
  )
}
