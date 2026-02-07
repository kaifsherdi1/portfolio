import { motion } from 'framer-motion'

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 md:px-12 py-4 sm:py-6 md:py-10 pointer-events-none gap-4 sm:gap-0">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em] uppercase text-white/40 pointer-events-auto cursor-default text-center sm:text-left"
      >
        KAIF AHMED <span className="text-primary italic">SHERDI</span>
      </motion.div>

      <div className="flex gap-4 sm:gap-8 md:gap-12 font-bold text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-white/30 pointer-events-auto">
        {['Home', 'About', 'Projects', 'Experience', 'Contact'].map((item) => (
          <motion.a
            key={item}
            href={item === 'Home' ? '#' : `#${item.toLowerCase()}`}
            whileHover={{ x: 5, color: '#fff' }}
            className="transition-colors cursor-pointer hover:text-white"
          >
            {item}
          </motion.a>
        ))}
      </div>
    </nav>
  )
}
