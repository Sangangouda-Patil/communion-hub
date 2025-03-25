"use client"
import { motion } from "framer-motion"

export default function ContactHero({ isLoaded = false }) {
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
    <section className="w-full py-16 md:py-24 bg-transparent relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" variants={itemVariants}>
            Let's Start a <span className="text-[#4CAF93]">Conversation</span>
          </motion.h1>

          <motion.p className="text-lg text-gray-700 max-w-2xl mx-auto" variants={itemVariants}>
            Have questions or ideas? We're here to listen, collaborate, and build connections that matter.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

