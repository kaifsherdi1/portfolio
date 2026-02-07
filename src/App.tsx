import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Experience } from './components/Experience'
import { Education } from './components/Education'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { Testimonials } from './components/Testimonials'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const magneticRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Optimized Magnetic Button Effect
    const btn = magneticRef.current
    if (btn) {
      const xSetter = gsap.quickSetter(btn, "x", "px")
      const ySetter = gsap.quickSetter(btn, "y", "px")

      const handleMove = (e: MouseEvent) => {
        const { clientX, clientY } = e
        const { left, top, width, height } = btn.getBoundingClientRect()
        const x = (clientX - (left + width / 2)) * 0.4
        const y = (clientY - (top + height / 2)) * 0.4

        xSetter(x)
        ySetter(y)
      }

      const handleLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.3)'
        })
      }

      btn.addEventListener('mousemove', handleMove)
      btn.addEventListener('mouseleave', handleLeave)
    }

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <main className="relative bg-black">
      <div className="lighting-glow top-[-300px] left-[-300px]" />
      <div className="lighting-glow bottom-[-300px] right-[-300px] opacity-30" />

      <Navbar />
      <Hero />

      <section id="about" className="py-20 sm:py-40 md:py-60 px-4 sm:px-6 md:px-8 relative overflow-hidden [contain:paint]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "circOut" }}
            className="flex flex-col md:flex-row gap-12 md:gap-24 items-start"
          >
            <div className="flex-1 z-10">
              <span className="text-[8px] sm:text-xs font-bold tracking-[0.3em] sm:tracking-[0.5em] uppercase text-primary mb-4 sm:mb-8 block">Professional Summary</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-8xl font-display font-bold mb-6 sm:mb-8 md:mb-12 tracking-tighter leading-[0.9]">
                Building systems that <span className="text-white/20 italic">define</span> the future.
              </h2>
              <div className="space-y-4 sm:space-y-6 md:space-y-10 text-white/50 text-sm sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl font-light">
                <p>
                  I specialize in architecting <span className="text-white font-medium">high-performance production environments</span> where speed meets security.
                </p>
                <p>
                  My approach integrates <span className="text-white">Clean Code principles</span> with modern edge technologies to deliver seamless user experiences.
                </p>

                <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 pt-6 sm:pt-8 md:pt-12">
                  <div className="glass p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border-white/[0.03]">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-1 sm:mb-2">5+</div>
                    <div className="text-[8px] sm:text-[10px] md:text-xs font-bold tracking-widest text-white/20 uppercase">Production Apps</div>
                  </div>
                  <div className="glass p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border-white/[0.03]">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-1 sm:mb-2">35%</div>
                    <div className="text-[8px] sm:text-[10px] md:text-xs font-bold tracking-widest text-white/20 uppercase">Perf Optimization</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full sm:w-[350px] md:w-[450px] aspect-[3/4] sm:aspect-[2/3] glass overflow-hidden border-white/[0.03] shrink-0 sm:sticky sm:top-20 group">
              <video
                key="/videos/v2.mp4"
                src="/videos/v2.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 [transform:translateZ(0)]"
              >
                <source src="/videos/v2.mp4" type="video/mp4" />
              </video>
            </div>
          </motion.div>
        </div>
      </section>

      <Education />
      <Skills />
      <Experience />
      <Projects />
      <Testimonials />

      <section id="contact" className="py-20 sm:py-40 md:py-60 px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 md:pb-12 flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-white/[0.01] [contain:paint]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(118,176,171,0.08)_0%,transparent_70%)]" />

        <div className="max-w-4xl mx-auto text-center z-10 flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[8px] sm:text-xs font-bold tracking-[0.5em] sm:tracking-[0.8em] md:tracking-[1em] uppercase text-primary mb-6 sm:mb-8 md:mb-12 block"
          >
            Get in touch
          </motion.span>

          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-[10vw] font-display font-bold mb-8 sm:mb-12 md:mb-16 tracking-tighter leading-none">
            Let's build <br /> <span className="text-gradient">something.</span>
          </h2>

          <a
            href="https://wa.me/917829747061"
            target="_blank"
            rel="noopener noreferrer"
            ref={magneticRef}
            className="magnetic-btn group pointer-events-auto inline-block"
          >
            <span className="relative z-10 text-sm sm:text-base md:text-lg lg:text-xl font-black tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] uppercase">Start Conversation</span>
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>

          <div className="flex flex-wrap gap-6 sm:gap-10 md:gap-16 justify-center mt-12 sm:mt-20 md:mt-32">
            {['LinkedIn', 'GitHub', 'Email'].map((social) => (
              <a
                key={social}
                href={social === 'Email' ? 'https://mail.google.com/mail/?view=cm&fs=1&to=kaifsherdi19@gmail.com' : social === 'GitHub' ? 'https://github.com/kaifsherdi1' : 'https://www.linkedin.com/in/kaif-ahmed-sherdi-815b25297/'}
                target="_blank"
                className="text-white/20 hover:text-primary transition-all duration-300 text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-[0.3em] sm:tracking-[0.35em] md:tracking-[0.4em] uppercase hover:tracking-[0.5em] sm:hover:tracking-[0.55em] md:hover:tracking-[0.6em]"
              >
                {social}
              </a>
            ))}
          </div>
        </div>

        {/* Horizontal Line with Car - Full Width */}
        <div className="relative mt-12 sm:mt-20 md:mt-32 mb-4 sm:mb-6 md:mb-8 w-full">
          {/* Road Line */}
          <div className="w-full h-px bg-white/10" />

          {/* Race Car - positioned above the line */}
          <div className="absolute -top-4 sm:-top-6 md:-top-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl animate-[car-drive_15s_linear_infinite]">
            <svg className="w-10 h-5 sm:w-14 sm:h-7 md:w-16 md:h-8 lg:w-20 lg:h-10" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Car Body */}
              <path d="M20 35 L25 25 L35 20 L65 20 L75 25 L80 35 Z" fill="#76b0ab" stroke="#5a8d89" strokeWidth="1.5" />
              <path d="M30 20 L35 15 L55 15 L60 20 Z" fill="#5a8d89" stroke="#76b0ab" strokeWidth="1" />

              {/* Windows */}
              <path d="M32 20 L36 16 L48 16 L48 20 Z" fill="#1a1a1a" opacity="0.8" />
              <path d="M52 20 L52 16 L58 20 Z" fill="#1a1a1a" opacity="0.8" />

              {/* Wheels */}
              <circle cx="30" cy="35" r="5" fill="#2a2a2a" stroke="#76b0ab" strokeWidth="1.5" />
              <circle cx="30" cy="35" r="2" fill="#5a8d89" />
              <circle cx="70" cy="35" r="5" fill="#2a2a2a" stroke="#76b0ab" strokeWidth="1.5" />
              <circle cx="70" cy="35" r="2" fill="#5a8d89" />

              {/* Details */}
              <path d="M75 28 L78 28" stroke="#76b0ab" strokeWidth="1" opacity="0.6" />
              <path d="M75 30 L78 30" stroke="#76b0ab" strokeWidth="1" opacity="0.6" />
              <circle cx="22" cy="28" r="1.5" fill="#ffeb3b" opacity="0.9" />
            </svg>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center z-10">
          {/* Copyright Text */}
          <div className="text-white/40 text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] uppercase">
            &copy; {new Date().getFullYear()} Kaif Ahmed Sherdi &bull;
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
