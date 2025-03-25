"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export default function EventSection({ isLoaded = false }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3,
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

  useEffect(() => {
    // Apply styles after component mounts
    const style = document.createElement("style")
    style.innerHTML = `
      @media (min-width: 640px) {
        .sm\\:grid {
          display: grid !important;
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style) // Clean up on unmount
    }
  }, [])

  return (
    <section className="w-full py-12 md:py-16 lg:py-24 relative">
      <motion.div
        className="container mx-auto px-4 sm:px-6"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="max-w-5xl mx-auto">
          {/* Heading */}
          <motion.div className="text-center mb-8 md:mb-10" variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Events That <span className="text-[#4EB89D]">Unite</span>, <span className="text-[#4EB89D]">Empower</span>
              <br className="hidden sm:block" />
              and <span className="text-[#4EB89D]">Flourish</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              From worship circles to volunteer projects, every gathering strengthens the bonds between us.
            </p>
          </motion.div>

          {/* Bento Grid - Responsive layout */}
          <motion.div className="mt-8 px-0" variants={itemVariants}>
            <div className="grid gap-4 w-full">
              {/* Mobile layout (1 column) */}
              <div className="grid grid-cols-1 gap-4 sm:hidden">
                {/* Top row boxes */}
                <motion.div
                  className="rounded-3xl overflow-hidden bg-[#222] aspect-square shadow-[0_5px_15px_rgba(0,0,0,0.08)]"
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                    transition: {
                      duration: 0.3,
                      ease: "easeOut",
                    },
                  }}
                >
                  <Image
                    src="/images/landingpage/evnts/events-img1.webp"
                    width={300}
                    height={300}
                    alt="Monk interacting with children"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error('Error loading image:', e);
                    }}
                  />
                </motion.div>

                <motion.div
                  className="rounded-3xl overflow-hidden bg-[#222] aspect-square shadow-[0_5px_15px_rgba(0,0,0,0.08)]"
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                    transition: {
                      duration: 0.3,
                      ease: "easeOut",
                    },
                  }}
                >
                  <Image
                    src="/images/landingpage/evnts/events-img2.webp"
                    width={300}
                    height={300}
                    alt="Cultural gathering"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error('Error loading image:', e);
                    }}
                  />
                </motion.div>

                <motion.div
                  className="rounded-3xl overflow-hidden bg-[#222] aspect-square shadow-[0_5px_15px_rgba(0,0,0,0.08)]"
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                    transition: {
                      duration: 0.3,
                      ease: "easeOut",
                    },
                  }}
                >
                  <Image
                    src="/images/landingpage/evnts/events-img5.webp"
                    width={300}
                    height={300}
                    alt="Speaker with audience"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error('Error loading image:', e);
                    }}
                  />
                </motion.div>

                <motion.div
                  className="rounded-3xl overflow-hidden bg-[#222] aspect-square shadow-[0_5px_15px_rgba(0,0,0,0.08)]"
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                    transition: {
                      duration: 0.3,
                      ease: "easeOut",
                    },
                  }}
                >
                  <Image
                    src="/images/landingpage/evnts/events-img4.webp"
                    width={300}
                    height={300}
                    alt="Hands in a circle"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error('Error loading image:', e);
                    }}
                  />
                </motion.div>

                <motion.div
                  className="rounded-3xl overflow-hidden bg-[#222] aspect-[16/9] shadow-[0_5px_15px_rgba(0,0,0,0.08)]"
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                    transition: {
                      duration: 0.3,
                      ease: "easeOut",
                    },
                  }}
                >
                  <Image
                    src="/images/landingpage/evnts/events-img6.webp"
                    width={600}
                    height={300}
                    alt="Group photo"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error('Error loading image:', e);
                    }}
                  />
                </motion.div>
              </div>

              {/* Tablet and desktop layout */}
              <div className="hidden sm:grid grid-cols-3 grid-rows-2 gap-4 max-w-4xl w-full mx-auto">
                {/* Top row - 3 equal squares */}
                <motion.div
                  className="rounded-3xl overflow-hidden bg-[#222] aspect-square shadow-[0_5px_15px_rgba(0,0,0,0.08)]"
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                    transition: {
                      duration: 0.3,
                      ease: "easeOut",
                    },
                  }}
                >
                  <Image
                    src="/images/landingpage/evnts/events-img1.webp"
                    width={300}
                    height={300}
                    alt="Monk interacting with children"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error('Error loading image:', e);
                    }}
                  />
                </motion.div>

                <motion.div
                  className="rounded-3xl overflow-hidden bg-[#222] aspect-square shadow-[0_5px_15px_rgba(0,0,0,0.08)]"
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                    transition: {
                      duration: 0.3,
                      ease: "easeOut",
                    },
                  }}
                >
                  <Image
                    src="/images/landingpage/evnts/events-img2.webp"
                    width={300}
                    height={300}
                    alt="Cultural gathering"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error('Error loading image:', e);
                    }}
                  />
                </motion.div>

                <motion.div
                  className="rounded-3xl overflow-hidden bg-[#222] aspect-square shadow-[0_5px_15px_rgba(0,0,0,0.08)]"
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                    transition: {
                      duration: 0.3,
                      ease: "easeOut",
                    },
                  }}
                >
                  <Image
                    src="/images/landingpage/evnts/events-img5.webp"
                    width={300}
                    height={300}
                    alt="Speaker with audience"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error('Error loading image:', e);
                    }}
                  />
                </motion.div>

                {/* Bottom row - 1 square + 1 rectangle (spanning 2 columns) */}
                <motion.div
                  className="rounded-3xl overflow-hidden bg-[#222] aspect-square shadow-[0_5px_15px_rgba(0,0,0,0.08)]"
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                    transition: {
                      duration: 0.3,
                      ease: "easeOut",
                    },
                  }}
                >
                  <Image
                    src="/images/landingpage/evnts/events-img4.webp"
                    width={300}
                    height={300}
                    alt="Hands in a circle"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error('Error loading image:', e);
                    }}
                  />
                </motion.div>

                <motion.div
                  className="rounded-3xl overflow-hidden bg-[#222] col-span-2 aspect-[2/1] shadow-[0_5px_15px_rgba(0,0,0,0.08)]"
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                    transition: {
                      duration: 0.3,
                      ease: "easeOut",
                    },
                  }}
                >
                  <Image
                    src="/images/landingpage/evnts/events-img6.webp"
                    width={600}
                    height={300}
                    alt="Group photo"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error('Error loading image:', e);
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12 md:mt-16 text-center"
            variants={itemVariants}
          >
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold">98%</h3>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">Opportunities Expanded</p>
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold">89%</h3>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">Attendee Satisfaction</p>
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold">20k+</h3>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">Engaged Participants</p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div className="mt-10 md:mt-12 flex justify-center" variants={itemVariants}>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 bg-[#4EB89D] hover:bg-[#3da78c] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-colors text-sm sm:text-base"
              scroll={true}
              onClick={() => window.scrollTo(0, 0)}
            >
              Explore All Events
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

