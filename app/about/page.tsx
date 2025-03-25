"use client"
import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AboutHero from "@/components/about/about-hero"
import MeetOurTeam from "@/components/about/meet-our-team"
import OurValues from "@/components/about/our-values"
import Testimonials from "@/components/about/testimonials"
import JoinUs from "@/components/about/join-us"
import "@/components/shared/background-grid.css"

export default function AboutPage() {
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
      <Navbar isLoaded={isLoaded} />
      <AboutHero isLoaded={isLoaded} />
      <MeetOurTeam isLoaded={isLoaded} />
      <OurValues  />
      <Testimonials />
      <JoinUs />
      <Footer isLoaded={isLoaded} />
    </main>
  )
}

