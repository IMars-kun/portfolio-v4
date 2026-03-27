'use client'
/**
 * HERO SECTION
 * ════════════
 * The "frozen page" effect is achieved via:
 *
 * 1. Lenis smooth scroll — page moves at eased velocity
 * 2. GSAP scrub:true — elements animate DIRECTLY tied to scroll,
 *    creating the illusion they're independent of page movement
 * 3. Different parallax speeds per layer — creates depth
 * 4. Text character-split animation on load
 *
 * This is exactly how Stella Sora / Apple / Linear work.
 */
'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, Terminal } from 'lucide-react'
import { me, metrics } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

// Rotating text tags
const TAGS = ['Software Engineer', 'Cloud Architect', 'Full Stack Dev', 'DevOps Engineer', 'Open Source Contributor']

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headRef     = useRef<HTMLDivElement>(null)
  const subRef      = useRef<HTMLDivElement>(null)
  const bgRef       = useRef<HTMLDivElement>(null)
  const gridRef     = useRef<HTMLDivElement>(null)
  const statsRef    = useRef<HTMLDivElement>(null)
  const tagRef      = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const section = sectionRef.current!
    const ctx = gsap.context(() => {

      // ── 1. ENTRANCE ANIMATIONS (on page load) ─────────────
      const tl = gsap.timeline({ delay: .1 })

      // Chars split for name
      const nameEl = section.querySelector('.hero-name') as HTMLElement
      const chars  = nameEl.textContent?.split('') ?? []
      nameEl.innerHTML = chars
        .map(c => c === ' ' ? '<span class="inline-block">&nbsp;</span>' : `<span class="inline-block char">${c}</span>`)
        .join('')

      tl
        .fromTo('.hero-tag',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: .7, ease: 'power3.out' }
        )
        .fromTo(nameEl.querySelectorAll('.char'),
          { opacity: 0, y: 60, rotateX: -60 },
          { opacity: 1, y: 0, rotateX: 0,
            duration: .9,
            ease: 'back.out(1.5)',
            stagger: { amount: .5 },
          }, '-=.3'
        )
        .fromTo('.hero-role',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: .7, ease: 'power3.out' }, '-=.4'
        )
        .fromTo('.hero-desc',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: .7, ease: 'power3.out' }, '-=.4'
        )
        .fromTo('.hero-cta',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: .5, ease: 'power3.out', stagger: .1 }, '-=.4'
        )
        .fromTo(statsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: .7, ease: 'power3.out' }, '-=.3'
        )
        .fromTo('.hero-scroll',
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: .5, ease: 'power3.out' }, '-=.2'
        )

      // ── 2. SCROLL PARALLAX — "frozen page" effect ─────────
      // Each layer moves at a DIFFERENT rate than the page scroll.
      // The brain perceives depth because foreground > background speed.

      // Background grid — moves slowest (depth illusion)
      gsap.to(gridRef.current, {
        y: '-15%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,      // ← THIS is the key: tied 1:1 to scroll position
        },
      })

      // Background glow — moves slightly faster
      gsap.to(bgRef.current, {
        y: '-25%',
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Main content — moves fastest (closest layer)
      gsap.to(headRef.current, {
        y: '-40%',
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '60% top',
          scrub: 0.5,       // small number = smooth but not instant
        },
      })

      // Sub content — slightly slower than main
      gsap.to(subRef.current, {
        y: '-25%',
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '70% top',
          scrub: 0.5,
        },
      })

      // Stats — move with main but slightly offset
      gsap.to(statsRef.current, {
        y: '-10%',
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: '30% top',
          end: '80% top',
          scrub: 0.5,
        },
      })

      // ── 3. ROTATING TAG ANIMATION ─────────────────────────
      let tagIdx = 0
      const rotateTags = () => {
        tagIdx = (tagIdx + 1) % TAGS.length
        gsap.to(tagRef.current, {
          opacity: 0, y: -12, duration: .3, ease: 'power2.in',
          onComplete: () => {
            if (tagRef.current) tagRef.current.textContent = TAGS[tagIdx]
            gsap.to(tagRef.current, { opacity: 1, y: 0, duration: .4, ease: 'power2.out' })
          },
        })
      }
      const interval = setInterval(rotateTags, 2500)

      // ── 4. TERMINAL BLINK cursor ──────────────────────────
      gsap.to('.cursor-blink', {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: .5,
        ease: 'none',
      })

      return () => clearInterval(interval)
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" ref={sectionRef}
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--bg)' }}>

      {/* ── Animated grid background ── */}
      <div ref={gridRef} aria-hidden
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{
          backgroundImage: `
            linear-gradient(rgba(var(--ar),.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(var(--ar),.035) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'grid-flow 8s linear infinite',
        }} />

      {/* ── Radial glow ── */}
      <div ref={bgRef} aria-hidden
        className="absolute pointer-events-none will-change-transform"
        style={{
          width: '80vmax', height: '80vmax',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(var(--ar),.06) 0%, rgba(var(--a2r),.04) 30%, transparent 70%)',
          filter: 'blur(60px)',
        }} />

      {/* ── Diagonal accent line ── */}
      <div aria-hidden className="absolute top-0 right-0 w-px h-full pointer-events-none hidden lg:block"
        style={{ background: 'linear-gradient(to bottom, transparent 10%, var(--bd) 50%, transparent 90%)', left: '72%' }} />

      {/* ── Content ── */}
      <div className="relative z-10 wrap pt-[calc(var(--nav-h)+2rem)] pb-16 text-center lg:text-left">
        <div className="max-w-5xl mx-auto lg:mx-0">

          {/* Terminal tag */}
          <div className="hero-tag inline-flex items-center gap-2.5 px-3 py-1.5 mb-8"
            style={{ border: '1px solid var(--bd)', background: 'rgba(var(--ar),.04)' }}>
            <Terminal size={11} style={{ color: 'var(--a)' }} />
            <span className="font-mono text-[.6rem] tracking-[.25em] uppercase"
              style={{ color: 'var(--a)' }}>
              <span ref={tagRef}>{TAGS[0]}</span>
              <span className="cursor-blink ml-0.5" style={{ color: 'var(--a)' }}>_</span>
            </span>
          </div>

          {/* Name */}
          <div ref={headRef} className="will-change-transform" style={{ perspective: '800px' }}>
            <h1 className="hero-name font-display font-bold"
              style={{ fontSize: 'clamp(3.2rem, 8.5vw, 9rem)', letterSpacing: '-.04em', lineHeight: .95 }}>
              {me.name}
            </h1>
            <h2 className="hero-role mt-4 font-display font-semibold"
              style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', color: 'var(--fg-2)', fontWeight: 400 }}>
              {me.role} <span className="text-gradient">&amp; {me.tags[1]}</span>
            </h2>
          </div>

          {/* Desc + CTA */}
          <div ref={subRef} className="mt-8 will-change-transform">
            <p className="hero-desc max-w-lg text-sm sm:text-base leading-relaxed"
              style={{ color: 'var(--fg-2)', margin: 'auto', 'marginLeft': '0' } as React.CSSProperties}>
              {me.line}
            </p>

            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
              <button className="btn-primary hero-cta"
                onClick={() => {
                  const target = document.getElementById('about')
                  const win = window as Window & typeof globalThis & { lenis?: { scrollTo: (t: HTMLElement, o: object) => void } }
                  if (target) {
                    if (win.lenis) win.lenis.scrollTo(target, { offset: 0, duration: 6 })
                    else target.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                data-hover>
                <span>Get Started</span>
              </button>
              <a href={me.cv} download className="btn-ghost hero-cta" data-hover>
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div ref={statsRef} className="absolute bottom-0 left-0 right-0 will-change-transform">
        <div className="wrap">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-0"
            style={{ borderTop: '1px solid var(--bd2)' }}>
            {metrics.map((m, i) => (
              <div key={i}
                className="py-5 text-center"
                style={{
                  borderRight: i < 3 ? '1px solid var(--bd2)' : 'none',
                }}>
                <p className="font-display font-bold text-glow"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>{m.val}</p>
                <p className="font-mono text-[.58rem] tracking-[.2em] uppercase mt-1"
                  style={{ color: 'var(--fg-3)' }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button className="hero-scroll absolute bottom-24 right-8 hidden lg:flex flex-col items-center gap-2"
        style={{ color: 'var(--fg-3)', writingMode: 'vertical-rl' }}
        onClick={() => {
          const target = document.getElementById('frozen-scene')
          const win = window as Window & typeof globalThis & { lenis?: { scrollTo: (t: HTMLElement, o: object) => void } }
          if (target) {
            if (win.lenis) win.lenis.scrollTo(target, { offset: 0, duration: 2.8 })
            else target.scrollIntoView({ behavior: 'smooth' })
          }
        }}
        data-hover>
        <span className="font-mono text-[.55rem] tracking-[.3em] uppercase">Scroll</span>
        <ArrowDown size={12} style={{ writingMode: 'horizontal-tb' }}
          className="animate-bounce" />
      </button>
    </section>
  )
}
