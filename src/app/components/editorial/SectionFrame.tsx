import * as React from "react"

import { cn } from "../ui/utils"

type SectionFrameOwnProps = {
  tone?: "canvas" | "surface" | "elevated"
  divider?: "none" | "top" | "bottom" | "both"
  padding?: "sm" | "md" | "lg"
  innerClassName?: string
}

type SectionFrameProps<As extends React.ElementType = "section"> = SectionFrameOwnProps & {
  as?: As
  className?: string
  children?: React.ReactNode
} & Omit<React.ComponentPropsWithoutRef<As>, keyof SectionFrameOwnProps | "as" | "children" | "className">

const toneClasses = {
  canvas: "bg-bg-deep",
  surface: "bg-bg-surface",
  elevated: "bg-bg-elevated",
} as const

const dividerClasses = {
  none: "",
  top: "border-t border-glass-border",
  bottom: "border-b border-glass-border",
  both: "border-y border-glass-border",
} as const

const paddingClasses = {
  sm: "py-16 lg:py-24",
  md: "py-20 lg:py-28",
  lg: "py-24 lg:py-36",
} as const

export function SectionFrame<As extends React.ElementType = "section">({
  as,
  tone = "canvas",
  divider = "none",
  padding = "md",
  className,
  innerClassName,
  children,
  ...rest
}: SectionFrameProps<As>) {
  const Component = as ?? "section"

  return (
    <Component
      {...rest}
      className={cn(toneClasses[tone], dividerClasses[divider], paddingClasses[padding], className)}
    >
      <div className={cn("mx-auto w-full max-w-7xl px-6 lg:px-14", innerClassName)}>{children}</div>
    </Component>
  )
}
