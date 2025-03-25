"use client"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react"
import { useState, useMemo, useEffect } from "react"
import RegistrationModal from "../shared/registration-modal"

// Sample event data with actual dates for filtering
const allEvents = [
  {
    id: 1,
    title: "Interfaith Dialogue: Finding Common Ground",
    description: "Join us for an evening of meaningful conversation across different faith traditions.",
    image: "/images/eventspage/card1.webp",
    date: "May 15, 2025",
    time: "6:00 PM - 8:00 PM",
    location: "Community Center, New York",
    attendees: 42,
    category: "discussion",
    dateObj: new Date(2025, 4, 15), // May 15, 2025
  },
  {
    id: 2,
    title: "Volunteer Day: Community Garden Project",
    description: "Help us plant and maintain a community garden that will provide fresh produce for local food banks.",
    image: "/images/eventspage/card2.webp",
    date: "May 22, 2025",
    time: "9:00 AM - 1:00 PM",
    location: "Riverside Park, Chicago",
    attendees: 28,
    category: "volunteer",
    dateObj: new Date(2025, 4, 22), // May 22, 2025
  },
  {
    id: 3,
    title: "Meditation Workshop: Finding Inner Peace",
    description: "Learn meditation techniques from different spiritual traditions to enhance your daily practice.",
    image: "/images/eventspage/card3.webp",
    date: "June 5, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "Serenity Center, Los Angeles",
    attendees: 35,
    category: "spiritual",
    dateObj: new Date(2025, 5, 5), // June 5, 2025
  },
  {
    id: 4,
    title: "Community Potluck: Sharing Cultural Cuisines",
    description: "Bring a dish that represents your cultural heritage and share stories around the table.",
    image: "/images/eventspage/card4.webp",
    date: "June 12, 2025",
    time: "5:30 PM - 8:30 PM",
    location: "Unity Hall, Boston",
    attendees: 50,
    category: "community",
    dateObj: new Date(2025, 5, 12), // June 12, 2025
  },
  {
    id: 5,
    title: "Sacred Texts Study Group",
    description:
      "Explore and discuss passages from various religious and philosophical texts in a respectful environment.",
    image: "/images/eventspage/card5.webp",
    date: "June 19, 2025",
    time: "7:00 PM - 9:00 PM",
    location: "Public Library, Seattle",
    attendees: 22,
    category: "discussion",
    dateObj: new Date(2025, 5, 19), // June 19, 2025
  },
  {
    id: 6,
    title: "Youth Leadership Workshop",
    description: "Empowering young people to become leaders in their communities through interactive activities.",
    image: "/images/eventspage/card6.webp",
    date: "June 26, 2025",
    time: "4:00 PM - 6:00 PM",
    location: "Youth Center, Austin",
    attendees: 30,
    category: "community",
    dateObj: new Date(2025, 5, 26), // June 26, 2025
  },
  {
    id: 7,
    title: "Mindfulness Retreat: Weekend of Reflection",
    description: "A weekend retreat focused on mindfulness practices and spiritual growth in a peaceful setting.",
    image: "/images/eventspage/card7.webp",
    date: "July 8, 2025",
    time: "All Day",
    location: "Mountain Retreat Center, Colorado",
    attendees: 25,
    category: "spiritual",
    dateObj: new Date(2025, 6, 8), // July 8, 2025
  },
  {
    id: 8,
    title: "Interfaith Music Festival",
    description:
      "Celebrating diverse musical traditions from around the world in an evening of harmony and connection.",
    image: "/images/eventspage/card8.webp",
    date: "July 15, 2025",
    time: "5:00 PM - 10:00 PM",
    location: "City Park Amphitheater, Portland",
    attendees: 120,
    category: "community",
    dateObj: new Date(2025, 6, 15), // July 15, 2025
  },
  {
    id: 9,
    title: "Spiritual Art Workshop",
    description: "Express your spirituality through art in this guided workshop open to all skill levels.",
    image: "/images/eventspage/card9.webp",
    date: "July 22, 2025",
    time: "1:00 PM - 4:00 PM",
    location: "Community Art Center, Hyderabad, India",
    attendees: 18,
    category: "spiritual",
    dateObj: new Date(2025, 6, 22), // July 22, 2025
  },
  {
    id: 10,
    title: "Interfaith Book Club: Understanding World Religions",
    description: "Join our monthly book club where we explore texts from different religious traditions.",
    image: "/images/eventspage/card10.webp",
    date: "July 29, 2025",
    time: "7:00 PM - 9:00 PM",
    location: "Community Library, Denver",
    attendees: 15,
    category: "discussion",
    dateObj: new Date(2025, 6, 29), // July 29, 2025
  },
  {
    id: 11,
    title: "Community Clean-up Day",
    description: "Help beautify our shared spaces and connect with neighbors from all backgrounds.",
    image: "/images/eventspage/card11.webp",
    date: "August 5, 2025",
    time: "9:00 AM - 12:00 PM",
    location: "Riverside Park, Minneapolis",
    attendees: 40,
    category: "volunteer",
    dateObj: new Date(2025, 7, 5), // August 5, 2025
  },
  {
    id: 12,
    title: "Interfaith Youth Camp",
    description: "A week-long camp for teens to learn about different faiths while building lasting friendships.",
    image: "/images/eventspage/card12.webp",
    date: "August 12, 2025",
    time: "All Week",
    location: "Lake Campground, Michigan",
    attendees: 60,
    category: "community",
    dateObj: new Date(2025, 7, 12), // August 12, 2025
  },
]

