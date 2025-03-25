"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Check } from "lucide-react"
import { useModal } from './shared/ModalContext'

export default function DiscoverUs({ isLoaded = false }) {
  const { openSignup } = useModal()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.8, // Start after previous sections
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
    <section className="w-full py-12 sm:py-16 md:py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -left-20 top-20 w-40 h-80 bg-[#E0F2ED] rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute -right-20 bottom-20 w-40 h-80 bg-[#E0F2ED] rounded-full blur-3xl opacity-30 -z-10"></div>

      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Section Heading */}
          <motion.div className="text-center mb-8 sm:mb-12" variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Discover What <span className="text-[#4CAF93]">Sets Us Apart</span>
            </h2>

            <div className="flex items-center justify-center mt-3 sm:mt-4">
              <DiamondIcon />
              <span className="ml-2 text-lg sm:text-xl font-medium">Movement</span>
            </div>
          </motion.div>

          {/* Content Card */}
          <motion.div
            className="bg-white rounded-3xl border border-gray-100 p-5 sm:p-6 md:p-8 lg:p-12 shadow-sm"
            variants={itemVariants}
          >
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12">
              {/* Image - First on mobile, Left on desktop */}
              <div className="md:flex-1 order-1 md:order-1">
                <div className="bg-gray-200 rounded-xl w-full aspect-square max-w-md mx-auto">
                  <Image
                    src="/images/eventspage/event-page-discoverus-img.webp"
                    alt="Community in action"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>

              {/* Content - Second on mobile, Right on desktop */}
              <div className="md:flex-1 flex flex-col justify-center order-2 md:order-2 mt-6 md:mt-0">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                  Creativity in Motion, <br className="hidden sm:block" />
                  <span className="text-[#4EB89D]">Communities</span> in Bloom
                </h3>

                <p className="text-gray-600 mb-5 sm:mb-6 md:mb-8 text-sm sm:text-base">
                  Where faiths converge, connections deepen, <br className="hidden md:block" />
                  and impact begins.
                </p>

                {/* Feature List */}
                <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-6 md:mb-8">
                  <FeatureItem text="Expert-Led Sessions" />
                  <FeatureItem text="Interactive Learning" />
                  <FeatureItem text="Networking Opportunities" />
                </div>

                {/* CTA Button - Updated with link to signup */}
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    openSignup()
                  }}
                  className="inline-block bg-[#4EB89D] hover:bg-[#3da78c] text-white font-medium px-5 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full transition-colors text-sm sm:text-base w-full sm:w-auto text-center"
                >
                  Get Started Now
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#E0F2ED] flex items-center justify-center mr-2 sm:mr-3">
        <Check size={12} className="text-[#4EB89D]" />
      </div>
      <span className="text-gray-700 text-sm sm:text-base">{text}</span>
    </div>
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

