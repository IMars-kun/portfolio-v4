'use client'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Mail, Download, Shield, Zap, GitBranch } from 'lucide-react'
import { me } from '@/lib/data'
import useGsapReveal from '@/hooks/useGsapReveal'

gsap.registerPlugin(ScrollTrigger)

const traits = [
  { Icon: Zap, title: 'Performance First', desc: 'Every ms matters. Sub-100ms API, 95+ Lighthouse, optimized bundles.' },
  { Icon: Shield, title: 'Security Minded', desc: 'Zero-trust architecture, OWASP compliance, secure by design.' },
  { Icon: GitBranch, title: 'Clean Code', desc: 'SOLID principles, comprehensive tests, docs yang jelas.' },
]

export default function About() {
  const sRef = useRef<HTMLElement>(null)
  const revRef = useGsapReveal({ stagger: 0.1, start: 'top 80%' })
  const initials = me.name.split(' ').map(w => w[0]).join('').slice(0, 2)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Photo frame animated on scroll
      gsap.fromTo('.photo-frame',
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.photo-frame',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sRef.current!)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sRef} className="section" style={{ background: 'var(--bg-2)' }}>

      {/* Decorative side number */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3 select-none pointer-events-none">
        <div className="w-px h-20" style={{ background: 'var(--bd)' }} />
        <span className="font-mono text-[.55rem] tracking-[.3em] uppercase" style={{ color: 'var(--fg-3)', writingMode: 'vertical-rl' }}>02 / About</span>
        <div className="w-px h-20" style={{ background: 'var(--bd)' }} />
      </div>

      <div className="wrap">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-12 xl:gap-20 items-start">

          {/* Photo */}
          <div className="max-w-xs mx-auto lg:mx-0">
            <div className="photo-frame relative aspect-[3/4] overflow-hidden"
              style={{ background: 'var(--bg-3)', border: '1px solid var(--bd)' }}>
              {/* → swap with <Image src="/images/photo.jpg" alt={me.name} fill className="object-cover" /> */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ border: '1px solid var(--bd)', background: 'var(--bg-4)' }}>
                  <span className="font-display font-bold text-2xl" style={{ color: 'var(--a)' }}>{initials}</span>
                </div>
                <div className="text-center px-6">
                  <p className="font-mono text-[.6rem]" style={{ color: 'var(--fg-3)' }}>
                    Photos<br />
                    <code style={{ color: 'var(--a)' }}>IMars-kun</code>
                  </p>
                </div>
              </div>
              {/* Terminal-style overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4" style={{ background: 'linear-gradient(transparent, var(--bg-3))' }}>
                <div className="font-mono text-[.58rem]" style={{ color: 'var(--a)' }}>
                  <span style={{ color: 'var(--fg-3)' }}>$ </span>whoami
                </div>
                <div className="font-mono text-[.6rem] mt-1" style={{ color: 'var(--fg-2)' }}>
                  {me.role.toLowerCase().replace(/ /g, '_')}
                </div>
              </div>
              {/* Corner accents */}
              {[['top-2 left-2', 'border-t border-l'], ['top-2 right-2', 'border-t border-r'],
              ['bottom-2 left-2', 'border-b border-l'], ['bottom-2 right-2', 'border-b border-r']].map(([pos, brd]) => (
                <div key={pos} className={`absolute ${pos} w-3 h-3 ${brd}`} style={{ borderColor: 'rgba(var(--ar),.4)' }} />
              ))}
            </div>

            {/* Location badge */}
            <div className="mt-4 flex items-center gap-3 p-3"
              style={{ border: '1px solid var(--bd2)', background: 'var(--bg-3)' }}>
              <div className="relative flex-shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 block" />
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-40" />
              </div>
              <div>
                <p className="font-mono text-[.5rem] tracking-widest uppercase" style={{ color: 'var(--fg-3)' }}>Location</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <MapPin size={10} style={{ color: 'var(--a)' }} />
                  <span className="font-mono text-xs" style={{ color: 'var(--fg)' }}>{me.loc}</span>
                </div>
              </div>
              <div className="ml-auto text-right">
                <p className="font-mono text-[.5rem] tracking-widest uppercase" style={{ color: 'var(--fg-3)' }}>Status</p>
                <p className="font-mono text-xs" style={{ color: 'var(--a)' }}>{me.avail}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={revRef} className="flex flex-col gap-6">
            <div>
              <span className="label" data-gsap="fade-up">About Me</span>
              <h2 className="mt-4" data-gsap="fade-up"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
                Passionate about<br />
                <span className="text-gradient">building things that scale</span>
              </h2>
              <div className="mt-3 h-px w-16" data-gsap="line" style={{ background: 'var(--a)' }} />
            </div>

            <p className="text-sm sm:text-base leading-relaxed" data-gsap="fade-up" style={{ color: 'var(--fg-2)' }}>
              {me.bio1}
            </p>
            <p className="text-sm leading-relaxed" data-gsap="fade-up" style={{ color: 'var(--fg-3)' }}>
              {me.bio2}
            </p>

            {/* Traits */}
            <div className="grid sm:grid-cols-3 gap-3 mt-2">
              {traits.map(({ Icon, title, desc }, i) => (
                <div key={title} className="card p-4 corners" data-gsap="scale-in">
                  <div className="w-8 h-8 flex items-center justify-center mb-3"
                    style={{ border: '1px solid var(--bd)', color: 'var(--a)', background: 'rgba(var(--ar),.05)' }}>
                    <Icon size={14} />
                  </div>
                  <p className="font-mono text-[.7rem] font-medium mb-1" style={{ color: 'var(--fg)' }}>{title}</p>
                  <p className="font-mono text-[.62rem] leading-relaxed" style={{ color: 'var(--fg-3)' }}>{desc}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mt-2" data-gsap="fade-up">
              <a href={`mailto:${me.email}`} className="btn-primary" data-hover>
                <span className="flex items-center gap-2"><Mail size={13} /> Get in Touch</span>
              </a>
              <a href={me.cv} download className="btn-ghost" data-hover>
                <Download size={13} /> Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
