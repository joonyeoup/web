"use client"

import Image from "next/image"
import { useState, useRef, useEffect, useCallback } from "react"

interface ImageComparisonSliderProps {
  originalImage: string
  enhancedImage: string
  alt: string
  size: number
}

export function ImageComparisonSlider({ originalImage, enhancedImage, alt, size }: ImageComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50) // Set initial position to middle
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const handleRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback((clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = Math.min(Math.max(clientX - rect.left, 0), rect.width)
      const percentage = (x / rect.width) * 100
      setSliderPosition(100 - percentage)
    }
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX)
      }
    },
    [isDragging, handleMove],
  )

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (isDragging) {
        handleMove(e.touches[0].clientX)
      }
    },
    [isDragging, handleMove],
  )

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("touchmove", handleTouchMove)
    document.addEventListener("touchend", handleTouchEnd)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd])

  return (
    <div ref={containerRef} className="relative select-none" style={{ width: size, height: size }}>
      {/* Original image */}
      <Image
        src={originalImage || "/placeholder.svg"}
        alt={`Original ${alt}`}
        width={size}
        height={size}
        className="object-cover"
      />

      {/* Enhanced image */}
      <div
        className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${sliderPosition}% 0 0)` }}
      >
        <Image
          src={enhancedImage || "/placeholder.svg"}
          alt={`Enhanced ${alt}`}
          width={size}
          height={size}
          className="object-cover"
        />
      </div>

      {/* Slider handle */}
      <div
        ref={handleRef}
        className="absolute top-0 bottom-0 w-8 cursor-ew-resize flex items-center justify-center"
        style={{ left: `calc(${100 - sliderPosition}% - 16px)` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="w-1 h-full bg-white relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-16 bg-white rounded-full" />
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-1 pointer-events-none">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}

