import { motion } from 'framer-motion'
import { Briefcase, Cpu } from 'lucide-react'

const experiences = [
  {
    role: "Associate Software Developer",
    company: "7Crore Technologies",
    location: "Hubli, India",
    period: "Aug 2024 – Sep 2025",
    impact: "Engineered scalable production systems with focus on performance & security.",
    description: [
      "Developed responsive full-stack web applications using React.js and Laravel (PHP) with MySQL",
      "Designed and implemented RESTful APIs for real estate, e-commerce, and course management platforms",
      "Built secure authentication using Laravel Sanctum, JWT, and RBAC",
      "Optimized performance using Redis caching, queues, and background jobs",
      "Delivered 5+ full-stack projects from requirement analysis to production readiness"
    ]
  }
]

export const Experience = () => {
  return (
    <section id="experience" className="py-20 sm:py-30 md:py-40 px-4 sm:px-6 md:px-8 bg-black relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16 md:mb-24">
          <span className="text-[8px] sm:text-[10px] md:text-xs font-bold tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em] uppercase text-primary mb-2 sm:mb-3 md:mb-4 block">Proven Track Record</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold tracking-tighter">Professional <br /><span className="text-white/20">Journey</span></h2>
        </motion.div>

        <div className="space-y-16 sm:space-y-20 md:space-y-32">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="relative pl-6 sm:pl-8 md:pl-12 lg:pl-0"
            >
              {/* Timeline Connector */}
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-primary border-2 sm:border-4 border-black" />
              </div>

              <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12 items-start">
                <div className="flex-1 md:text-right md:pr-20 hidden md:block">
                  <div className="text-xl lg:text-2xl font-display font-medium text-white/40 mb-2">{exp.period}</div>
                  <div className="text-xs sm:text-sm font-bold tracking-widest text-primary uppercase">{exp.location}</div>
                </div>

                <div className="flex-1 md:pl-20">
                  <div className="glass p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] relative group border-white/[0.03] hover:border-primary/40 transition-all duration-700">
                    <div className="absolute -top-4 sm:-top-5 md:-top-6 -left-4 sm:-left-5 md:-left-6 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 glass rounded-full flex items-center justify-center text-primary group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(118,176,171,0.3)] transition-all">
                      <Cpu className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                    </div>

                    <div className="mb-6 sm:mb-7 md:mb-8">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white mb-1 sm:mb-1.5 md:mb-2">{exp.role}</h3>
                      <div className="flex items-center gap-2 text-white/40 text-xs sm:text-sm font-medium">
                        <Briefcase className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {exp.company}
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 md:p-6 bg-white/[0.02] rounded-xl sm:rounded-2xl mb-6 sm:mb-7 md:mb-8 border border-white/[0.05]">
                      <p className="text-white/70 italic text-sm sm:text-base md:text-lg leading-relaxed">"{exp.impact}"</p>
                    </div>

                    <ul className="space-y-3 sm:space-y-4 md:space-y-6">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex gap-3 sm:gap-3.5 md:gap-4 group/li text-white/50 hover:text-white transition-colors">
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary mt-1.5 sm:mt-2 md:mt-2.5 shrink-0 opacity-20 group-hover/li:opacity-100 transition-opacity" />
                          <span className="text-xs sm:text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 sm:mt-8 md:mt-10 md:hidden flex justify-between items-center text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-widest text-white/30 uppercase">
                      <span>{exp.period}</span>
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
