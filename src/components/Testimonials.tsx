import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: "Sonia Narang",
    role: "Marketing Director",
    content: "I had a wonderful experience on your website. The product is fantastic, the service was fast and efficient, and the platform is very easy to use. I appreciate the high quality and smooth process you provide. Thank you!",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sonia&backgroundColor=b6e3f4"
  },
  {
    name: "James Mitchell",
    role: "Tech Lead at StartupHub",
    content: "Outstanding work! The attention to detail and code quality exceeded my expectations. The project was delivered on time with excellent communication throughout. Highly recommend for any serious development work.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James&backgroundColor=c0aede"
  },
  {
    name: "Priya Sharma",
    role: "Product Manager",
    content: "Absolutely brilliant! The developer understood our requirements perfectly and delivered a solution that not only met but exceeded our expectations. The performance improvements were remarkable. Will definitely work together again!",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya&backgroundColor=ffd5dc"
  },
  {
    name: "David Chen",
    role: "CEO, InnovateTech",
    content: "Professional, skilled, and reliable. The project was completed ahead of schedule with exceptional quality. The clean code architecture and documentation made it easy for our team to maintain. Truly a pleasure to work with!",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=ffdfbf"
  },
  {
    name: "Emma Thompson",
    role: "UX Designer",
    content: "The collaboration was seamless! Great communication, creative problem-solving, and a genuine commitment to delivering the best possible product. The final result was polished and user-friendly. Couldn't be happier!",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma&backgroundColor=d1d4f9"
  },
  {
    name: "Rajesh Kumar",
    role: "Founder, CloudScale",
    content: "Exceptional technical expertise combined with excellent project management. The developer proactively identified potential issues and provided smart solutions. The platform now runs 40% faster. Highly professional!",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh&backgroundColor=c7f9cc"
  }
]

export const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const currentIndex = useRef(0)

  useEffect(() => {
    const cards = cardsRef.current?.children
    if (!cards || cards.length === 0) return

    // Set initial positions with 3D transforms
    gsap.set(cards, {
      opacity: 0,
      scale: 0.9,
      y: 50
    })

    // Show first card
    gsap.to(cards[0], {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    })

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      const currentCard = cards[currentIndex.current]
      const nextIndex = (currentIndex.current + 1) % cards.length
      const nextCard = cards[nextIndex]

      // Animate out current card
      gsap.to(currentCard, {
        opacity: 0,
        scale: 0.9,
        y: -50,
        duration: 0.6,
        ease: 'power2.in'
      })

      // Animate in next card
      gsap.fromTo(nextCard,
        {
          opacity: 0,
          scale: 0.9,
          y: 50
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.3
        }
      )

      currentIndex.current = nextIndex
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
          alt="Team collaboration"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center py-20 md:py-0">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            {/* Left side - Heading and Description */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6">
                <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-primary" />
                <span className="text-[8px] sm:text-[10px] md:text-xs font-bold tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] uppercase text-primary">
                  Testimonials
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold tracking-tight mb-4 sm:mb-6 md:mb-8 text-white leading-tight">
                What People Say<br />
                <span className="text-white/40">About Me</span>
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed max-w-xl">
                My results are best reflected in the voices of those,I serve. From distributors to end users, I has empowered thousands through ethical service, reliable access, and inclusive growth. Here's what our clients have to say about their journey with us.
              </p>
            </motion.div>

            {/* Right side - Testimonial Card */}
            <div className="relative">
              <div ref={cardsRef} className="relative min-h-[350px] sm:min-h-[400px]">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="absolute inset-0 w-full"
                  >
                    <div className="bg-white p-6 sm:p-8 lg:p-10 shadow-2xl max-w-md ml-auto">
                      {/* Rating stars at top */}
                      <div className="flex gap-1 mb-4 sm:mb-5 md:mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 sm:w-5 sm:h-5 md:w-5.5 md:h-5.5 fill-orange-400 text-orange-400"
                          />
                        ))}
                      </div>

                      {/* User's feedback/comment */}
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 sm:mb-7 md:mb-8">
                        {testimonial.content}
                      </p>

                      {/* User profile at bottom */}
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-100 overflow-hidden flex items-center justify-center">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-black font-bold text-base sm:text-lg">{testimonial.name}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 98% Satisfaction Badge */}
              <motion.div
                className="absolute -bottom-8 sm:-bottom-10 md:-bottom-12 -right-4 sm:-right-6 md:-right-8 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-primary flex flex-col items-center justify-center shadow-2xl z-20"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 2, 0, -2, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">98%</div>
                <div className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-black/80 uppercase tracking-wider">Satisfaction</div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation dots indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {testimonials.map((_, index) => (
          <div
            key={index}
            className="w-2 h-2 bg-white/30 transition-all duration-300"
          />
        ))}
      </div>
    </section>
  )
}
