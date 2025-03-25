"use client"
import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ContactHero from "@/components/contact/contact-hero"
import ContactSection from "@/components/contact/contact-section"
import "@/components/shared/background-grid.css"

// Update the Contact page to indicate it's not the landing page
export default function ContactPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  // Add smooth scrolling and set loaded state
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"

    // Set loaded state after a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => {
      document.documentElement.style.scrollBehavior = ""
      clearTimeout(timer)
    }
  }, [])

  return (
    <main className="min-h-screen bg-diamond-grid relative z-0 overflow-x-hidden pt-16">
      <Navbar isLoaded={false} /> {/* Set isLoaded to false to prevent animation */}
      <ContactHero isLoaded={isLoaded} />
      <ContactSection isLoaded={isLoaded} />
      <Footer isLoaded={isLoaded} />
    </main>
  )
}

