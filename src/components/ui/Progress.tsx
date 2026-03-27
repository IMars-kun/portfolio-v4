'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Progress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[9997] h-[1.5px]" style={{ background: 'var(--bg-3)' }}>
      <div ref={barRef} className="h-full origin-left" style={{
        scaleX: 0,
        background: 'linear-gradient(90deg, var(--a), var(--a2))',
        boxShadow: '0 0 8px rgba(var(--ar),.7)',
      }} />
    </div>
  )
}
