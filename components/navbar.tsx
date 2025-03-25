"use client"
import Link from "next/link"
import type React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import LoginModal from "@/components/shared/login-modal"
import SignupModal from "@/components/shared/signup-modal"

// Update the Navbar component to only animate on initial site load
export default function Navbar({ isLoaded = false }) {
  // Check if this is the first visit to the site
  const [isFirstVisit, setIsFirstVisit] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)

  useEffect(() => {
    // Check if we've already visited the site in this session
    const hasVisited = sessionStorage.getItem("hasVisitedBefore")

    if (hasVisited) {
      setIsFirstVisit(false)
    } else {
      // Mark that we've visited the site
      sessionStorage.setItem("hasVisitedBefore", "true")
    }

    // Add scroll event listener to detect when page is scrolled
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Initial check
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Only animate on the landing page AND on first visit
  const isLandingPage = typeof window !== "undefined" && window.location.pathname === "/"
  const shouldAnimate = isLandingPage && isLoaded && isFirstVisit

  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.5, // Start after hero section begins loading
      },
    },
  }

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.7 + i * 0.1, // Staggered after navbar appears
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  }

  const handleSwitchToSignup = () => {
    setIsLoginModalOpen(false)
    setIsSignupModalOpen(true)
  }

  const handleSwitchToLogin = () => {
    setIsSignupModalOpen(false)
    setIsLoginModalOpen(true)
  }

  return (
    <div className="w-full flex justify-center px-0 py-0 fixed top-0 left-0 right-0 z-50">
      <motion.div
        className={`w-full max-w-7xl backdrop-blur-md bg-white/90 px-4 py-3 flex items-center justify-between md:rounded-full md:px-5 md:py-2 md:my-3 md:mx-4 border-b md:border-none transition-all duration-300 ${
          scrolled ? "shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-b border-gray-100/50" : "shadow-sm"
        }`}
        initial={shouldAnimate ? "hidden" : "visible"}
        animate="visible"
        variants={navbarVariants}
      >
        {/* Logo */}
        <motion.div
          className="flex items-center"
          custom={0}
          initial={shouldAnimate ? "hidden" : "visible"}
          animate="visible"
          variants={navItemVariants}
        >
          <Link href="/" className="flex items-center gap-1" scroll={true} onClick={() => window.scrollTo(0, 0)}>
            <div className="relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-3-epQFU3vkkyzhgCuxocPjsJVYeEbPfH.png"
                alt="CommunionHub Logo"
                width={150}
                height={28}
                className="h-6 w-auto sm:h-7"
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </Link>
        </motion.div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 text-gray-700"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <motion.div
            custom={1}
            initial={shouldAnimate ? "hidden" : "visible"}
            animate="visible"
            variants={navItemVariants}
          >
            <NavLink href="/" label="Home" />
          </motion.div>
          <motion.div
            custom={2}
            initial={shouldAnimate ? "hidden" : "visible"}
            animate="visible"
            variants={navItemVariants}
          >
            <NavLink href="/events" label="Events" />
          </motion.div>
          <motion.div
            custom={3}
            initial={shouldAnimate ? "hidden" : "visible"}
            animate="visible"
            variants={navItemVariants}
          >
            <NavLink href="/about" label="About" />
          </motion.div>
          <motion.div
            custom={4}
            initial={shouldAnimate ? "hidden" : "visible"}
            animate="visible"
            variants={navItemVariants}
          >
            <NavLink href="/contact" label="Contact" />
          </motion.div>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          <motion.div
            custom={5}
            initial={shouldAnimate ? "hidden" : "visible"}
            animate="visible"
            variants={navItemVariants}
          >
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="text-gray-800 hover:text-[#4CAF93] transition-colors"
            >
              Login
            </button>
          </motion.div>
          <motion.div
            custom={6}
            initial={shouldAnimate ? "hidden" : "visible"}
            animate="visible"
            variants={navItemVariants}
          >
            <Button 
              onClick={() => setIsSignupModalOpen(true)}
              className="bg-[#4EB89D] hover:bg-[#3da78c] text-white rounded-full px-4 sm:px-6 py-2 text-sm"
            >
              Get Started
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 py-4 px-4 sm:px-6 md:hidden"
          >
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-800 hover:text-[#4EB89D] py-2"
                onClick={() => {
                  setMobileMenuOpen(false)
                  window.scrollTo(0, 0)
                }}
              >
                Home
              </Link>
              <Link
                href="/events"
                className="text-gray-800 hover:text-[#4EB89D] py-2"
                onClick={() => {
                  setMobileMenuOpen(false)
                  window.scrollTo(0, 0)
                }}
              >
                Events
              </Link>
              <Link
                href="/about"
                className="text-gray-800 hover:text-[#4EB89D] py-2"
                onClick={() => {
                  setMobileMenuOpen(false)
                  window.scrollTo(0, 0)
                }}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-800 hover:text-[#4EB89D] py-2"
                onClick={() => {
                  setMobileMenuOpen(false)
                  window.scrollTo(0, 0)
                }}
              >
                Contact
              </Link>
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <button
                  className="w-full py-2.5 px-4 text-gray-800 hover:text-[#4EB89D] border border-gray-200 rounded-xl transition-colors text-center"
                  onClick={() => {
                    setIsLoginModalOpen(true)
                    setMobileMenuOpen(false)
                  }}
                >
                  Login
                </button>
                <button
                  className="w-full py-2.5 px-4 bg-[#4EB89D] hover:bg-[#3da78c] text-white rounded-xl transition-colors text-center"
                  onClick={() => {
                    setIsSignupModalOpen(true)
                    setMobileMenuOpen(false)
                  }}
                >
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToSignup={handleSwitchToSignup}
      />

      <SignupModal 
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </div>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      className="text-gray-800 hover:text-gray-900 transition-colors relative text-sm lg:text-base"
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

function AnimatedLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      className="text-gray-800 hover:text-gray-900 transition-colors relative px-2 py-1 text-sm lg:text-base"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      scroll={true}
      onClick={() => window.scrollTo(0, 0)}
    >
      {children}
      <motion.div
        className="absolute bottom-[-2px] left-0 h-[2px] bg-[#4EB89D] w-full origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      />
    </Link>
  )
}

