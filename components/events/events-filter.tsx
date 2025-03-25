"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

import { Search, MapPin, LayoutGrid, List, X, Plus, Calendar, ImageIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function EventsFilter({
  viewMode,
  setViewMode,
  isDropdownOpen,
  setIsDropdownOpen,
  selectedCategory,
  setSelectedCategory,
  selectedDateFilter,
  setSelectedDateFilter,
  isLoaded = false,
}: {
  viewMode: "grid" | "list"
  setViewMode: (mode: "grid" | "list") => void
  isDropdownOpen: boolean
  setIsDropdownOpen: (isOpen: boolean) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  selectedDateFilter: string
  setSelectedDateFilter: (dateFilter: string) => void
  isLoaded?: boolean
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showActiveFilters, setShowActiveFilters] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [eventImage, setEventImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Form state
  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
  })

  // Add these state variables near the other state declarations
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Add handlers for form input and image upload
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEventForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setEventImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  // Replace the handleSubmit function with this enhanced version
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Start loading
    setIsSubmitting(true)

    // Simulate API call with timeout
    setTimeout(() => {
      // Log the form data
      console.log("Form submitted:", { ...eventForm, image: eventImage })

      // Show success message
      setIsSubmitting(false)
      setShowSuccess(true)

      // Close modal and reset form after showing success message
      setTimeout(() => {
        setShowSuccess(false)
        setEventForm({
          title: "",
          description: "",
          date: "",
          category: "",
        })
        setEventImage(null)
        setShowCreateModal(false)
      }, 2000)
    }, 1500)
  }

  // Add modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  }

  const categories = [
    { id: "all", name: "All Events" },
    { id: "spiritual", name: "Spiritual" },
    { id: "volunteer", name: "Volunteer" },
    { id: "discussion", name: "Discussion" },
    { id: "community", name: "Community" },
  ]

  const dateFilters = [
    { id: "", name: "Any Time" },
    { id: "today", name: "Today" },
    { id: "tomorrow", name: "Tomorrow" },
    { id: "this-week", name: "This Week" },
    { id: "this-month", name: "This Month" },
  ]

  // Check if any filters are active
  useEffect(() => {
    if (selectedCategory !== "all" || selectedDateFilter !== "" || searchTerm !== "") {
      setShowActiveFilters(true)
    } else {
      setShowActiveFilters(false)
    }
  }, [selectedCategory, selectedDateFilter, searchTerm])

  // Get the display name for the selected category
  const getSelectedCategoryName = () => {
    const selected = categories.find((category) => category.id === selectedCategory)
    return selected ? selected.name : "All Events"
  }

  // Get the display name for the selected date filter
  const getSelectedDateName = () => {
    const selected = dateFilters.find((filter) => filter.id === selectedDateFilter)
    return selected ? selected.name : "Any Time"
  }

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategory("all")
    setSelectedDateFilter("")
    setSearchTerm("")
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <>
      <section className="w-full py-6 sm:py-8 border-b border-gray-100 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="max-w-5xl mx-auto"
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* First Row: Search Bar + Date Filter Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center mb-4"
              variants={itemVariants}
            >
              {/* Search Bar */}
              <div className="relative w-full sm:w-64 mb-2 sm:mb-0">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4EB89D] focus:border-transparent text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search events"
                />
                {searchTerm && (
                  <button
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    onClick={() => setSearchTerm("")}
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Date Filter Buttons */}
              <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
                {/* Any Time Button */}
                <button
                  className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors ${
                    selectedDateFilter === ""
                      ? "bg-[#4EB89D] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedDateFilter("")}
                  aria-pressed={selectedDateFilter === ""}
                >
                  Any Time
                </button>

                {/* Today Button */}
                <button
                  className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors ${
                    selectedDateFilter === "today"
                      ? "bg-[#4EB89D] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedDateFilter("today")}
                  aria-pressed={selectedDateFilter === "today"}
                >
                  Today
                </button>

                {/* Tomorrow Button */}
                <button
                  className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors ${
                    selectedDateFilter === "tomorrow"
                      ? "bg-[#4EB89D] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedDateFilter("tomorrow")}
                  aria-pressed={selectedDateFilter === "tomorrow"}
                >
                  Tomorrow
                </button>

                {/* This Week Button */}
                <button
                  className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors ${
                    selectedDateFilter === "this-week"
                      ? "bg-[#4EB89D] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedDateFilter("this-week")}
                  aria-pressed={selectedDateFilter === "this-week"}
                >
                  This Week
                </button>
              </div>

              {/* View Toggle and Location Filter */}
              <div className="flex items-center gap-2 ml-0 sm:ml-auto mt-3 sm:mt-0">
                {/* View Toggle */}
                <div className="bg-gray-100 rounded-full p-1 flex items-center">
                  <button
                    className={`p-1 rounded-full transition-colors ${
                      viewMode === "grid" ? "bg-white text-[#4EB89D] shadow-sm" : "text-gray-500"
                    }`}
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid view"
                    aria-pressed={viewMode === "grid"}
                  >
                    <LayoutGrid size={16} />
                  </button>
                  <button
                    className={`p-1 rounded-full transition-colors ${
                      viewMode === "list" ? "bg-white text-[#4EB89D] shadow-sm" : "text-gray-500"
                    }`}
                    onClick={() => setViewMode("list")}
                    aria-label="List view"
                    aria-pressed={viewMode === "list"}
                  >
                    <List size={16} />
                  </button>
                </div>

                {/* Location Filter */}
                <button
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                  aria-label="Filter by location"
                >
                  <MapPin size={14} />
                  <span>Location</span>
                </button>

                {/* Create Event Button - Updated to open modal */}
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs bg-[#4EB89D] text-white hover:bg-[#3da78c] transition-colors ml-2"
                >
                  <Plus size={14} />
                  <span>Create Event</span>
                </button>
              </div>
            </motion.div>

            {/* Second Row: Category Filters */}
            <motion.div className="mt-2 sm:mt-3 flex flex-wrap gap-2 items-center" variants={itemVariants}>
              {/* Category Filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar w-full">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors ${
                      selectedCategory === category.id
                        ? "bg-[#4EB89D] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                    aria-pressed={selectedCategory === category.id}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Active Filters Summary */}
            <AnimatePresence>
              {showActiveFilters && (
                <motion.div
                  className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2 text-xs text-gray-600"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>Active filters:</span>
                  {selectedCategory !== "all" && (
                    <span className="bg-gray-100 px-2 py-1 rounded-md flex items-center gap-1">
                      Category: {getSelectedCategoryName()}
                      <button
                        onClick={() => setSelectedCategory("all")}
                        className="text-gray-500 hover:text-gray-700 ml-1"
                        aria-label={`Remove ${getSelectedCategoryName()} filter`}
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}
                  {selectedDateFilter && (
                    <span className="bg-gray-100 px-2 py-1 rounded-md flex items-center gap-1">
                      Date: {getSelectedDateName()}
                      <button
                        onClick={() => setSelectedDateFilter("")}
                        className="text-gray-500 hover:text-gray-700 ml-1"
                        aria-label={`Remove ${getSelectedDateName()} filter`}
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}
                  {searchTerm && (
                    <span className="bg-gray-100 px-2 py-1 rounded-md flex items-center gap-1">
                      Search: "{searchTerm}"
                      <button
                        onClick={() => setSearchTerm("")}
                        className="text-gray-500 hover:text-gray-700 ml-1"
                        aria-label="Clear search term"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}
                  <button
                    onClick={clearAllFilters}
                    className="text-[#4EB89D] hover:underline ml-1"
                    aria-label="Clear all filters"
                  >
                    Clear all
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Create Event Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              className="bg-white rounded-2xl w-full max-w-md overflow-hidden"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex justify-between items-center p-5 border-b">
                <h3 className="text-lg font-semibold">Create New Event</h3>
                <button onClick={() => setShowCreateModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-5">
                <div className="space-y-4">
                  {/* Event Title */}
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Event Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={eventForm.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4EB89D] focus:border-transparent"
                      placeholder="Enter event title"
                      required
                    />
                  </div>

                  {/* Event Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Short Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={eventForm.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4EB89D] focus:border-transparent resize-none"
                      placeholder="Briefly describe your event"
                      required
                    />
                  </div>

                  {/* Event Date */}
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar size={16} className="text-gray-400" />
                      </div>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={eventForm.date}
                        onChange={handleInputChange}
                        className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4EB89D] focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  {/* Event Category */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={eventForm.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4EB89D] focus:border-transparent"
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="spiritual">Spiritual</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="discussion">Discussion</option>
                      <option value="community">Community</option>
                    </select>
                  </div>

                  {/* Event Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Image</label>
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={triggerFileInput}
                    >
                      {eventImage ? (
                        <div className="relative h-32 w-full">
                          <Image
                            src={eventImage || "/placeholder.svg"}
                            alt="Event preview"
                            fill
                            className="object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setEventImage(null)
                            }}
                            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="py-4">
                          <ImageIcon size={32} className="mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">Click to upload an image</p>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>
                </div>

                {/* Replace the form buttons section with this updated version that includes loading and success states */}
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  {showSuccess ? (
                    <button
                      type="button"
                      className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center justify-center gap-2"
                      disabled
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Event Created!
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#4EB89D] hover:bg-[#3da78c] text-white rounded-lg transition-colors flex items-center justify-center gap-2 min-w-[120px]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <LoadingSpinner />
                          Creating...
                        </>
                      ) : (
                        "Create Event"
                      )}
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Add this LoadingSpinner component at the end of the file, before the final closing bracket */}
    </>
  )
}

// Add this LoadingSpinner component at the end of the file, before the final closing bracket
function LoadingSpinner() {
  return (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}

