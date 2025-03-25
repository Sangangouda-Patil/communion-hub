"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export default function HeroSection({ isLoaded = false }) {
  // Update the containerVariants to have a longer duration and slower staggering
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2, // Increased from 0.8
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.3, // Increased from 0.2
      },
    },
  }

  // Update the itemVariants to have a longer duration
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2, // Increased from 0.8
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="w-full py-12 md:py-16 lg:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Heading with images */}
          <motion.div className="flex flex-col items-center space-y-4 sm:space-y-6" variants={itemVariants}>
            {/* Line 1: Bridge Faiths */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center w-full gap-3 sm:gap-4"
              variants={itemVariants}
            >
              <div className="text-center sm:text-left mb-2 sm:mb-0 sm:mr-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">Bridge Faiths,</h1>
              </div>
              <div className="bg-[#E0F2ED] rounded-full py-2 px-4 flex items-center gap-2">
                <div className="flex -space-x-2">
                  <Image
                    src="/images/landingpage/hero-section-round-img1.png"
                    width={32}
                    height={32}
                    alt="Speaker"
                    className="rounded-full border-2 border-white"
                  />
                  <Image
                    src="/images/landingpage/hero-section-round-img2.png"
                    width={32}
                    height={32}
                    alt="Speaker"
                    className="rounded-full border-2 border-white"
                  />
                  <Image
                    src="/images/landingpage/hero-section-round-img3.png"
                    width={32}
                    height={32}
                    alt="Speaker"
                    className="rounded-full border-2 border-white"
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">+7 speakers</span>
              </div>
            </motion.div>

            {/* Line 2: Share Moments */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center w-full gap-3 sm:gap-4"
              variants={itemVariants}
            >
              <div
                className="rounded-full overflow-hidden sm:mr-4 order-2 sm:order-1"
                style={{ width: "100px", height: "70px" }}
              >
                <Image
                  src="/images/landingpage/hero-section-secondline-img.png"
                  width={120}
                  height={80}
                  alt="Person sharing moment"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-center sm:text-left order-1 sm:order-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-0">
                  <span className="text-[#4CAF93]">Share Moments,</span>
                </h1>
              </div>
            </motion.div>

            {/* Line 3: Build Community */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center w-full gap-3 sm:gap-4"
              variants={itemVariants}
            >
              <div className="text-center sm:text-left mb-2 sm:mb-0 sm:mr-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">Build Community</h1>
              </div>
              <div className="rounded-full overflow-hidden" style={{ width: "100px", height: "70px" }}>
                <Image
                  src="/images/landingpage/hero-section-thirdline-img.png"
                  width={120}
                  height={80}
                  alt="Community"
                  className="object-cover w-full h-full"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Subtitle and CTA */}
          <motion.div variants={itemVariants}>
            {/* Subtitle */}
            <p className="mt-8 sm:mt-10 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto text-center px-2">
              Discover inclusive events that connect you with people across beliefs, cultures, and passions.
            </p>

            {/* CTA Button */}
            <div className="mt-8 sm:mt-10 flex justify-center">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 bg-[#4EB89D] hover:bg-[#3da78c] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-colors text-sm sm:text-base"
                scroll={true}
                onClick={() => window.scrollTo(0, 0)}
              >
                Discover Events
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>

          {/* Video Placeholder with Play Button */}
          <motion.div className="mt-10 sm:mt-12 md:mt-16 px-0" variants={itemVariants}>
            <div className="relative cursor-pointer group rounded-xl overflow-hidden min-h-[200px] sm:min-h-[300px]">
              <Image
                src="/images/landingpage/hero-section-video-img.webp"
                alt="Video thumbnail showing two people in conversation"
                width={1200}
                height={675}
                className="w-full h-full object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                onError={(e) => {
                  console.error('Error loading image:', e);
                  // You could set a fallback image here if needed
                }}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="bg-[#4EB89D] rounded-full p-2.5 sm:p-3 md:p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play size={16} className="text-white fill-white sm:hidden" />
                  <Play size={20} className="text-white fill-white hidden sm:block md:hidden" />
                  <Play size={24} className="text-white fill-white hidden md:block" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

