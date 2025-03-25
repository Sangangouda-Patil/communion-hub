"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Joining CommunionHub changed everything for me. My passion turned into a brand, and now I collaborate with businesses I once admired.",
      author: "Tiana Press",
      role: "Digital Creator",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      quote: "The partnerships I've built through CommunionHub have helped me grow beyond just running my own brand.",
      author: "Sophia Lee",
      role: "Lifestyle Influencer",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      quote:
        "Finding a community that celebrates diverse beliefs while working toward common goals has been transformative for both my personal and professional life.",
      author: "Michael Chen",
      role: "Community Organizer",
      image: "/placeholder.svg?height=50&width=50",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex)
  }

  return (
    <section className="w-full py-12 sm:py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Section Heading */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Voices of <span className="text-[#4CAF93]">Unity</span>
            </h2>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex">
                {/* Current Testimonial */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full px-0 sm:px-4"
                  >
                    <div className="bg-[#e8f4f1]/90 backdrop-blur-sm rounded-2xl p-5 sm:p-8 md:p-10 relative">
                      <p className="text-gray-700 text-base sm:text-lg italic mb-6 sm:mb-8">
                        "{testimonials[currentIndex].quote}"
                      </p>

                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={testimonials[currentIndex].image || "/placeholder.svg"}
                            alt={testimonials[currentIndex].author}
                            width={50}
                            height={50}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-3">
                          <p className="font-bold text-sm sm:text-base">{testimonials[currentIndex].author}</p>
                          <p className="text-gray-600 text-xs sm:text-sm">{testimonials[currentIndex].role}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-6 sm:mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentIndex === index ? "bg-[#4CAF93] w-4" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-center mt-3 sm:mt-4 gap-2">
              <button
                onClick={goToPrevious}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#4CAF93] hover:border-[#4CAF93] transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={goToNext}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#4CAF93] hover:border-[#4CAF93] transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

