'use client'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skillGroups } from '@/lib/data'
import useGsapReveal from '@/hooks/useGsapReveal'

gsap.registerPlugin(ScrollTrigger)

const MARQUEE = ['React','Next.js 16','TypeScript','Go','Python','Node.js','PostgreSQL','Redis','Docker','Kubernetes','AWS','Terraform','GraphQL','Figma','Linux','GSAP']

export default function Skills() {
  const sRef  = useRef<HTMLElement>(null)
  const hRef  = useGsapReveal({ start: 'top 85%' })
  const gRef  = useGsapReveal({ stagger: .12, start: 'top 80%' })

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Skill bars — scrub fills with scroll ──────────
      document.querySelectorAll('.skill-bar').forEach((bar, i) => {
        const pct = Number((bar as HTMLElement).dataset.pct ?? 0)
        gsap.fromTo(bar,
          { scaleX: 0 },
          {
            scaleX: pct / 100,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      // ── Stat numbers count up ─────────────────────────
      document.querySelectorAll('[data-count]').forEach(el => {
        const target = Number(el.getAttribute('data-count'))
        gsap.fromTo({ val: 0 }, { val: target },
          {
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            onUpdate: function() {
              el.textContent = Math.round(this.targets()[0].val) + (target === 99 ? '' : '+')
            },
          }
        )
      })

    }, sRef.current!)
    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={sRef} className="section" style={{ background: 'var(--bg-2)' }}>

      {/* Decorative side label */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3 select-none pointer-events-none">
        <div className="w-px h-20" style={{ background: 'var(--bd)' }} />
        <span className="font-mono text-[.55rem] tracking-[.3em] uppercase"
          style={{ color: 'var(--fg-3)', writingMode: 'vertical-rl' }}>04 / Skills</span>
        <div className="w-px h-20" style={{ background: 'var(--bd)' }} />
      </div>

      <div className="wrap">

        {/* Header */}
        <div ref={hRef}>
          <span className="label" data-gsap="fade-up">Expertise</span>
          <h2 className="mt-4" data-gsap="fade-up" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            Skills &amp; Stack
          </h2>
          <div className="mt-3 h-px w-16" data-gsap="line" style={{ background: 'var(--a)' }} />
        </div>

        {/* Marquee */}
        <div className="mt-10 overflow-hidden"
          style={{ maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)' }}>
          <div className="flex w-max"
            style={{ animation: 'scroll-x 28s linear infinite' }}>
            {[...MARQUEE, ...MARQUEE].map((t, i) => (
              <span key={i} className="font-mono text-xs px-5 py-2 flex-shrink-0 whitespace-nowrap"
                style={{ border: '1px solid var(--bd2)', color: 'var(--fg-3)', background: 'var(--bg-3)', marginRight: '1px' }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Skill grids */}
        <div ref={gRef} className="mt-14 grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillGroups.map((g, gi) => (
            <div key={g.name} className="card corners p-6" data-gsap="scale-in">
              {/* Header */}
              <div className="flex items-center gap-2 mb-1">
                <span style={{ color: g.color, fontSize: '1rem' }}>{g.icon}</span>
                <span className="font-mono text-[.52rem] tracking-widest uppercase"
                  style={{ color: 'var(--fg-3)' }}>
                  {String(gi+1).padStart(2,'0')}
                </span>
              </div>
              <h3 className="font-display font-bold text-lg mb-7" style={{ color: 'var(--fg)' }}>{g.name}</h3>

              <div className="flex flex-col gap-5">
                {g.skills.map(s => (
                  <div key={s.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-mono text-xs" style={{ color: 'var(--fg-2)' }}>{s.name}</span>
                      <span className="font-mono text-xs" style={{ color: g.color }}>{s.pct}%</span>
                    </div>
                    <div className="relative h-px" style={{ background: 'var(--bd2)' }}>
                      <div
                        className="skill-bar absolute inset-0 origin-left"
                        data-pct={s.pct}
                        style={{
                          background: `linear-gradient(90deg, color-mix(in srgb, ${g.color} 40%, transparent), ${g.color})`,
                          scaleX: 0,
                        }}
                      />
                      <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                        style={{
                          left: `${s.pct}%`,
                          transform: 'translate(-50%, -50%)',
                          background: g.color,
                          boxShadow: `0 0 6px ${g.color}`,
                        }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inline keyframe for marquee */}
      <style>{`@keyframes scroll-x { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
    </section>
  )
}
