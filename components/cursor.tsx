"use client"

import { useEffect, useRef, useState } from "react"

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const trailRef = useRef<HTMLDivElement | null>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isHoveringText, setIsHoveringText] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element | null
      if (!target) return
      
      // Check for interactive elements
      if (target.tagName === 'A' || 
          target.tagName === 'BUTTON' || 
          target.getAttribute('role') === 'button' ||
          target.classList.contains('cursor-pointer') ||
          target.closest('a') ||
          target.closest('button')) {
        setIsHovering(true)
      }
      
      // Check for text elements
      if (target.tagName === 'P' || 
          target.tagName === 'H1' || 
          target.tagName === 'H2' || 
          target.tagName === 'H3' || 
          target.tagName === 'H4' || 
          target.tagName === 'H5' || 
          target.tagName === 'H6' || 
          target.tagName === 'SPAN' || 
          target.classList.contains('text') ||
          (target.textContent && target.textContent.trim().length > 0 && 
           !target.tagName.match(/^(IMG|SVG|VIDEO|CANVAS|INPUT|BUTTON|A)$/))) {
        setIsHoveringText(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as Element | null
      if (!target) return
      
      // Reset interactive hover
      if (target.tagName === 'A' || 
          target.tagName === 'BUTTON' || 
          target.getAttribute('role') === 'button' ||
          target.classList.contains('cursor-pointer') ||
          target.closest('a') ||
          target.closest('button')) {
        setIsHovering(false)
      }
      
      // Reset text hover
      if (target.tagName === 'P' || 
          target.tagName === 'H1' || 
          target.tagName === 'H2' || 
          target.tagName === 'H3' || 
          target.tagName === 'H4' || 
          target.tagName === 'H5' || 
          target.tagName === 'H6' || 
          target.tagName === 'SPAN' || 
          target.classList.contains('text') ||
          (target.textContent && target.textContent.trim().length > 0 && 
           !target.tagName.match(/^(IMG|SVG|VIDEO|CANVAS|INPUT|BUTTON|A)$/))) {
        setIsHoveringText(false)
      }
    }

    window.addEventListener("mousemove", handleMove, { passive: true })
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)

    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
    }
  }, [])

  useEffect(() => {
    if (cursorRef.current && trailRef.current) {
      cursorRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      
      // Delayed trail effect
      setTimeout(() => {
        if (trailRef.current) {
          trailRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
        }
      }, 120)
    }
  }, [pos.x, pos.y])

  return (
    <>
      {/* Trail cursor - follows with delay, truly transparent with zoom effect */}
      <div
        ref={trailRef}
        className="pointer-events-none fixed z-[99] transition-transform duration-500 ease-out"
        style={{ willChange: "transform" }}
        aria-hidden="true"
      >
        <div className="relative -translate-x-4 -translate-y-4">
          {/* Outer circle - small size */}
          <div 
            className={`
              h-8 w-8 rounded-full
              transition-all duration-700 ease-out
              ${isHovering ? 'scale-150' : ''}
              ${isHoveringText ? 'scale-125' : ''}
              ${isClicking ? 'scale-90' : ''}
            `}
            style={{
              background: 'transparent',
              border: isHoveringText || isHovering 
                ? '1px solid rgba(255,255,255,0.15)' 
                : '1px solid rgba(255,255,255,0.08)',
              boxShadow: 'none'
            }}
          />
          
          {/* Magnification effect - shows zoomed content */}
          {isHoveringText && (
            <div 
              className="absolute inset-0 h-8 w-8 rounded-full overflow-hidden"
              style={{
                transform: 'scale(1.5)',
                background: 'rgba(255,255,255,0.02)',
                backdropFilter: 'blur(0.5px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: 'inset 0 0 20px rgba(255,255,255,0.05)'
              }}
            >
              {/* Lens effect */}
              <div 
                className="absolute inset-1 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%)',
                  transform: 'scale(0.8)'
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-[100] transition-transform duration-100 ease-out"
        style={{ willChange: "transform" }}
        aria-hidden="true"
      >
        <div className="relative -translate-x-2 -translate-y-2">
          {/* Outer glow ring */}
          <div 
            className={`
              absolute inset-0 h-4 w-4 rounded-full
              transition-all duration-300 ease-out
              ${isHovering ? 'scale-200 opacity-70' : 'scale-100 opacity-40'}
              ${isHoveringText ? 'scale-150 opacity-60' : ''}
              ${isClicking ? 'scale-75 opacity-90' : ''}
            `}
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 40%, transparent 70%)',
              filter: 'blur(2px)'
            }}
          />
          
          {/* Main cursor dot */}
          <div 
            className={`
              relative h-4 w-4 rounded-full transition-all duration-300 ease-out
              ${isHovering ? 'scale-125 bg-white shadow-lg shadow-white/60' : 'bg-zinc-100'}
              ${isHoveringText ? 'scale-110 bg-zinc-200' : ''}
              ${isClicking ? 'scale-75 bg-zinc-300' : ''}
            `}
            style={{
              boxShadow: isHovering 
                ? '0 0 25px rgba(255,255,255,0.7), 0 0 50px rgba(255,255,255,0.4)' 
                : isHoveringText
                ? '0 0 15px rgba(255,255,255,0.5)'
                : '0 0 10px rgba(255,255,255,0.3)'
            }}
          >
            {/* Inner sparkle effect */}
            <div 
              className={`
                absolute inset-1 rounded-full transition-all duration-300
                ${isHovering ? 'opacity-100 bg-gradient-to-tr from-transparent via-white/90 to-transparent' : 'opacity-0'}
                ${isHoveringText ? 'opacity-60 bg-gradient-to-tr from-transparent via-white/70 to-transparent' : ''}
              `}
            />
          </div>

          {/* Click ripple effect */}
          {isClicking && (
            <div 
              className="absolute inset-0 h-4 w-4 rounded-full animate-ping"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)'
              }}
            />
          )}
        </div>
      </div>
    </>
  )
}