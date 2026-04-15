import React, { useState } from 'react'

// Dark-themed subtle broken-image SVG (white strokes, low opacity)
const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMTUiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMy43Ij48cmVjdCB4PSIxNiIgeT0iMTYiIHdpZHRoPSI1NiIgaGVpZ2h0PSI1NiIgcng9IjYiLz48cGF0aCBkPSJtMTYgNTggMTYtMTggMzIgMzIiLz48Y2lyY2xlIGN4PSI1MyIgY3k9IjM1IiByPSI3Ii8+PC9zdmc+Cgo='

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  const { src, alt, style, className, ...rest } = props

  return didError ? (
    <div
      className={`inline-block bg-[#0d0d0d] text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  )
}
