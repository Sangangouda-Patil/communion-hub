"use client"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface EventsPaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  isLoaded?: boolean
}

export default function EventsPagination({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 6,
  onPageChange,
  isLoaded = false,
}: EventsPaginationProps) {
  // Calculate the range of items being displayed
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5 // Show at most 5 page numbers

    if (totalPages <= maxPagesToShow) {
      // If we have 5 or fewer pages, show all of them
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always include first page
      pages.push(1)

      // Calculate start and end of page numbers to show
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if we're near the beginning
      if (currentPage <= 3) {
        end = 4
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        start = totalPages - 3
      }

      // Add ellipsis after page 1 if needed
      if (start > 2) {
        pages.push("ellipsis-start")
      }

      // Add the calculated page numbers
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push("ellipsis-end")
      }

      // Always include last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.7,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.section
      className="w-full py-6 sm:py-8"
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            {totalItems > 0 && (
              <div className="text-xs sm:text-sm text-gray-600">
                Showing{" "}
                <span className="font-medium">
                  {startItem}-{endItem}
                </span>{" "}
                of <span className="font-medium">{totalItems}</span> events
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                <button
                  className="p-1.5 sm:p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                  <span className="sr-only">Previous page</span>
                </button>

                {pageNumbers.map((page, index) => {
                  if (page === "ellipsis-start" || page === "ellipsis-end") {
                    return (
                      <span key={`ellipsis-${index}`} className="px-2 sm:px-3 py-1">
                        &hellip;
                      </span>
                    )
                  }

                  return (
                    <button
                      key={`page-${page}`}
                      onClick={() => onPageChange(page as number)}
                      className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm ${
                        currentPage === page ? "bg-[#4EB89D] text-white font-medium" : "hover:bg-gray-100 text-gray-700"
                      }`}
                      aria-current={currentPage === page ? "page" : undefined}
                      aria-label={`Page ${page}`}
                    >
                      {page}
                    </button>
                  )
                })}

                <button
                  className="p-1.5 sm:p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                  <span className="sr-only">Next page</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

