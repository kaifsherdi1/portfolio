import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'


interface Skill {
  name: string
  logo: string
}

interface ExpertiseGroup {
  title: string
  icon: string
  skills: Skill[]
}

const expertise: ExpertiseGroup[] = [
  {
    title: "Frontend Engineering",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    skills: [
      { name: "React 19", logo: "react" },
      { name: "TypeScript", logo: "typescript" },
      { name: "Next.js", logo: "nextdotjs" },
      { name: "GSAP", logo: "gsap" },
      { name: "Tailwind", logo: "tailwindcss" },
      { name: "Framer", logo: "framer" }
    ]
  },
  {
    title: "Backend Architecture",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
    skills: [
      { name: "Laravel", logo: "laravel" },
      { name: "Node.js", logo: "nodedotjs" },
      { name: "PHP", logo: "php" },
      { name: "MySQL", logo: "mysql" },
      { name: "Redis", logo: "redis" },
      { name: "Socket.io", logo: "socketdotio" }
    ]
  },
  {
    title: "Developer Tools",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    skills: [
      { name: "Docker", logo: "docker" },
      { name: "Git", logo: "git" },
      { name: "Postman", logo: "postman" },
      { name: "Vite", logo: "vite" },
      { name: "Figma", logo: "figma" },
      { name: "CI/CD", logo: "githubactions" }
    ]
  }
]

const SkillCard = ({ group, index }: { group: ExpertiseGroup, index: number }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="relative h-[450px] w-full glass rounded-none p-10 border-white/[0.03] group hover:border-primary/40 transition-colors duration-500 overflow-hidden"
    >
      <div
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
        className="relative z-10 h-full flex flex-col"
      >
        <div className="mb-8 flex justify-between items-start">
          <img
            src={group.icon}
            className="w-12 h-12 grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            alt={group.title}
          />
          <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-[10px] font-black text-white/20 group-hover:text-primary transition-colors">
            0{index + 1}
          </div>
        </div>

        <h3 className="text-2xl font-display font-bold text-white/50 group-hover:text-white mb-8 transition-colors">
          {group.title}
        </h3>

        <div className="flex flex-wrap gap-3 mt-auto">
          {group.skills.map((skill: Skill, si: number) => (
            <motion.div
              key={si}
              whileHover={{ scale: 1.05, translateZ: 20 }}
              className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center gap-3 hover:bg-white/[0.07] hover:border-primary/30 transition-all duration-300"
            >
              <img
                src={`https://cdn.simpleicons.org/${skill.logo}/76b0ab`}
                className="w-4 h-4 opacity-50 group-hover:opacity-100"
                alt={skill.name}
              />
              <span className="text-xs font-bold uppercase tracking-wider text-white/40 group-hover:text-white transition-colors">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3D Depth Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <div style={{ transform: "translateZ(-50px)" }} className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-40 transition-opacity" />
      </div>
    </motion.div>
  )
}

export const Skills = () => {
  return (
    <section id="skills" className="py-20 sm:py-30 md:py-40 px-4 sm:px-6 md:px-8 relative overflow-hidden bg-black">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="mb-16 sm:mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 md:gap-12">
          <div className="max-w-2xl">
            <span className="text-[8px] sm:text-[10px] md:text-xs font-bold tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em] uppercase text-primary mb-3 sm:mb-4 md:mb-6 block">Technological Arsenal</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-display font-bold tracking-tighter leading-[0.8]">
              Mastering the <br /> <span className="text-white/20 italic">Digital</span> Edge.
            </h2>
          </div>
          <p className="text-white/40 text-sm sm:text-base md:text-lg max-w-sm font-light leading-relaxed">
            Architecting solutions with a curated stack optimized for <span className="text-white">performance, security, and global scale</span>.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 perspective-[2000px]">
          {expertise.map((group, i) => (
            <SkillCard key={i} group={group} index={i} />
          ))}
        </div>

        <div className="mt-20 sm:mt-40 md:mt-60 pt-10 sm:pt-15 md:pt-20 border-t border-white/[0.05] overflow-hidden">
          <div className="text-[8px] sm:text-[9px] md:text-[10px] font-black tracking-[0.5em] sm:tracking-[0.8em] md:tracking-[1em] uppercase text-center mb-4 sm:mb-6 md:mb-8 opacity-30">Core Philosophy</div>
          <div className="relative flex opacity-30 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-1000">
            <div className="flex animate-[marquee_25s_linear_infinite]">
              <div className="flex items-center whitespace-nowrap">
                <span className="text-xs sm:text-sm md:text-base font-bold uppercase px-4 sm:px-6 md:px-8">Optimization</span>
                <span className="text-primary text-xs sm:text-sm md:text-base px-4 sm:px-6 md:px-8">•</span>
                <span className="text-xs sm:text-sm md:text-base font-bold uppercase px-4 sm:px-6 md:px-8">Security</span>
                <span className="text-primary text-xs sm:text-sm md:text-base px-4 sm:px-6 md:px-8">•</span>
                <span className="text-xs sm:text-sm md:text-base font-bold uppercase px-4 sm:px-6 md:px-8">Scalability</span>
                <span className="text-primary text-xs sm:text-sm md:text-base px-4 sm:px-6 md:px-8">•</span>
                <span className="text-xs sm:text-sm md:text-base font-bold uppercase px-4 sm:px-6 md:px-8">Refinement</span>
                <span className="text-primary text-xs sm:text-sm md:text-base px-4 sm:px-6 md:px-8">•</span>
              </div>
              <div className="flex items-center whitespace-nowrap">
                <span className="text-xs sm:text-sm md:text-base font-bold uppercase px-4 sm:px-6 md:px-8">Optimization</span>
                <span className="text-primary text-xs sm:text-sm md:text-base px-4 sm:px-6 md:px-8">•</span>
                <span className="text-xs sm:text-sm md:text-base font-bold uppercase px-4 sm:px-6 md:px-8">Security</span>
                <span className="text-primary text-xs sm:text-sm md:text-base px-4 sm:px-6 md:px-8">•</span>
                <span className="text-xs sm:text-sm md:text-base font-bold uppercase px-4 sm:px-6 md:px-8">Scalability</span>
                <span className="text-primary text-xs sm:text-sm md:text-base px-4 sm:px-6 md:px-8">•</span>
                <span className="text-xs sm:text-sm md:text-base font-bold uppercase px-4 sm:px-6 md:px-8">Refinement</span>
                <span className="text-primary text-xs sm:text-sm md:text-base px-4 sm:px-6 md:px-8">•</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
