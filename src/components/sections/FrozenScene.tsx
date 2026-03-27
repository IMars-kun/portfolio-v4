'use client'
/**
 * FINGERPRINT SCAN — Cinematic Frozen Page Animation
 * ═══════════════════════════════════════════════════
 * Sidik jari asli dibuat dengan teknik:
 *
 * 1. SPIRAL CORE — loop kecil di tengah (titik karakteristik)
 * 2. ARC RIDGES  — garis melengkung yang flow keluar dari core
 *                  Upper half: arcs membuka ke atas (seperti topi)
 *                  Lower half: arcs melebar ke bawah (oval terbuka)
 *                  Ridge breaks: gap acak = minutiae (bifurcations)
 * 3. OUTER SHAPE — oval vertikal (sidik jari lebih tinggi dari lebar)
 *
 * Animasi (GSAP scrub, pin):
 *   0.00-0.10  Frame + fingerprint materialize (stroke-dashoffset)
 *   0.10-0.60  Laser sweeps top→bottom, each ridge illuminates
 *              saat beam melewatinya
 *   0.60-0.75  Pulse rings dari core
 *   0.75-0.88  VERIFIED label + status
 *   0.88-1.00  Fade out
 */
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ════════════════════════════════════════════════════════════
   FINGERPRINT PATH DATA
   Dibangun manual untuk menyerupai sidik jari tipe "loop"
   ViewBox: 0 0 200 240 (vertikal oval, proporsional)
   ════════════════════════════════════════════════════════════ */

const CX = 100  // center X
const CY = 115  // center Y (sedikit ke atas dari tengah vertikal)

/*
 * Setiap ridge adalah cubic bezier path.
 * Format: { d: SVG path string, yMid: nomor Y untuk urutan laser }
 *
 * Struktur:
 *  - Ridges 1-3:  spiral core (tightest loops)
 *  - Ridges 4-10: inner arcs (characteristic loop shape)
 *  - Ridges 11-16: outer arcs (wider)
 *  - Ridges 17-22: outermost (full oval shape)
 */

