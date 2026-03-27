'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Menu, X } from 'lucide-react'
import { navLinks, me } from '@/lib/data'
import ThemeToggle from '@/components/ui/ThemeToggle'

gsap.registerPlugin(ScrollTrigger)

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const win = window as Window & typeof globalThis & { lenis?: { scrollTo: (target: HTMLElement, opts: object) => void } }
  if (win.lenis) win.lenis.scrollTo(el, { offset: -80, duration: 1.6 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const ref      = useRef<HTMLElement>(null)
  const [open, setOpen]     = useState(false)
  const [active, setActive] = useState('hero')

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(ref.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: .2 }
    )

    // Glass background on scroll
    ScrollTrigger.create({
      start: 'top -60',
      onToggle: (self) => {
        gsap.to(ref.current, {
          background: self.isActive
            ? 'color-mix(in srgb, var(--bg) 80%, transparent)'
            : 'transparent',
          backdropFilter: self.isActive ? 'blur(20px)' : 'none',
          borderBottomColor: self.isActive ? 'var(--bd2)' : 'transparent',
          duration: .4,
        })
      },
    })

    // Active section tracking
    navLinks.forEach(({ id }) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onEnter:      () => setActive(id),
        onEnterBack:  () => setActive(id),
      })
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <>
      <header ref={ref}
        className="fixed top-0 inset-x-0 z-50 border-b"
        style={{
          height: 'var(--nav-h)',
          background: 'transparent',
          borderBottomColor: 'transparent',
          transition: 'background .4s, border-color .4s',
        }}>
        <div className="wrap h-full flex items-center justify-between">

          {/* Logo */}
          <button onClick={() => scrollTo('hero')}
            className="flex items-center gap-2 group" data-hover>
            <div className="w-8 h-8 flex items-center justify-center relative"
              style={{ border: '1px solid var(--bd)' }}>
              <span className="font-mono font-bold text-sm" style={{ color: 'var(--a)' }}>
                {me.short}
              </span>
              {/* Animated corner */}
              <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r" style={{ borderColor: 'var(--a)' }} />
            </div>
            {/* <span className="font-display text-sm font-semibold hidden sm:block" style={{ color: 'var(--fg)' }}>
              {me.name}<span style={{ color: 'var(--a)' }}>.</span>
            </span> */}
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)}
                className="font-mono text-[.62rem] tracking-[.18em] uppercase transition-colors duration-200"
                style={{ color: active === l.id ? 'var(--a)' : 'var(--fg-3)' }}
                data-hover>
                <span style={{ color: 'var(--fg-3)', marginRight: '.2rem' }}>
                  {String(navLinks.indexOf(navLinks.find(x => x.id === l.id)!)+1).padStart(2,'0')}.
                </span>
                {l.label}
              </button>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a href={`mailto:${me.email}`}
              className="btn-primary hidden md:inline-flex py-2 px-4 text-[.62rem]" data-hover>
              <span>Contact</span>
            </a>
            <button onClick={() => setOpen(v => !v)}
              className="lg:hidden w-8 h-8 flex items-center justify-center"
              style={{ border: '1px solid var(--bd2)', color: 'var(--fg-2)' }} data-hover>
              {open ? <X size={15}/> : <Menu size={15}/>}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7"
          style={{ background: 'var(--bg)' }}>
          <button className="absolute top-5 right-5" onClick={() => setOpen(false)}
            style={{ color: 'var(--fg-3)' }} data-hover>
            <X size={20}/>
          </button>
          {navLinks.map((l, i) => (
            <button key={l.id} onClick={() => { scrollTo(l.id); setOpen(false) }}
              className="font-display font-bold text-3xl sm:text-4xl"
              style={{ color: active === l.id ? 'var(--a)' : 'var(--fg)', transitionDelay: `${i*.05}s` }}
              data-hover>
              {l.label}
            </button>
          ))}
          <a href={`mailto:${me.email}`} className="btn-primary mt-4" data-hover>
            <span>Hire Me</span>
          </a>
        </div>
      )}
    </>
  )
}
