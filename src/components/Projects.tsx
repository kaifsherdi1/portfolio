import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, ArrowRight } from 'lucide-react'
import realEstateImg from '../assets/projects/Realx.png'
import seraphimImg from '../assets/projects/Seraphimcreative-image.png'
import redFreshImg from '../assets/projects/Redfreshbharath-image.png'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  title: string;
  category: string;
  tech: string[];
  description: string;
  stats: { [key: string]: string };
  image: string;
  url: string;
}

const projects: Project[] = [
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

  // Simplified Scroll Animations for Grid
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards as they scroll into view
      const cards = gsap.utils.toArray<HTMLElement>('.project-card')

      cards.forEach((card) => {
        gsap.fromTo(card,
          {
            y: 50,
            opacity: 0,
            scale: 0.95
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 50%',
              toggleActions: 'play none none reverse'
            }
          }
        )

        // Parallax for images within the cards
        const image = card.querySelector('img')
        if (image) {
          gsap.fromTo(image,
            { scale: 1.1, y: -20 },
            {
              scale: 1, y: 20,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
              }
            }
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="min-h-screen relative bg-black py-24 sm:py-32 px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.3em] sm:tracking-[0.35em] md:tracking-[0.4em] uppercase text-primary mb-3 text-white">Featured Work</h2>
          <p className="text-2xl sm:text-3xl md:text-4xl text-white/90 font-display font-medium max-w-2xl">
            Case studies in performance and scale.
          </p>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {projects.map((project) => (
            <div
              key={project.title}
              className="project-card group relative w-full"
              style={{ perspective: '1000px' }}
            >
              <div className="glass overflow-hidden border border-white/[0.05] hover:border-white/20 transition-all duration-500 flex flex-col bg-[#050505] rounded-2xl h-full shadow-lg hover:shadow-primary/5 hover:-translate-y-2">

                {/* Project Image */}
                <div className="relative h-[250px] sm:h-[280px] overflow-hidden bg-black/60 group-hover:opacity-100 transition-opacity duration-700">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90" />

                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold tracking-[0.2em] uppercase text-white shadow-xl rounded-sm">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6 md:p-8 flex-1 flex flex-col relative z-10 -mt-20">
                  <h3 className="text-2xl font-display font-bold text-white mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-sm text-white/60 leading-relaxed mb-6 line-clamp-3 group-hover:text-white/80 transition-colors duration-300">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-white/5 border border-white/5 text-[10px] font-semibold text-white/50 tracking-wide rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-white/5 group-hover:border-white/10 transition-colors duration-500">
                    {Object.entries(project.stats).map(([k, v], i) => (
                      <div key={i}>
                        <div className="text-[9px] uppercase tracking-widest text-white/30 mb-1">{k}</div>
                        <div className="text-sm font-bold text-white/90 group-hover:text-primary transition-colors">{v}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3 mt-auto">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-white/40 hover:text-primary transition-colors duration-300 flex items-center gap-2 group/link font-mono mb-2"
                    >
                      <ExternalLink size={12} className="group-hover/link:rotate-45 transition-transform duration-300" />
                      <span>{project.url.replace('https://', '')}</span>
                    </a>

                    <button className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 border border-white/5 text-white/90 text-xs font-bold tracking-[0.15em] uppercase hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 w-full rounded-sm group/btn">
                      View Project <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
