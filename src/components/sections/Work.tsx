'use client'
import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'
import { projects } from '@/lib/data'
import useGsapReveal from '@/hooks/useGsapReveal'

gsap.registerPlugin(ScrollTrigger)

export default function Work() {
  const hRef = useGsapReveal({ start: 'top 85%' })

  return (
    <section id="work" className="section" style={{ background: 'var(--bg)' }}>
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3 select-none pointer-events-none">
        <div className="w-px h-20" style={{ background: 'var(--bd)' }} />
        <span className="font-mono text-[.55rem] tracking-[.3em] uppercase" style={{ color: 'var(--fg-3)', writingMode: 'vertical-rl' }}>03 / Work</span>
        <div className="w-px h-20" style={{ background: 'var(--bd)' }} />
      </div>
      <div className="wrap">
        <div ref={hRef} className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <span className="label" data-gsap="fade-up">Portfolio</span>
            <h2 className="mt-4" data-gsap="fade-up" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>Selected Work</h2>
            <div className="mt-3 h-px w-16" data-gsap="line" style={{ background: 'var(--a)' }} />
          </div>
          <a href="https://github.com/IMars-kun" target="_blank" rel="noopener noreferrer"
            className="btn-ghost text-[.62rem]" data-hover>
            <Github size={13}/> All on GitHub
          </a>
        </div>
        <div className="grid sm:grid-cols-2 gap-5 mb-5">
          {projects.filter(p => p.featured).map((p, i) => <ProjectCard key={p.id} p={p} idx={i} />)}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.filter(p => !p.featured).map((p, i) => <ProjectCard key={p.id} p={p} idx={i+2} small />)}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ p, idx, small }: { p: typeof projects[0]; idx: number; small?: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const [hov, setHov] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: .85, ease: 'power3.out', delay: (idx%3)*.08,
          scrollTrigger: { trigger: ref.current, start: 'top 88%', toggleActions: 'play none none reverse' }
        }
      )
    })
    return () => ctx.revert()
  }, [idx])

  return (
    <article ref={ref} className="card corners group cursor-default" style={{ opacity: 0 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div className="relative overflow-hidden"
        style={{ aspectRatio: small ? '16/9' : '4/3', background: 'var(--bg-3)' }}>
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(${p.accent}.15) 1px,transparent 1px),linear-gradient(90deg,${p.accent}.15) 1px,transparent 1px)`,
            backgroundSize: '24px 24px',
          }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display font-bold select-none"
            style={{ fontSize: small?'4.5rem':'7rem', letterSpacing:'-.04em', color:`${p.accent}.04)`, lineHeight:1 }}>
            {p.num}
          </span>
        </div>
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-2.5"
          style={{ borderBottom:'1px solid rgba(255,255,255,.04)', background:'rgba(5,5,10,.35)' }}>
          <span className="font-mono text-[.55rem] tracking-widest" style={{ color:`${p.accent}.7)` }}>{p.num}</span>
          <span className="font-mono text-[.55rem]" style={{ color:'var(--fg-3)' }}>{p.year}</span>
        </div>
        <div className={`absolute inset-0 flex items-center justify-center gap-3 transition-opacity duration-300 ${hov?'opacity-100':'opacity-0'}`}
          style={{ background:'rgba(5,5,10,.88)' }}>
          {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn-primary py-2 px-4 text-[.6rem]" data-hover onClick={e=>e.stopPropagation()}><span className="flex items-center gap-1.5"><ExternalLink size={11}/>Live</span></a>}
          {p.repo && <a href={p.repo} target="_blank" rel="noopener noreferrer" className="btn-ghost py-2 px-4 text-[.6rem]" data-hover onClick={e=>e.stopPropagation()}><Github size={11}/> Code</a>}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <p className="font-mono text-[.55rem] tracking-[.22em] uppercase mb-1" style={{ color:`${p.accent}.8)` }}>{p.cat}</p>
            <h3 className="font-display font-bold text-xl" style={{ color:'var(--fg)' }}>{p.name}</h3>
          </div>
          <ArrowUpRight size={15} className="flex-shrink-0 mt-1 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color:'var(--fg-3)' }} />
        </div>
        <p className="text-xs leading-relaxed mb-4" style={{ color:'var(--fg-3)' }}>{p.desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {p.stack.map(s => <span key={s} className="font-mono text-[.52rem] tracking-wider px-2 py-0.5" style={{ border:'1px solid var(--bd2)', color:'var(--fg-3)', background:'var(--bg-3)' }}>{s}</span>)}
        </div>
      </div>
    </article>
  )
}
