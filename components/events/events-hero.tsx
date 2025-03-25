"use client"
import { motion } from "framer-motion"

export default function EventsHero({ isLoaded = false }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="w-full py-12 md:py-16 lg:py-24 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8"
            variants={itemVariants}
          >
            <span className="text-[#4CAF93]">From Connection</span> to Collective Impact
          </motion.h1>

          <motion.div className="flex items-center justify-center gap-2 sm:gap-3" variants={itemVariants}>
            <DiamondIcon />
            <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-800">Upcoming Events</h2>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function DiamondIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L16 12L12 22L8 12L12 2Z" fill="#4EB89D" />
      <path d="M2 12L12 8L22 12L12 16L2 12Z" fill="#4EB89D" />
    </svg>
  )
}

