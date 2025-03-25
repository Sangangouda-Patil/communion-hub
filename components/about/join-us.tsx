"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function JoinUs() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            <span className="text-[#4CAF93]">Join Us</span> in Building a More Connected World
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
            Whether you're looking to attend an event, volunteer your time, or partner with us, there are many ways to
            be part of the CommunionHub community.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/events"
              className="inline-flex items-center justify-center gap-2 bg-[#4EB89D] hover:bg-[#3da78c] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-colors text-sm sm:text-base"
              scroll={true}
              onClick={() => window.scrollTo(0, 0)}
            >
              Explore Our Events
              <ArrowRight size={16} className="ml-1" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-[#4EB89D] text-gray-800 hover:text-[#4EB89D] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-colors text-sm sm:text-base mt-2 sm:mt-0"
              scroll={true}
              onClick={() => window.scrollTo(0, 0)}
            >
              Get in Touch
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

