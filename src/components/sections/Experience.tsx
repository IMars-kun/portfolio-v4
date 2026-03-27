'use client'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experiences, education } from '@/lib/data'
import useGsapReveal from '@/hooks/useGsapReveal'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const sRef = useRef<HTMLElement>(null)
  const hRef = useGsapReveal({ start: 'top 85%' })

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line draws on scroll
      gsap.fromTo('.timeline-line',
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline-line',
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 0.5,
          },
        }
      )

      // Cards animate in with stagger
      gsap.fromTo('.exp-card',
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0,
          stagger: .15,
          duration: .9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.exp-cards',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sRef.current!)
    return () => ctx.revert()
  }, [])

  return (
    <section id="exp" ref={sRef} className="section" style={{ background: 'var(--bg)' }}>
      <div className="wrap">

        {/* Header */}
        <div ref={hRef}>
          <span className="label" data-gsap="fade-up">Career</span>
          <h2 className="mt-4" data-gsap="fade-up" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            Experience
          </h2>
          <div className="mt-3 h-px w-16" data-gsap="line" style={{ background: 'var(--a)' }} />
        </div>

        {/* Timeline */}
        <div className="mt-14 relative">
          {/* Animated vertical line */}
          <div className="timeline-line absolute left-[7px] top-4 bottom-4 w-px hidden sm:block"
            style={{ background: 'linear-gradient(to bottom, var(--a), var(--bd2))', opacity: .4 }} />

          <div className="exp-cards flex flex-col gap-8">
            {experiences.map((e, i) => (
              <div key={i} className="exp-card relative pl-0 sm:pl-10">
                {/* Dot */}
                <div className="absolute left-0 top-5 w-3.5 h-3.5 rounded-full hidden sm:block"
                  style={{ background: 'var(--bg)', border: '1px solid var(--a)', boxShadow: '0 0 10px rgba(var(--ar),.5)' }}>
                  <div className="absolute inset-0 rounded-full animate-ping opacity-20"
                    style={{ background: 'var(--a)', animationDelay: `${i*.4}s` }} />
                </div>

                <div className="card corners p-6 sm:p-7">
                  {/* Type */}
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-4"
                    style={{ border: '1px solid var(--bd2)', background: 'var(--bg-3)' }}>
                    <span className="w-1.5 h-1.5 rounded-full"
                      style={{ background: e.type === 'full-time' ? '#4ade80' : 'var(--a)' }} />
                    <span className="font-mono text-[.52rem] tracking-widest uppercase"
                      style={{ color: 'var(--fg-3)' }}>
                      {e.type === 'full-time' ? 'Full Time' : 'Freelance'}
                    </span>
                  </div>

                  <div className="flex items-start justify-between flex-wrap gap-3 mb-1">
                    <div>
                      <h3 className="font-display font-bold text-lg" style={{ color: 'var(--fg)' }}>{e.role}</h3>
                      <p className="font-mono text-xs mt-0.5" style={{ color: 'var(--a)' }}>{e.co}</p>
                    </div>
                    <span className="font-mono text-[.62rem] tracking-wider flex-shrink-0 mt-1"
                      style={{ color: 'var(--fg-3)' }}>{e.period}</span>
                  </div>

                  <p className="text-xs sm:text-sm leading-relaxed mt-3 mb-4" style={{ color: 'var(--fg-2)' }}>
                    {e.desc}
                  </p>

                  <ul className="flex flex-col gap-1.5">
                    {e.wins.map((w, wi) => (
                      <li key={wi} className="flex items-start gap-2.5 font-mono text-xs"
                        style={{ color: 'var(--fg-3)' }}>
                        <span style={{ color: 'var(--a)', flexShrink: 0 }}>▸</span>
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mt-14">
          <div ref={useGsapReveal({ start: 'top 88%' })}>
            <div className="flex items-center gap-4 mb-6" data-gsap="fade-up">
              <span className="font-mono text-[.6rem] tracking-[.25em] uppercase" style={{ color: 'var(--fg-3)' }}>Education</span>
              <div className="flex-1 h-px" style={{ background: 'var(--bd2)' }} />
            </div>
            {education.map((ed, i) => (
            <div key={i} className="card corners p-6 mt-4" data-gsap="scale-in">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <h4 className="font-display font-bold text-lg" style={{ color: 'var(--fg)' }}>{ed.degree}</h4>
                  <p className="font-mono text-xs mt-1" style={{ color: 'var(--a)' }}>{ed.school}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xs" style={{ color: 'var(--fg-3)' }}>{ed.period}</p>
                  <p className="font-mono text-xs mt-1" style={{ color: 'var(--a)' }}>GPA {ed.gpa}</p>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
