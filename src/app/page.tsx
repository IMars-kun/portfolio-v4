import SmoothScroll from '@/components/ui/SmoothScroll'
import Cursor       from '@/components/ui/Cursor'
import Progress     from '@/components/ui/Progress'
import Navbar       from '@/components/layout/Navbar'
import Footer       from '@/components/layout/Footer'
import Hero         from '@/components/sections/Hero'
import FrozenScene  from '@/components/sections/FrozenScene'
import About        from '@/components/sections/About'
import Work         from '@/components/sections/Work'
import Skills       from '@/components/sections/Skills'
import Experience   from '@/components/sections/Experience'
import Contact      from '@/components/sections/Contact'

export default function Page() {
  return (
    <SmoothScroll>
      <div className="scanlines">
        <Cursor />
        <Progress />
        <Navbar />
        <main>
          <Hero />
          <FrozenScene />
          <About />
          <Work />
          <Skills />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  )
}
