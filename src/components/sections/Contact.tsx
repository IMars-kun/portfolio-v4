'use client'
import { useState } from 'react'
import { Mail, MapPin, Send, CheckCircle, AlertCircle, Loader2, Github, Linkedin, Twitter, Code2 } from 'lucide-react'
import { me, socials } from '@/lib/data'
import useGsapReveal from '@/hooks/useGsapReveal'

const IconMap = { github: Github, linkedin: Linkedin, twitter: Twitter, code2: Code2 } as const
type Status = 'idle'|'loading'|'success'|'error'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const hRef  = useGsapReveal({ start: 'top 85%' })
  const lRef  = useGsapReveal({ stagger: .1, start: 'top 80%' })
  const rRef  = useGsapReveal({ start: 'top 80%' })

  const ch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      // UNCOMMENT ONE:
      // const r = await fetch('https://formspree.io/f/YOUR_FORM_ID', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) }); if(!r.ok) throw 0
      // const r = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) }); if(!r.ok) throw 0
      await new Promise(r => setTimeout(r, 1300)) // Remove in production
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const iStyle: React.CSSProperties = {
    background: 'var(--bg-3)',
    border: '1px solid var(--bd2)',
    color: 'var(--fg)',
    fontFamily: 'var(--font-mono)',
    fontSize: '.8rem',
    padding: '.75rem 1rem',
    width: '100%',
    outline: 'none',
    transition: 'border-color .3s',
  }

  return (
    <section id="contact" className="section" style={{ background: 'var(--bg-2)' }}>

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(var(--ar),.03) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>

      <div className="wrap relative z-10">
        {/* Header */}
        <div ref={hRef}>
          <span className="label" data-gsap="fade-up">Contact</span>
          <h2 className="mt-4" data-gsap="fade-up" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            Let&apos;s Build Something<br/>
            <span className="text-gradient">Together</span>
          </h2>
          <div className="mt-3 h-px w-16" data-gsap="line" style={{ background: 'var(--a)' }} />
        </div>

        <div className="mt-12 grid lg:grid-cols-[1fr_1.4fr] gap-12 xl:gap-20">

          {/* Info */}
          <div ref={lRef} className="flex flex-col gap-6">
            <p className="text-sm sm:text-base leading-relaxed" data-gsap="fade-left"
              style={{ color: 'var(--fg-2)' }}>
              Terbuka untuk proyek baru, full-time opportunities, atau sekadar diskusi teknis.
              Pesan kamu pasti dibaca dan dibalas.
            </p>

            <div className="flex flex-col gap-3" data-gsap="fade-left">
              <a href={`mailto:${me.email}`}
                className="group card corners p-4 flex items-center gap-4 transition-all duration-300 hover:border-[var(--bd)]"
                data-hover>
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                  style={{ border: '1px solid var(--bd)', background: 'rgba(var(--ar),.07)', color: 'var(--a)' }}>
                  <Mail size={14}/>
                </div>
                <div>
                  <p className="font-mono text-[.52rem] tracking-widest uppercase" style={{ color: 'var(--fg-3)' }}>Email</p>
                  <p className="font-mono text-sm group-hover:opacity-70 transition-opacity" style={{ color: 'var(--fg)' }}>
                    {me.email}
                  </p>
                </div>
              </a>

              <div className="card p-4 flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                  style={{ border: '1px solid var(--bd)', background: 'rgba(var(--ar),.07)', color: 'var(--a)' }}>
                  <MapPin size={14}/>
                </div>
                <div>
                  <p className="font-mono text-[.52rem] tracking-widest uppercase" style={{ color: 'var(--fg-3)' }}>Based in</p>
                  <p className="font-mono text-sm" style={{ color: 'var(--fg)' }}>{me.loc}</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[.6rem]" style={{ color: 'var(--a)' }}>{me.avail}</span>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div data-gsap="fade-left">
              <p className="font-mono text-[.52rem] tracking-[.25em] uppercase mb-3" style={{ color: 'var(--fg-3)' }}>
                Find me on
              </p>
              <div className="flex gap-2.5">
                {socials.map(s => {
                  const Icon = (IconMap as Record<string, React.ComponentType<{size?:number}>>)[s.icon] ?? Mail
                  return (
                    <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" title={s.name}
                      className="w-10 h-10 flex items-center justify-center transition-all duration-300 hover:border-[var(--bd)] hover:text-[var(--a)]"
                      style={{ border: '1px solid var(--bd2)', color: 'var(--fg-3)' }}
                      data-hover>
                      <Icon size={14}/>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Form */}
          <div ref={rRef} data-gsap="fade-right">
            <form onSubmit={submit} className="flex flex-col gap-4">
              <div className="grid xs:grid-cols-1 sm:grid-cols-2 gap-4">
                {[['name','Name','text','Nama kamu'],['email','Email','email','email@kamu.dev']].map(([n,l,t,ph]) => (
                  <div key={n}>
                    <label className="block font-mono text-[.52rem] tracking-[.2em] uppercase mb-2"
                      style={{ color: 'var(--fg-3)' }}>{l}</label>
                    <input type={t} name={n} value={(form as Record<string,string>)[n]} onChange={ch}
                      required placeholder={ph} style={iStyle}
                      onFocus={e => e.target.style.borderColor = 'rgba(var(--ar),.5)'}
                      onBlur={e => e.target.style.borderColor = 'var(--bd2)'}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block font-mono text-[.52rem] tracking-[.2em] uppercase mb-2"
                  style={{ color: 'var(--fg-3)' }}>Subject</label>
                <input type="text" name="subject" value={form.subject} onChange={ch}
                  required placeholder="Tentang apa?" style={iStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(var(--ar),.5)'}
                  onBlur={e => e.target.style.borderColor = 'var(--bd2)'}
                />
              </div>

              <div>
                <label className="block font-mono text-[.52rem] tracking-[.2em] uppercase mb-2"
                  style={{ color: 'var(--fg-3)' }}>Message</label>
                <textarea name="message" value={form.message} onChange={ch}
                  required rows={5} placeholder="Describe your project or question..."
                  style={{ ...iStyle, resize: 'none' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(var(--ar),.5)'}
                  onBlur={e => e.target.style.borderColor = 'var(--bd2)'}
                />
              </div>

              <button type="submit" disabled={status === 'loading'}
                className="btn-primary w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                data-hover>
                <span className="flex items-center justify-center gap-2">
                  {status==='idle'    && <><Send size={13}/> Send Message</>}
                  {status==='loading' && <><Loader2 size={13} className="animate-spin"/> Sending...</>}
                  {status==='success' && <><CheckCircle size={13}/> Message Sent!</>}
                  {status==='error'   && <><AlertCircle size={13}/> Failed — Try again</>}
                </span>
              </button>

              <p className="text-center font-mono text-[.55rem] tracking-widest" style={{ color: 'var(--fg-3)' }}>
                Reply within 24h · No spam guarantee
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
