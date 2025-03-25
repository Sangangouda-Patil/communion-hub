"use client"
import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import EventsHero from "@/components/events/events-hero"
import EventsFilter from "@/components/events/events-filter"
import EventsList from "@/components/events/events-list"
import EventsPagination from "@/components/events/events-pagination"
import DiscoverUs from "@/components/discover-us"
import FaqSection from "@/components/faq-section"
import "@/components/shared/background-grid.css"

export default function EventsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDateFilter, setSelectedDateFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(12) // Set to match the number of events
  const [isLoaded, setIsLoaded] = useState(false)
  const ITEMS_PER_PAGE = 6

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

  // Clear all filters function
  const clearAllFilters = () => {
    setSelectedCategory("all")
    setSelectedDateFilter("")
    setCurrentPage(1)
  }

  return (
    <main className="min-h-screen pt-16 bg-diamond-grid relative z-0 overflow-x-hidden">
      <Navbar isLoaded={false} /> {/* Set isLoaded to false to prevent animation */}
      <EventsHero isLoaded={isLoaded} />
      <EventsFilter
        viewMode={viewMode}
        setViewMode={setViewMode}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedDateFilter={selectedDateFilter}
        setSelectedDateFilter={setSelectedDateFilter}
        isLoaded={isLoaded}
      />
      <EventsList
        viewMode={viewMode}
        selectedCategory={selectedCategory}
        selectedDateFilter={selectedDateFilter}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setTotalPages={setTotalPages}
        isLoaded={isLoaded}
      />
      <EventsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
        isLoaded={isLoaded}
      />
      <DiscoverUs isLoaded={isLoaded} />
      {/* Added FAQ Section */}
      <FaqSection isLoaded={isLoaded} />
      <Footer isLoaded={isLoaded} />
    </main>
  )
}

