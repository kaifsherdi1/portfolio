import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import heroVideo from '../assets/videos/v1.mp4'

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const title1Ref = useRef<HTMLSpanElement>(null)
  const title2Ref = useRef<HTMLSpanElement>(null)
  const subRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const context = gsap.context(() => {
      // Reveal Animation
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

      tl.fromTo('.mask-span',
        { yPercent: 100 },
        { yPercent: 0, duration: 1.8, stagger: 0.1, delay: 0.5 }
      )
        .from(subRef.current, {
          opacity: 0,
          y: 20,
          duration: 1.2
        }, '-=1')
        .from('.video-container', {
          scale: 1.1,
          opacity: 0,
          duration: 2
        }, 0)

      // Parallax Video
      gsap.to(videoRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })
    })

    return () => context.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-black"
    >
      {/* Full-screen Video Background */}
      <div className="video-container absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-[center_15%] brightness-[0.7] contrast-[1.2] grayscale-[0.2]"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Cinematic Masks */}
        <div className="film-grain" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10" />
        <div className="absolute inset-0 hero-vignette opacity-80 z-10" />
      </div>

      <div className="relative z-20 text-center px-6 max-w-7xl">
        <h1 className="flex flex-col items-center">
          <div className="overflow-hidden mb-2">
            <span ref={title1Ref} className="mask-span block text-[8vw] md:text-[6vw] font-display font-black leading-[0.9] tracking-tighter text-white">
              SOFTWARE DEVELOPER
            </span>
          </div>
          <div className="overflow-hidden">
            <span ref={title2Ref} className="mask-span block text-[8vw] md:text-[6vw] font-display font-bold leading-[0.9] tracking-tighter text-primary italic">
              BUILDING SCALABLE SOLUTIONS
            </span>
          </div>
        </h1>

        <div ref={subRef} className="mt-12 max-w-2xl mx-auto">
          <p className="text-white/40 text-lg md:text-xl font-light tracking-wide leading-relaxed">
            Architecting high-performance web applications with a focus on <span className="text-white">Product-grade quality</span> and seamless user experiences.
          </p>

          <div className="mt-16 flex items-center justify-center gap-8">
            <div className="w-12 h-px bg-primary/30" />
            <div className="text-[10px] font-bold tracking-[0.5em] uppercase text-primary/50">
              Engineering Excellence
            </div>
            <div className="w-12 h-px bg-primary/30" />
          </div>
        </div>
      </div>

      {/* Aesthetic Light Element */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
        <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
        <span className="text-[8px] font-bold tracking-[0.4em] uppercase text-white/50">Scroll</span>
      </div>
    </section>
  )
}
