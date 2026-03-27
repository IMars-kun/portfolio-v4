'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current!
    const ring = ringRef.current!

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 })

    let mx = 0, my = 0

    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      gsap.to(dot, { x: mx, y: my, duration: 0.05, ease: 'none' })
      gsap.to(ring, { x: mx, y: my, duration: 0.35, ease: 'power2.out' })
    }

    const onEnter = () => {
      gsap.to(ring, { scale: 1.8, opacity: .4, duration: .25 })
      gsap.to(dot, { scale: 0, duration: .2 })
    }
    const onLeave = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: .25 })
      gsap.to(dot, { scale: 1, duration: .2 })
    }

    window.addEventListener('mousemove', move, { passive: true })

    const targets = document.querySelectorAll('a, button, [data-hover]')
    targets.forEach(t => {
      t.addEventListener('mouseenter', onEnter)
      t.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      targets.forEach(t => {
        t.removeEventListener('mouseenter', onEnter)
        t.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      <div id="cursor-dot" ref={dotRef} aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full"
        style={{ background: 'var(--a)', mixBlendMode: 'difference' }} />
      <div id="cursor-ring" ref={ringRef} aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-9 h-9 rounded-full"
        style={{ border: '1px solid rgba(var(--ar),.6)', mixBlendMode: 'difference' }} />
    </>
  )
}
