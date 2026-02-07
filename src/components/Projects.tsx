import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, ArrowRight } from 'lucide-react'
import realEstateImg from '../assets/projects/Realx.png'
import seraphimImg from '../assets/projects/Seraphimcreative-image.png'
import redFreshImg from '../assets/projects/Redfreshbharath-image.png'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "Real Estate Management",
    category: "Full Stack / Production",
    tech: ["React", "Laravel", "Redis", "MySQL"],
    description: "Architected a large-scale platform with RBAC, advanced filtering, and background processing. Achieved 35% performance boost.",
    stats: { performance: "+35%", users: "5k+", uptime: "99.9%" },
    image: realEstateImg,
    url: "https://realestatemanagement.com"
  },
  {
    title: "Seraphim Creative",
    category: "Brand / Performance",
    tech: ["JS", "GSAP", "UI Optimization"],
    description: "High-end business website featuring complex UI animations and SEO-focused architecture.",
    stats: { speed: "98/100", animations: "60fps", seo: "Rank #1" },
    image: seraphimImg,
    url: "https://seraphimcreative.in"
  },
  {
    title: "RedFresh Bharath",
    category: "Corporate / Scalable",
    tech: ["Next.js", "Tailwind", "Vite"],
    description: "Modern professional brand website presenting vision and market presence with high accessibility.",
    stats: { score: "A+", loading: "<1s", responsive: "100%" },
    image: redFreshImg,
    url: "https://redfreshbharath.com"
  }
]

export const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Desktop Animation (Horizontal Scroll)
      const mm = gsap.matchMedia()

      mm.add("(min-width: 768px)", () => {
        const scrollWidth = scrollRef.current!.offsetWidth - window.innerWidth

        // Main horizontal scroll animation
        const mainScrollTrigger = gsap.to(scrollRef.current, {
          x: -scrollWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1.2,
            end: () => `+=${scrollWidth}`,
            anticipatePin: 1
          }
        })

        // Individual card animations (Desktop only)
        cardRefs.current.forEach((card, index) => {
          if (!card) return

          gsap.fromTo(card,
            { x: 300, opacity: 0, scale: 0.85, rotateY: 15 },
            {
              x: 0, opacity: 1, scale: 1, rotateY: 0, duration: 1.4, ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                containerAnimation: mainScrollTrigger,
                start: 'left 90%',
                end: 'left 50%',
                scrub: 1.5,
                toggleActions: 'play none none reverse'
              }
            }
          )
        })
      })

      // Mobile Animation (Simple Fade In)
      mm.add("(max-width: 767px)", () => {
        cardRefs.current.forEach((card) => {
          if (!card) return
          gsap.fromTo(card,
            { opacity: 0, y: 50 },
            {
              opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 60%',
                toggleActions: 'play none none reverse'
              }
            }
          )
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="min-h-screen relative bg-black py-20 md:py-0 overflow-hidden md:flex md:items-center">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

      {/* Heading */}
      <div className="absolute top-6 sm:top-8 md:top-12 left-4 sm:left-8 md:left-20 z-20 pointer-events-none">
        <h2 className="text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.3em] sm:tracking-[0.35em] md:tracking-[0.4em] uppercase text-primary mb-1 sm:mb-1.5 md:mb-2 text-white">Featured Work</h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 font-light">Case studies in performance.</p>
      </div>

      {/* Content Container */}
      <div ref={scrollRef} className="flex flex-col md:flex-row gap-12 md:gap-16 px-4 md:px-[10vw] md:pr-[30vw] md:items-center w-full md:w-auto h-auto md:h-full md:pt-32 pb-20 md:pb-0">
        {projects.map((project, index) => (
          <div
            key={index}
            ref={(el) => { cardRefs.current[index] = el }}
            className="w-full md:w-[500px] shrink-0 relative group"
            style={{ perspective: '1000px' }}
          >
            <div className="glass overflow-hidden border border-white/[0.08] hover:border-primary/50 transition-all duration-700 h-auto md:h-full flex flex-col bg-black/40 will-change-transform rounded-2xl md:rounded-none">

              {/* Project Image */}
              <div className="relative h-[240px] md:h-[280px] overflow-hidden bg-black/60">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute top-4 left-4 md:top-5 md:left-5">
                  <span className="px-3 py-1.5 md:px-4 md:py-2 bg-black/70 backdrop-blur-md border border-primary/30 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-primary shadow-lg">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-5 md:p-7 flex-1 flex flex-col relative z-10">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 md:mb-3 tracking-tight group-hover:text-primary transition-colors duration-500">
                  {project.title}
                </h3>

                <p className="text-sm text-white/70 whitespace-normal leading-relaxed mb-4 md:mb-5 group-hover:text-white/90 transition-colors duration-500">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4 md:mb-5">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 md:px-3 md:py-1.5 bg-white/5 border border-white/10 text-[10px] md:text-xs font-semibold text-white/60 tracking-wide group-hover:bg-primary/10 group-hover:border-primary/30 group-hover:text-primary transition-all duration-500"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 md:gap-6 mb-4 md:mb-5 pb-4 md:pb-5 border-b border-white/10 group-hover:border-primary/20 transition-colors duration-700">
                  {Object.entries(project.stats).map(([k, v], i) => (
                    <div key={i} className="group/stat">
                      <div className="text-[8px] md:text-[9px] uppercase tracking-widest text-white/40 mb-1 group-hover/stat:text-primary/60 transition-colors">{k}</div>
                      <div className="text-sm md:text-base font-bold text-white group-hover/stat:text-primary transition-colors">{v}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3 mt-auto">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/50 hover:text-primary transition-colors duration-300 flex items-center gap-2 group/link font-mono"
                  >
                    <ExternalLink size={12} className="group-hover/link:rotate-45 transition-transform duration-300" />
                    <span>{project.url.replace('https://', '')}</span>
                  </a>

                  <button className="flex items-center justify-center gap-2 px-5 py-3 bg-primary/10 border border-primary/30 text-primary text-sm font-bold tracking-wide uppercase hover:bg-primary hover:text-black transition-all duration-300 group/btn w-full">
                    View Project <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