function arc(
  cx: number, cy: number,
  rx: number, ry: number,
  startAngle: number, endAngle: number,
  segments = 32
): string {
  const pts: string[] = []
  for (let i = 0; i <= segments; i++) {
    const t = startAngle + (endAngle - startAngle) * (i / segments)
    const x = cx + rx * Math.cos((t * Math.PI) / 180)
    const y = cy + ry * Math.sin((t * Math.PI) / 180)
    pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  return pts.join(' ')
}

// Warp: add organic irregularity to a path point
function warp(val: number, amount: number, seed: number): number {
  return val + Math.sin(seed * 2.3) * amount
}

// Build one fingerprint ridge as SVG cubic bezier
// Each ridge is an open arc (not closed loop) with breaks
function buildRidge(
  i: number,          // ridge index (1 = innermost)
  total: number,      // total ridges
  cx: number, cy: number
): { d: string; yTop: number; yBot: number } {
  const t    = i / total              // 0→1
  const rx   = 6  + t * 72           // x radius grows outward
  const ry   = 5  + t * 88           // y radius (taller)
  const w    = 2.1                    // stroke-related warp seed

  // Fingerprint characteristic: ridges don't complete full loops
  // They open at bottom (loop type) or side (whorl)
  // We'll do loop type: open at bottom, arch over top

  // Upper arc: from left side, over top, to right side
  // Uses 4-point cubic bezier for natural curve
  const lx = cx - rx + warp(0, 2, i * 1.1)
  const rx2 = cx + rx + warp(0, 2, i * 0.9)
  const topY = cy - ry + warp(0, 1.5, i * 1.3)
  const cp1x = cx - rx * 0.5
  const cp1y = topY - ry * 0.08
  const cp2x = cx + rx * 0.5
  const cp2y = topY - ry * 0.08
  const lMidY = cy - ry * 0.1 + warp(0, 2, i * 0.7)
  const rMidY = cy - ry * 0.1 + warp(0, 2, i * 1.4)

  // For inner ridges (i < 6): complete loop (spiral core area)
  // For outer ridges: open arch
  let d: string
  if (i <= 3) {
    // Tight spiral — near-complete oval with gap at bottom
    const gapAngle = 40 - i * 6  // gap at bottom gets smaller for tighter ridges
    d = arc(cx + warp(0,1,i), cy + warp(0,1.5,i*2), rx * 0.95, ry * 0.92,
        90 + gapAngle / 2, 90 - gapAngle / 2 + 360, 48)
  } else if (i <= 8) {
    // Loop characteristic — arch over, open at bottom with slight curl
    const openAngle = 15 + (i - 4) * 5
    const startA = 95 + openAngle
    const endA   = 85 - openAngle + 360 - (i - 4) * 3
    d = arc(cx + warp(0,1.5,i), cy + warp(0,2,i*1.3), rx, ry,
        startA, endA, 52)
  } else {
    // Outer ridges — wide open arch, may have ridge breaks
    const openAngle = 25 + (i - 8) * 8
    const startA = 98 + openAngle
    const endA   = 82 - openAngle + 360 - (i - 8) * 4
    // Clamp so we don't go past full circle
    d = arc(cx + warp(0,2,i), cy + warp(0,2.5,i*1.7), rx, ry,
        Math.min(startA, 210), Math.max(endA, 150 + 360 - openAngle * 2), 56)
  }

  return { d, yTop: cy - ry, yBot: cy + ry * 0.2 }
}

// Build ridge break (gap) — a short segment that interrupts a ridge
// Represented as a short segment on top of ridge with background color
function buildBreak(x: number, y: number, angle: number, len: number): string {
  const rad = (angle * Math.PI) / 180
  const x2 = x + len * Math.cos(rad)
  const y2 = y + len * Math.sin(rad)
  return `M ${x.toFixed(1)} ${y.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)}`
}

const TOTAL_RIDGES = 22

// Pre-compute ridges
const RIDGES = Array.from({ length: TOTAL_RIDGES }, (_, i) =>
  buildRidge(i + 1, TOTAL_RIDGES, CX, CY)
)

// Ridge break positions (minutiae — ridge endings)
const BREAKS = [
  { x: 88,  y: 72,  a: -30, l: 5 },
  { x: 112, y: 68,  a:  20, l: 4 },
  { x: 76,  y: 88,  a: -45, l: 5 },
  { x: 124, y: 85,  a:  35, l: 4 },
  { x: 68,  y: 105, a: -55, l: 5 },
  { x: 132, y: 102, a:  50, l: 4 },
  { x: 82,  y: 54,  a: -20, l: 4 },
  { x: 118, y: 52,  a:  15, l: 4 },
  { x: 72,  y: 135, a: -65, l: 6 },
  { x: 128, y: 132, a:  60, l: 5 },
  { x: 90,  y: 148, a: -75, l: 6 },
  { x: 110, y: 145, a:  70, l: 5 },
  { x: 65,  y: 120, a: -70, l: 5 },
  { x: 135, y: 118, a:  65, l: 5 },
  { x: 95,  y: 165, a: -80, l: 6 },
  { x: 105, y: 162, a:  75, l: 5 },
]

// Fingerprint outer clip — oval boundary
const CLIP_PATH = arc(CX, CY + 5, 82, 100, 0, 360, 64)

export default function FrozenScene() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const laserRef = useRef<SVGLineElement>(null)
  const svgRef   = useRef<SVGSVGElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const subRef   = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const glowRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current!
    const ctx  = gsap.context(() => {

      /* ── Master pinned scrub timeline ─────────────────── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start:   'top top',
          end:     '+=300%',
          pin:     true,
          anticipatePin: 1,
          scrub:   2.2,
        },
      })

      /* ─ Phase 0→0.10: Materialize ─────────────────────── */
      // Fingerprint ridges draw in via stroke-dashoffset
      const ridgeEls = svgRef.current!.querySelectorAll('.fp-r')
      ridgeEls.forEach((el, i) => {
        const len = (el as SVGPathElement).getTotalLength?.() ?? 200
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len })
      })

      tl.fromTo(frameRef.current,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: .08 }, 0
      )
      tl.fromTo('.fp-corner-el',
        { opacity: 0, scale: 0.5, transformOrigin: 'center' },
        { opacity: 1, scale: 1, stagger: .015, duration: .06 }, 0.01
      )
      tl.fromTo(svgRef.current,
        { opacity: 0 },
        { opacity: 1, duration: .05 }, 0.03
      )
      // Ridges draw in from center outward
      tl.to(Array.from(ridgeEls),
        {
          strokeDashoffset: 0,
          stagger: { each: .004, from: 'start' },
          duration: .06,
          ease: 'none',
        }, 0.04
      )
      tl.fromTo('.fp-break-cover',
        { opacity: 0 },
        { opacity: 1, duration: .02, stagger: .001 }, 0.08
      )

      /* ─ Phase 0.10→0.60: Laser sweep ──────────────────── */
      // Laser moves top→bottom of fingerprint
      // Y range in SVG viewBox (0 0 200 240)
      const laserYStart = CY - 102   // top of outermost ridge
      const laserYEnd   = CY + 108   // bottom of outermost ridge

      tl.set(laserRef.current, { opacity: 1 }, 0.10)
      tl.fromTo(laserRef.current,
        { attr: { y1: laserYStart, y2: laserYStart } },
        { attr: { y1: laserYEnd,   y2: laserYEnd   }, duration: .5, ease: 'none' },
        0.10
      )

      // Laser glow div follows (CSS positioned relative to container)
      tl.fromTo(glowRef.current,
        { top: '8%', opacity: .8 },
        { top: '88%', opacity: .6, duration: .5, ease: 'none' },
        0.10
      )

      // Each ridge lights up as laser passes it
      // yTop normalized to 0→1 within laserYStart→laserYEnd
      RIDGES.forEach((r, i) => {
        const yNorm = (r.yTop - laserYStart) / (laserYEnd - laserYStart)
        const triggerAt = 0.10 + yNorm * 0.50
        const ridgeEl = `.fp-r-${i + 1}`
        tl.to(ridgeEl,
          {
            stroke: i % 3 === 0
              ? 'rgba(106,255,212,.95)'
              : i % 3 === 1
              ? 'rgba(167,139,250,.75)'
              : 'rgba(56,189,248,.85)',
            filter: 'drop-shadow(0 0 2.5px rgba(106,255,212,.8))',
            duration: .025,
          },
          Math.max(0.10, Math.min(triggerAt, 0.59))
        )
      })

      /* ─ Phase 0.60→0.75: Pulse rings ──────────────────── */
      tl.fromTo('.fp-p1',
        { attr: { r: 4 }, opacity: .9, strokeWidth: '1.5' },
        { attr: { r: 55 }, opacity: 0, duration: .12, ease: 'power1.out' }, 0.60
      )
      tl.fromTo('.fp-p2',
        { attr: { r: 4 }, opacity: .7, strokeWidth: '1' },
        { attr: { r: 75 }, opacity: 0, duration: .12, ease: 'power1.out' }, 0.64
      )
      tl.fromTo('.fp-p3',
        { attr: { r: 4 }, opacity: .5, strokeWidth: '.6' },
        { attr: { r: 90 }, opacity: 0, duration: .12, ease: 'power1.out' }, 0.68
      )
      // Core brightens
      tl.to('.fp-core-dot',
        { attr: { r: 5 }, opacity: 1, fill: 'rgba(106,255,212,1)', duration: .06 }, 0.60
      )
      // Laser fades when verified
      tl.to(laserRef.current,   { opacity: 0, duration: .04 }, 0.62)
      tl.to(glowRef.current,    { opacity: 0, duration: .04 }, 0.62)

      /* ─ Phase 0.75→0.88: Labels ───────────────────────── */
      tl.fromTo(labelRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: .08 }, 0.75
      )
      tl.fromTo(subRef.current,
        { opacity: 0 },
        { opacity: 1, duration: .06 }, 0.82
      )

      /* ─ Phase 0.88→1.00: Fade out ─────────────────────── */
      tl.to(svgRef.current,   { opacity: 0, scale: 1.05, duration: .10 }, 0.88)
      tl.to(frameRef.current, { opacity: 0, duration: .08 }, 0.89)
      tl.to(labelRef.current, { opacity: 0, y: -12, duration: .08 }, 0.90)
      tl.to(subRef.current,   { opacity: 0, duration: .06 }, 0.90)

      /* ── Ambient animations (independent of scroll) ────── */
      // Core dot idle pulse
      gsap.to('.fp-core-dot', {
        attr: { r: 3 }, opacity: .9,
        duration: 1.2, repeat: -1, yoyo: true, ease: 'sine.inOut',
      })

    }, wrap)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={wrapRef}
      id="frozen-scene"
      className="relative overflow-hidden"
      style={{ height: '100vh', background: 'var(--bg)' }}
    >
      {/* ── Background atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {/* Radial glow at center */}
        <div className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(var(--ar),.05) 0%, transparent 70%)',
          }} />
        {/* Subtle grid */}
        <div className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(var(--ar),.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(var(--ar),.02) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }} />
      </div>

      {/* ── Laser glow band (CSS div, follows laser) ── */}
      <div
        ref={glowRef}
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: '8%',
          height: '3px',
          transform: 'translateY(-50%)',
          background: 'linear-gradient(90deg, transparent 5%, rgba(var(--ar),.05) 20%, rgba(var(--ar),.25) 40%, rgba(var(--ar),.4) 50%, rgba(var(--ar),.25) 60%, rgba(var(--ar),.05) 80%, transparent 95%)',
          boxShadow: '0 0 20px 8px rgba(var(--ar),.08)',
          opacity: 0,
        }}
      />

      {/* ── Main centered scene ── */}
      <div className="absolute inset-0 flex items-center justify-center">

        {/* Scanner frame */}
        <div
          ref={frameRef}
          className="relative"
          style={{ width: 'clamp(240px,38vmin,360px)', opacity: 0 }}
        >
          {/* Corner brackets */}
          {(['tl','tr','bl','br'] as const).map((pos) => (
            <div key={pos}
              className="fp-corner-el absolute pointer-events-none"
              style={{
                width: 18, height: 18,
                ...(pos === 'tl' ? { top: -8, left: -8,  borderTop: '1.5px solid var(--a)', borderLeft:  '1.5px solid var(--a)' } : {}),
                ...(pos === 'tr' ? { top: -8, right: -8, borderTop: '1.5px solid var(--a)', borderRight: '1.5px solid var(--a)' } : {}),
                ...(pos === 'bl' ? { bottom: -8, left: -8,  borderBottom: '1.5px solid var(--a)', borderLeft:  '1.5px solid var(--a)' } : {}),
                ...(pos === 'br' ? { bottom: -8, right: -8, borderBottom: '1.5px solid var(--a)', borderRight: '1.5px solid var(--a)' } : {}),
                opacity: 0,
              }}
            />
          ))}

          {/* Top HUD label */}
          <div className="absolute -top-8 left-0 right-0 flex justify-between">
            <span className="font-mono text-[.48rem] tracking-[.3em] uppercase" style={{ color: 'var(--fg-3)' }}>BIOMETRIC SCAN</span>
            <span className="font-mono text-[.48rem]" style={{ color: 'var(--a)', opacity: .5 }}>v2.4.1</span>
          </div>
          {/* Bottom HUD label */}
          <div className="absolute -bottom-8 left-0 right-0 flex justify-between">
            <span className="font-mono text-[.48rem] tracking-[.2em]" style={{ color: 'var(--fg-3)' }}>500dpi · 256-bit</span>
            <span className="font-mono text-[.48rem]" style={{ color: 'var(--fg-3)' }}>SYS/AUTH</span>
          </div>

          {/* ── SVG Fingerprint ── */}
          <svg
            ref={svgRef}
            viewBox="0 0 200 240"
            className="w-full"
            style={{ opacity: 0, display: 'block', overflow: 'visible' }}
          >
            <defs>
              {/* Clip to oval fingerprint boundary */}
              <clipPath id="fp-clip">
                <path d={CLIP_PATH} />
              </clipPath>
              {/* Glow filter for lit ridges */}
              <filter id="fp-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* ── Ridges group ── */}
            <g clipPath="url(#fp-clip)">
              {RIDGES.map((r, i) => (
                <path
                  key={i}
                  className={`fp-r fp-r-${i + 1}`}
                  d={r.d}
                  fill="none"
                  stroke="rgba(var(--ar),.18)"
                  strokeWidth={i < 3 ? '1.6' : i < 8 ? '1.4' : '1.3'}
                  strokeLinecap="round"
                />
              ))}

              {/* Ridge break covers (minutiae) — thin lines in bg color to simulate gaps */}
              {BREAKS.map((b, i) => (
                <path
                  key={i}
                  className="fp-break-cover"
                  d={buildBreak(b.x, b.y, b.a, b.l)}
                  stroke="var(--bg)"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  opacity={0}
                />
              ))}
            </g>

            {/* ── Outer oval border ── */}
            <path
              d={CLIP_PATH}
              fill="none"
              stroke="rgba(var(--ar),.15)"
              strokeWidth="0.8"
            />

            {/* ── Core dot ── */}
            <circle
              className="fp-core-dot"
              cx={CX} cy={CY}
              r="2.5"
              fill="rgba(var(--ar),.8)"
            />

            {/* ── Pulse rings ── */}
            <circle className="fp-p1" cx={CX} cy={CY} r="4" fill="none" stroke="rgba(var(--ar),.9)" strokeWidth="1.5" opacity="0" />
            <circle className="fp-p2" cx={CX} cy={CY} r="4" fill="none" stroke="rgba(var(--ar),.6)" strokeWidth="1"   opacity="0" />
            <circle className="fp-p3" cx={CX} cy={CY} r="4" fill="none" stroke="rgba(var(--ar),.35)" strokeWidth=".6"  opacity="0" />

            {/* ── Laser line ── */}
            <line
              ref={laserRef}
              x1="10" y1={CY - 102}
              x2="190" y2={CY - 102}
              stroke="var(--a)"
              strokeWidth="0.6"
              opacity="0"
              strokeLinecap="round"
              style={{
                filter: 'drop-shadow(0 0 3px rgba(var(--ar),1)) drop-shadow(0 0 8px rgba(var(--ar),.7))',
              }}
            />
          </svg>
        </div>
      </div>

      {/* ── Identity Verified label ── */}
      <div
        ref={labelRef}
        className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none"
        style={{ opacity: 0 }}
      >
        <div className="flex items-center gap-4">
          <div style={{ height: 1, width: 40, background: 'var(--a)', opacity: .6 }} />
          <span
            className="font-mono tracking-[.35em] uppercase"
            style={{ fontSize: '.65rem', color: 'var(--a)', textShadow: '0 0 12px rgba(var(--ar),.6)' }}
          >
            Identity Verified
          </span>
          <div style={{ height: 1, width: 40, background: 'var(--a)', opacity: .6 }} />
        </div>
        <div ref={subRef} style={{ opacity: 0 }}>
          <span className="font-mono tracking-[.25em] uppercase" style={{ fontSize: '.52rem', color: 'var(--fg-3)' }}>
            Access Granted
          </span>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[.48rem] tracking-[.35em] uppercase pointer-events-none"
        style={{ color: 'var(--fg-3)', opacity: .4 }}>
        Scroll slowly
      </p>

      {/* ── Side labels ── */}
      <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
        <p className="font-mono text-[.45rem] tracking-[.2em] uppercase"
          style={{ color: 'var(--fg-3)', opacity: .3, writingMode: 'vertical-rl' }}>
          Biometric · Auth
        </p>
      </div>
      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
        <p className="font-mono text-[.45rem] tracking-[.2em] uppercase"
          style={{ color: 'var(--a)', opacity: .2, writingMode: 'vertical-lr' }}>
          Scan in Progress
        </p>
      </div>
    </div>
  )
}
