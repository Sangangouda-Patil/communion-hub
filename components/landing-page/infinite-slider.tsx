"use client"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface InfiniteSliderProps {
  phrases: string[]
  speed?: number
  className?: string
  isLoaded?: boolean
}

export default function InfiniteSlider({
  phrases = ["Connect Beyond Beliefs", "Create with Purpose", "Inspire as One"],
  speed = 15, // Slightly slower for better readability of larger text
  className = "",
  isLoaded = false,
}: InfiniteSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Initial load animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.5,
      },
    },
  }

  useEffect(() => {
    if (!sliderRef.current || !contentRef.current) return

    // Clone the content for seamless looping
    const content = contentRef.current
    const clone = content.cloneNode(true) as HTMLDivElement
    sliderRef.current.appendChild(clone)

    // Set animation duration based on content width and speed
    const contentWidth = content.offsetWidth
    console.log('Content width:', contentWidth); // Debug log

    // Ensure minimum duration
    const duration = Math.max(contentWidth / speed, 10)
    console.log('Animation duration:', duration); // Debug log

    // Apply animation to both original and cloned content
    const elements = sliderRef.current.querySelectorAll(".slider-content")
    elements.forEach((el, i) => {
      const element = el as HTMLDivElement
      element.style.animationDuration = `${duration}s`
    })
  }, [speed])

  return (
    <motion.div
      className="w-full overflow-hidden bg-[#E0F2ED] py-10 relative"
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Add left fade gradient */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 z-10 pointer-events-none bg-gradient-to-r from-[#E0F2ED] to-transparent"></div>

      <div ref={sliderRef} className="flex whitespace-nowrap">
        <div ref={contentRef} className="slider-content flex items-center animate-slider">
          {phrases.map((phrase, index) => (
            <div key={index} className="flex items-center mx-16">
              <StarIcon />
              <span className="ml-6 text-3xl md:text-4xl lg:text-5xl font-bold">{phrase}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Add right fade gradient */}
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 z-10 pointer-events-none bg-gradient-to-l from-[#E0F2ED] to-transparent"></div>
    </motion.div>
  )
}

function StarIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L16 12L12 22L8 12L12 2Z" fill="black" />
      <path d="M2 12L12 8L22 12L12 16L2 12Z" fill="black" />
    </svg>
  )
}

