'use client'
/**
 * useGsapReveal
 * ─────────────
 * Registers GSAP ScrollTrigger animations on a container.
 * All children with [data-gsap] attributes get animated when
 * the container enters the viewport.
 *
 * Why GSAP instead of CSS/Framer for this:
 * - GSAP animations are driven by requestAnimationFrame
 * - ScrollTrigger uses a native Intersection Observer under the hood
 *   but overrides it with scroll-position math when scrub is active
 * - Result: animations NEVER miss a frame even at 120fps or fast scroll
 */
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Options {
  stagger?: number
  duration?: number
  ease?: string
  start?: string
  markers?: boolean
}

export default function useGsapReveal(opts: Options = {}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const {
      stagger  = 0.08,
      duration = 0.9,
      ease     = 'power3.out',
      start    = 'top 88%',
      markers  = false,
    } = opts

    const ctx = gsap.context(() => {
      // ── fade-up ──────────────────────────────────────
      const fadeUps = el.querySelectorAll('[data-gsap="fade-up"]')
      if (fadeUps.length) {
        gsap.fromTo(fadeUps,
          { opacity: 0, y: 40, willChange: 'transform, opacity' },
          {
            opacity: 1, y: 0,
            duration,
            ease,
            stagger,
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: 'play none none reverse', // ← reverse on scroll back!
              markers,
            },
          }
        )
      }

      // ── fade-left ────────────────────────────────────
      const fadeLefts = el.querySelectorAll('[data-gsap="fade-left"]')
      if (fadeLefts.length) {
        gsap.fromTo(fadeLefts,
          { opacity: 0, x: -50, willChange: 'transform, opacity' },
          {
            opacity: 1, x: 0,
            duration,
            ease,
            stagger,
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: 'play none none reverse',
              markers,
            },
          }
        )
      }

      // ── fade-right ───────────────────────────────────
      const fadeRights = el.querySelectorAll('[data-gsap="fade-right"]')
      if (fadeRights.length) {
        gsap.fromTo(fadeRights,
          { opacity: 0, x: 50, willChange: 'transform, opacity' },
          {
            opacity: 1, x: 0,
            duration,
            ease,
            stagger,
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: 'play none none reverse',
              markers,
            },
          }
        )
      }

      // ── scale-in ─────────────────────────────────────
      const scaleIns = el.querySelectorAll('[data-gsap="scale-in"]')
      if (scaleIns.length) {
        gsap.fromTo(scaleIns,
          { opacity: 0, scale: 0.9, willChange: 'transform, opacity' },
          {
            opacity: 1, scale: 1,
            duration,
            ease,
            stagger,
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: 'play none none reverse',
              markers,
            },
          }
        )
      }

      // ── line (scaleX reveal) ──────────────────────────
      const lines = el.querySelectorAll('[data-gsap="line"]')
      if (lines.length) {
        gsap.fromTo(lines,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power4.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: 'play none none reverse',
              markers,
            },
          }
        )
      }
    }, el)

    return () => ctx.revert()
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  return ref
}
