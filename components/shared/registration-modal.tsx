"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check } from "lucide-react"

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  eventTitle?: string
}

export default function RegistrationModal({ isOpen, onClose, eventTitle }: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    religion: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  const religions = [
    "Buddhism",
    "Christianity",
    "Hinduism",
    "Islam",
    "Judaism",
    "Sikhism",
    "Other",
    "Prefer not to say",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call with 2 second delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setRegistrationSuccess(true)
    
    // Reset and close after showing success for 1 second
    setTimeout(() => {
      setIsLoading(false)
      setRegistrationSuccess(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        religion: "",
      })
      onClose()
    }, 1000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {registrationSuccess ? (
              <div className="p-8 flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Registration Successful!</h2>
                <p className="text-gray-600">You have successfully registered for the event.</p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="relative p-6 bg-[#4CAF93]/10">
                  <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-2 rounded-full hover:bg-black/5 transition-colors"
                  >
                    <X size={20} />
                  </button>
                  <h2 className="text-2xl font-bold text-gray-800">Event Registration</h2>
                  {eventTitle && <p className="mt-1 text-gray-600">{eventTitle}</p>}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4CAF93] focus:border-transparent transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4CAF93] focus:border-transparent transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4CAF93] focus:border-transparent transition-colors"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Religion */}
                  <div className="space-y-2">
                    <label htmlFor="religion" className="block text-sm font-medium text-gray-700">
                      Religious Affiliation
                    </label>
                    <select
                      id="religion"
                      value={formData.religion}
                      onChange={(e) => setFormData({ ...formData, religion: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4CAF93] focus:border-transparent transition-colors"
                    >
                      <option value="">Select your religion</option>
                      {religions.map((religion) => (
                        <option key={religion} value={religion}>
                          {religion}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full py-3 px-6 bg-[#4CAF93] hover:bg-[#3d9c82] text-white font-medium rounded-xl transition-colors duration-200 ${
                        isLoading ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Registering...
                        </div>
                      ) : (
                        "Register Now"
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 