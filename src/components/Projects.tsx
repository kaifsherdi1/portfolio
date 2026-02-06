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
    const context = gsap.context(() => {
      const scrollWidth = scrollRef.current!.offsetWidth - window.innerWidth

      // Main horizontal scroll animation
      const mainScrollTrigger = gsap.to(scrollRef.current, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${scrollWidth}`,
          anticipatePin: 1
        }
      })

      // Individual card animations
      cardRefs.current.forEach((card) => {
        if (!card) return

        // Staggered entrance animation from right
        gsap.fromTo(card,
          {
            x: 300,
            opacity: 0,
            scale: 0.85,
            rotateY: 15
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 1.4,
            ease: 'power3.out',
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

        // Active card focus effect (center position)
        gsap.to(card, {
          scale: 1.05,
          scrollTrigger: {
            trigger: card,
            containerAnimation: mainScrollTrigger,
            start: 'center 60%',
            end: 'center 40%',
            scrub: 2
          }
        })

        // Fade out previous cards
        gsap.to(card, {
          opacity: 0.4,
          scale: 0.92,
          scrollTrigger: {
            trigger: card,
            containerAnimation: mainScrollTrigger,
            start: 'right 40%',
            end: 'right 20%',
            scrub: 1.5
          }
        })
      })
    })

    return () => context.revert()
  }, [])

  const handleCardHover = (index: number, isEntering: boolean) => {
    const card = cardRefs.current[index]
    if (!card) return

    if (isEntering) {
      gsap.to(card, {
        y: -16,
        duration: 0.7,
        ease: 'power2.out'
      })
    } else {
      gsap.to(card, {
        y: 0,
        duration: 0.7,
        ease: 'power2.out'
      })
    }
  }

  return (
    <section ref={sectionRef} className="min-h-screen md:h-screen overflow-hidden bg-black flex items-center relative py-20 md:py-0">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="absolute top-6 sm:top-8 md:top-12 left-4 sm:left-8 md:left-20 z-20 pointer-events-none">
        <h2 className="text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.3em] sm:tracking-[0.35em] md:tracking-[0.4em] uppercase text-primary mb-1 sm:mb-1.5 md:mb-2">Featured Work</h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/40 font-light">Case studies in performance.</p>
      </div>

      <div ref={scrollRef} className="flex gap-16 px-[10vw] pr-[30vw] whitespace-nowrap items-center h-full pt-32">
        {projects.map((project, index) => (
          <div
            key={index}
            ref={(el) => { cardRefs.current[index] = el }}
            onMouseEnter={() => handleCardHover(index, true)}
            onMouseLeave={() => handleCardHover(index, false)}
            className="w-[70vw] md:w-[500px] shrink-0 relative group"
            style={{ perspective: '1000px' }}
          >
            <div className="glass overflow-hidden border border-white/[0.08] hover:border-primary/50 transition-all duration-700 h-full flex flex-col bg-black/40 backdrop-blur-xl">
              {/* Animated glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent blur-2xl -z-10 scale-105" />

              {/* Project Image - Prominent Display */}
              <div className="relative h-[280px] overflow-hidden bg-black/60">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-5 left-5">
                  <span className="px-4 py-2 bg-black/70 backdrop-blur-md border border-primary/30 text-xs font-bold tracking-[0.2em] uppercase text-primary shadow-lg">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-7 flex-1 flex flex-col relative z-10">
                <h3 className="text-3xl font-display font-bold text-white mb-3 tracking-tight group-hover:text-primary transition-colors duration-500">
                  {project.title}
                </h3>

                <p className="text-sm text-white/70 whitespace-normal leading-relaxed mb-5 group-hover:text-white/90 transition-colors duration-500">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 text-xs font-semibold text-white/60 tracking-wide group-hover:bg-primary/10 group-hover:border-primary/30 group-hover:text-primary transition-all duration-500"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex gap-6 mb-5 pb-5 border-b border-white/10 group-hover:border-primary/20 transition-colors duration-700">
                  {Object.entries(project.stats).map(([k, v], i) => (
                    <div key={i} className="group/stat">
                      <div className="text-[9px] uppercase tracking-widest text-white/40 mb-1 group-hover/stat:text-primary/60 transition-colors">{k}</div>
                      <div className="text-base font-bold text-white group-hover/stat:text-primary transition-colors">{v}</div>
                    </div>
                  ))}
                </div>

                {/* URL and CTA */}
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

              {/* Bottom glow depth element */}
              <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary/10 blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            </div>
          </div>
        ))}

        <div className="flex flex-col items-start justify-center pl-20 shrink-0">
          <h3 className="text-6xl font-display font-bold text-white/10 tracking-tighter mb-8 leading-tight hover:text-white/20 transition-colors duration-500">
            Looking for <br /> something else?
          </h3>
          <button className="text-xl font-bold text-primary flex items-center gap-4 hover:gap-6 transition-all duration-300 group">
            Explore more projects <ExternalLink size={20} className="group-hover:rotate-45 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </section>
  )
}