export default function EventsList({
  viewMode = "grid",
  selectedCategory = "all",
  selectedDateFilter = "",
  currentPage = 1,
  setCurrentPage,
  setTotalPages,
  isLoaded = false,
}: {
  viewMode?: "grid" | "list"
  selectedCategory?: string
  selectedDateFilter?: string
  currentPage?: number
  setCurrentPage?: (page: number) => void
  setTotalPages?: (total: number) => void
  isLoaded?: boolean
}) {
  const [isLoading, setIsLoading] = useState(true)
  const ITEMS_PER_PAGE = 6

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  // Initial load animation
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.5, // Start after filters are visible
        when: "beforeChildren",
      },
    },
  }

  // Filter events based on selected category and date
  const filteredEvents = useMemo(() => {
    // Start with all events
    let filtered = [...allEvents]

    // Apply category filter if not "all"
    if (selectedCategory !== "all") {
      filtered = filtered.filter((event) => event.category === selectedCategory)
    }

    // Apply date filter if selected
    if (selectedDateFilter) {
      const today = new Date()
      today.setHours(0, 0, 0, 0) // Start of today

      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1) // Start of tomorrow

      const nextWeek = new Date(today)
      nextWeek.setDate(nextWeek.getDate() + 7) // One week from today

      const nextMonth = new Date(today)
      nextMonth.setMonth(nextMonth.getMonth() + 1) // One month from today

      switch (selectedDateFilter) {
        case "today":
          // Events happening today
          filtered = filtered.filter((event) => {
            const eventDate = new Date(event.dateObj)
            return eventDate.toDateString() === today.toDateString()
          })
          break
        case "tomorrow":
          // Events happening tomorrow
          filtered = filtered.filter((event) => {
            const eventDate = new Date(event.dateObj)
            return eventDate.toDateString() === tomorrow.toDateString()
          })
          break
        case "this-week":
          // Events happening within the next 7 days
          filtered = filtered.filter((event) => {
            const eventDate = new Date(event.dateObj)
            return eventDate >= today && eventDate < nextWeek
          })
          break
        case "this-month":
          // Events happening within the next 30 days
          filtered = filtered.filter((event) => {
            const eventDate = new Date(event.dateObj)
            return eventDate >= today && eventDate < nextMonth
          })
          break
      }
    }

    return filtered
  }, [selectedCategory, selectedDateFilter])

  // Calculate total pages
  useEffect(() => {
    if (setTotalPages) {
      const total = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE)
      setTotalPages(total)
    }
  }, [filteredEvents, setTotalPages])

  // Get current page items
  const currentEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredEvents, currentPage])

  // Reset to page 1 when filters change
  useEffect(() => {
    if (setCurrentPage) {
      setCurrentPage(1)
    }
  }, [selectedCategory, selectedDateFilter, setCurrentPage])

  // Loading skeleton
  if (isLoading) {
    return (
      <motion.section
        className="w-full py-8 sm:py-10 md:py-12 relative z-10"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
                  : "flex flex-col gap-4 sm:gap-6"
              }
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse"
                >
                  <div className="h-48 sm:h-56 bg-gray-200" />
                  <div className="p-4 sm:p-5">
                    <div className="h-5 sm:h-6 bg-gray-200 rounded w-3/4 mb-3 sm:mb-4" />
                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-full mb-2" />
                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-2/3 mb-3 sm:mb-4" />
                    <div className="space-y-2 mb-4 sm:mb-5">
                      <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/3" />
                      <div className="h-3 sm:h-4 bg-gray-200 rounded w-2/3" />
                      <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/4" />
                    </div>
                    <div className="h-8 sm:h-10 bg-gray-200 rounded mb-2" />
                    <div className="h-5 sm:h-6 bg-gray-200 rounded w-1/2 mx-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    )
  }

  return (
    <motion.section 
      className="w-full py-8 md:py-12 bg-transparent"
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {viewMode === "grid" ? (
              <motion.div
                key="grid-view"
                className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
                variants={container}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0 }}
              >
                {currentEvents.map((event) => (
                  <motion.div key={event.id} variants={item} className="h-full">
                    <GridCard event={event} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="list-view"
                className="flex flex-col gap-4 sm:gap-6"
                variants={container}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0 }}
              >
                {currentEvents.map((event) => (
                  <motion.div key={event.id} variants={item}>
                    <ListCard event={event} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* No Events Found State */}
          {filteredEvents.length === 0 && (
            <motion.div
              className="text-center py-12 sm:py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">No events found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  if (setCurrentPage) setCurrentPage(1)
                }}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  )
}

function GridCard({ event }: { event: any }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)

  return (
    <>
      <motion.div
        className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-full flex flex-col hover:shadow-md transition-all duration-300"
        whileHover={{ y: -5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Event Image */}
        <div className="relative h-44 sm:h-48 md:h-56 w-full overflow-hidden">
          <motion.div animate={{ scale: isHovered ? 1.05 : 1 }} transition={{ duration: 0.4 }} className="h-full w-full">
            <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
            <span className="inline-block bg-[#4EB89D] text-white text-xs font-medium px-2 py-1 rounded-full mb-1 sm:mb-2">
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </span>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white line-clamp-2">{event.title}</h3>
          </div>
        </div>

        {/* Event Content */}
        <div className="p-3 sm:p-4 md:p-5 flex-grow flex flex-col">
          <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm line-clamp-2 flex-grow">{event.description}</p>

          {/* Event Details */}
          <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5">
            <div className="flex items-center text-gray-500 text-xs sm:text-sm">
              <Calendar size={14} className="mr-1.5 sm:mr-2 text-[#4EB89D]" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center text-gray-500 text-xs sm:text-sm">
              <Clock size={14} className="mr-1.5 sm:mr-2 text-[#4EB89D]" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center text-gray-500 text-xs sm:text-sm">
              <MapPin size={14} className="mr-1.5 sm:mr-2 text-[#4EB89D]" />
              <span className="truncate">{event.location}</span>
            </div>
            <div className="flex items-center text-gray-500 text-xs sm:text-sm">
              <Users size={14} className="mr-1.5 sm:mr-2 text-[#4EB89D]" />
              <span>{event.attendees} attending</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <button
              onClick={() => setIsRegistrationOpen(true)}
              className="w-full text-center bg-[#4EB89D] hover:bg-[#3da78c] text-white py-2 sm:py-2.5 rounded-xl transition-colors font-medium flex items-center justify-center text-xs sm:text-sm"
            >
              Register Now
            </button>
            <Link
              href={`/events/${event.id}`}
              className="w-full text-center text-gray-600 hover:text-[#4EB89D] transition-colors text-xs sm:text-sm flex items-center justify-center group"
            >
              View Details
              <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.div>

      <RegistrationModal 
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        eventTitle={event.title}
      />
    </>
  )
}

function ListCard({ event }: { event: any }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)

  return (
    <>
      <motion.div
        className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row"
        whileHover={{ y: -3 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Event Image */}
        <div className="relative h-44 md:h-auto md:w-1/3 overflow-hidden">
          <motion.div animate={{ scale: isHovered ? 1.05 : 1 }} transition={{ duration: 0.4 }} className="h-full w-full">
            <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
          </motion.div>
          <div className="absolute top-3 left-3">
            <span className="inline-block bg-[#4EB89D] text-white text-xs font-medium px-2 py-1 rounded-full">
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </span>
          </div>
        </div>

        {/* Event Content */}
        <div className="p-3 sm:p-4 md:p-5 flex-grow flex flex-col md:w-2/3">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-1 sm:mb-2">{event.title}</h3>
          <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm line-clamp-2">{event.description}</p>

          {/* Event Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-1.5 sm:gap-y-2 mb-4 sm:mb-5">
            <div className="flex items-center text-gray-500 text-xs sm:text-sm">
              <Calendar size={14} className="mr-1.5 sm:mr-2 text-[#4EB89D]" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center text-gray-500 text-xs sm:text-sm">
              <Clock size={14} className="mr-1.5 sm:mr-2 text-[#4EB89D]" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center text-gray-500 text-xs sm:text-sm">
              <MapPin size={14} className="mr-1.5 sm:mr-2 text-[#4EB89D]" />
              <span className="truncate">{event.location}</span>
            </div>
            <div className="flex items-center text-gray-500 text-xs sm:text-sm">
              <Users size={14} className="mr-1.5 sm:mr-2 text-[#4EB89D]" />
              <span>{event.attendees} attending</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-auto">
            <button
              onClick={() => setIsRegistrationOpen(true)}
              className="flex-1 text-center bg-[#4EB89D] hover:bg-[#3da78c] text-white py-2 rounded-xl transition-colors font-medium text-xs sm:text-sm"
            >
              Register Now
            </button>
            <Link
              href={`/events/${event.id}`}
              className="flex items-center justify-center px-3 sm:px-4 text-gray-600 hover:text-[#4EB89D] transition-colors text-xs sm:text-sm group border border-gray-200 rounded-xl hover:border-[#4EB89D]"
            >
              View Details
              <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.div>

      <RegistrationModal 
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        eventTitle={event.title}
      />
    </>
  )
}

