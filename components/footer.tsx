"use client"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

export default function Footer({ isLoaded = false }) {
  // Initial load animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 3.0, // Start after newsletter begins loading
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.footer
      className="bg-[#F2F9F6] pt-12 md:pt-16 pb-8"
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Logo and Social Links */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <Link href="/" className="inline-block" scroll={true} onClick={() => window.scrollTo(0, 0)}>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-3-epQFU3vkkyzhgCuxocPjsJVYeEbPfH.png"
                alt="CommunionHub Logo"
                width={150}
                height={28}
                className="h-6 w-auto sm:h-7"
                style={{ objectFit: "contain" }}
                priority
              />
            </Link>

            <p className="text-gray-600 max-w-xs text-sm">Your path from shared moments to lasting unity simplified.</p>

            <div className="flex items-center gap-4 pt-2">
              <Link href="#" className="text-gray-500 hover:text-[#4EB89D] transition-colors">
                <Facebook size={18} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-[#4EB89D] transition-colors">
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-[#4EB89D] transition-colors">
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-[#4EB89D] transition-colors">
                <Youtube size={18} />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="md:mx-auto">
            <h3 className="font-semibold text-base lg:text-lg mb-3 md:mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2 md:space-y-3">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/events" label="Events" />
              <FooterLink href="/about" label="About" />
              <FooterLink href="/contact" label="Contact" />
            </nav>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants} className="md:ml-auto">
            <h3 className="font-semibold text-base lg:text-lg mb-3 md:mb-4">Contact</h3>
            <a
              href="mailto:contact@communionhub.org"
              className="text-gray-600 hover:text-[#4EB89D] transition-colors text-sm"
            >
              contact@communionhub.org
            </a>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="border-t border-gray-200 mt-10 md:mt-12 pt-6 md:pt-8 max-w-6xl mx-auto"
          variants={itemVariants}
        >
          <p className="text-center text-gray-500 text-xs sm:text-sm">
            © {new Date().getFullYear()} CommunionHub. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

function FooterLink({ href, label }: { href: string; label: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      className="text-gray-600 hover:text-gray-800 transition-colors relative w-fit text-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      scroll={true}
      onClick={() => window.scrollTo(0, 0)}
    >
      {label}
      <motion.div
        className="absolute bottom-[-4px] left-0 h-[2px] bg-[#4EB89D] w-full origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      />
    </Link>
  )
}

