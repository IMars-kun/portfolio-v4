'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { gsap } from 'gsap'
import { useRef } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [m, setM] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)
  useEffect(() => setM(true), [])
  if (!m) return <span className="w-8 h-8 block" />

  const toggle = () => {
    const btn = ref.current!
    gsap.to(btn, { rotate: 360, duration: .4, ease: 'power2.out',
      onComplete: () => { gsap.set(btn, { rotate: 0 }); setTheme(theme === 'dark' ? 'light' : 'dark') }
    })
  }

  return (
    <button ref={ref} onClick={toggle}
      className="w-8 h-8 flex items-center justify-center rounded-full"
      style={{ border: '1px solid var(--bd2)', color: 'var(--a)' }}
      data-hover>
      {theme === 'dark' ? <Moon size={14}/> : <Sun size={14}/>}
    </button>
  )
}
