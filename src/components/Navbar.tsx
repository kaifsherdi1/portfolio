import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number]
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number]
      }
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[9999] px-4 sm:px-8 md:px-12 py-4 transition-all duration-300 ${scrolled ? 'bg-black/50 backdrop-blur-md py-4' : 'py-6 sm:py-8'}`}>
      <div className="flex justify-between items-center relative z-[1001]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em] uppercase text-white/40 pointer-events-auto cursor-default"
        >
          KAIF AHMED <span className="text-primary italic">SHERDI</span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 sm:gap-8 md:gap-12 font-bold text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-white/70 pointer-events-auto">
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

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden pointer-events-auto text-white hover:text-primary transition-colors z-[1001] relative p-2"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-black/98 backdrop-blur-xl z-[9999] flex flex-col items-center justify-center gap-8 md:hidden h-screen w-screen touch-none"
            onClick={() => setIsOpen(false)}
          >
            {['Home', 'About', 'Projects', 'Experience', 'Contact'].map((item, i) => (
              <motion.a
                key={item}
                href={item === 'Home' ? '#' : `#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="text-2xl font-display font-bold tracking-widest text-white/70 hover:text-primary transition-colors uppercase cursor-pointer p-4"
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
