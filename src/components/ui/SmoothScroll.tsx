'use client'
/**
 * SMOOTH SCROLL ENGINE
 * ────────────────────
 * Uses Lenis for butter-smooth scrolling, integrated with
 * GSAP ScrollTrigger so all GSAP animations stay in sync.
 *
 * Lenis works by:
 * 1. Intercepting native scroll
 * 2. Applying an eased lerp (linear interpolation)
 * 3. Translating the page via transform (GPU-composited)
 *
 * Result: scroll feels like Apple.com / Stella Sora
 */
import { useEffect, useRef, type ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export { gsap, ScrollTrigger }

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,          // lerp duration (lower = snappier)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // GSAP ticker drives Lenis RAF
    const ticker = gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0) // Disable lag smoothing to avoid jumps

    // Make lenis available globally (for anchor-link scrolling)
    ;(window as Window & typeof globalThis & { lenis?: Lenis }).lenis = lenis

    return () => {
      lenis.destroy()
      gsap.ticker.remove(ticker)
    }
  }, [])

  return <>{children}</>
}
