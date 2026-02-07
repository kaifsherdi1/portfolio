import { motion } from 'framer-motion'
import { GraduationCap, BookOpen, MapPin } from 'lucide-react'

interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  details: string;
  bgImage?: string;
}

const education: EducationItem[] = [
  {
    degree: "Bachelor of Engineering in Electrical & Electronics",
    institution: "AGMR College of Engineering",
    location: "Varur, Hubli",
    period: "Nov 2021 – July 2024",
    details: "Focused on advanced electrical systems and electronic circuit design with a strong foundation in engineering principles.",
    bgImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000"
  },
  {
    degree: "Diploma in Electrical & Electronics",
    institution: "Tippu Shaheed Institute of Technology",
    location: "Hubli",
    period: "2018 – 2021",
    details: "Developed core technical skills in electrical engineering and electronics through hands-on training and theoretical study.",
    bgImage: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=2000"
  }
]

export const Education = () => {
  return (
    <section id="education" className="py-40 px-8 bg-black relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <span className="text-xs font-bold tracking-[0.5em] uppercase text-primary mb-4 block">Academic Foundation</span>
          <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter">Educational <br /><span className="text-white/20">Background</span></h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="glass p-12 rounded-[2.5rem] border-white/[0.03] group hover:border-primary/40 transition-all duration-700 relative overflow-hidden"
              style={{
                backgroundImage: edu.bgImage ? `linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0.95)), url(${edu.bgImage})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                < GraduationCap size={180} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                    {index === 0 ? <GraduationCap size={24} /> : <BookOpen size={24} />}
                  </div>
                  <div className="text-[10px] font-black tracking-[0.3em] uppercase text-white/30">
                    {edu.period}
                  </div>
                </div>

                <h3 className="text-3xl font-display font-bold text-white mb-4 leading-tight">
                  {edu.degree}
                </h3>

                <div className="space-y-3 mb-10">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {edu.institution}
                  </div>
                  <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                    <MapPin size={12} />
                    {edu.location}
                  </div>
                </div>

                <ul className="space-y-4 border-t border-white/5 pt-8">
                  <li className="flex gap-4 text-white/50 hover:text-white transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0 opacity-20 group-hover:opacity-100 transition-opacity" />
                    <span className="text-sm leading-relaxed">{edu.details}</span>
                  </li>
                </ul>
              </div>

              {/* Depth Element */}
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
