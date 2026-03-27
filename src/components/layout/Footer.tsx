'use client'
import { ArrowUp, Github, Linkedin, Twitter, Code2 } from 'lucide-react'
import { me, socials } from '@/lib/data'

const IconMap = { github: Github, linkedin: Linkedin, twitter: Twitter, code2: Code2 } as const

function scrollTop() {
  const win = window as Window & typeof globalThis & { lenis?: { scrollTo: (target: number, opts: object) => void } }
  if (win.lenis) win.lenis.scrollTo(0, { duration: 2 })
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function Footer() {
  return (
    <footer className="py-8" style={{ borderTop: '1px solid var(--bd2)', background: 'var(--bg)' }}>
      <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-5">

        <div>
          <p className="font-display font-bold text-base" style={{ color: 'var(--fg)' }}>
            {me.name}<span style={{ color: 'var(--a)' }}>.</span>
          </p>
          <p className="font-mono text-xs mt-1" style={{ color: 'var(--fg-3)' }}>
            © {new Date().getFullYear()} · Built with Next.js 16 + GSAP
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {socials.map(s => {
            const Icon = (IconMap as Record<string, React.ComponentType<{size?:number}>>)[s.icon] ?? Github
            return (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" title={s.name}
                className="w-8 h-8 flex items-center justify-center transition-all duration-300 hover:border-[var(--bd)] hover:text-[var(--a)]"
                style={{ border: '1px solid var(--bd2)', color: 'var(--fg-3)' }}
                data-hover>
                <Icon size={13}/>
              </a>
            )
          })}
        </div>

        <button onClick={scrollTop}
          className="group flex items-center gap-2 font-mono text-[.6rem] tracking-widest uppercase transition-colors duration-300 hover:text-[var(--a)]"
          style={{ color: 'var(--fg-3)' }} data-hover>
          Back to Top
          <ArrowUp size={12} className="group-hover:-translate-y-1 transition-transform duration-300"/>
        </button>
      </div>
    </footer>
  )
}
