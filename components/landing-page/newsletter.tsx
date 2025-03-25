"use client"
import { useState } from "react"
import type React from "react"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function Newsletter({ isLoaded = false }) {
  const [email, setEmail] = useState("")

  // Initial load animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.7,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup logic here
    console.log("Subscribing email:", email)
    // Reset form or show success message
    setEmail("")
  }

  return (
    <motion.section
      className="w-full py-12 md:py-16 lg:py-24"
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div className="max-w-4xl mx-auto" variants={itemVariants}>
          {/* Newsletter Card */}
          <div className="bg-[#A7DDCB] rounded-3xl p-6 sm:p-8 md:p-12 text-center relative overflow-hidden">
            {/* Content */}
            <div className="relative z-10 pt-2 sm:pt-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-3">
                Sign up to our newsletter
              </h2>
              <p className="text-gray-700 max-w-md mx-auto mb-4 sm:mb-6 text-sm sm:text-base px-2">
                Lorem ipsum dolor sit amet consectetur. Egestas et feugiat purus enim facilisis nunc blandit nullam.
              </p>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex rounded-lg overflow-hidden shadow-sm">
                  <input
                    type="email"
                    placeholder="Enter Your email address"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 outline-none border-0 flex-grow text-sm sm:text-base"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="bg-[#4EB89D] hover:bg-[#3da78c] text-white p-2.5 sm:p-3 flex-shrink-0 flex items-center justify-center"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

