import * as React from "react"

import { cn } from "../ui/utils"

type LinkAction = {
  kind: "link"
  label: React.ReactNode
  href: string
  external?: boolean
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

type ButtonAction = {
  kind: "button"
  label: React.ReactNode
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

type Action = LinkAction | ButtonAction

type ClosingCtaProps = {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6
  primaryAction?: Action
  secondaryAction?: Action
  className?: string
}

function ActionButton({ action, primary }: { action: Action; primary?: boolean }) {
  const baseClass = cn(
    "font-grotesk inline-flex items-center justify-center rounded-full px-6 py-3 text-[0.8rem] font-semibold uppercase tracking-[0.18em] transition-all",
    primary
      ? "bg-text-primary text-bg-deep shadow-[0_18px_45px_rgba(31,33,28,0.18)] hover:-translate-y-0.5"
      : "border border-glass-border bg-bg-surface-elevated text-text-primary hover:border-glass-hover-border hover:bg-bg-surface",
  )

  if (action.kind === "link") {
    return (
      <a
        href={action.href}
        onClick={action.onClick}
        target={action.external ? "_blank" : undefined}
        rel={action.external ? "noreferrer" : undefined}
        className={baseClass}
      >
        {action.label}
      </a>
    )
  }

  return (
    <button type="button" onClick={action.onClick} className={baseClass}>
      {action.label}
    </button>
  )
}

export function ClosingCta({
  eyebrow,
  title,
  description,
  headingLevel = 2,
  primaryAction,
  secondaryAction,
  className,
}: ClosingCtaProps) {
  const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[2.5rem] border border-glass-border bg-bg-surface-elevated px-6 py-16 lg:px-12 lg:py-20",
        className,
      )}
      >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(115,132,117,0.14),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(85,101,89,0.08),transparent_42%)]" />
      <div className="relative mx-auto flex max-w-4xl flex-col items-start gap-8 text-left">
        {eyebrow ? (
          <p className="font-grotesk text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-text-muted">
            {eyebrow}
          </p>
        ) : null}
        <div className="max-w-3xl">
          <HeadingTag
            className="text-[clamp(2.2rem,5vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-text-primary"
            style={{ fontFamily: "var(--font-editorial)" }}
          >
            {title}
          </HeadingTag>
          {description ? (
            <p className="font-dm mt-5 max-w-2xl text-[1rem] leading-[1.85] text-text-secondary">
              {description}
            </p>
          ) : null}
        </div>

        {(primaryAction || secondaryAction) ? (
          <div className="flex flex-wrap gap-3">
            {primaryAction ? <ActionButton action={primaryAction} primary /> : null}
            {secondaryAction ? <ActionButton action={secondaryAction} /> : null}
          </div>
        ) : null}
      </div>
    </section>
  )
}
