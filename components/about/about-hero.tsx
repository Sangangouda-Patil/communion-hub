"use client"
import { motion } from "framer-motion"
import Link from "next/link"

export default function AboutHero({ isLoaded = false }) {
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
    <section className="w-full py-12 sm:py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Heading Section - Centered */}
          <motion.div className="text-center mb-10 sm:mb-16" variants={itemVariants}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Where Faith Meets
              <br />
              <span className="text-[#4CAF93]">Fellowship</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
              Creating spaces where diverse beliefs converge, collaborate, and cultivate shared purpose.
            </p>

            <Link
              href="/contact"
              className="inline-block bg-[#4CAF93] hover:bg-[#3d9c82] text-white font-medium px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-colors text-sm sm:text-base"
            >
              Join our Journey
            </Link>
          </motion.div>

          {/* Mission and Vision - Side by Side on larger screens, stacked on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-6 sm:mt-8">
            {/* Mission */}
            <motion.div variants={itemVariants}>
              <div className="flex flex-col sm:flex-row sm:items-start">
                <div className="mb-3 sm:mb-0 sm:mr-4 flex-shrink-0 mx-auto sm:mx-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#4CAF93]/20 flex items-center justify-center">
                    <PaperPlaneIcon />
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-lg sm:text-xl font-bold mb-2">Our Mission</h2>
                  <p className="text-gray-600 text-sm">
                    To empower people across faiths and interests to connect through meaningful events, open dialogue,
                    and collaborative initiatives that foster understanding, spark change, and turn shared values into
                    collective impact.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div variants={itemVariants}>
              <div className="flex flex-col sm:flex-row sm:items-start">
                <div className="mb-3 sm:mb-0 sm:mr-4 flex-shrink-0 mx-auto sm:mx-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#4CAF93]/20 flex items-center justify-center">
                    <EyeIcon />
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-lg sm:text-xl font-bold mb-2">Our Vision</h2>
                  <p className="text-gray-600 text-sm">
                    A world where differences are celebrated as strengths, and every individual—regardless of faith,
                    culture, or background—finds belonging in a global community united by empathy and action.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function PaperPlaneIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.91199 12.75L11.262 18.25L19.5 4.75L2.5 11L7.49999 12.25L15.5 7.25L9.91199 12.75Z"
        stroke="#4CAF93"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.42012 12.7132C2.28394 12.4975 2.21584 12.3897 2.17772 12.2234C2.14909 12.0985 2.14909 11.9015 2.17772 11.7766C2.21584 11.6103 2.28394 11.5025 2.42012 11.2868C3.54553 9.50484 6.8954 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7766C21.8517 11.9015 21.8517 12.0985 21.8231 12.2234C21.785 12.3897 21.7169 12.4975 21.5807 12.7132C20.4553 14.4952 17.1054 19 12.0004 19C6.8954 19 3.54553 14.4952 2.42012 12.7132Z"
        stroke="#4CAF93"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.0004 15C13.6573 15 15.0004 13.6569 15.0004 12C15.0004 10.3431 13.6573 9 12.0004 9C10.3435 9 9.0004 10.3431 9.0004 12C9.0004 13.6569 10.3435 15 12.0004 15Z"
        stroke="#4CAF93"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

